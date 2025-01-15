import React, { useState, useRef, useCallback, useEffect } from 'react';
import { FaPlus, FaMoon, FaSun } from "react-icons/fa";
import styled, { createGlobalStyle } from 'styled-components';
import axios from "../axios";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  transition: background-color 0.2s, color 0.2s;
  background-color: ${props => props.isDarkMode ? '#1a202c' : '#f7f9fc'};
  color: ${props => props.isDarkMode ? '#e2e8f0' : '#333'};
  padding: 2rem;
`;

const Container = styled.div`
  max-width: 9000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FormContainer = styled.div`
  background-color: ${props => props.isDarkMode ? '#2d3748' : '#ffffff'};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  flex: 2;
`;

const ProfileContainer = styled.div`
  background-color: ${props => props.isDarkMode ? '#2d3748' : '#ffffff'};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  flex: 1;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${props => props.isDarkMode ? '#e2e8f0' : '#333'};
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${props => props.isDarkMode ? '#e2e8f0' : '#555'};
`;

const Input = styled.input`
  width: 89%;
  padding: 0.875rem 1.125rem;
  border: 1px solid ${props => props.isDarkMode ? '#4a5568' : '#ccc'};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background-color: ${props => props.isDarkMode ? '#4a5568' : '#ffffff'};
  color: ${props => props.isDarkMode ? '#e2e8f0' : '#333'};
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
`;

const TextArea = styled(Input).attrs({ as: 'textarea' })`
  resize: vertical;
  min-height: 120px;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 1.125rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #ffffff;
  background-color: ${props => props.isDarkMode ? '#4a5568' : '#4CAF50'};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.isDarkMode ? '#2d3748' : '#45a049'};
  }
`;

