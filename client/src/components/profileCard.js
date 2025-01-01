// ProfileCards.js
import React from 'react';

const styles = {
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px', // Maintain spacing between cards
    justifyContent: 'center', // Center the cards
    padding: '16px 0',
  },
  card: {
    flex: '1 1 calc(50% - 16px)', // Ensure two cards in a row with spacing
    maxWidth: 'calc(50% - 16px)', // Maintain consistent card size
    padding: '16px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    color: '#333',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginLeft: '16px', // Add margin from the left
  },
  cardHeader: {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#3b82f6',
  },
  cardField: {
    display: 'flex',
    flexDirection: 'column',
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

function App() {
    const profiles = [
      {
        username: 'john_doe',
        bio: 'Software engineer with a passion for coding and problem-solving.',
        dateOfBirth: '1990-05-15',
        email: 'john_doe@example.com',
        contact: '+1234567890',
        skills: ['JavaScript', 'React', 'Node.js'],
        experience: '3 years at TechCorp as a Full Stack Developer',
      },
      {
        username: 'jane_doe',
        bio: 'UI/UX designer with a focus on user-centric designs.',
        dateOfBirth: '1992-07-20',
        email: 'jane_doe@example.com',
        contact: '+9876543210',
        skills: ['Sketch', 'Figma', 'Adobe XD'],
        experience: '4 years at DesignHub as a Lead Designer',
      },
      {
        username: 'mark_smith',
        bio: 'Data scientist passionate about machine learning and AI.',
        dateOfBirth: '1988-09-12',
        email: 'mark_smith@example.com',
        contact: '+1122334455',
        skills: ['Python', 'TensorFlow', 'Pandas'],
        experience: '5 years at AIWorks as a Senior Data Scientist',
      },
    ];
  
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
                <div style={styles.cardValue}>{profile.dateOfBirth}</div>
              </div>
              <div style={styles.cardField}>
                <div style={styles.cardLabel}>Email</div>
                <div style={styles.cardValue}>{profile.email}</div>
              </div>
              <div style={styles.cardField}>
                <div style={styles.cardLabel}>Contact</div>
                <div style={styles.cardValue}>{profile.contact}</div>
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
    };
  

  export default App;




