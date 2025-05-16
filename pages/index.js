import { useState } from "react";

export default function Home() {
  const [vertex, setVertex] = useState("");
  const [workflow, setWorkflow] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setWorkflow("");

    const response = await fetch("/api/generate-workflow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vertex }),
    });

    const data = await response.json();
    setWorkflow(data.workflow || "No workflow returned.");
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>Compliance Workflow Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter compliance vertex (e.g. CMMC)"
          value={vertex}
          onChange={(e) => setVertex(e.target.value)}
          style={{ width: "100%", padding: 8, fontSize: 16 }}
          required
        />
        <button type="submit" disabled={loading} style={{ marginTop: 10 }}>
          {loading ? "Generating..." : "Generate Workflow"}
        </button>
      </form>

      <pre style={{ whiteSpace: "pre-wrap", marginTop: 20 }}>
        {workflow}
      </pre>
    </div>
  );
}
