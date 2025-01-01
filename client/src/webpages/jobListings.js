import React, { useEffect, useState } from "react";
import styled from "styled-components";

import FrameJob from "../components/frameJob";  // Ensure the name is capitalized correctly
import AddJobForm from "../components/addJob";  // Assuming this component exists
import JobCards from "../components/jobCard";  // Assuming this component exists

function Jobs() {
    return (
        <Container>
            <FrameJob />  {/* Capitalized */}
        </Container>
    );
}

const Container = styled.div`
  min-height: 100vh;
`;

export default Jobs;
