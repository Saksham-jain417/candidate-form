const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');

// POST route to save form data
router.post('/', async (req, res) => {
    try {
        const newCandidate = new Candidate(req.body);
        await newCandidate.save();
        res.status(201).json({ message: 'Candidate data saved successfully!' });
    } catch (error) {
        console.error('Error saving candidate:', error.message);
        res.status(500).json({ message: 'Server error. Could not save candidate.' });
    }
});

module.exports = router;
