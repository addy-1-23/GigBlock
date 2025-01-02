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
  paginationControls: {
    display: "flex",
    justifyContent: "center",
    marginTop: "16px",
  },
  paginationButton: {
    padding: "8px 16px",
    margin: "0 4px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
  },
  select: {
    padding: "8px",
    borderRadius: "4px",
    margin: "0 4px",
  },
};

function JobCards() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(5);

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

  // Calculate the indices of the first and last job to be shown on the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (event) => {
    setJobsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page when items per page is changed
  };

  // Calculate total pages
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Handle first page
  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  // Handle last page
  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div style={styles.cardsContainer}>
        {currentJobs.map((job, index) => (
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

      <div style={styles.paginationControls}>
        <select
          style={styles.select}
          value={jobsPerPage}
          onChange={handleItemsPerPageChange}
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={15}>15 per page</option>
        </select>

        <div>
          <button
            onClick={handleFirstPage}
            style={styles.paginationButton}
            disabled={currentPage === 1}
          >
            &laquo;&laquo; First
          </button>
          <button
            onClick={handlePrevPage}
            style={styles.paginationButton}
            disabled={currentPage === 1}
          >
            &laquo; Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              style={styles.paginationButton}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            style={styles.paginationButton}
            disabled={currentPage === totalPages}
          >
            Next &raquo;
          </button>
          <button
            onClick={handleLastPage}
            style={styles.paginationButton}
            disabled={currentPage === totalPages}
          >
            Last &raquo;&raquo;
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCards;
