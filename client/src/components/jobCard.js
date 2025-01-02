import React, { useState, useEffect } from "react";
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
};

function JobCards() {
  const [jobs, setJobs] = useState([]);

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

  return (
    <div style={styles.cardsContainer}>
      {jobs.map((job, index) => (
        <div key={index} style={styles.card}>
          <div style={styles.cardHeader}>
            {job.positionName} - {job.companyName}
          </div>
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
      ))}
    </div>
  );
}

export default JobCards;
