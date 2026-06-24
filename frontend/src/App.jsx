import { useState } from "react";
import axios from "axios";

function App() {

  const [company, setCompany] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/analyze",
        {
          company: company
        }
      );

      setResult(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div>

      <h1>AI Investment Research Agent</h1>

      <input
        type="text"
        placeholder="Enter company name"
        value={company}
        onChange={(event) => setCompany(event.target.value)}
      />

      <button onClick={handleAnalyze}>
        Analyze
      </button>

      {
        loading && <p>Analyzing...</p>
      }

      <p>Company: {company}</p>

      {
        result && (
          <div>

            <h2>Summary</h2>
            <p>{result.summary}</p>

            <h2>Strengths</h2>
            <ul>
              {
                result.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))
              }
            </ul>

            <h2>Risks</h2>
            <ul>
              {
                result.risks.map((risk, index) => (
                  <li key={index}>{risk}</li>
                ))
              }
            </ul>

            <h2>Final Decision</h2>
            <p>{result.final_decision}</p>

            <h2>Confidence</h2>
            <p>{result.confidence}</p>

            <h2>Reason</h2>
            <p>{result.reason}</p>

          </div>
        )
      }

    </div>
  );
}

export default App;