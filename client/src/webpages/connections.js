import React, { useEffect, useState } from "react";
import styled from "styled-components";

import FrameConn from "../components/frameConn";  // Ensure the name is capitalized correctly
import AddConnForm from "../components/addProfile";  // Assuming this component exists
import ProfileCards from "../components/profileCard";  // Assuming this component exists

function Jobs() {
    return (
        <Container>
            <FrameConn />  {/* Capitalized */}
        </Container>
    );
}

const Container = styled.div`
  min-height: 100vh;
`;

export default Jobs;
