import { useState } from "react";
import { toast } from "react-toastify";
import useReport from "../../hooks/download/useReport";

const Reports = () => {
  const [reportType, setReportType] = useState("summary");
  const [format, setFormat] = useState("excel");
  const [year, setYear] = useState(new Date().getFullYear());

  const { downloadSummary, loading } = useReport();

  const handleDownload = async () => {
    if (reportType === "summary" && format === "excel") {
      try {
        await downloadSummary();
        toast.success("Summary report downloaded successfully");
      } catch (err) {
        console.error("Summary report download failed", err);
        toast.error("Failed to download summary report");
      }

      return;
    }

    if (format === "pdf") {
      toast.info("PDF report is under development");
      return;
    }

    toast.info(`${reportType} report download will be implemented next`);
  };

  return (
    <div>
      <h2>Reports & Analytics</h2>

      <div>
        <h3>Download Reports</h3>

        <div>
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

        <div>
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
          <div>
            <label htmlFor="year">Year</label>

            <input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
        )}

        <button type="button" onClick={handleDownload} disabled={loading}>
          {loading ? "Downloading..." : "Download Report"}
        </button>
      </div>
    </div>
  );
};

export default Reports;
