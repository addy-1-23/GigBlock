const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  positionName: { type: String, required: true },
  companyName: { type: String, required: true },
  aboutCompany: { type: String, required: true },
  jobDescription: { type: String, required: true },
  skillsetRequired: { type: [String], required: true },
  payRange: { type: String, required: true },
  workMode: { type: String, required: true },
  jobLocation: { type: String, required: true },
});


module.exports = mongoose.model('jobs', jobSchema);


