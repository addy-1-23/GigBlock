import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./webpages/homePage";
import Connect from "./webpages/connections";
import Contract from "./webpages/jobListings";
import styled from "styled-components";
import Conn from"./components/addProfile";
import Job from"./components/addJob";

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/contract" element={<Contract />} />
          <Route path="/connect/addProf" element={<Conn />} />
          <Route path="/contract/addJob" element={<Job />} />


        </Routes>
      </Container>
    </Router>
  );
}

const Container = styled.div`
  
  min-height: 100vh;  
`;

export default App;
