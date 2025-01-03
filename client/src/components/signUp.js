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
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
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
        <img src="./logo.png" alt="GigBlock Logo" />
      </Logo>
      <FormContainer>
        <h3>Sign-Up</h3>
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
          {emailError && <ErrorText>{emailError}</ErrorText>} {/* Show email error */}
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
          {contactError && <ErrorText>{contactError}</ErrorText>} {/* Show contact number error */}
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
            placeholder="********"
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            value={password}
          />
          {passwordError && <ErrorText>{passwordError}</ErrorText>} {/* Show password error */}
        </InputContainer>
        <InputContainer>
          <p>Confirm Password</p>
          <input
            type="password"
            placeholder="********"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </InputContainer>
        <SignUpButton onClick={signup}>Create Account in GigBlock</SignUpButton>
      </FormContainer>
      <LoginButton onClick={() => navigate("/login")}>Back to Login</LoginButton>
    </Container>
  );
}

const Container = styled.div`
  width: 40%;
  min-width: 450px;
  height: fit-content;
  padding: 15px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.div`
  width: 120px;
  margin-bottom: 20px;
  img {
    width: 100%;
  }
`;

const FormContainer = styled.form`
  border: 1px solid lightgray;
  width: 55%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;

  h3 {
    font-size: 28px;
    font-weight: 400;
    line-height: 33px;
    align-self: flex-start;
    margin-bottom: 10px;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 10px;

  p {
    font-size: 14px;
    font-weight: 600;
  }

  input {
    width: 95%;
    height: 33px;
    padding-left: 5px;
    border-radius: 5px;
    border: 1px solid lightgray;
    margin-top: 5px;

    &:hover {
      border: 1px solid orange;
    }
  }
`;

const SignUpButton = styled.button`
  width: 100%;
  height: 35px;
  font-size: 12px;
  margin-top: 20px;

  &:hover {
    background-color: #dfdfdf;
    border: 1px solid gray;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const LoginButton = styled.button`
  width: 55%;
  height: 35px;
  background-color: #f3b414;
  border: none;
  outline: none;
  border-radius: 10px;
  margin-top: 30px;
`;

export default SignUp;
