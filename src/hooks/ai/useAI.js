import { useState } from "react";
import { askAI } from "../../services/ai/aiService";

const useAI = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ask = async (prompt) => {
    try {
      setLoading(true);
      setError(null);

      const data = await askAI(prompt);
      setResponse(data);
      return data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to get AI response",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return {
    response,
    ask,
    loading,
    error,
  };
};
export default useAI;
