const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');

// POST route to save or update form data
router.post('/', async (req, res) => {
    try {
        const { trigram } = req.body;

        if (!trigram) {
            return res.status(400).json({ message: 'Trigram is required.' });
        }

        const existingCandidate = await Candidate.findOne({ trigram });

        if (existingCandidate) {
            await Candidate.findOneAndUpdate({ trigram }, req.body);
        } else {
            const newCandidate = new Candidate(req.body);
            await newCandidate.save();
        }

        res.status(201).json({ message: 'Candidate data saved/updated successfully!' });
    } catch (error) {
        console.error('Error saving candidate:', error.message);
        res.status(500).json({ message: 'Server error. Could not save candidate.' });
    }
});

// ✅ GET route to fetch candidate data by trigram
router.get('/:trigram', async (req, res) => {
    try {
        const trigram = req.params.trigram.trim().toUpperCase();
        const candidate = await Candidate.findOne({ trigram });

        if (!candidate) {
            return res.status(404).json({ message: 'No candidate found for this trigram.' });
        }

        res.status(200).json(candidate);
    } catch (error) {
        console.error('Error fetching candidate:', error.message);
        res.status(500).json({ message: 'Server error. Could not fetch candidate.' });
    }
});

module.exports = router;
