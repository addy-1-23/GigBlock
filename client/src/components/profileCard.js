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
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16px',
    gap: '8px',
  },
  paginationButton: {
    padding: '8px 16px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  paginationText: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
  },
  arrow: {
    fontSize: '20px',
  },
};

function ProfileCards() {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(6); // Default to 6 cards per page

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

  // Calculate total pages
  const totalPages = Math.ceil(profiles.length / cardsPerPage);

  // Handle the current profiles to show based on page
  const currentProfiles = profiles.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle change in cards per page
  const handleCardsPerPageChange = (event) => {
    setCardsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when changing cards per page
  };

  return (
    <div>
      <div style={styles.cardsContainer}>
        {currentProfiles.map((profile, index) => (
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

      <div style={styles.pagination}>
        <select onChange={handleCardsPerPageChange} value={cardsPerPage}>
          <option value={6}>6 per page</option>
          <option value={9}>9 per page</option>
          <option value={12}>12 per page</option>
        </select>
        <button
          style={styles.paginationButton}
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          <span style={styles.arrow}>«</span>
        </button>
        <button
          style={styles.paginationButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span style={styles.arrow}>←</span>
        </button>
        <div style={styles.paginationText}>
          {currentPage} of {totalPages}
        </div>
        <button
          style={styles.paginationButton}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span style={styles.arrow}>→</span>
        </button>
        <button
          style={styles.paginationButton}
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <span style={styles.arrow}>»</span>
        </button>
      </div>
    </div>
  );
}

export default ProfileCards;
