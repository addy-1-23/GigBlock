import React, { useState, useEffect } from 'react';
import axios from "../axios";
import { Home, FileText, Link, User, MessageCircle, Settings, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const styles = {
  // Original styles
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
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 20px rgba(0, 0, 0, 0.15)',
    },
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '15px',
    objectFit: 'cover',
  },
  cardHeaderText: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeaderName: {
    fontWeight: 'bold',
    fontSize: '22px',
    color: '#3c82f6', // Purple color
    marginBottom: '5px',
  },
  cardHeaderTitle: {
    fontSize: '14px',
    color: '#666',
  },
  cardField: {
    marginBottom: '16px',
  },
  cardLabel: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#000000',
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
    '& > div': {
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  skill: {
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '16px',
  },
  button: {
    padding: '10px 16px',
    backgroundColor: '#8000ff', 
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
    padding: '10px',
    backgroundColor: 'rgba(128, 0, 255, 0.6)', // Increased transparency
    color: '#fff',
    border: 'none',
    borderRadius: '50%', // Make it circular
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px', // Set a fixed width
    height: '40px', // Set a fixed height
    transition: 'background-color 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: 'rgba(128, 0, 255, 0.8)', // Slightly less transparent on hover
    },
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
    zIndex: 1000,
  },
  modalContent: {
    width: '450px',
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxHeight: '80vh',
    overflowY: 'auto',
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
    color: '#8000ff', // Purple color
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
    color: '#8000ff', // Purple color
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
    backgroundColor: '#8000ff', // Purple color
    borderRadius: '50%',
    position: 'absolute',
    left: '-6px',
  },
  timelineLine: {
    width: '2px',
    backgroundColor: '#8000ff', // Purple color
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
  // New styles for sidebar and layout
  container: {
    display: 'flex',
  },
  mainContent: {
    marginLeft: '240px',
    width: 'calc(100% - 240px)',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '0 24px',
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginRight: '10px',
  },
  searchButton: {
    padding: '10px',
    backgroundColor: 'transparent',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  // Sidebar styles
  sidebar: {
    width: '240px',
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: '24px',
    height: '100vh',
    position: 'fixed',
    overflowY: 'auto',
    left: 0,
    top: 0,
    fontFamily: 'Inter, sans-serif',
    transition: 'background-color 0.3s',
    zIndex: 1000,
  },
  sidebarLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '24px',
    fontSize: '30px',
    fontWeight: 600,
  },
  logoIcon: {
    width: '70px',
    height: '70px',
    backgroundColor: '#000000',
    color: '#ffffff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '30px',
    fontWeight: 600,
    marginLeft: '20px',
    transition: 'background-color 0.3s, color 0.3s',
  },
  addButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#343840',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '24px',
    transition: 'background-color 0.2s, transform 0.2s',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'Inter, sans-serif',
  },
  navSection: {
    marginBottom: '24px',
  },
  navLabel: {
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '12px',
    fontWeight: 600,
    letterSpacing: '10px',
    fontFamily: 'Inter, sans-serif',
  },
  navButton: {
    width: '100%',
    padding: '10px 12px',
    backgroundColor: 'transparent',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px',
    transition: 'background-color 0.2s, transform 0.2s',
    height: '50px',
    fontSize: '16px',
    fontFamily: 'Inter, sans-serif',
    '&:hover': {
      backgroundColor: '#9933ff', // Lighter shade of purple
    },
  },
};

