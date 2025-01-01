const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Importing the Job schema
const Job = require('./Jobs');

//Importing profile schema
const Profile = require('./Profiles');

const app = express();
const port = 4000;

// Connecting MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Login', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Middleware
app.use(express.json());
app.use(cors());

// API creation
app.get('/', (req, res) => res.status(200).send("API RUNNING"));

// Add job
app.post("/jobs/add", async (req, res) => {
  const jobDetail = req.body;

  try {
    console.log("Received job detail:", jobDetail);

    // Create a new job instance
    const newJob = new Job(jobDetail);

    // Save the job to the database
    await newJob.save();

    console.log("Job saved to database:", newJob);

    res.status(201).send("Job added successfully");
  } catch (err) {
    console.error("Error saving job to database:", err.message);
    res.status(500).send({ error: "Failed to add job", details: err.message });
  }
});

//Add Profile
app.post('/profiles/add', async (req, res) => {
  try {
    const profileData = req.body;

    // Create a new Profile instance
    const newProfile = new Profile(profileData);

    // Save the profile to the database
    await newProfile.save();

    res.status(201).send("Profile added successfully");
  } catch (err) {
    console.error("Error adding profile:", err.message);
    res.status(500).send({ error: "Failed to add profile", details: err.message });
  }
});


// Start the server
app.listen(port, () => console.log("API rendered on port", port));
