const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdf = require('pdf-parse');
const Groq = require('groq-sdk');
require('dotenv').config();

// Configure Multer (Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/analyze', upload.single('resume'), async (req, res) => {
    try {
        console.log("Analyzing resume with Groq...");

        if (!process.env.GROQ_API_KEY) {
            console.error("GROQ_API_KEY is missing in environment variables.");
            return res.status(500).json({ message: 'Server configuration error: Missing API Key' });
        }

        // Initialize Groq API
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

        if (!req.file) {
            console.error("No file received in request.");
            return res.status(400).json({ message: 'No file uploaded' });
        }

        console.log(`File received: ${req.file.originalname} (${req.file.size} bytes)`);

        // 1. Extract Text from PDF
        const dataBuffer = req.file.buffer;
        const pdfData = await pdf(dataBuffer);
        const resumeText = pdfData.text;

        console.log(`Text extracted length: ${resumeText?.length}`);

        if (!resumeText || resumeText.length < 50) {
            return res.status(400).json({ message: 'Resume text is too short or unreadable.' });
        }

        // 2. Analyse with Groq
        console.log("Sending to Groq...");

        const prompt = `
            You are an expert HR Manager. Analyze the following resume text.
            RETURN ONLY RAW JSON. DO NOT USE MARKDOWN.
            JSON Format:
            {
                "score": 85, 
                "summary": "Brief summary...",
                "strengths": ["Strength 1"],
                "improvements": ["Improvement 1"],
                "missingKeywords": ["Keyword 1"]
            }
            Resume Text:
            ${resumeText.substring(0, 5000)}
        `;

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant that analyzes resumes and returns JSON only."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.5,
            max_tokens: 1024,
            top_p: 1,
            stop: null,
            stream: false,
            response_format: { type: "json_object" }
        });

        console.log("Groq Response received.");

        const responseContent = completion.choices[0]?.message?.content;

        if (!responseContent) {
            throw new Error("Empty response from Groq");
        }

        // 3. Parse JSON response
        const analysis = JSON.parse(responseContent);

        res.json(analysis);

    } catch (error) {
        console.error('SERVER ERROR during resume analysis:', error);

        let message = 'Error analyzing resume';
        // Basic Groq error handling
        if (error.status === 429) {
            message = 'Groq API Rate limit exceeded. Please try again later.';
        } else if (error.status === 401) {
            message = 'Invalid Groq API Key.';
        }

        res.status(500).json({ message, error: error.message });
    }
});

module.exports = router;
