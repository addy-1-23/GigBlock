const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs'); // Add bcrypt
const Users = require('./Users');

// Importing the Job schema
const Job = require('./Jobs');

// Importing the Profile schema
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

// Add Job
app.post("/jobs/add", async (req, res) => {
  const jobDetail = req.body;

  try {
    console.log("Received job detail:", jobDetail);

    const newJob = new Job(jobDetail);

    await newJob.save();

    console.log("Job saved to database:", newJob);

    res.status(201).send("Job added successfully");
  } catch (err) {
    console.error("Error saving job to database:", err.message);
    res.status(500).send({ error: "Failed to add job", details: err.message });
  }
});

// Add Profile
app.post('/profiles/add', async (req, res) => {
  try {
    const profileData = req.body;

    const newProfile = new Profile(profileData);
    await newProfile.save();

    res.status(201).send("Profile added successfully");
  } catch (err) {
    console.error("Error adding profile:", err.message);
    res.status(500).send({ error: "Failed to add profile", details: err.message });
  }
});

// Fetch Profiles
app.get('/profiles/get', async (req, res) => {
  try {
    const profiles = await Profile.find(); // Fetch all profiles
    res.status(200).send(profiles);
  } catch (err) {
    console.error("Error fetching profiles:", err.message);
    res.status(500).send({ error: "Failed to fetch profiles", details: err.message });
  }
});

// Fetch jobs
app.get('/jobs/get', async (req, res) => {
  try {
    const jobs = await Job.find(); // Fetch all jobs
    res.status(200).send(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err.message);
    res.status(500).send({ error: "Failed to fetch jobs", details: err.message });
  }
});


// Signup API
app.post("/auth/signup", async (req, res) => {
  const { email, password, fullName, username, contact, place } = req.body;

  if (!email || !password || !fullName || !username || !contact || !place) {
    return res.status(400).send({ message: "All fields are required!" });
  }

  try {
    const user_exist = await Users.findOne({ email });

    if (user_exist) {
      return res.status(409).send({ message: "The Email is already in use!" });
    }

    const encrypt_password = await bcrypt.hash(password, 10);
    const userDetail = { email, password: encrypt_password, fullName, username, contact, place };

    const result = await Users.create(userDetail);
    res.status(201).send({ message: "User Created Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server Error" });
  }
});

//Login 
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Email and password are required!" });
  }

  try {
    const userDetail = await Users.findOne({ email: email });

    if (!userDetail) {
      return res.status(404).send({ error: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, userDetail.password);

    if (!isPasswordValid) {
      return res.status(401).send({ error: "Invalid Password" });
    }

    res.status(200).send(userDetail);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server Error" });
  }
});

// Start the server
app.listen(port, () => console.log(`API running on port ${port}`));
