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
  


  return (
    <>
      <Container>
        Needed containers
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
    grid-template-columns: 5% 20% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default AppPage;
