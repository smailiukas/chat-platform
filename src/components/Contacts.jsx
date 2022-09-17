import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoMdSearch } from "react-icons/io";
import NavBar from "./NavBar";

export default function Contacts({ contacts, changeChat }) {

  const navigate = useNavigate();
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    }

    fetchData()
  }, []);



  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
    navigate(`/app/${contact.userId}`)
  };

  
  let notificationIcon = 10;

  return (
    <>
      <Container>
        <div></div>
        <div className="brand">
          <h3>Direct Messages</h3>
          <br></br>
        </div>
        <div className="contact-box">
          {contacts.map((contact, index) => {
            return (
              <div
                key={contact.userId}
                className={`contact-child ${
                  index === currentSelected ? "selected" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            );
          })}
        </div>

        <div className="brand">
          <h3>Groups</h3>
          <br></br>
        </div>

        <div className="contact-box"></div>
        <NavBar/>
      </Container>
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 2% 5% 40% 5% 40%;
  overflow: hidden;
  background-color: #473a55;

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

  .contact-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    background-color: #564667;
    width: 95%;
    border-radius: 15px;
    margin-left: 2.5%;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: transparent;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .contact-child {
      margin-top: 1.4%;
      margin-bottom: 2%;
      background-color: #12111134;
      min-height: 5rem;
      cursor: pointer;
      width: 94%;
      border-radius: 15px;
      padding: 0.4rem;
      display: flex;
      align-items: center;
      transition: 0.5s ease-in-out;

      .username {
        h3 {
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

    .selected {
      background-color: #3f334a;
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
