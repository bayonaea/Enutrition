import { useState } from "react";
import {
  CheckCircle, AlertCircle, Clock, Filter, Search,
  Download, Eye, Edit3, Trash2, ChevronDown, RefreshCw,
  Shield, FileText, Activity
} from "lucide-react";
import { BackButton } from "../components/BackButton";

const records = [
  { id: "REC-2026-0041", household: "HH-2026-0391", region: "Region III", enumerator: "Maria Santos", date: "Apr 16, 2026", status: "clean", score: 98, issues: 0 },
  { id: "REC-2026-0042", household: "HH-2026-0392", region: "Region III", enumerator: "Maria Santos", date: "Apr 16, 2026", status: "needs_review", score: 74, issues: 3 },
  { id: "REC-2026-0043", household: "HH-2026-0393", region: "Region IV-A", enumerator: "Jose Reyes", date: "Apr 16, 2026", status: "clean", score: 95, issues: 0 },
  { id: "REC-2026-0044", household: "HH-2026-0394", region: "Region IX", enumerator: "Ana Lopez", date: "Apr 15, 2026", status: "rejected", score: 41, issues: 7 },
  { id: "REC-2026-0045", household: "HH-2026-0395", region: "Region IX", enumerator: "Ana Lopez", date: "Apr 15, 2026", status: "pending", score: 0, issues: 0 },
  { id: "REC-2026-0046", household: "HH-2026-0396", region: "BARMM", enumerator: "Sitti Abdulrahman", date: "Apr 15, 2026", status: "needs_review", score: 68, issues: 2 },
  { id: "REC-2026-0047", household: "HH-2026-0397", region: "BARMM", enumerator: "Sitti Abdulrahman", date: "Apr 14, 2026", status: "clean", score: 100, issues: 0 },
  { id: "REC-2026-0048", household: "HH-2026-0398", region: "Region X", enumerator: "Ben Cruz", date: "Apr 14, 2026", status: "clean", score: 92, issues: 1 },
];

const auditLogs = [
  { action: "Record validated", user: "System Auto-Validator", record: "REC-2026-0041", time: "Today 08:12", type: "validate" },
  { action: "Flag added: Outlier weight", user: "Validator Engine", record: "REC-2026-0042", time: "Today 08:13", type: "flag" },
  { action: "Record rejected", user: "Dr. Juana Reyes", record: "REC-2026-0044", time: "Today 09:41", type: "reject" },
  { action: "Data edit approved", user: "Maria Santos", record: "REC-2026-0048", time: "Today 10:05", type: "edit" },
  { action: "Batch export (CSV)", user: "System Admin", record: "All Region III", time: "Today 11:20", type: "export" },
];

