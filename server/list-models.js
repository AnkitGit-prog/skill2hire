require('dotenv').config();
// Access the API key directly to test simple fetch if the library fails
const apiKey = process.env.GEMINI_API_KEY;

async function listModels() {
    try {
        console.log("Listing models via fetch...");
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Available Models:");
        data.models.forEach(m => console.log(`- ${m.name}`));
    } catch (error) {
        console.error("❌ Error listing models:", error.message);
    }
}

listModels();
