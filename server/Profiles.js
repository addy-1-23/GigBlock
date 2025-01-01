const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  username: { type: String, required: true },
  bio: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  emailId: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  skills: { type: [String], required: true },
  certifications: [
    {
      certificationName: { type: String, required: true },
      certificationDate: { type: Date, required: true },
      document: { type: String, required: true },
    },
  ],
  experience: { type: String, required: true },
});

module.exports = mongoose.model('profile', profileSchema);

