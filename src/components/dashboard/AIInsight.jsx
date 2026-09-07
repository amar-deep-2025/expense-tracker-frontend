import { Sparkles } from "lucide-react";
import "./css/AIInsight.css";

const AIInsight = ({ aiInsight }) => {
  if (!aiInsight) {
    return (
      <div className="ai-insight">
        <div className="ai-insight-header">
          <div className="ai-insight-icon">
            <Sparkles size={18} />
          </div>

          <h2 className="ai-insight-title">AI Insight</h2>
        </div>

        <p className="ai-insight-empty">AI insight data is not available.</p>
      </div>
    );
  }

  return (
    <div className="ai-insight">
      <div className="ai-insight-header">
        <div className="ai-insight-icon">
          <Sparkles size={18} />
        </div>

        <h2 className="ai-insight-title">AI Insight</h2>
      </div>

      <div className="ai-insight-content">
        <p className="ai-insight-text">{aiInsight}</p>
      </div>
    </div>
  );
};

export default AIInsight;
