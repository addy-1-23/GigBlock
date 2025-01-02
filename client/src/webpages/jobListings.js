import React, { useEffect, useState } from "react";
import styled from "styled-components";

import FrameJob from "../components/frameJob";  // Ensure the name is capitalized correctly

import JobCards from "../components/jobCard";  // Assuming this component exists

function Jobs() {
    return (
        <Container>
            <FrameJob />
            <MainContent>
                <JobCards/>
            </MainContent>  {/* Capitalized */}
            
        </Container>
    );
}

const Container = styled.div`
  min-height: 100vh;
`;

const MainContent = styled.div`
  margin-left: 240px;
  padding: 24px;
  width: calc(100% - 240px);
`;

export default Jobs;
