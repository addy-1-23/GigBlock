
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import axios from "../axios";

const styles = {
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    justifyContent: "center",
    padding: "16px",
  },
  card: {
    width: "300px",
    height: "400px",
    padding: "16px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    color: "#333",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    overflow: "hidden",
  },
  cardContent: {
    flex: "1",
    overflowY: "auto",
    paddingRight: "8px",
  },
  cardHeader: {
    fontWeight: "bold",
    fontSize: "18px",
    color: "#3b82f6",
  },
  cardField: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "8px",
  },
  cardLabel: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#666",
  },
  cardValue: {
    fontSize: "16px",
  },
  skillsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  skill: {
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "14px",
  },
  paginationControls: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "16px",
  },
  paginationButton: {
    padding: "8px",
    margin: "0 4px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const Button = ({ children, onClick, disabled, style }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      ...style,
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
    }}
  >
    {children}
  </button>
);

const Dialog = ({ isOpen, onClose, job }) => {
  const [file, setFile] = useState(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting application for', job.positionName, 'with file:', file);
    onClose();
  };

  return (
    <div style={{
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
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '500px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Apply for {job.positionName}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Upload your resume (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              style={{ display: 'block', width: '100%' }}
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!file}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '10px 15px',
              borderRadius: '4px',
              border: 'none',
              width: '100%',
            }}
          >
            Submit Application
          </Button>
        </form>
      </div>
    </div>
  );
};

export function JobCards() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const jobsPerPage = 9;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/jobs/get");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error.message);
      }
    };

    fetchJobs();
  }, []);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(jobs.length / jobsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div style={styles.cardsContainer}>
        {currentJobs.map((job, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.cardHeader}>
              {job.positionName} - {job.companyName}
            </div>
            <div style={styles.cardContent}>
              <div style={styles.cardField}>
                <div style={styles.cardLabel}>About Company</div>
                <div style={styles.cardValue}>{job.aboutCompany}</div>
              </div>
              <div style={styles.cardField}>
                <div style={styles.cardLabel}>Job Description</div>
                <div style={styles.cardValue}>{job.jobDescription}</div>
              </div>
              <div style={styles.cardField}>
                <div style={styles.cardLabel}>Skills Required</div>
                <div style={styles.skillsContainer}>
                  {job.skillsetRequired.map((skill, idx) => (
                    <div key={idx} style={styles.skill}>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div style={styles.cardField}>
                <div style={styles.cardLabel}>Pay Range</div>
                <div style={styles.cardValue}>{job.payRange}</div>
              </div>
              <div style={styles.cardField}>
                <div style={styles.cardLabel}>Work Mode</div>
                <div style={styles.cardValue}>{job.workMode}</div>
              </div>
              <div style={styles.cardField}>
                <div style={styles.cardLabel}>Location</div>
                <div style={styles.cardValue}>{job.jobLocation}</div>
              </div>
            </div>
            <Button
              onClick={() => handleApply(job)}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '10px 15px',
                borderRadius: '4px',
                border: 'none',
                width: '100%',
                marginTop: 'auto',
              }}
            >
              Apply Now
            </Button>
          </div>
        ))}
      </div>

      <div style={styles.paginationControls}>
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={styles.paginationButton}
        >
          <ChevronLeft size={24} />
        </Button>
        <span style={{ margin: '0 10px' }}>
          Page {currentPage} of {Math.ceil(jobs.length / jobsPerPage)}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(jobs.length / jobsPerPage)}
          style={styles.paginationButton}
        >
          <ChevronRight size={24} />
        </Button>
      </div>

      {selectedJob && (
        <Dialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          job={selectedJob}
        />
      )}
    </div>
  );
}

export default JobCards;