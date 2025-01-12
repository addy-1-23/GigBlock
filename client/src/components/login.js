import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }

    try {
      const res = await axios.post("/auth/login", { email, password });
      alert("Login successful!");
      console.log(res.data); 

      // Store JWT in localStorage
      localStorage.setItem("token", res.data.token);

      navigate("/profile"); 
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Container>
      <Logo onClick={() => navigate("/profile")}>
        <img src="./logo.png" alt="VYUHA Logo" />
      </Logo>
      <FormContainer>
        <h3>Login</h3>
        {error && <ErrorText>{error}</ErrorText>}
        <InputContainer>
          <p>Email</p>
          <input
            type="email"
            placeholder="example@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </InputContainer>
        <InputContainer>
          <p>Password</p>
          <input
            type="password"
            placeholder=""
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </InputContainer>
        <LoginButton onClick={login}>Login to VYUHA</LoginButton>
      </FormContainer>
      <SignUpButton onClick={() => navigate("/signup")}>Create an Account</SignUpButton>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 450px;
  min-height: 100vh;
  padding: 2rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color:rgba(249, 249, 249, 0);
`;

const Logo = styled.div`
  width: 120px;
  margin-bottom: 2rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
  }
`;

const FormContainer = styled.form`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin-bottom: 1.5rem;
    align-self: flex-start;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;

  p {
    font-size: 14px;
    font-weight: 600;
    color: #555;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    height: 40px;
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 14px;
    transition: border-color 0.2s ease-in-out;

    &:focus {
      outline: none;
      border-color: #8804fc;
      box-shadow: 0 0 0 2px rgba(243, 180, 20, 0.2);
    }
  }
`;

const LoginButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #8804fc;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  margin-top: 1rem;

  &:hover {
    background-color:rgb(60, 0, 171);
  }
`;

const ErrorText = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin-bottom: 1rem;
  text-align: center;
  width: 100%;
`;

const SignUpButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #fff;
  color: #8804fc;
  font-size: 16px;
  font-weight: 600;
  border: 2px solid rgb(88, 4, 162);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-top: 1rem;

  &:hover {
    background-color: rgb(60, 0, 171);
    color: #fff;
  }
`;

export default Login;