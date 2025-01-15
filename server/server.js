const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 

//Importing the User Schema
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

    const newProfile = new Profile({
      username: profileData.username,
      bio: profileData.bio,
      dateOfBirth: profileData.dateOfBirth,
      emailId: profileData.emailId,
      contactNumber: profileData.contactNumber,
      skills: profileData.skills,
      experiences: profileData.experiences,
      projects: profileData.projects,
    });

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
    const profiles = await Profile.find(); 
    res.status(200).json(profiles);
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


// Login Route with JWT
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

    // Generate JWT token
    const token = jwt.sign(
      {
        id: userDetail._id,
        name: userDetail.fullName,
        email: userDetail.email,
        contact: userDetail.contact,
        place: userDetail.place
      },
      'ADDY123@', 
      { expiresIn: '1h' } 
    );

    // Send token and connections as a response
    res.status(200).send({ token, userDetail, connections: userDetail.connections });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server Error" });
  }
});
// Connect/Disconnect User
app.post("/auth/connect", async (req, res) => {
  console.log("Received connect request:", req.body); // Log the request body
  const { userId, connect } = req.body;
  const userIdFromSession = req.body.currentUserId;

  try {
    let updatedUser;
    if (connect) {
      updatedUser = await Users.findByIdAndUpdate(
        userIdFromSession,
        { $addToSet: { connections: userId } }, // Add to connections
        { new: true } // Return the updated document
      );
    } else {
      updatedUser = await Users.findByIdAndUpdate(
        userIdFromSession,
        { $pull: { connections: userId } }, // Remove from connections
        { new: true } // Return the updated document
      );
    }
    
    if (updatedUser) {
      res.status(200).send({ message: connect ? "Connected successfully" : "Disconnected successfully", connections: updatedUser.connections });
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error updating connections:", err.message);
    res.status(500).send({ error: "Failed to update connections", details: err.message });
  }
});

// Fetch User Connections with Usernames
app.get('/auth/connections', async (req, res) => {
  const { email } = req.query;

  try {
    // Find the user by email and populate connections with profile data
    const userDetail = await Users.findOne({ email }).populate({
      path: 'connections',
      model: 'profile', // Reference to the Profile model
      select: 'username' // Only select the username field
    });

    if (!userDetail) {
      return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send({ connections: userDetail.connections });
  } catch (err) {
    console.error("Error fetching connections:", err.message);
    res.status(500).send({ error: "Failed to fetch connections", details: err.message });
  }
});


// Update Profile
app.put('/profiles/update', async (req, res) => {
  try {
    const profileData = req.body;

    if (!profileData.emailId) {
      return res.status(400).send({ error: "Email ID is required to update the profile." });
    }

    // Find the profile by email and update the fields
    const updatedProfile = await Profile.findOneAndUpdate(
      { emailId: profileData.emailId },
      {
        $set: {
          username: profileData.username,
          bio: profileData.bio,
          dateOfBirth: profileData.dateOfBirth,
          contactNumber: profileData.contactNumber,
          skills: profileData.skills,
          projects: profileData.projects,
          experiences: profileData.experiences,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedProfile) {
      return res.status(404).send({ error: "Profile not found for the given email ID." });
    }

    res.status(200).send({ message: "Profile updated successfully", profile: updatedProfile });
  } catch (err) {
    console.error("Error updating profile:", err.message);
    res.status(500).send({ error: "Failed to update profile", details: err.message });
  }
});


// Start the server
app.listen(port, () => console.log(`API running on port ${port}`));