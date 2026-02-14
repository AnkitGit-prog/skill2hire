const axios = require('axios');
const cheerio = require('cheerio');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const extractJobDetails = async (url) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is missing in .env file");
        }

        // 1. Fetch HTML content
        console.log(`Fetching content from: ${url}`);
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        // 2. Clean up text using Cheerio
        const $ = cheerio.load(data);
        $('script').remove();
        $('style').remove();
        $('nav').remove();
        $('footer').remove();

        // Improve extraction by targeting main content areas if body is too generic
        const mainContent = $('main').text() || $('article').text() || $('div#content').text() || $('body').text();
        const textContent = mainContent.replace(/\s+/g, ' ').substring(0, 15000);

        console.log(`Extracted ${textContent.length} chars of text. sending to AI...`);

        // 3. Call Gemini API
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Using 'gemini-2.0-flash-001' as it is the current standard for free tier
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });

        const prompt = `
        Extract the following job details from the text below and return ONLY a valid JSON object.
        Do not include markdown formatting like \`\`\`json.
        
        Fields required:
        - title (Job Title)
        - organization (Company/Organization Name)
        - vacancies (Number of posts)
        - type (Govt or Private)
        - description (Short summary, max 200 chars)
        - lastDate (Application deadline)
        - qualification (Required education)
        - ageLimit (Age criteria)
        - salary (Pay scale)
        
        Text content:
        ${textContent}
        `;

        // Retry Logic Function
        const generateWithRetry = async (retries = 3, delay = 5000) => {
            try {
                return await model.generateContent(prompt);
            } catch (error) {
                const status = error.response?.status || error.status;
                if ((status === 429 || error.message.includes('429')) && retries > 0) {
                    console.warn(`Rate limit hit. Retrying in ${delay / 1000}s...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    return generateWithRetry(retries - 1, delay * 2);
                }
                throw error;
            }
        };

        const result = await generateWithRetry();
        const response = await result.response;
        const text = response.text();

        // Clean up markdown if present
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonString);

    } catch (error) {
        console.error("AI Extraction Error:", error.message);
        // Safe logging for API response errors
        if (error.response) {
            console.error("API Response Data:", JSON.stringify(error.response.data, null, 2));
        }

        // Return a mock object so the frontend doesn't break
        return {
            title: "Job Title (Auto-fill Failed)",
            organization: "Organization Name",
            vacancies: "0",
            type: "Private",
            description: "Could not extract details automatically. Please fill manually.",
            lastDate: "",
            qualification: "",
            ageLimit: "",
            salary: ""
        };
    }
};

module.exports = extractJobDetails;
