const Groq = require('groq-sdk');
require('dotenv').config();

async function testGroq() {
    console.log("Testing Groq API Connection...");

    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
        console.error("❌ Error: GROQ_API_KEY is not set in .env file.");
        console.log("Please get your key from https://console.groq.com/keys and add it to server/.env");
        return;
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: 'Say "Hello, Groq is working!"' }],
            model: 'llama-3.3-70b-versatile',
        });

        console.log("✅ Success! Response from Groq:");
        console.log(chatCompletion.choices[0]?.message?.content);
    } catch (error) {
        console.error("❌ API Error:", error.message);
    }
}

testGroq();
