import React from "react";
import styled from "styled-components";

import FrameConn from "../components/frameConn";  
import ProfileCards from "../components/profileCard";  

function Jobs() {
    return (
      <Container>
        <FrameConn /> 
          <MainContent>
            <ProfileCards />
          </MainContent>
      </Container>
    );
  }

const Container = styled.div`
  
`;

const MainContent = styled.div`
  margin-left: 240px;
  padding: 24px;
  width: calc(100% - 240px);
`;

export default Jobs;