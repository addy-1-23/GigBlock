import React, { useEffect, useState } from "react";
import styled from "styled-components";

import FrameJob from "../components/frameJob";  

import JobCards from "../components/jobCard"; 

function Jobs() {
    return (
        <Container>
            <FrameJob />
            <MainContent>
                <JobCards/>
            </MainContent>  
            
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
