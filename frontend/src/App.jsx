import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [company, setCompany] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleAnalyze = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "https://investment-ai-agent.onrender.com/analyze",
        {
          company: company,
        }
      );

      setResult(response.data);

      setHistory((prevHistory) => {

  const filteredHistory = prevHistory.filter(
    (item) => item.toLowerCase() !== company.toLowerCase()
  );

  return [company, ...filteredHistory];

});

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getDecisionClass = () => {
    if (!result) return "";

    const decision = result.final_decision.toLowerCase();

    if (decision.includes("invest")) {
      return "invest";
    }

    if (decision.includes("hold")) {
      return "hold";
    }

    return "avoid";
  };

  return (
    <div className="container">
      <h1 className="title">AI Investment Research Agent</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter company name"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />

        <button onClick={handleAnalyze}>
          Analyze
        </button>
      </div>

      {loading && <p className="loading">Analyzing...</p>}

      {history.length > 0 && (
        <div className="card">
          <h2>Recent Searches</h2>

          <ul>
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {result && (
        <div className="card">
          <h2>Summary</h2>
          <p>{result.summary}</p>

          <h2>Strengths</h2>
          <ul>
            {result.strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>

          <h2>Risks</h2>
          <ul>
            {result.risks.map((risk, index) => (
              <li key={index}>{risk}</li>
            ))}
          </ul>

          <h2>Final Decision</h2>
          <p className={getDecisionClass()}>
            {result.final_decision}
          </p>

          <h2>Confidence</h2>
          <p>{result.confidence}% Confidence</p>

          <h2>Reason</h2>
          <p>{result.reason}</p>
        </div>
      )}
    </div>
  );
}

export default App;