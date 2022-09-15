import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";


export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [elapsedTime, setElapsedTime] = useState("");
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);


  // UPDATING MESSAGE TIME (WIP)
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     updateElapsedTime(elapsedTime);
  //     console.log(elapsedTime)
  //   }, 1000);
  //   return () => clearInterval(intervalId);
  // }, []);

  // function updateElapsedTime(time) {
  //   setElapsedTime(dhm(time));
  // }

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);


  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const response = await axios.post(recieveMessageRoute, {
      from: data.userId,
      to: currentChat.userId,
    });

    console.log(response)
    setMessages(response.data);
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        ).userId;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const formatTime = (time) => {

    const ms = Date.now() - new Date(time).getTime();
    var days = Math.floor(ms / (24 * 60 * 60 * 1000));
    var daysms = ms % (24 * 60 * 60 * 1000);
    var hours = Math.floor(daysms / (60 * 60 * 1000));
    var hoursms = ms % (60 * 60 * 1000);
    var minutes = Math.floor(hoursms / (60 * 1000));
    var minutesms = ms % (60 * 1000);
    var sec = Math.floor(minutesms / 1000);
    var msgTime = `${days === 0 ? "" : days + "d."} ${hours === 0 ? "" : hours + "h."} ${
      minutes === 0 ? "" : minutes + "min."
    } ${sec === 0 ? "" : sec + "s."}`

    var h = new Date(time).getHours();
    var m = new Date(time).getMinutes();

    h = (h<10) ? '0' + h : h;
    m = (m<10) ? '0' + m : m;
    
    return h + ':' + m;
  }

  function onlySpaces(str) {
    return str.trim().length === 0;
  }

  const dhm = (time) => {
    const ms = Date.now() - new Date(time).getTime();
    var days = Math.floor(ms / (24 * 60 * 60 * 1000));
    var daysms = ms % (24 * 60 * 60 * 1000);
    var hours = Math.floor(daysms / (60 * 60 * 1000));
    var hoursms = ms % (60 * 60 * 1000);
    var minutes = Math.floor(hoursms / (60 * 1000));
    var minutesms = ms % (60 * 1000);
    var sec = Math.floor(minutesms / 1000);
    var msgTime = `${days === 0 ? "" : days + "d."} ${hours === 0 ? "" : hours + "h."} ${
      minutes === 0 ? "" : minutes + "min."
    } ${sec === 0 ? "" : sec + "s."}`

    return `${onlySpaces(msgTime) ? "" : ` ${msgTime} ago`}`
  }

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat.userId,
      from: data.userId,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data.userId,
      to: currentChat.userId,
      message: msg,
    });

    const msgs = [...messages];

    msgs.push({ fromSelf: true, message: msg, time: `${msg.time ? msg.time : `${new Date()}`}` });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg, time: `${msg.time ? msg.time : `${new Date()}`}` });
      });
    }
  }, []);


  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content">
                {message.fromSelf ? <img className="msg-avatar" src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar"/> : <img className="msg-avatar" src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}alt=""/> } {message.fromSelf ? <div className="msg-author-username">{currentUserName}(me) {message.time ? `| ${formatTime(message.time)}` : ""}</div> : <div className="msg-author-username">{currentChat.username} {message.time ? `| ${formatTime(message.time)}` : ""}</div> }
                  <p>{message.message}</p>
                </div>
                <div className="tooltip">{dhm(onlySpaces(message.time) ? new Date() : message.time)}</div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  h3 {
    color: white;
  }

  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #5c575539;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;

      .msg-avatar {
        height: 25px;
      }

      .msg-author-username {
        font-size: 18px;
        display: inline-block;
        overflow: auto;
        position: relative;
        top: -2px;
      }

      .tooltip {
        position: relative;
        top: 0px;
        left: 25px;
        background: #32302f;
        padding: 10px;
        z-index: 1000000;
        display: inline;
        opacity: 0;
        transition: 750ms all;
        border-radius: 20px;
      }

      &:hover .tooltip {
        outline: none;
        text-decoration: none;
        font-size: 70%;
        color: #ffffff;
        opacity: 1;
      }

      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-start;
      .content {
        background-color: #32302f;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #32302f;
      }
    }
  }
`;
