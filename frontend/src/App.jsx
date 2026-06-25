import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [company, setCompany] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleAnalyze = async () => {
    if (!company.trim()) {
      alert("Please enter a company name.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://investment-ai-agent.onrender.com/analyze",
        {
          company,
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
      alert("Unable to analyze company. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getDecisionClass = () => {
    if (!result) return "";

    const decision = result.final_decision.toLowerCase();

    if (decision.includes("invest")) return "invest";
    if (decision.includes("hold")) return "hold";

    return "avoid";
  };

  return (
    <div className="container">

      <div className="hero">

        <h1> AI Investment Research Agent</h1>

        <p>
          Powered by <span>React</span> • <span>LangChain</span> •{" "}
          <span>Gemini</span>
        </p>

      </div>

      <div className="search-box">

        <input
          type="text"
          placeholder="Search a company (Apple, Tesla, Meta...)"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <button
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

      </div>

      {history.length > 0 && (

        <div className="history-card">

          <h3>Recent Searches</h3>

          <div className="chips">

            {history.map((item, index) => (

              <span
                className="chip"
                key={index}
                onClick={() => setCompany(item)}
              >
                {item}
              </span>

            ))}

          </div>

        </div>

      )}

      {loading && (

        <div className="loading-card">

          <div className="loader"></div>

          <p>Analyzing investment opportunity...</p>

        </div>

      )}

      {result && (

        <>

          <div className="card">

            <h2>📊 Summary</h2>

            <p>{result.summary}</p>

          </div>

          <div className="grid">

            <div className="card">

              <h2>💪 Strengths</h2>

              <ul>

                {result.strengths.map((strength, index) => (

                  <li key={index}>{strength}</li>

                ))}

              </ul>

            </div>

            <div className="card">

              <h2>⚠️ Risks</h2>

              <ul>

                {result.risks.map((risk, index) => (

                  <li key={index}>{risk}</li>

                ))}

              </ul>

            </div>

          </div>

          <div className="card">

            <h2>📈 Investment Decision</h2>

            <div className={getDecisionClass()}>
              {result.final_decision}
            </div>

            <div className="confidence">

              Confidence Score

              <strong>{result.confidence}%</strong>

            </div>

            <h3>Reason</h3>

            <p>{result.reason}</p>

          </div>

        </>

      )}

    </div>
  );
}

export default App;