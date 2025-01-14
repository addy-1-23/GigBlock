import { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Star, MessageCircle, Settings, Activity, Info, Home, FileText, Link, User, FilePlus, Moon, Briefcase, Sun, Users, X, MoreHorizontal, Inbox } from 'lucide-react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom'; 
import JobApplicantsList from '../components/jobApp';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MessageBox } from '../components/messagebox'; // Update this import


export default function Dashboard() {
  const [isDark, setIsDark] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [isMoon, setIsMoon] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null); // State for uploaded file
  const [isConnectionsOpen, setIsConnectionsOpen] = useState(false); // State for connections popup
  const [connections, setConnections] = useState([]); // State for connections
  const [sentRequests, setSentRequests] = useState({}); // State to track sent requests
  const [showRequestButton, setShowRequestButton] = useState({}); // State to track visibility of request buttons
  const [isApplicantsListOpen, setIsApplicantsListOpen] = useState(false); // State for job applicants list
  const [applicants, setApplicants] = useState([]); // State for applicants data
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(false); // New state for message box

  // Sample applicants data
  const sampleApplicants = [
    { id: 1, name: 'Alice Johnson', avatar: '' },
    { id: 2, name: 'Bob Smith', avatar: '' },
    { id: 3, name: 'Charlie Brown', avatar: '' },
    // Add more sample applicants as needed
  ];

  const handleProfileImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setProfileImage(e.target.result);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file.name); // Store the uploaded file name
      setIsDialogOpen(false);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleSendRequest = (connectionId) => {
    setSentRequests((prev) => ({ ...prev, [connectionId]: true }));
    setShowRequestButton((prev) => ({ ...prev, [connectionId]: false })); // Hide the button after sending
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: isDark ? '#0f172a' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',
      fontFamily: 'Inter, sans-serif',
    },
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
    },
    addButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#343840',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      marginBottom: '24px',
      transition: 'background-color 0.2s',
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
      transition: 'background-color 0.2s',
      height: '50px',
      fontSize: '16px',
    },
    main: {
      marginLeft: '260px',
      padding: '40px',
      width: 'calc(100% - 240px)',
    },
    profileSection: {
      marginBottom: '30px',
    },
    profileHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '24px',
    },
    avatar: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      backgroundColor: isDark ? '#8804fc' : '#8804fc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '48px',
      fontWeight: 600,
      cursor: 'pointer',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      border: `2px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
      color: isDark ? '#ffffff' : '#ffffff',
    },
    profileInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      flex: 1,
    },
    profileName: {
      fontSize: '24px',
      fontWeight: 600,
    },
    profileDetail: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
      marginBottom: '32px',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '24px',
    },
    statCard: {
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      border: `1px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    infoItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: isDark ? '#94a3b8' : '#64748b',
      marginBottom: '12px',
      padding: '16px',
      borderRadius: '8px',
      transition: 'all 0.2s',
      cursor: 'pointer',
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      border: `1px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
    },
    rating: {
      display: 'flex',
      gap: '4px',
      color: '#fbbf24',
    },
    graphsGrid: {
      display: 'grid',
      gap: '24px',
    },
    graphRow: {
      display: 'flex',
      gap: '24px',
      marginBottom: '24px',
    },
    graphCard: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      borderRadius: '12px',
      border: `1px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
      overflow: 'hidden',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    graphContent: {
      flex: 1,
      padding: '24px',
    },
    graphDetails: {
      flex: 1,
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    card: {
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      borderRadius: '12px',
      border: `1px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
      overflow: 'hidden',
      marginBottom: '24px',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    cardHeader: {
      padding: '24px 24px 0',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: 600,
      marginBottom: '8px',
    },
    cardContent: {
      padding: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    tabs: {
      display: 'flex',
      flexDirection: 'column',
    },
    tabsList: {
      display: 'flex',
      borderBottom: `1px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
      marginBottom: '20px',
      marginLeft: '280px',
    },
    tabsTrigger: {
      padding: '12px 24px',
      cursor: 'pointer',
      borderBottom: '2px solid transparent',
      transition: 'all 0.2s',
    },
    activeTabsTrigger: {
      borderBottomColor: '#3b82f6',
    },
    tabsContent: {
      display: 'none',
    },
    activeTabsContent: {
      display: 'block',
      marginLeft: '17px',
      width: '1000px'
    },
    chartContainer: {
      width: '100%',
      height: '300px',
    },
    circularButtonContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)', // Adjusted to 5 columns for 5 buttons
      gap: '25px',
      marginTop: '30px',
      marginRight: '100px',
    },
    circularButton: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#8804fc',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s, transform 0.2s, box-shadow 0.2s',
    },
    dialog: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    dialogContent: {
      width: '300px',
      height: '300px',
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      borderRadius: '12px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    documentLogo: {
      width: '100px',
      height: '100px',
      backgroundColor: '#8804fc',
      borderRadius: '12px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '20px',
    },
    connectionsPopup: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#E6E6FA', // Light purple background
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      zIndex: 1000,
      maxHeight: '6000px', // Increased height for more cards
      overflowY: 'auto',
      height: '400px', // Fixed height for scroll
      width: '300px', // Fixed width
    },
    connectionCard: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      marginBottom: '10px',
      backgroundColor: '#ffffff',
      transition: 'background-color 0.2s',
    },
    connectionAvatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#8804fc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      fontWeight: 'bold',
      marginRight: '10px',
    },
    sendRequestButton: {
      padding: '6px 12px',
      borderRadius: '4px',
      backgroundColor: '#4ade80',
      color: '#ffffff',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    sentButton: {
      backgroundColor: '#34d399',
      color: '#ffffff',
    },
  };

  const skills = [
    "JavaScript", "React", "Node.js", "Python", "TypeScript", "GraphQL", 
    "Docker", "AWS", "MongoDB", "SQL", "Git", "CI/CD", "Agile", "TDD",
    "UI/UX Design", "RESTful APIs", "Microservices", "Kubernetes", "Machine Learning"
  ];

  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    contact: '',
    place: '',
  });
  const [userBio, setUserBio] = useState(''); // New state for bio

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserData({
        fullName: decoded.name,
        email: decoded.email,
        contact: decoded.contact,
        place: decoded.place,
      });

      // Fetch the bio from the backend
      axios
        .get(`http://localhost:4000/profiles/get`, {
          params: { email: decoded.email }, // Pass email as a query parameter
        })
        .then((response) => {
          const profile = response.data.find((p) => p.emailId === decoded.email);
          setUserBio(profile?.bio || 'Bio not available'); // Update bio or show fallback text
        })
        .catch((error) => {
          console.error('Error fetching bio:', error);
        });
    
      // Mock connections data with 20 connections
      setConnections([
        { id: 1, name: 'John Doe', avatar: 'JD' },
        { id: 2, name: 'Jane Smith', avatar: 'JS' },
        { id: 3, name: 'Alice Johnson', avatar: 'AJ' },
        { id: 4, name: 'Bob Brown', avatar: 'BB' },
        { id: 5, name: 'Charlie Davis', avatar: 'CD' },
        { id: 6, name: 'Emily Clark', avatar: 'EC' },
        { id: 7, name: 'Frank Harris', avatar: 'FH' },
        { id: 8, name: 'Grace Lee', avatar: 'GL' },
        { id: 9, name: 'Henry Walker', avatar: 'HW' },
        { id: 10, name: 'Isabella Hall', avatar: 'IH' },
        { id: 11, name: 'Jack Wilson', avatar: 'JW' },
        { id: 12, name: 'Liam Martinez', avatar: 'LM' },
        { id: 13, name: 'Mia Anderson', avatar: 'MA' },
        { id: 14, name: 'Noah Thomas', avatar: 'NT' },
        { id: 15, name: 'Olivia Taylor', avatar: 'OT' },
        { id: 16, name: 'Parker Moore', avatar: 'PM' },
        { id: 17, name: 'Quinn Jackson', avatar: 'QJ' },
        { id: 18, name: 'Riley White', avatar: 'RW' },
        { id: 19, name: 'Sophia Harris', avatar: 'SH' },
        { id: 20, name: 'Tyler Lewis', avatar: 'TL' },
      ]);
    }
  }, []);

  const navigate = useNavigate(); 

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          <div style={styles.logoIcon}>V</div>
          <span>Vyuha</span>
        </div>

        <button 
          style={styles.addButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2044b4'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#343840'
          }}
        >
          + Add New
        </button>

        <nav style={styles.navSection}>
          <div style={styles.navLabel}>PAGES</div>
          {[
            { icon: Home, label: 'Home' },
            { icon: FileText, label: 'Contract'},
            { icon: Link, label: 'Connect'},
            { icon: User, label: 'Profile' },
            { icon: MessageCircle , label: 'Chat' },
            { icon: Settings , label: 'Settings' },
          ].map((item) => (
            <button
              key={item.label}
              style={{
                ...styles.navButton,
                backgroundColor: item.label === 'Home' ? '#8804fc' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (item.label !== 'Home') {
                  e.currentTarget.style.backgroundColor = '#E6E6FA';
                  e.currentTarget.style.color = '#8804fc';
                }
              }}
              onMouseLeave={(e) => {
                if (item.label !== 'Home') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#ffffff';
                }
              }}
              onClick={() => {
                if (item.label === 'Contract') {
                  navigate('/contract'); // Navigate to /contract
                } else if (item.label === 'Profile') {
                  navigate('/profile'); // Navigate to /profile
                } else if (item.label === 'Connect') {
                  navigate('/connect'); // Navigate to /connect
                } else {
                  navigate(`/${item.label.toLowerCase()}`); // Default navigation for other labels
                }
              }}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main style={styles.main}>
        <div style={{
          ...styles.card,
          ':hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }
        }}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Profile</h2>
          </div>
          <div style={styles.cardContent}>
            <div style={styles.profileHeader}>
              <div 
                style={{
                  ...styles.avatar,
                  ...(profileImage ? { backgroundImage: `url(${profileImage})` } : {}),
                }}
                onClick={handleProfileImageClick}
              >
                {!profileImage && 'T'}
              </div>
              <div style={styles.profileInfo}>
                <h2 style={styles.profileName}>{userData.fullName}</h2>
                <div style={styles.rating}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="#fbbf24" />
                  ))}
                </div>
                <div style={{...styles.profileDetail, color: '#4ade80'}}>{userBio}</div>
                <div style={{...styles.profileDetail,color: `${isDark ? '#ffffff' : '#000000'}`}}>
                  <Users size={16} />
                  <span onClick={() => setIsConnectionsOpen(true)} style={{ cursor: 'pointer' }}>Connections: 299</span>
                </div> 
              </div>
            </div>
            {/* Circular Buttons on the right side */}
            <div style={styles.circularButtonContainer}>
              <button 
                style={styles.circularButton} 
                onClick={() => {
                  setIsMoon(!isMoon);
                  setIsDark(!isDark); // Toggle dark mode
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)'; // Scale up on hover
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Add shadow on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'; // Reset scale
                  e.currentTarget.style.boxShadow = 'none'; // Remove shadow
                }}
              >
                {isMoon ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button 
                style={styles.circularButton} 
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)'; // Scale up on hover
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Add shadow on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'; // Reset scale
                  e.currentTarget.style.boxShadow = 'none'; // Remove shadow
                }}
              >
                <FileText size={20} />
              </button>
              <button 
                style={styles.circularButton} 
                onClick={() => setIsDialogOpen(true)} // Open the upload dialog
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)'; // Scale up on hover
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Add shadow on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'; // Reset scale
                  e.currentTarget.style.boxShadow = 'none'; // Remove shadow
                }}
              >
                <FilePlus size={20} />
              </button>
              <button 
                style={styles.circularButton} 
                onClick={() => setIsMessageBoxOpen(true)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Inbox size={20} />
              </button>
              <button 
                style={styles.circularButton} 
                onClick={() => setIsApplicantsListOpen(true)} // Open the applicants list
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)'; // Scale up on hover
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Add shadow on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'; // Reset scale
                  e.currentTarget.style.boxShadow = 'none'; // Remove shadow
                }}
              >
                <Briefcase size={20} />
              </button>
            </div>
            <MessageBox isOpen={isMessageBoxOpen} onClose={() => setIsMessageBoxOpen(false)} /> {/* MessageBox component */}
            <div className="mt-8 flex flex-col gap-4">
              {/* First row of skills */}
              <div className="flex flex-wrap gap-3">
                {skills.slice(0, 7).map((skill) => (
                  <motion.div
                    key={skill}
                    className="bg-[#E6E6FA] px-4 py-2 rounded-full text-sm font-medium text-gray-700"
                    whileHover={{ y: -2, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    
                  </motion.div>
                ))}
              </div>
              {/* Second row of skills */}
              <div className="flex flex-wrap gap-3">
                {skills.slice(7, 14).map((skill) => (
                  <motion.div
                    key={skill}
                    className="bg-[#E6E6FA] px-4 py-2 rounded-full text-sm font-medium text-gray-700"
                    whileHover={{ y: -2, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                   
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Job Applicants List */}
        {isApplicantsListOpen && (
          <JobApplicantsList 
            applicants={sampleApplicants} 
            onClose={() => setIsApplicantsListOpen(false)} // Close the applicants list dialog
          />
        )}

        {/* Upload PDF Dialog */}
        {isDialogOpen && (
          <div style={styles.dialog}>
            <div style={styles.dialogContent}>
              <button 
                onClick={() => setIsDialogOpen(false)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: isDark ? '#ffffff' : '#000000',
                }}
              >
                <X size={20} />
              </button>
              <div style={styles.documentLogo}>
                <FilePlus size={40} color="#ffffff" />
              </div>
              <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                <p style={{ color: isDark ? '#ffffff' : '#000000', textAlign: 'center' }}>
                  Click the plus icon to upload a PDF
                </p>
              </label>
              <input 
                id="file-upload" 
                type="file" 
                accept=".pdf" 
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
            </div>
          </div>
        )}

        {/* Connections Popup */}
        {isConnectionsOpen && (
          <div style={styles.connectionsPopup}>
            <h3 style={{ marginBottom: '10px', fontWeight: 'bold' }}>Your Connections</h3>
            {connections.map((connection) => (
              <div key={connection.id} style={styles.connectionCard}>
                <div style={styles.connectionAvatar}>{connection.avatar}</div>
                <span>{connection.name}</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {showRequestButton[connection.id] && (
                    <button 
                      style={styles.sendRequestButton}
                      onClick={() => handleSendRequest(connection.id)}
                    >
                      {sentRequests[connection.id] ? 'SENT' : 'Send Team Request'}
                    </button>
                  )}
                  <MoreHorizontal 
                    size={20} 
                    onClick={() => setShowRequestButton((prev) => ({ ...prev, [connection.id]: !prev[connection.id] }))}
                    style={{ cursor: 'pointer', marginLeft: '10px' }} 
                  />
                </div>
              </div>
            ))}
            <button 
              onClick={() => setIsConnectionsOpen(false)}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: '#8804fc',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        )}

        <div style={{
          ...styles.card,
          ':hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }
        }}>
          <div style={styles.cardContent}>
            <div style={styles.tabs}>
              <div style={styles.tabsList}>
                <div 
                  style={{
                    ...styles.tabsTrigger,
                    ...(activeTab === 'info' ? styles.activeTabsTrigger : {}),
                  }}
                  onClick={() => setActiveTab('info')}
                >
                  Contact Information
                </div>
                <div 
                  style={{
                    ...styles.tabsTrigger,
                    ...(activeTab === 'stats' ? styles.activeTabsTrigger : {}),
                  }}
                  onClick={() => setActiveTab('stats')}
                >
                  Statistics
                </div>

                <div 
                  style={{
                    ...styles.tabsTrigger,
                    ...(activeTab === 'team' ? styles.activeTabsTrigger : {}),
                  }}
                  onClick={() => setActiveTab('team')}
                >
                  Team
                </div>
              </div>
              <div style={{
                ...styles.tabsContent,
                ...(activeTab === 'info' ? styles.activeTabsContent : {}),
              }}>
                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <Mail size={20} />
                    <span>{userData.email}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <Phone size={20} />
                    <span>{userData.contact}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <MapPin size={20} />
                    <span>{userData.place}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <Activity size={20} />
                    <span>Active since Jan 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </main>
    </div>
  );
}

