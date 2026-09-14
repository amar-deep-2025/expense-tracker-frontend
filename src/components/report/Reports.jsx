import { useState } from "react";
import { toast } from "react-toastify";
import useReport from "../../hooks/download/useReport";
import "./css/Reports.css";
const Reports = () => {
  const [reportType, setReportType] = useState("summary");
  const [format, setFormat] = useState("excel");
  const [year, setYear] = useState(new Date().getFullYear());

  const {
    downloadSummary,
    downloadCategory,
    downloadFull,
    downloadMonthly,
    downloadYearly,
    downloadBudget,
    loading,
  } = useReport();

  const handleDownload = async () => {
    if (format === "pdf") {
      toast.info("PDF report is under development");
      return;
    }

    try {
      switch (reportType) {
        case "summary":
          await downloadSummary();
          break;

        case "category":
          await downloadCategory();
          break;

        case "full":
          await downloadFull();
          break;

        case "monthly":
          await downloadMonthly();
          break;

        case "yearly":
          await downloadYearly(year);
          break;

        case "budget":
          await downloadBudget();
          break;

        default:
          toast.error("Please select a valid report type");
          return;
      }

      toast.success("Report downloaded successfully");
    } catch (err) {
      console.error("Report download failed", err);
      toast.error("Failed to download report");
    }
  };

  return (
    <div className="reports-page">
      <div className="reports-header">
        <h2>Reports & Analytics</h2>
        <p>Generate and download your financial reports.</p>
      </div>

      <div className="reports-card">
        <h3>Download Reports</h3>

        <div className="reports-form">
          <div className="report-field">
            <label htmlFor="reportType">Report Type</label>

            <select
              id="reportType"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="summary">Summary</option>
              <option value="category">Category</option>
              <option value="full">Full</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="budget">Budget</option>
            </select>
          </div>

          <div className="report-field">
            <label htmlFor="format">Format</label>

            <select
              id="format"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <option value="excel">Excel</option>
              <option value="pdf">PDF</option>
            </select>
          </div>

          {reportType === "yearly" && (
            <div className="report-field">
              <label htmlFor="year">Year</label>

              <input
                id="year"
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
          )}

          <button
            className="report-download-button"
            type="button"
            onClick={handleDownload}
            disabled={loading}
          >
            {loading ? "Downloading..." : "Download Report"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
