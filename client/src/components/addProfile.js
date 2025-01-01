import React, { useState } from "react";
import { FaPlus } from "react-icons/fa"; // For the "Add" icon
import axios from "../axios";

function AddProfileForm() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [emailId, setEmailId] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [skills, setSkills] = useState([""]);
  const [certifications, setCertifications] = useState([
    { certificationName: "", certificationDate: "", document: "" },
  ]);
  const [experience, setExperience] = useState("");

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
      case "experience":
        setExperience(value);
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

  const handleCertificationChange = (index, field, value) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index][field] = value;
    setCertifications(updatedCertifications);
  };

  const addCertificationField = () => {
    setCertifications([
      ...certifications,
      { certificationName: "", certificationDate: "", document: "" },
    ]);
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
      certifications,
      experience,
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
        setCertifications([{ certificationName: "", certificationDate: "", document: "" }]);
        setExperience("");
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
          <label style={styles.label}>Certifications</label>
          {certifications.map((certification, index) => (
            <div key={index} style={styles.skillsetContainer}>
              <input
                type="text"
                name={`certification_name_${index}`}
                value={certification.certificationName}
                onChange={(e) =>
                  handleCertificationChange(index, "certificationName", e.target.value)
                }
                style={styles.input}
                placeholder="Certification Name"
              />
              <input
                type="date"
                name={`certification_date_${index}`}
                value={certification.certificationDate}
                onChange={(e) =>
                  handleCertificationChange(index, "certificationDate", e.target.value)
                }
                style={styles.input}
              />
              <input
                type="text"
                name={`document_${index}`}
                value={certification.document}
                onChange={(e) =>
                  handleCertificationChange(index, "document", e.target.value)
                }
                style={styles.input}
                placeholder="Document URL"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addCertificationField}
            style={styles.addButton}
          >
            <FaPlus style={styles.addIcon} />
            Add Certification
          </button>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Experience</label>
          <input
            type="text"
            name="experience"
            value={experience}
            onChange={handleChange}
            style={styles.input}
            required
          />
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
    width: '100%',  // Ensures the input fields occupy the full width
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
    width: '100%',  // Ensures the textarea occupies the full width
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
