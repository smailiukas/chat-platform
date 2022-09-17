import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaUserFriends } from 'react-icons/fa'

export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    async function fetchData() {
      setUserName(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        ).username
      );
    }
    fetchData();
  }, []);

  return (
    <Container>
      <div className="top-navbar">
        <div className="title-icon">
          <FaUserFriends />
        </div>
        <div className="title">FRIENDS</div>
        <div className="divider"></div>
        <a href="#online">Online</a>
        <a href="#all">All</a>
        <a href="#pending">Pending</a>
        <a href="#blocked">Blocked</a>
        <a href="#add-friend">Add Friend</a>
      </div>
      <div className="welcome-screen">
        <h1>
          Welcome back, <span>{userName}</span> !
        </h1>
        <h3>select a specific chat to start messaging</h3>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 7% 93%;
  overflow: hidden;
  background-color: #1c1721;


  .top-navbar {
    height: 100%
    width: 100%;
    background-color: #28212f;
    

    .divider {
      margin-top: 1%;
      font-size: 50px;
      background: #1c1721;
      width: 2px;
      height: 35px;
      float: left;
      text-decoration: none;
    }

    .title-icon {
      margin-top: 0.7%;
      margin-left: 1%;
      font-size: 50px;
      color: #ebe7ff;
      float: left;
      text-decoration: none;
    }

    .title {
      float: left;
      margin-top: 0.7%;
      font-size: 20px;
      color: white;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
    }

    a {
      margin-top: 1%;
      margin-left: 0.9%;
      float: left;
      font-size: 20px;
      color: white;
      text-align: center;
      padding: 7px 13px;
      text-decoration: none;
      background: #1c1721;
      border-radius: 5px;
    }
  }

  .welcome-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction: column;
    img {
      height: 20rem;
    }
    span {
      color: #473a55;
    }
  }
`;
