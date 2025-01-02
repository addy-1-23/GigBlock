import React, { useState, useEffect } from 'react';
import axios from "../axios"; 

const styles = {
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    justifyContent: 'center',
    padding: '16px',
  },
  card: {
    width: '300px',
    height: '400px',
    padding: '16px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    color: '#333',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    overflow: 'hidden',
  },
  cardContent: {
    flex: '1',
    overflowY: 'auto',
    paddingRight: '8px',
  },
  cardHeader: {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#3b82f6',
  },
  cardField: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '8px',
  },
  cardLabel: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#666',
  },
  cardValue: {
    fontSize: '16px',
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  skill: {
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '14px',
  },
};

function ProfileCards() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("/profiles/get");
        setProfiles(response.data);
      } catch (error) {
        console.error("Error fetching profiles:", error.message);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div style={styles.cardsContainer}>
      {profiles.map((profile, index) => (
        <div key={index} style={styles.card}>
          <div style={styles.cardHeader}>{profile.username}</div>
          <div style={styles.cardField}>
            <div style={styles.cardLabel}>Bio</div>
            <div style={styles.cardValue}>{profile.bio}</div>
          </div>
          <div style={styles.cardField}>
            <div style={styles.cardLabel}>Date of Birth</div>
            <div style={styles.cardValue}>
              {new Date(profile.dateOfBirth).toLocaleDateString()}
            </div>
          </div>
          <div style={styles.cardField}>
            <div style={styles.cardLabel}>Email</div>
            <div style={styles.cardValue}>{profile.emailId}</div>
          </div>
          <div style={styles.cardField}>
            <div style={styles.cardLabel}>Contact</div>
            <div style={styles.cardValue}>{profile.contactNumber}</div>
          </div>
          <div style={styles.cardField}>
            <div style={styles.cardLabel}>Skills</div>
            <div style={styles.skillsContainer}>
              {profile.skills.map((skill, idx) => (
                <div key={idx} style={styles.skill}>
                  {skill}
                </div>
              ))}
            </div>
          </div>
          <div style={styles.cardField}>
            <div style={styles.cardLabel}>Experience</div>
            <div style={styles.cardValue}>{profile.experience}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProfileCards;
