import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  return (
    <>
      <FormContainer>
        <form action="" >
          <div className="brand">
            <h1>CHAT APP</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #32302f;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border-radius: 0.4rem;
    border: 0.1rem solid #ee4934;
    color: white;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  
  button {
    background-color: #ee4934;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #ff5b36;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #ee4934;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;


export default LoginPage;
