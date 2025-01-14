import React, { useState, useEffect } from 'react';
import axios from "../axios";

const styles = {
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    justifyContent: 'center',
    padding: '24px',
  },
  card: {
    width: '320px',
    height: 'auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    color: '#333',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontFamily: 'Arial, sans-serif',
  },
  cardHeader: {
    fontWeight: 'bold',
    fontSize: '22px',
    color: '#007bff',
    marginBottom: '10px',
  },
  cardField: {
    marginBottom: '16px',
  },
  cardLabel: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#555',
    marginBottom: '6px',
  },
  cardValue: {
    fontSize: '16px',
    color: '#333',
    lineHeight: '1.5',
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  skill: {
    backgroundColor: '#e3f2fd',
    color: '#0056b3',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    whiteSpace: 'nowrap',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '16px',
  },
  button: {
    padding: '10px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '24px',
    alignItems: 'center',
    gap: '16px',
  },
  paginationButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  paginationText: {
    fontSize: '18px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,  // Ensure it appears on top
  },
  modalContent: {
    width: '450px',
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxHeight: '80vh',
    overflowY: 'auto',  // Ensure the modal content is scrollable if it exceeds screen height
  },
  closeModalButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '16px',
  },
  modalHeader: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#007bff',
  },
  modalField: {
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '16px',
    color: '#555',
  },
  modalLabel: {
    fontWeight: 'bold',
    color: '#007bff',
    width: '30%',
    textAlign: 'right',
    paddingRight: '10px',
  },
  modalValue: {
    fontSize: '16px',
    color: '#333',
    wordBreak: 'break-word',
    textAlign: 'left',
    width: '65%',
  },
  timelineContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    paddingLeft: '20px',
    marginTop: '20px',
  },
  timelineDot: {
    width: '12px',
    height: '12px',
    backgroundColor: '#007bff',
    borderRadius: '50%',
    position: 'absolute',
    left: '-6px',
  },
  timelineLine: {
    width: '2px',
    backgroundColor: '#007bff',
    position: 'absolute',
    left: '5px',
    top: '12px',
    bottom: '0',
  },
  experienceItem: {
    position: 'relative',
    marginBottom: '30px',
    paddingLeft: '30px',
  },
  experienceDate: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '6px',
  },
};

function ProfileCards() {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const cardsPerPage = 9;

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

  useEffect(() => {
    if (selectedProfile) {
      // Prevent scrolling in the background when the modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Allow scrolling again when the modal is closed
      document.body.style.overflow = 'auto';
    }
  }, [selectedProfile]);

  const totalPages = Math.ceil(profiles.length / cardsPerPage);
  const currentProfiles = profiles.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      if (direction === "next" && prevPage < totalPages) return prevPage + 1;
      if (direction === "prev" && prevPage > 1) return prevPage - 1;
      return prevPage;
    });
  };

  const handleAboutProfileClick = (profile) => {
    setSelectedProfile(profile);
  };

  const handleCloseModal = () => {
    setSelectedProfile(null);
  };

  return (
    <div>
      <div style={styles.cardsContainer}>
        {currentProfiles.map((profile, index) => (
          <div key={index} style={styles.card}>
            <div>
              <div style={styles.cardHeader}>{profile.username}</div>
              <div style={styles.cardField}>
                <div style={styles.cardLabel}>Bio</div>
                <div style={styles.cardValue}>{profile.bio || "N/A"}</div>
              </div>
              <div style={styles.cardField}>
                <div style={styles.cardLabel}>Skills</div>
                <div style={styles.skillsContainer}>
                  {profile.skills?.map((skill, idx) => (
                    <div key={idx} style={styles.skill}>{skill}</div>
                  )) || "N/A"}
                </div>
              </div>

              <div style={styles.cardField}>
                <div style={styles.cardLabel}>Experience</div>
                <div style={styles.timelineContainer}>
                  {profile.experiences?.map((exp, idx) => (
                    <div key={idx} style={styles.experienceItem}>
                      <div style={styles.timelineDot}></div>
                      <div style={styles.timelineLine}></div>
                      <div style={styles.experienceDate}>
                        {new Date(exp.startDate).toLocaleDateString()} -{" "}
                        {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "Present"}
                      </div>
                      <div style={styles.cardValue}>
                        <strong>{exp.companyName}</strong> - {exp.role}
                      </div>
                    </div>
                  )) || "No experience added"}
                </div>
              </div>
            </div>

            <div style={styles.buttonContainer}>
              <button
                style={styles.button}
                onClick={() => handleAboutProfileClick(profile)}
              >
                About Profile
              </button>
              <button style={styles.button}>Connect</button>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.pagination}>
        <button
          style={styles.paginationButton}
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
        >
          ←
        </button>
        <div style={styles.paginationText}>
          Page {currentPage} of {totalPages}
        </div>
        <button
          style={styles.paginationButton}
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
        >
          →
        </button>
      </div>

      {/* Modal for profile details */}
      {selectedProfile && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>Profile Details</div>
            <div style={styles.modalField}>
              <span style={styles.modalLabel}>Username:</span>
              <span style={styles.modalValue}>{selectedProfile.username}</span>
            </div>
            <div style={styles.modalField}>
              <span style={styles.modalLabel}>Bio:</span>
              <span style={styles.modalValue}>{selectedProfile.bio}</span>
            </div>
            <div style={styles.modalField}>
              <span style={styles.modalLabel}>Email:</span>
              <span style={styles.modalValue}>{selectedProfile.emailId}</span>
            </div>
            <div style={styles.modalField}>
              <span style={styles.modalLabel}>Contact Number:</span>
              <span style={styles.modalValue}>{selectedProfile.contactNumber}</span>
            </div>
            <div style={styles.modalField}>
              <span style={styles.modalLabel}>Skills:</span>
              <span style={styles.modalValue}>
                {selectedProfile.skills?.join(", ") || "N/A"}
              </span>
            </div>

            {/* Experience Section with Timeline Effect */}
            <div style={styles.modalField}>
              <span style={styles.modalLabel}>Experience:</span>
              <div style={styles.timelineContainer}>
                {selectedProfile.experiences?.map((exp, index) => (
                  <div key={index} style={styles.experienceItem}>
                    <div style={styles.timelineDot}></div>
                    <div style={styles.timelineLine}></div>
                    <div style={styles.experienceDate}>
                      {new Date(exp.startDate).toLocaleDateString()} -{" "}
                      {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "Present"}
                    </div>
                    <div style={styles.modalValue}>
                      <strong>{exp.companyName}</strong> - {exp.role}
                    </div>
                    <div style={styles.modalValue}>{exp.description}</div>
                    <hr />
                  </div>
                )) || <span style={styles.modalValue}>No experience added</span>}
              </div>
            </div>

            {/* Projects Section */}
            <div style={styles.modalField}>
  <span style={styles.modalLabel}>Projects:</span>
  <div style={{ marginTop: '10px' }}>
    {selectedProfile.projects?.length > 0 ? (
      selectedProfile.projects.map((project, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <div style={styles.cardValue}>
            <strong>{project.projectName}</strong>
          </div>
          <div style={styles.modalValue}>{project.aboutProject}</div>
          <div style={styles.modalValue}>
            <strong>Technologies:</strong> {project.technologies.join(", ")}
          </div>
        </div>
      ))
    ) : (
      <span style={styles.modalValue}>No projects added</span>
    )}
  </div>
</div>

            <button style={styles.closeModalButton} onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileCards;