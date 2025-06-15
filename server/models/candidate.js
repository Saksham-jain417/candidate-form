const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    portfolio: String,
    experience: String,
    projects: String,
    linkedin: String,
    achievements: [String],
    certifications: String
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
