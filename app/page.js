"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [transmissionData, setTransmissionData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [programFilter, setProgramFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");

  // Fetch data from API on component mount
  useEffect(() => {
    fetch("/api/transmissions")
      .then((res) => res.json())
      .then(setTransmissionData)
      .catch(console.error);
  }, []);

  const filteredData = transmissionData.filter((row) => {
    const statusMatch = statusFilter === "all" || row.status === statusFilter;
    const programMatch =
      programFilter === "" ||
      row.program.toLowerCase().includes(programFilter.toLowerCase());
    const sourceMatch = sourceFilter === "all" || row.source === sourceFilter;

    return statusMatch && programMatch && sourceMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <header className="bg-gradient-to-r from-gray-900 to-blue-600 text-white p-8 text-center">
          <h1 className="text-4xl font-light mb-2">MMIS Transmission Dashboard</h1>
          <p className="opacity-80">Real-time monitoring of healthcare data transmissions</p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center p-6 border-b">
          <div>
            <label className="font-semibold text-gray-700 mr-2">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-40 p-2 border rounded"
            >
              <option value="all">All Statuses</option>
              <option value="LIVE">Live</option>
              <option value="UAT">UAT</option>
              <option value="STATE NOT READY">State Not Ready</option>
            </select>
          </div>
          <div>
            <label className="font-semibold text-gray-700 mr-2">Program:</label>
            <input
              placeholder="Filter by program..."
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="w-60 p-2 border rounded"
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700 mr-2">Source:</label>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-40 p-2 border rounded"
            >
              <option value="all">All Sources</option>
              {[...new Set(transmissionData.map((d) => d.source))].map(
                (source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* Transmission Table */}
        <div className="p-6 overflow-x-auto">
          <table className="w-full border-collapse shadow rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-gray-700 to-gray-900 text-white text-sm uppercase">
                <th className="p-3 text-left">Program</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Source</th>
                <th className="p-3 text-left">Destination</th>
                <th className="p-3 text-right">Received</th>
                <th className="p-3 text-right">Filtered</th>
                <th className="p-3 text-right">Submitted</th>
                <th className="p-3 text-right">Accepted</th>
                <th className="p-3 text-right">Errored</th>
                <th className="p-3 text-right">Rejected</th>
                <th className="p-3 text-right font-semibold">Total</th>
                <th className="p-3 text-right">Acceptance Rate</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 text-sm">
                  <td className="p-3 font-semibold">{row.program}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold inline-block min-w-[90px] text-center ${
                        row.status === "LIVE"
                          ? "bg-green-100 text-green-700"
                          : row.status === "UAT"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3">{row.source}</td>
                  <td className="p-3">{row.destination}</td>
                  <td className="p-3 text-right">{row.received}</td>
                  <td className="p-3 text-right">{row.filtered}</td>
                  <td className="p-3 text-right">{row.submitted}</td>
                  <td className="p-3 text-right">{row.accepted}</td>
                  <td className="p-3 text-right">{row.errored}</td>
                  <td className="p-3 text-right">{row.rejected}</td>
                  <td className="p-3 text-right font-semibold">{row.total}</td>
                  <td
                    className={`p-3 text-right font-bold ${
                      row.acceptanceRate >= 95
                        ? "text-green-600"
                        : row.acceptanceRate >= 80
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {row.acceptanceRate ? `${row.acceptanceRate}%` : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
