const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running");
});


const PORT = 5000;

app.post("/analyze", async (req, res) => {
    try {
        const company = req.body.company;

        const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});

        const prompt = `
Analyze ${company} as an investment.

Return ONLY valid JSON in this format:

{
"summary":"",
"strengths":[],
"risks":[],
"final_decision":"",
"confidence":0,
"reason":""
}
`;

        const result = await model.generateContent(prompt);

        const response = result.response.text();

const cleanedResponse = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

try {
    const data = JSON.parse(cleanedResponse);
    res.json(data);
}
catch {
    if (error.status === 429) {
    return res.status(429).json({
        error: "Quota exceeded. Try again later."
    });
}

if (error.status === 503) {
    return res.status(503).json({
        error: "Gemini servers are busy. Please retry."
    });
}

res.status(500).json({
    error: error.message
});
}

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Something went wrong"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});