import React from 'react';
import styled from 'styled-components';

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  padding: 16px 0;
`;

const Card = styled.div`
  flex: 1 1 calc(50% - 16px);
  max-width: calc(50% - 16px);
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #333;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 16px;
`;

const CardHeader = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: #3b82f6;
`;

const CardField = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardLabel = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #666;
`;

const CardValue = styled.div`
  font-size: 16px;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Skill = styled.div`
  background-color: #e0f2fe;
  color: #0369a1;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
`;

function App() {
  const jobListings = [
    {
      position_name: "Software Engineer",
      company_name: "TechCorp",
      about_company: "TechCorp is a leading software development company specializing in web development.",
      job_description: "We are looking for a software engineer to join our development team and work on cutting-edge projects.",
      skillset_required: ["Java", "Spring Boot", "Microservices", "REST API"],
      pay_range: "$60,000 - $80,000 per year",
      work_mode: "Hybrid",
      job_location: "San Francisco, CA",
    },
    {
      position_name: "UI/UX Designer",
      company_name: "DesignHub",
      about_company: "DesignHub is a creative agency focusing on innovative UI/UX design solutions.",
      job_description: "We're seeking a talented UI/UX designer to create user-centric designs for web and mobile applications.",
      skillset_required: ["Sketch", "Figma", "Adobe XD", "Wireframing"],
      pay_range: "$70,000 - $90,000 per year",
      work_mode: "Remote",
      job_location: "New York, NY",
    },
    {
      position_name: "Data Scientist",
      company_name: "AIWorks",
      about_company: "AIWorks is a company dedicated to building AI-driven solutions for business intelligence.",
      job_description: "Join our team as a data scientist to work on machine learning models and AI algorithms.",
      skillset_required: ["Python", "TensorFlow", "Pandas", "Machine Learning"],
      pay_range: "$100,000 - $120,000 per year",
      work_mode: "In-office",
      job_location: "Austin, TX",
    },
  ];

  return (
    <CardsContainer>
      {jobListings.map((job, index) => (
        <Card key={index}>
          <CardHeader>{job.position_name} - {job.company_name}</CardHeader>
          <CardField>
            <CardLabel>About Company</CardLabel>
            <CardValue>{job.about_company}</CardValue>
          </CardField>
          <CardField>
            <CardLabel>Job Description</CardLabel>
            <CardValue>{job.job_description}</CardValue>
          </CardField>
          <CardField>
            <CardLabel>Skills Required</CardLabel>
            <SkillsContainer>
              {job.skillset_required.map((skill, idx) => (
                <Skill key={idx}>{skill}</Skill>
              ))}
            </SkillsContainer>
          </CardField>
          <CardField>
            <CardLabel>Pay Range</CardLabel>
            <CardValue>{job.pay_range}</CardValue>
          </CardField>
          <CardField>
            <CardLabel>Work Mode</CardLabel>
            <CardValue>{job.work_mode}</CardValue>
          </CardField>
          <CardField>
            <CardLabel>Location</CardLabel>
            <CardValue>{job.job_location}</CardValue>
          </CardField>
        </Card>
      ))}
    </CardsContainer>
  );
}

export default App;
