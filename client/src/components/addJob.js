import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';  
import styled from 'styled-components';
import axios from '../axios';

// Styled Components 
const FormContainer = styled.div`
  background-color: #f7f9fc;
  padding: 32px;
  border-radius: 10px;
  max-width: 900px;
  margin: 40px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #333;
  font-family: 'Inter', sans-serif;
`;

const Heading = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #555;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 14px 18px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  color: #333;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
  box-sizing: border-box;
  width: 100%;
`;

const Textarea = styled.textarea`
  padding: 14px 18px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  color: #333;
  font-size: 14px;
  outline: none;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.3s;
  box-sizing: border-box;
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: 14px 18px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  width: 100%;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 18px;
  cursor: pointer;
  margin-top: 12px;
  font-size: 14px;
  transition: background-color 0.3s;
  width: fit-content;
`;

const AddIcon = styled(FaPlus)`
  margin-right: 10px;
  font-size: 18px;
`;

const SkillsetContainer = styled.div`
  margin-bottom: 12px;
`;

function AddJobForm() {
  const [positionName, setPositionName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [skillsetRequired, setSkillsetRequired] = useState(["", ""]);
  const [payRange, setPayRange] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [jobLocation, setJobLocation] = useState("");

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skillsetRequired];
    updatedSkills[index] = value;
    setSkillsetRequired(updatedSkills);
  };

  const addSkillField = () => {
    setSkillsetRequired([...skillsetRequired, ""]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = {
      positionName: positionName, // Match backend schema
      companyName: companyName,
      aboutCompany: aboutCompany,
      jobDescription: jobDescription,
      skillsetRequired: skillsetRequired,
      payRange: payRange,
      workMode: workMode,
      jobLocation: jobLocation,
    };
  
    axios
      .post("/jobs/add", formData)
      .then(() => {
        setPositionName("");
        setCompanyName("");
        setAboutCompany("");
        setJobDescription("");
        setSkillsetRequired(["", ""]);
        setPayRange("");
        setWorkMode("");
        setJobLocation("");
      })
      .catch((error) => alert(error.message));
  };
  

  return (
    <FormContainer>
      <Heading>Add Job</Heading>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Position Name</Label>
          <Input
            type="text"
            name="position_name"
            value={positionName}
            onChange={(e) => setPositionName(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Company Name</Label>
          <Input
            type="text"
            name="company_name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>About Company</Label>
          <Textarea
            name="about_company"
            value={aboutCompany}
            onChange={(e) => setAboutCompany(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Job Description</Label>
          <Textarea
            name="job_description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Skillset Required</Label>
          {skillsetRequired.map((skill, index) => (
            <SkillsetContainer key={index}>
              <Input
                type="text"
                name={`skillset_required_${index}`}
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                placeholder={`Skill ${index + 1}`}
              />
            </SkillsetContainer>
          ))}
          <AddButton type="button" onClick={addSkillField}>
            <AddIcon />
            Add Skill
          </AddButton>
        </FormGroup>

        <FormGroup>
          <Label>Pay Range</Label>
          <Input
            type="text"
            name="pay_range"
            value={payRange}
            onChange={(e) => setPayRange(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Work Mode</Label>
          <Input
            type="text"
            name="work_mode"
            value={workMode}
            onChange={(e) => setWorkMode(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Job Location</Label>
          <Input
            type="text"
            name="job_location"
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
            required
          />
        </FormGroup>

        <SubmitButton type="submit">SUBMIT</SubmitButton>
      </Form>
    </FormContainer>
  );
}

export default AddJobForm;
