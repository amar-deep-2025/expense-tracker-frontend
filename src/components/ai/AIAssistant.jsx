import { useState } from "react";
import useAI from "../../hooks/ai/useAI";
import "./css/AIAssistant.css";

const AIAssistant = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);

  const { ask, loading, error } = useAI();

  const examples = [
    "How much did I spend?",
    "What is my highest expense category?",
    "How much did I spend this month?",
    "How can I reduce my expenses?",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const question = prompt.trim();

    if (!question || loading) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: question,
      },
    ]);

    setPrompt("");

    try {
      const result = await ask(question);

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: result,
        },
      ]);
    } catch (err) {
      // Error is handled through useAI
    }
  };

  const handleExampleClick = (question) => {
    setPrompt(question);
  };

  return (
    <div className="ai-page">
      <div className="ai-container">
        <div className="ai-header">
          <h2>AI Financial Assistant</h2>
          <p>Ask questions about your expenses and spending.</p>
        </div>

        <div className="ai-chat-box">
          <div className="ai-message ai-message-ai">
            <strong>AI Assistant</strong>
            <p>Hello! Ask me anything about your expenses and spending.</p>
          </div>

          {messages.map((message, index) => (
            <div
              key={index}
              className={`ai-message ${
                message.type === "user" ? "ai-message-user" : "ai-message-ai"
              }`}
            >
              <strong>
                {message.type === "user" ? "You" : "AI Assistant"}
              </strong>

              <p>{message.text}</p>
            </div>
          ))}

          {loading && (
            <div className="ai-message ai-message-ai">
              <strong>AI Assistant</strong>
              <p>Thinking...</p>
            </div>
          )}

          {error && <div className="ai-error">{error}</div>}
        </div>

        <div className="ai-examples">
          <h3>Example Questions</h3>

          <div className="ai-example-list">
            {examples.map((question, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleExampleClick(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        <form className="ai-input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ask something about your expenses..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
          />

          <button type="submit" disabled={loading || !prompt.trim()}>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;
