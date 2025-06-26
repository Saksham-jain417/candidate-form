const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    portfolio: String,
    trigram: { type: String, required: true, unique: true },
    summary: String,
    education: {
        secondary: {
            school: String,
            board: String,
            year: String,
        },
        seniorSecondary: {
            school: String,
            board: String,
            year: String,
        },
        graduation: {
            degree: String,
            institution: String,
            year: String,
        },
        postGraduation: {
            degree: String,
            institution: String,
            year: String,
        }
    },
    experiences: [
        {
            designation: String,
            duration: String,
            company: String,
            summary: String,
            projects: [String],
        }
    ],
    projects: [
        {
            title: String,
            technologies: String,
            summary: String,
            link: String,
        }
    ],
    achievements: [String],
    linkedin: String,
    github: String
});

module.exports = mongoose.model('Candidate', candidateSchema);
