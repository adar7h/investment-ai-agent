const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const express = require("express");
const cors = require("cors");
require("dotenv").config();


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

    const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0.2,
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

    const result = await model.invoke(prompt);

const response = result.content;

    const cleanedResponse = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("========== RAW RESPONSE ==========");
    console.log(cleanedResponse);
    console.log("==================================");

    try {
      const data = JSON.parse(cleanedResponse);

      res.json(data);

    } catch (error) {

      console.log("JSON PARSE ERROR:");
      console.log(error);

      res.status(500).json({
        error: "Invalid JSON returned by Gemini",
      });
    }

  } catch (error) {

    console.log("GEMINI ERROR:");
    console.log(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});