import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiEnvelope, BiUser } from "react-icons/bi";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);



  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  
  let notificationIcon = 10;

  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <div className="contact-above-buttons">
              <div className="contact-above-button">
                <div className="icon"><BiUser/></div>
                <div className="button-text"><h3>Friends</h3></div>
              </div>
              <div className="contact-above-button">
                <div className="icon"><BiEnvelope/></div>
                <div className="button-text"><h3>Message Requests</h3></div>
              </div>
            </div>
          </div>
          <div className="brand">
            <h3>Direct Messages</h3>
            <br></br>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <span class="badge">
                      {notificationIcon > 9 ? "9+" : notificationIcon}
                    </span>
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 17% 5% 70%;
  overflow: hidden;
  background-color: #32302f;

  .brand {
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }

  .contact-above-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 5px;
    width: 100%;

    .contact-above-button {
      background-color: #1f1e1d;
      min-height: 10px;
      cursor: pointer;
      width: 90%;
      border-radius: 5px;
      padding: 15px 15px;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
    }

    .icon {
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;

      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }

      svg {
        font-size: 2rem;
        color: white;
      }
    }

    .button-text {
      display: inline-block;
      font-size: 13px;
      h3 {
        color: white;
      }
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #12111134;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 15px;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      

      .avatar {
        img {
          height: 3rem;
        }
        position: relative;
        display: inline-block;
        text-decoration: none;

        
        .badge {
          position: absolute;
          top: -10px;
          right: -10px;
          padding: 5px 5px;
          border-radius: 25%;
          background: #ee4934;
          color: white;
        }
      }
      .username {
        display: inline-block;
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #191818;
    }
  }

  .current-user {
    background-color: #ee4934;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 40px;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
