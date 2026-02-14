require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
    try {
        console.log("Testing Gemini API...");
        if (!process.env.GEMINI_API_KEY) {
            console.error("❌ No GEMINI_API_KEY found in .env");
            return;
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });

        const prompt = "Hello! Are you working?";
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("✅ Gemini Response:", text);
    } catch (error) {
        console.error("❌ Gemini API Error:", error.message);
        if (error.response) {
            console.error("Error details:", JSON.stringify(error.response, null, 2));
        }
    }
}

testGemini();
