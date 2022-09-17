import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import Settings from "./Settings";
import Friends from "./friends";

export default function NavBar({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);

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

  return (
    <>
      <Container>
        <div className="logo">
          <img draggable="false" src="https://cdn.discordapp.com/attachments/790499717422383147/1020290215711096832/images.png" alt="logo" />
        </div>
        <div className="settings-btn">
          <Settings />
        </div>
        <div className="start-btn">
          <Friends />
        </div>
        <div className="logout-btn">
          <Logout />
        </div>
      </Container>
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-columns: 40% 20% 20% 20%;
  overflow: hidden;
  background-color: #473a55;

  .logo {
    img {
      border-radius: 5px;
      margin-top: 7%;
      margin-left: 5%;
      max-width: 50px;
      max-height: 50px;
    }
  }
  .logout-btn {
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
  }

  .start-btn {
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
  }

  .settings-btn {
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
  }

  .current-user {
    cursor: pointer;
    background-color: #1f1e1d;
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
