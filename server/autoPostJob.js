const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');

dotenv.config();

const newJob = {
    title: "AI Researcher - Machine Learning",
    organization: "DeepMind India",
    type: "Private",
    vacancies: "5",
    description: "We are looking for research scientists to work on AGI. Experience with PyTorch and Transformers required.",
    notificationLink: "https://deepmind.google/careers/",
    applyLink: "https://deepmind.google/careers/",
    category: "Latest Jobs",
    isFeatured: true,
    qualification: "PhD in CS/AI",
    salary: "₹30 LPA - ₹50 LPA",
    ageLimit: "No limit",
    lastDate: "2026-03-31"
};

const postJob = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const job = new Job(newJob);
        await job.save();

        console.log('✅ Job Posted Successfully!');
        console.log('Title:', job.title);
        console.log('Organization:', job.organization);

        mongoose.connection.close();
    } catch (error) {
        console.error('Error posting job:', error);
        process.exit(1);
    }
};

postJob();
