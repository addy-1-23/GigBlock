import React, { useEffect, useState } from "react";
import axios from "../axios"; // Adjust the import based on your axios setup
import { FaPlus } from "react-icons/fa"; // Import FaPlus for the add button
import { jwtDecode } from "jwt-decode"; // Import jwtDecode to decode the token

function EditProfile() {
  const [profileData, setProfileData] = useState({
    username: "",
    bio: "",
    dateOfBirth: "",
    emailId: "",
    contactNumber: "",
    skills: [""],
    projects: [{ projectName: "", aboutProject: "", technologies: "" }],
    experiences: [{ companyName: "", role: "", startDate: "", endDate: "", description: "" }],
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const email = decoded.email;

      // Fetch the profile data based on email
      axios
        .get(`http://localhost:4000/profiles/get`, {
          params: { emailId: email },
        })
        .then((response) => {
          const profile = response.data.find((p) => p.emailId === email);
          if (profile) {
            setProfileData(profile);
          }
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...profileData.skills];
    updatedSkills[index] = value;
    setProfileData((prevData) => ({ ...prevData, skills: updatedSkills }));
  };

  const addSkillField = () => {
    setProfileData((prevData) => ({ ...prevData, skills: [...prevData.skills, ""] }));
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...profileData.projects];
    updatedProjects[index][field] = value;
    setProfileData((prevData) => ({ ...prevData, projects: updatedProjects }));
  };

  const addProjectField = () => {
    setProfileData((prevData) => ({ ...prevData, projects: [...prevData.projects, { projectName: "", aboutProject: "", technologies: "" }] }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...profileData.experiences];
    updatedExperiences[index][field] = value;
    setProfileData((prevData) => ({ ...prevData, experiences: updatedExperiences }));
  };

  const addExperienceField = () => {
    setProfileData((prevData) => ({ ...prevData, experiences: [...prevData.experiences, { companyName: "", role: "", startDate: "", endDate: "", description: "" }] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put("/profiles/update", profileData) // Adjust the endpoint as needed
      .then(() => {
        alert("Profile updated successfully!");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.heading}>Edit Profile</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            name="username"
            value={profileData.username}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Bio</label>
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
            style={styles.textarea}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={profileData.dateOfBirth}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email ID</label>
          <input
            type="email"
            name="emailId"
            value={profileData.emailId}
            onChange={handleChange}
            style={styles.input}
            required
            readOnly // Make it read-only if you don't want to allow changes
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={profileData.contactNumber}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Skills</label>
          {profileData.skills.map((skill, index) => (
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
          {profileData.projects.map((project, index) => (
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
          {profileData.experiences.map((exp, index) => (
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

        <button type="submit" style={styles.submitButton}>UPDATE</button>
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

export default EditProfile;