function ProfileCardsWithSidebar() {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const cardsPerPage = 9;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split('.')[1]));
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("/profiles/get");
        const updatedProfiles = response.data.map((profile) => ({
          ...profile,
          connected: currentUser?.connections?.includes(profile._id),
        }));
        setProfiles(updatedProfiles);
      } catch (error) {
        console.error("Error fetching profiles:", error.message);
      }
    };

    fetchProfiles();
  }, [currentUser]);

  useEffect(() => {
    if (selectedProfile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProfile]);

  const filteredProfiles = profiles.filter(profile =>
    profile.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredProfiles.length / cardsPerPage);
  const currentProfiles = filteredProfiles.slice(
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

  const handleConnectClick = async (profileIndex) => {
    if (!currentUser) {
      console.error("User is not logged in");
      return;
    }
    const profile = filteredProfiles[profileIndex];
    const connect = !profile.connected;
  
    try {
      const response = await axios.post("/auth/connect", {
        userId: profile._id,
        connect: connect,
        currentUserId: currentUser.id,
      });
  
      if (response.data && response.data.connections) {
        setProfiles((prevProfiles) =>
          prevProfiles.map((p) =>
            p._id === profile._id
              ? { ...p, connected: connect }
              : { ...p, connected: response.data.connections.includes(p._id) }
          )
        );
      }
    } catch (error) {
      console.error("Error updating connection:", error);
    }
  };

  const handleAboutProfileClick = (profile) => {
    setSelectedProfile(profile);
  };

  const handleCloseModal = () => {
    setSelectedProfile(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // The search is already being handled by the filteredProfiles
    // This function is here in case you want to add any additional search functionality
  };

  const Sidebar = () => (
    <aside style={styles.sidebar}>
      <div style={styles.sidebarLogo}>
        <div style={styles.logoIcon}>V</div>
        <span>Vyuha</span>
      </div>

      <button 
          style={styles.addButton}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#2044b4'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#343840'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5v14" />
          </svg>
          Add New
        </button>

      <nav style={styles.navSection}>
        <div style={styles.navLabel}>PAGES</div>
        {[
          { icon: Home, label: 'Home' },
          { icon: FileText, label: 'Contract' },
          { icon: Link, label: 'Connect' },
          { icon: User, label: 'Profile' },
          { icon: MessageCircle, label: 'Chat' },
          { icon: Settings, label: 'Settings' },
        ].map((item) => (
          <button
                key={item.label}
                style={{
                  ...styles.navButton,
                  backgroundColor: item.label === 'Connect' ? 'rgb(132, 0, 255)' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (item.label !== 'Connect') {
                    e.currentTarget.style.backgroundColor = 'rgb(111, 39, 178)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (item.label !== 'Connect') {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
              >
                <item.icon size={20} />
                {item.label}
              </button>

        ))}
      </nav>
    </aside>
  );

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.mainContent}>
        <form onSubmit={handleSearch} style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by name or skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchButton}>
            <Search size={20} />
          </button>
        </form>

        <div style={styles.cardsContainer}>
          {currentProfiles.map((profile, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.cardHeader}>
              <img
                src={profile.avatar || "/placeholder.svg?height=50&width=50"}
                alt={profile.username + "'s avatar"}
                style={styles.avatar}
              />

                <div style={styles.cardHeaderText}>
                  <div style={styles.cardHeaderName}>{profile.username}</div>
                  <div style={styles.cardHeaderTitle}>{profile.title || "Professional"}</div>
                </div>
              </div>
              <div style={styles.cardField}>
                <div style={styles.cardLabel}>Bio</div>
                <div style={styles.cardValue}>{profile.bio || "N/A"}</div>
              </div>
              <div style={styles.cardField}>
                <div style={styles.cardLabel}>Skills</div>
                <div style={styles.skillsContainer}>
                  {profile.skills?.map((skill, idx) => (
                    <div key={idx} style={styles.skill}>
                      {skill}
                    </div>
                  )) || "N/A"}
                </div>
              </div>

              <div style={styles.buttonContainer}>
                <button
                  style={styles.button}
                  onClick={() => handleAboutProfileClick(profile)}
                >
                  About Profile
                </button>
                <button
                  style={{
                    ...styles.button,
                    backgroundColor: profile.connected ? "#4caf50" : "#8000ff", // Keep green for connected, change blue to purple
                    color: "white",
                  }}
                  onClick={() => handleConnectClick((currentPage - 1) * cardsPerPage + index)}
                >
                  {profile.connected ? "Connected" : "Connect"}
                </button>
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
            <ChevronLeft size={20} />
          </button>
          <div style={styles.paginationText}>
            Page {currentPage} of {totalPages}
          </div>
          <button
            style={styles.paginationButton}
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={20} />
          </button>
        </div>

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
                <span style={styles.modalValue}>
                  {selectedProfile.contactNumber}
                </span>
              </div>
              <div style={styles.modalField}>
                <span style={styles.modalLabel}>Skills:</span>
                <span style={styles.modalValue}>
                  {selectedProfile.skills?.join(", ") || "N/A"}
                </span>
              </div>

              {/* Experience Section */}
              <div style={styles.modalField}>
                <span style={styles.modalLabel}>Experience:</span>
                <div style={styles.timelineContainer}>
                  {selectedProfile.experiences?.map((exp, index) => (
                    <div key={index} style={styles.experienceItem}>
                      <div style={styles.timelineDot}></div>
                      <div style={styles.timelineLine}></div>
                      <div style={styles.experienceDate}>
                        {new Date(exp.startDate).toLocaleDateString()} -{" "}
                        {exp.endDate
                          ? new Date(exp.endDate).toLocaleDateString()
                          : "Present"}
                      </div>
                      <div style={styles.modalValue}>
                        <strong>{exp.companyName}</strong> - {exp.role}
                      </div>
                      <div style={styles.modalValue}>{exp.description}</div>
                    </div>
                  )) || <span style={styles.modalValue}>No experience added</span>}
                </div>
              </div>

              {/* Projects Section */}
              <div style={styles.modalField}>
                <span style={styles.modalLabel}>Projects:</span>
                <div style={{ marginTop: "10px" }}>
                  {selectedProfile.projects?.length > 0 ? (
                    selectedProfile.projects.map((project, index) => (
                      <div key={index} style={{ marginBottom: "20px" }}>
                        <div style={styles.cardValue}>
                          <strong>{project.projectName}</strong>
                        </div>
                        <div style={styles.modalValue}>{project.aboutProject}</div>
                        <div style={styles.modalValue}>
                          <strong>Technologies:</strong>{" "}
                          {project.technologies.join(", ")}
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
    </div>
  );
}

export default ProfileCardsWithSidebar;