import React, { useEffect, useState, useRef }from "react";
import { FaUserFriends } from "react-icons/fa";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Friends() {

  const navigate = useNavigate();
  const handleClick = async () => {
    navigate("/app")
  };

  return (
    <Button onClick={handleClick}>
      <FaUserFriends />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #564667;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