export function DataManagement() {
  const [activeTab, setActiveTab] = useState<"records" | "validation" | "audit">("records");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = records.filter((r) => {
    const matchSearch = r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.household.toLowerCase().includes(search.toLowerCase()) ||
      r.region.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusBadge = (status: string) => {
    const map: Record<string, { bg: string; text: string; label: string }> = {
      clean: { bg: "bg-green-50", text: "text-green-700", label: "✓ Clean" },
      needs_review: { bg: "bg-yellow-50", text: "text-yellow-700", label: "⚠ Review" },
      rejected: { bg: "bg-red-50", text: "text-red-700", label: "✗ Rejected" },
      pending: { bg: "bg-gray-100", text: "text-gray-600", label: "○ Pending" },
    };
    const s = map[status] || map.pending;
    return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.bg} ${s.text}`}>{s.label}</span>;
  };

  const scoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    if (score > 0) return "text-red-600";
    return "text-gray-400";
  };

  const countByStatus = (s: string) => records.filter((r) => r.status === s).length;

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <BackButton />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-gray-900 text-xl font-bold">Data Management</h1>
          <p className="text-gray-500 text-sm mt-0.5">Validate, clean, and manage survey records</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50">
            <RefreshCw size={13} /> Refresh
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white rounded-lg" style={{ background: "#1E3A8A" }}>
            <Download size={13} /> Export CSV
          </button>
        </div>
      </div>

      {/* Quality Score Banner */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white flex-shrink-0" style={{ background: "conic-gradient(#10B981 0% 82%, #e5e7eb 82% 100%)", padding: "3px" }}>
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <span style={{ color: "#10B981" }}>82%</span>
              </div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Data Quality Score</div>
              <div className="text-xs text-gray-500">Based on current batch validation</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 sm:ml-auto text-sm">
            {[
              { label: "Clean", count: countByStatus("clean"), color: "text-green-600" },
              { label: "Needs Review", count: countByStatus("needs_review"), color: "text-yellow-600" },
              { label: "Rejected", count: countByStatus("rejected"), color: "text-red-600" },
              { label: "Pending", count: countByStatus("pending"), color: "text-gray-500" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className={`font-bold text-lg ${s.color}`}>{s.count}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {(["records", "validation", "audit"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
              activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "records" ? "📋 Records" : tab === "validation" ? "🔍 Validation" : "📜 Audit Logs"}
          </button>
        ))}
      </div>

      {activeTab === "records" && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by ID, household, region..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="clean">Clean</option>
                <option value="needs_review">Needs Review</option>
                <option value="rejected">Rejected</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["Record ID", "Household", "Region", "Enumerator", "Date", "Quality Score", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((rec) => (
                  <tr key={rec.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-600 whitespace-nowrap">{rec.id}</td>
                    <td className="px-4 py-3 text-xs font-medium text-gray-800 whitespace-nowrap">{rec.household}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{rec.region}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{rec.enumerator}</td>
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{rec.date}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {rec.score > 0 ? (
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${rec.score}%`,
                                background: rec.score >= 90 ? "#10B981" : rec.score >= 70 ? "#F59E0B" : "#EF4444"
                              }}
                            />
                          </div>
                          <span className={`text-xs font-semibold ${scoreColor(rec.score)}`}>{rec.score}%</span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{statusBadge(rec.status)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors"><Eye size={13} /></button>
                        <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-yellow-600 transition-colors"><Edit3 size={13} /></button>
                        <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Showing {filtered.length} of {records.length} records</span>
            <div className="flex gap-1">
              {[1, 2, 3, "..."].map((p, i) => (
                <button key={i} className={`px-2.5 py-1 rounded-lg ${p === 1 ? "bg-blue-600 text-white" : "hover:bg-gray-100 text-gray-600"}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "validation" && (
        <div className="space-y-3">
          {[
            { rule: "Missing required fields", description: "Check if all mandatory fields are filled", status: "pass", count: 941, affected: 0 },
            { rule: "Outlier detection — Weight", description: "Flag values outside ±3 SD of age-sex norms", status: "flagged", count: 941, affected: 3 },
            { rule: "Duplicate household entries", description: "Detect same household submitted multiple times", status: "pass", count: 941, affected: 0 },
            { rule: "GPS coordinate validation", description: "Verify coordinates fall within assigned barangay boundary", status: "warning", count: 941, affected: 12 },
            { rule: "Age-measurement consistency", description: "Validate measurements align with expected age ranges", status: "flagged", count: 941, affected: 5 },
            { rule: "Data completeness score", description: "Minimum 90% field completion rate required", status: "pass", count: 941, affected: 0 },
          ].map((rule, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-start gap-3">
              <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                rule.status === "pass" ? "bg-green-50" : rule.status === "flagged" ? "bg-red-50" : "bg-yellow-50"
              }`}>
                {rule.status === "pass" ? <CheckCircle size={16} className="text-green-500" /> :
                  rule.status === "flagged" ? <AlertCircle size={16} className="text-red-500" /> :
                  <Clock size={16} className="text-yellow-500" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-medium text-gray-900">{rule.rule}</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                    rule.status === "pass" ? "bg-green-50 text-green-700" :
                    rule.status === "flagged" ? "bg-red-50 text-red-700" :
                    "bg-yellow-50 text-yellow-700"
                  }`}>
                    {rule.status === "pass" ? "Passed" : rule.status === "flagged" ? `${rule.affected} Flagged` : `${rule.affected} Warnings`}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{rule.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "audit" && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 text-sm">Audit Trail</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {auditLogs.map((log, i) => (
              <div key={i} className="px-4 py-3 flex items-start gap-3 hover:bg-gray-50">
                <div className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs ${
                  log.type === "validate" ? "bg-green-50 text-green-600" :
                  log.type === "flag" ? "bg-yellow-50 text-yellow-600" :
                  log.type === "reject" ? "bg-red-50 text-red-600" :
                  log.type === "edit" ? "bg-blue-50 text-blue-600" :
                  "bg-gray-100 text-gray-500"
                }`}>
                  {log.type === "validate" ? <CheckCircle size={13} /> :
                    log.type === "flag" ? <AlertCircle size={13} /> :
                    log.type === "reject" ? <Trash2 size={13} /> :
                    log.type === "edit" ? <Edit3 size={13} /> :
                    <Download size={13} />}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800">{log.action}</div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    By <span className="font-medium text-gray-600">{log.user}</span> · {log.record} · {log.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
