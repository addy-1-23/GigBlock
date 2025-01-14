import React, { useState } from "react";
import { FaPlus } from "react-icons/fa"; 
import axios from "../axios";

function AddProfileForm() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "bio":
        setBio(value);
        break;
      case "date_of_birth":
        setDateOfBirth(value);
        break;
      case "email_id":
        setEmailId(value);
        break;
      case "contact_number":
        setContactNumber(value);
        break;
      default:
        break;
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
    };

    axios
      .post("/profiles/add", formData)
      .then(() => {
        setUsername("");
        setBio("");
        setDateOfBirth("");
        setEmailId("");
        setContactNumber("");
        setSkills([""]);
        setProjects([{ projectName: "", aboutProject: "", technologies: "" }]);
        setExperiences([{ companyName: "", role: "", startDate: "", endDate: "", description: "" }]);
        alert("Profile added successfully!");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.heading}>Add Profile</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Bio</label>
          <textarea
            name="bio"
            value={bio}
            onChange={handleChange}
            style={styles.textarea}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            value={dateOfBirth}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email ID</label>
          <input
            type="email"
            name="email_id"
            value={emailId}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Contact Number</label>
          <input
            type="text"
            name="contact_number"
            value={contactNumber}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Skills</label>
          {skills.map((skill, index) => (
            <div key={index} style={styles.skillsetContainer}>
              <input
                type="text"
                name={`skills_${index}`}
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                style={styles.input}
                placeholder={`Skill ${index + 1}`}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addSkillField}
            style={styles.addButton}
          >
            <FaPlus style={styles.addIcon} />
            Add Skill
          </button>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Projects</label>
          {projects.map((project, index) => (
            <div key={index} style={styles.skillsetContainer}>
              <input
                type="text"
                name={`project_name_${index}`}
                value={project.projectName}
                onChange={(e) =>
                  handleProjectChange(index, "projectName", e.target.value)
                }
                style={styles.input}
                placeholder="Project Name"
              />
              <textarea
                name={`about_project_${index}`}
                value={project.aboutProject}
                onChange={(e) =>
                  handleProjectChange(index, "aboutProject", e.target.value)
                }
                style={styles.textarea}
                placeholder="About Project"
              />
              <input
                type="text"
                name={`technologies_${index}`}
                value={project.technologies}
                onChange={(e) =>
                  handleProjectChange(index, "technologies", e.target.value)
                }
                style={styles.input}
                placeholder="Technologies"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addProjectField}
            style={styles.addButton}
          >
            <FaPlus style={styles.addIcon} />
            Add Project
          </button>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Experience</label>
          {experiences.map((exp, index) => (
            <div key={index} style={styles.skillsetContainer}>
              <input
                type="text"
                name={`company_name_${index}`}
                value={exp.companyName}
                onChange={(e) =>
                  handleExperienceChange(index, "companyName", e.target.value)
                }
                style={styles.input}
                placeholder="Company Name"
              />
              <input
                type="text"
                name={`role_${index}`}
                value={exp.role}
                onChange={(e) =>
                  handleExperienceChange(index, "role", e.target.value)
                }
                style={styles.input}
                placeholder="Role"
              />
              <input
                type="date"
                name={`start_date_${index}`}
                value={exp.startDate}
                onChange={(e) =>
                  handleExperienceChange(index, "startDate", e.target.value)
                }
                style={styles.input}
              />
              <input
                type="date"
                name={`end_date_${index}`}
                value={exp.endDate}
                onChange={(e) =>
                  handleExperienceChange(index, "endDate", e.target.value)
                }
                style={styles.input}
              />
              <textarea
                name={`description_${index}`}
                value={exp.description}
                onChange={(e) =>
                  handleExperienceChange(index, "description", e.target.value)
                }
                style={styles.textarea}
                placeholder="Experience Description"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addExperienceField}
            style={styles.addButton}
          >
            <FaPlus style={styles.addIcon} />
            Add Experience
          </button>
        </div>

        <button type="submit" style={styles.submitButton}>SUBMIT</button>
      </form>
    </div>
  );
}
const styles = {
  formContainer: {
    backgroundColor: '#f7f9fc',
    padding: '32px',
    borderRadius: '10px',
    maxWidth: '900px',
    margin: '40px auto',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    color: '#333',
    fontFamily: 'Inter, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
    fontSize: '24px',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '16px',
    color: '#555',
    fontWeight: '600',
  },
  input: {
    padding: '14px 18px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    color: '#333',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s',
    boxSizing: 'border-box',
    width: '100%',  
  },
  textarea: {
    padding: '14px 18px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    color: '#333',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical',
    minHeight: '120px',
    transition: 'border-color 0.3s',
    boxSizing: 'border-box',
    width: '100%',  
  },
  submitButton: {
    padding: '14px 18px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    width: '100%',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 18px',
    cursor: 'pointer',
    marginTop: '12px',
    fontSize: '14px',
    transition: 'background-color 0.3s',
    width: 'fit-content',
  },
  addIcon: {
    marginRight: '10px',
    fontSize: '18px',
  },
  skillsetContainer: {
    marginBottom: '12px',
  }
};

export default AddProfileForm;
