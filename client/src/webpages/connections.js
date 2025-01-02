import React, { useEffect, useState } from "react";
import styled from "styled-components";

import FrameConn from "../components/frameConn";  // Ensure the name is capitalized correctly
import AddConnForm from "../components/addProfile";  // Assuming this component exists
import ProfileCards from "../components/profileCard";  // Assuming this component exists

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
