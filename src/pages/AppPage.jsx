import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Route, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import NavBar from "../components/NavBar";

function AppPage() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate("/login");
          } else {
            setCurrentUser(
              await JSON.parse(
                localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
              )
            );
          }
    }

    fetchData()
  }, []);


  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser.userId);
    }
  }, [currentUser]);

  useEffect(() => {
    async function fetchData() {
        if (currentUser) {
          const data = await axios.get(`${allUsersRoute}/${currentUser.userId}`);
          setContacts(data.data);
        }
    }
    fetchData()
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <Container>
        <div className="container">
           <Contacts contacts={contacts} changeChat={handleChatChange} />
           {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )} 
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 100%;
    width: 100%;
    background-color: #1f1e1d;
    display: grid;
    grid-template-columns: 20% 80%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;


export default AppPage;
