const extractJobDetails = require('./utils/aiExtractor');
const dotenv = require('dotenv');
dotenv.config();

// Use a simple, reliable URL for testing to rule out scraping issues
const testUrl = "https://www.google.com/about/careers/applications/jobs/results/";

const test = async () => {
    console.log("-----------------------------------------");
    console.log("Testing Gemini API Integration");
    console.log("Using API Key:", process.env.GEMINI_API_KEY ? "FOUND (Ends with " + process.env.GEMINI_API_KEY.slice(-4) + ")" : "MISSING");
    console.log("Testing URL:", testUrl);
    console.log("-----------------------------------------");

    try {
        const result = await extractJobDetails(testUrl);
        if (result) {
            console.log("✅ Success! Extraction Result:", result);
        } else {
            console.log("❌ Extraction returned null. check server logs for specific API error.");
        }
    } catch (error) {
        console.error("❌ Fatal Test Error:", error);
    }
};

test();
