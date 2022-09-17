import React from "react";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { FiSettings } from 'react-icons/fi'

export default function Settings() {
//   const navigate = useNavigate();
//   const handleClick = async () => {
//     const id = await JSON.parse(
//       localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//     )._id;
//     //const data = await axios.get(`${logoutRoute}/${id}`);
//     if (data.status === 200) {
//       localStorage.clear();
//       navigate("/login");
//     }
//   };
  return (
    <Button>
      <FiSettings />
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
