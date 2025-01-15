import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./webpages/homePage";
import Connect from "./webpages/connections";
import Contract from "./webpages/jobListings";
import LandingP from "./webpages/landingP"; // Renamed to start with an uppercase letter
import styled from "styled-components";
import AddProf from "./components/addProfile";
import EditProf from "./components/EditProfile";
import Job from "./components/addJob";
import Login from "./components/login";
import SignUp from "./components/signUp";
import Setting from "./components/setting";

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/profile" element={<Home />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/contract" element={<Contract />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/addprof" element={<AddProf />} />
          <Route path="/editprof" element={<EditProf />} />

          <Route path="/contract/addJob" element={<Job />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<LandingP />} /> {/* Updated to use LandingP */}
        </Routes>
      </Container>
    </Router>
  );
}

const Container = styled.div`
  min-height: 100vh;
`;

export default App;
