import React, { useState } from 'react';
import { User, Search, X } from 'lucide-react';

const JobApplicantsList = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('applicants');
  const [applicants, setApplicants] = useState([
    { id: 1, name: 'Alex Johnson', avatar: 'AJ', role: 'Frontend Developer', shortlisted: false },
    { id: 2, name: 'Emma Wilson', avatar: 'EW', role: 'UX Designer', shortlisted: false },
    { id: 3, name: 'Michael Brown', avatar: 'MB', role: 'Backend Developer', shortlisted: false },
    { id: 4, name: 'Sophia Lee', avatar: 'SL', role: 'Product Manager', shortlisted: false },
    { id: 5, name: 'Daniel Kim', avatar: 'DK', role: 'Data Scientist', shortlisted: false },
    { id: 6, name: 'Olivia Garcia', avatar: 'OG', role: 'DevOps Engineer', shortlisted: false },
    { id: 7, name: 'Ethan Chen', avatar: 'EC', role: 'Mobile Developer', shortlisted: false },
    { id: 8, name: 'Ava Patel', avatar: 'AP', role: 'UI Designer', shortlisted: false },
    { id: 9, name: 'Noah Martinez', avatar: 'NM', role: 'Full Stack Developer', shortlisted: false },
    { id: 10, name: 'Isabella Taylor', avatar: 'IT', role: 'QA Engineer', shortlisted: false },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleShortlist = (id) => {
    setApplicants(applicants.map(applicant => 
      applicant.id === id ? { ...applicant, shortlisted: !applicant.shortlisted } : applicant
    ));
  };

  const filteredApplicants = applicants.filter(applicant => 
    (activeTab === 'applicants' ? !applicant.shortlisted : applicant.shortlisted) &&
    (applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     applicant.role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      maxWidth: '800px',
      height: '80%',
      backgroundColor: '#ffffff',
      borderRadius: '30px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>Job Applicants</h2>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            borderRadius: '10px',
          }}
        >
          <X />
        </button>
      </div>
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #e2e8f0',
      }}>
        <button
          onClick={() => setActiveTab('applicants')}
          style={{
            flex: 1,
            padding: '10px',
            border: 'none',
            background: activeTab === 'applicants' ? '#8804fc' : '#f3f4f6',
            color: activeTab === 'applicants' ? '#ffffff' : '#000000',
            cursor: 'pointer',
          }}
        >
          Applicants ({applicants.filter(a => !a.shortlisted).length})
        </button>
        <button
          onClick={() => setActiveTab('shortlisted')}
          style={{
            flex: 1,
            padding: '10px',
            border: 'none',
            background: activeTab === 'shortlisted' ? '#8804fc' : '#f3f4f6',
            color: activeTab === 'shortlisted' ? '#ffffff' : '#000000',
            cursor: 'pointer',
          }}
        >
          Shortlisted ({applicants.filter(a => a.shortlisted).length})
        </button>
      </div>
      
      {/* Search Bar */}
      <div style={{ padding: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
          <input
            type="text"
            placeholder="Search applicants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '4px',
              outline: 'none',
            }}
          />
          <Search style={{ padding: '10px', cursor: 'pointer' }} />
        </div>
      </div>

      <div style={{
        overflowY: 'auto',
        flex: 1,
        padding: '20px',
      }}>
        {filteredApplicants.map((applicant) => (
          <div
            key={applicant.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px',
              borderRadius: '8px',
              backgroundColor: '#f8fafc',
              marginBottom: '10px',
            }}
          >
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: '#8804fc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px',
            }}>
              {applicant.avatar ? (
                <img src={applicant.avatar} alt={applicant.name} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
              ) : (
                <User size={30} color="#ffffff" />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 500 }}>{applicant.name}</h3>
              <p style={{ margin: '5px 0 0', fontSize: '0.9rem', color: '#64748b' }}>{applicant.role}</p>
            </div>
            <div>
              <button
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  marginRight: '10px',
                  cursor: 'pointer',
                }}
              >
                Open
              </button>
              <button
                onClick={() => handleShortlist(applicant.id)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: applicant.shortlisted ? '#ef4444' : '#10b981',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                {applicant.shortlisted ? 'Revoke' : 'Shortlist'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobApplicantsList;