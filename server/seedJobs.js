const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');

dotenv.config();

const dummyJobs = [
    // Government Jobs
    {
        title: "SSC CGL 2026 Recruitment",
        organization: "Staff Selection Commission",
        type: "Govt",
        vacancies: "2500+",
        description: "Applications are invited for Combined Graduate Level Examination 2026. Posts include Assistant Section Officer, Inspector, etc.",
        notificationLink: "https://ssc.nic.in",
        applyLink: "https://ssc.nic.in",
        category: "Latest Jobs",
        isFeatured: true
    },
    {
        title: "RRB NTPC Phase 2 Exam",
        organization: "Railway Recruitment Board",
        type: "Govt",
        vacancies: "15000+",
        description: "RRB NTPC Phase 2 examination dates announced. Download admit card from official website.",
        notificationLink: "https://indianrailways.gov.in",
        applyLink: "https://indianrailways.gov.in",
        category: "Admit Card",
        isFeatured: false
    },
    {
        title: "UPSC Civil Services Prelims 2026",
        organization: "Union Public Service Commission",
        type: "Govt",
        vacancies: "1056",
        description: "Notification for Civil Services Preliminary Examination 2026. Last date to apply is 05 March 2026.",
        notificationLink: "https://upsc.gov.in",
        applyLink: "https://upsc.gov.in",
        category: "Latest Jobs",
        isFeatured: true
    },
    {
        title: "IBPS PO Grid Recruitment",
        organization: "Institute of Banking Personnel Selection",
        type: "Govt",
        vacancies: "4000",
        description: "Recruitment of Probationary Officers / Management Trainees in Participating Banks.",
        notificationLink: "https://ibps.in",
        applyLink: "https://ibps.in",
        category: "Latest Jobs",
        isFeatured: false
    },
    {
        title: "SBI Clerk 2025 Final Result",
        organization: "State Bank of India",
        type: "Govt",
        vacancies: "8000+",
        description: "State Bank of India has declared the final result for Junior Associates (Customer Support & Sales) Recruitment.",
        notificationLink: "https://sbi.co.in",
        applyLink: "https://sbi.co.in",
        category: "Results",
        isFeatured: false
    },

    // Private Jobs
    {
        title: "Software Engineer - Frontend",
        organization: "Tech Solutions Pvt Ltd",
        type: "Private",
        vacancies: "10",
        description: "Looking for experienced React.js developers. Salary up to 12 LPA. Remote option available.",
        notificationLink: "https://weworkremotely.com",
        applyLink: "https://linkedin.com",
        category: "Latest Jobs",
        isFeatured: true
    },
    {
        title: "Data Analyst Intern",
        organization: "Analytics India",
        type: "Private",
        vacancies: "25",
        description: "Internship opportunity for freshers with knowledge of Python and SQL. Stipend: ₹15,000/month.",
        notificationLink: "https://indeed.com",
        applyLink: "https://indeed.com",
        category: "Latest Jobs",
        isFeatured: false
    },
    {
        title: "Business Development Manager",
        organization: "Growth Hacking Corp",
        type: "Private",
        vacancies: "5",
        description: "Drive sales and business growth. MBA marketing preferred. Location: Bangalore.",
        notificationLink: "https://naukri.com",
        applyLink: "https://naukri.com",
        category: "Latest Jobs",
        isFeatured: false
    },
    {
        title: "HR Executive",
        organization: "PeopleFirst Consultants",
        type: "Private",
        vacancies: "2",
        description: "Handle recruitment and employee engagement. 2+ years experience required.",
        notificationLink: "https://linkedin.com",
        applyLink: "https://linkedin.com",
        category: "Latest Jobs",
        isFeatured: false
    },
    {
        title: "Content Writer (Freelance)",
        organization: "Media House",
        type: "Private",
        vacancies: "Multiple",
        description: "Write engaging content for blogs and social media. Pay per word basis.",
        notificationLink: "https://upwork.com",
        applyLink: "https://upwork.com",
        category: "Latest Jobs",
        isFeatured: false
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Optional: Clear existing jobs
        // await Job.deleteMany({}); 

        await Job.insertMany(dummyJobs);
        console.log('Dummy jobs added successfully!');

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedDB();
