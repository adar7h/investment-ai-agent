# 🤖 AI Investment Research Agent

An AI-powered investment research platform that analyzes companies and provides investment recommendations using **Google Gemini**, **LangChain**, **React**, and **Node.js**.

---

## 🚀 Live Demo

Frontend:
https://investment-ai-agent-snowy.vercel.app/

Backend API:
https://investment-ai-agent.onrender.com/

---



## ✨ Features

- AI-powered company analysis
- Investment recommendation
- Confidence score
- Company strengths
- Risk analysis
- Search history
- Responsive dark UI
- Loading animation
- Error handling
- REST API integration

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Axios
- CSS

### Backend

- Node.js
- Express.js
- LangChain
- Google Gemini API
- dotenv
- CORS

### Deployment

- Vercel
- Render
- GitHub

---

## 📂 Project Structure

investment-ai-agent/

├── frontend/

│ ├── src/

│ ├── public/

│ └── package.json

│

├── backend/

│ ├── server.js

│ ├── .env

│ └── package.json

│

└── README.md

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/adar7h/investment-ai-agent.git
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm start
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
GEMINI_API_KEY=api_key
```

---

## 📡 API Endpoint

### POST /analyze

Request

```json
{
  "company":"Meta"
}
```

Response

```json
{
  "summary":"",
  "strengths":[],
  "risks":[],
  "final_decision":"",
  "confidence":90,
  "reason":""
}
```

---

## 🧠 How It Works

1. User enters a company name.
2. React sends a POST request to the Express backend.
3. Express calls LangChain.
4. LangChain interacts with the Gemini API.
5. Gemini returns structured JSON.
6. Backend sends the response to React.
7. React displays the investment report.

---

## 🌟 Future Improvements

- Authentication
- Stock price charts
- Financial statements
- News sentiment analysis
- PDF report generation
- Portfolio tracker

---

## 👨‍💻 Author

**Adarsh Aryan**

GitHub:
https://github.com/adar7h
