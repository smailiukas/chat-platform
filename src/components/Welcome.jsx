import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);


  return (
    <Container>
      <h1>
        olia <span>{userName}</span>
      </h1>
      <h3>select a specific chat to start messaging</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #ee4934;
  }
`;