const AddButton = styled(Button)`
  background-color: #007BFF;
  margin-top: 0.75rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const ProfilePicture = styled.div`
  width:16rem;
  height: 16rem;
  border-radius: 50%;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ColorOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ColorOption = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.875rem 1.125rem;
  border: 1px solid ${props => props.isDarkMode ? '#4a5568' : '#ccc'};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background-color: ${props => props.isDarkMode ? '#4a5568' : '#ffffff'};
  color: ${props => props.isDarkMode ? '#e2e8f0' : '#333'};
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
`;

const ProfileCreationPage = () => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [emailId, setEmailId] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [skills, setSkills] = useState([""]);
  const [projects, setProjects] = useState([
    { projectName: "", aboutProject: "", technologies: "" }
  ]);
  const [experiences, setExperiences] = useState([
    { companyName: "", role: "", startDate: "", endDate: "", description: "" }
  ]);

  const [selectedColor, setSelectedColor] = useState('#000000');
  const [gradientColor, setGradientColor] = useState('#FF5733');
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [colorPickerType, setColorPickerType] = useState('hex');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const colorOptions = ['#FF5733', '#33FF57', '#3357FF', '#FF33F1', '#33FFF1', '#F1FF33'];

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username": setUsername(value); break;
      case "bio": setBio(value); break;
      case "date_of_birth": setDateOfBirth(value); break;
      case "email_id": setEmailId(value); break;
      case "contact_number": setContactNumber(value); break;
      default: break;
    }
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const addSkillField = () => {
    setSkills([...skills, ""]);
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const addProjectField = () => {
    setProjects([...projects, { projectName: "", aboutProject: "", technologies: "" }]);
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
  };

  const addExperienceField = () => {
    setExperiences([...experiences, { companyName: "", role: "", startDate: "", endDate: "", description: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      username,
      bio,
      dateOfBirth,
      emailId,
      contactNumber,
      skills,
      projects,
      experiences,
      profilePicture: uploadedImage || (colorPickerType === 'gradient' ? `linear-gradient(to right, ${selectedColor}, ${gradientColor})` : selectedColor)
    };

    axios.post("/profiles/add", formData)
      .then(() => {
        setUsername("");
        setBio("");
        setDateOfBirth("");
        setEmailId("");
        setContactNumber("");
        setSkills([""]);
        setProjects([{ projectName: "", aboutProject: "", technologies: "" }]);
        setExperiences([{ companyName: "", role: "", startDate: "", endDate: "", description: "" }]);
        setUploadedImage(null);
        setSelectedColor('#000000');
        setGradientColor('#FF5733');
        alert("Profile added successfully!");
      })
      .catch((error) => alert(error.message));
  };

  const handleColorChange = useCallback((color) => {
    setSelectedColor(color);
    setUploadedImage(null);
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setUploadedImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleHexInputChange = (e) => {
    const hex = e.target.value;
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      handleColorChange(hex);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const ColorPicker = () => {
    switch (colorPickerType) {
      case 'radial':
        return (
          <div className="w-48 h-48 rounded-full mx-auto relative" style={{ background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)' }}>
            <div className="absolute inset-2 rounded-full bg-white"></div>
            <div
              className="absolute inset-0"
              onClick={(e) => {
                const rect = e.target.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const angle = Math.atan2(y, x);
                const hex = hslToHex(angle / (2 * Math.PI) * 360, 100, 50);
                handleColorChange(hex);
              }}
            ></div>
          </div>
        );
      case 'bar':
        return (
          <div className="w-full h-12 rounded-md" style={{ background: 'linear-gradient(to right, red, yellow, lime, aqua, blue, magenta)' }}>
            <div
              className="w-full h-full"
              onClick={(e) => {
                const rect = e.target.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const ratio = x / rect.width;
                const hue = ratio * 360;
                const hex = hslToHex(hue, 100, 50);
                handleColorChange(hex);
              }}
            ></div>
          </div>
        );
      case 'gradient':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-12 h-12"
            />
            <input
              type="color"
              value={gradientColor}
              onChange={(e) => setGradientColor(e.target.value)}
              className="w-12 h-12"
            />
          </div>
        );
      default:
        return (
          <Input
            type="text"
            value={selectedColor}
            onChange={handleHexInputChange}
            placeholder="#000000"
            isDarkMode={isDarkMode}
          />
        );
    }
  };

  const hslToHex = (h, s, l) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  return (
    <PageContainer isDarkMode={isDarkMode}>
      <GlobalStyle />
      <Container>
        <FormContainer isDarkMode={isDarkMode}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <Title isDarkMode={isDarkMode}>Create Profile</Title>
            <Button onClick={toggleDarkMode} isDarkMode={isDarkMode}>
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </Button>
          </div>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label isDarkMode={isDarkMode}>Username</Label>
              <Input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                required
                isDarkMode={isDarkMode}
              />
            </FormGroup>
            <FormGroup>
              <Label isDarkMode={isDarkMode}>Bio</Label>
              <TextArea
                name="bio"
                value={bio}
                onChange={handleChange}
                rows={4}
                required
                isDarkMode={isDarkMode}
              />
            </FormGroup>
            <FormGroup>
              <Label isDarkMode={isDarkMode}>Date of Birth</Label>
              <Input
                type="date"
                name="date_of_birth"
                value={dateOfBirth}
                onChange={handleChange}
                required
                isDarkMode={isDarkMode}
              />
            </FormGroup>
            <FormGroup>
              <Label isDarkMode={isDarkMode}>Email ID</Label>
              <Input
                type="email"
                name="email_id"
                value={emailId}
                onChange={handleChange}
                required
                isDarkMode={isDarkMode}
              />
            </FormGroup>
            <FormGroup>
              <Label isDarkMode={isDarkMode}>Contact Number</Label>
              <Input
                type="text"
                name="contact_number"
                value={contactNumber}
                onChange={handleChange}
                required
                isDarkMode={isDarkMode}
              />
            </FormGroup>
            <FormGroup>
  <Label isDarkMode={isDarkMode}>Skills</Label>
  {skills.map((skill, index) => (
    <Input
      key={index}
      type="text"
      value={skill}
      onChange={(e) => handleSkillChange(index, e.target.value)}
      placeholder={`Skill ${index + 1}`}  // Corrected placeholder syntax
      isDarkMode={isDarkMode}
    />
  ))}
  <AddButton type="button" onClick={addSkillField} isDarkMode={isDarkMode}>
    <FaPlus style={{ marginRight: '0.5rem' }} /> Add Skill
  </AddButton>
</FormGroup>

            <FormGroup>
              <Label isDarkMode={isDarkMode}>Projects</Label>
              {projects.map((project, index) => (
                <div key={index}>
                  <Input
                    type="text"
                    value={project.projectName}
                    onChange={(e) => handleProjectChange(index, "projectName", e.target.value)}
                    placeholder="Project Name"
                    isDarkMode={isDarkMode}
                  />
                  <TextArea
                    value={project.aboutProject}
                    onChange={(e) => handleProjectChange(index, "aboutProject", e.target.value)}
                    placeholder="About Project"
                    isDarkMode={isDarkMode}
                  />
                  <Input
                    type="text"
                    value={project.technologies}
                    onChange={(e) => handleProjectChange(index, "technologies", e.target.value)}
                    placeholder="Technologies"
                    isDarkMode={isDarkMode}
                  />
                </div>
              ))}
              <AddButton type="button" onClick={addProjectField} isDarkMode={isDarkMode}>
                <FaPlus style={{ marginRight: '0.5rem' }} /> Add Project
              </AddButton>
            </FormGroup>
            <FormGroup>
              <Label isDarkMode={isDarkMode}>Experience</Label>
              {experiences.map((exp, index) => (
                <div key={index}>
                  <Input
                    type="text"
                    value={exp.companyName}
                    onChange={(e) => handleExperienceChange(index, "companyName", e.target.value)}
                    placeholder="Company Name"
                    isDarkMode={isDarkMode}
                  />
                  <Input
                    type="text"
                    value={exp.role}
                    onChange={(e) => handleExperienceChange(index, "role", e.target.value)}
                    placeholder="Role"
                    isDarkMode={isDarkMode}
                  />
                  <Input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                    isDarkMode={isDarkMode}
                  />
                  <Input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                    isDarkMode={isDarkMode}
                  />
                  <TextArea
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                    placeholder="Experience Description"
                    isDarkMode={isDarkMode}
                  />
                </div>
              ))}
              <AddButton type="button" onClick={addExperienceField} isDarkMode={isDarkMode}>
                <FaPlus style={{ marginRight: '0.5rem' }} /> Add Experience
              </AddButton>
            </FormGroup>
            <Button type="submit" isDarkMode={isDarkMode}>SUBMIT</Button>
          </form>
        </FormContainer>
        
        <ProfileContainer isDarkMode={isDarkMode}>
          <Title isDarkMode={isDarkMode}>Profile Picture</Title>
          <ProfilePicture
            style={{ 
              backgroundColor: uploadedImage ? 'transparent' : (colorPickerType === 'gradient' ? 'transparent' : selectedColor),
              backgroundImage: uploadedImage ? `url(${uploadedImage})` : (colorPickerType === 'gradient' ? `linear-gradient(to right, ${selectedColor}, ${gradientColor})` : 'none'),
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            onClick={() => fileInputRef.current.click()}
          >
            {!uploadedImage && !username && (
              <span style={{color: 'white'}}>Upload Picture</span>
            )}
            {!uploadedImage && username && (
              <span style={{color: 'white', fontSize: '2rem'}}>{username[0].toUpperCase()}</span>
            )}
          </ProfilePicture>
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            onChange={handleImageUpload} 
            accept="image/*"
          />
          <ColorOptions>
            {colorOptions.map((color) => (
              <ColorOption
                key={color}
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
              />
            ))}
          </ColorOptions>
          <FormGroup>
            <Select
              value={colorPickerType}
              onChange={(e) => setColorPickerType(e.target.value)}
              isDarkMode={isDarkMode}
            >
              <option value="hex">Hex Input</option>
              <option value="radial">Radial Picker</option>
              <option value="bar">Color Bar</option>
              <option value="gradient">Gradient</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <ColorPicker />
          </FormGroup>
          <div style={{textAlign: 'center'}}>
            <span style={{fontWeight: 'bold'}}>Selected Color: </span>
            <span>{colorPickerType === 'gradient' ? `${selectedColor} to ${gradientColor}` : selectedColor}</span>
            </div>
        </ProfileContainer>
      </Container>
    </PageContainer>
  );
};

export default ProfileCreationPage;