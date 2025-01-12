import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

function SignUp() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [place, setPlace] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [error, setError] = useState("");

  const [emailError, setEmailError] = useState(""); 
  const [contactError, setContactError] = useState(""); 
  const [passwordError, setPasswordError] = useState(""); 

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  // Contact number validation
  const validateContact = (contact) => {
    if (contact.length !== 10 || isNaN(contact)) {
      setContactError("Contact number must be 10 digits");
    } else {
      setContactError("");
    }
  };

  // Password validation
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%*?&]{7,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 7 characters long, include one uppercase letter, one number, one special character, and no spaces");
    } else {
      setPasswordError("");
    }
  };

  // Sign up function
  const signup = async (e) => {
    e.preventDefault();

    if (!fullName || !username || !email || !contact || !place || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("/auth/signup", {
        fullName,
        username,
        email,
        contact,
        place,
        password,
      });
      alert(res.data.message);
      if (res.data.message === "User Created Successfully") {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Container>
      <Logo onClick={() => navigate("/profile")}>
        <img src="./logo.png" alt="VYUHA Logo" />
      </Logo>
      <FormContainer>
        <h3>Sign Up</h3>
        {error && <ErrorText>{error}</ErrorText>}
        <InputContainer>
          <p>Full Name</p>
          <input
            type="text"
            placeholder="John Smith"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
        </InputContainer>
        <InputContainer>
          <p>Username</p>
          <input
            type="text"
            placeholder="johnsmith123"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </InputContainer>
        <InputContainer>
          <p>Email</p>
          <input
            type="email"
            placeholder="example@example.com"
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            value={email}
          />
          {emailError && <ErrorText>{emailError}</ErrorText>}
        </InputContainer>
        <InputContainer>
          <p>Contact Number</p>
          <input
            type="text"
            placeholder="1234567890"
            onChange={(e) => {
              setContact(e.target.value);
              validateContact(e.target.value);
            }}
            value={contact}
          />
          {contactError && <ErrorText>{contactError}</ErrorText>}
        </InputContainer>
        <InputContainer>
          <p>Place</p>
          <input
            type="text"
            placeholder="City or State"
            onChange={(e) => setPlace(e.target.value)}
            value={place}
          />
        </InputContainer>
        <InputContainer>
          <p>Password</p>
          <input
            type="password"
            placeholder=""
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            value={password}
          />
          {passwordError && <ErrorText>{passwordError}</ErrorText>}
        </InputContainer>
        <InputContainer>
          <p>Confirm Password</p>
          <input
            type="password"
            placeholder=""
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </InputContainer>
        <SignUpButton onClick={signup}>Create Account in VYUHA</SignUpButton>
      </FormContainer>
      <LoginButton onClick={() => navigate("/login")}>Back to Login</LoginButton>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 500px;
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
      border-color:rgb(53, 0, 246);
      box-shadow: 0 0 0 2px rgba(243, 180, 20, 0.2);
    }
  }
`;

const SignUpButton = styled.button`
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
    background-color: rgb(60, 0, 171);
  }
`;

const ErrorText = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
  text-align: left;
  width: 100%;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #fff;
  color: #8804fc;
  font-size: 16px;
  font-weight: 600;
  border: 2px solid #8804fc;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-top: 1rem;

  &:hover {
    background-color: rgb(60, 0, 171);
    color: #fff;
  }
`;

export default SignUp;