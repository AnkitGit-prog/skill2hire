const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const extractJobDetails = require('../utils/aiExtractor');

// AI Extraction Route
router.post('/extract-info', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ message: 'URL is required' });

    try {
        const data = await extractJobDetails(url);
        if (data) res.json(data);
        else res.status(500).json({ message: 'Failed to extract data' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all jobs with optional search
router.get('/', async (req, res) => {
    try {
        const keyword = req.query.keyword ? {
            $or: [
                { title: { $regex: req.query.keyword, $options: 'i' } },
                { organization: { $regex: req.query.keyword, $options: 'i' } }
            ]
        } : {};

        const jobs = await Job.find({ ...keyword }).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single job
router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (job) res.json(job);
        else res.status(404).json({ message: 'Job not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create Job (Protected)
router.post('/', async (req, res) => {
    // Basic auth check placeholder (Middleware should be used in production)
    // For now, assuming frontend sends valid data
    try {
        const job = new Job(req.body);
        const createdJob = await job.save();
        res.status(201).json(createdJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update Job
router.put('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (job) {
            Object.assign(job, req.body);
            const updatedJob = await job.save();
            res.json(updatedJob);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete Job
router.delete('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (job) {
            await job.deleteOne();
            res.json({ message: 'Job removed' });
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
