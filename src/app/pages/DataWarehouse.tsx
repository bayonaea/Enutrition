import { useState } from "react";
import { Server, Archive, Tag, HardDrive, Database, Search, Download, Clock } from "lucide-react";

const datasets = [
  { name: "NNS 2024 - National", type: "Anthropometry", year: 2024, region: "National", version: "v3 Published", size: "284 MB", records: 145200, status: "published" },
  { name: "NNS 2024 - BARMM", type: "Dietary", year: 2024, region: "BARMM", version: "v2 Cleaned", size: "42 MB", records: 18400, status: "cleaned" },
  { name: "NNS 2023 - National", type: "Anthropometry", year: 2023, region: "National", version: "v3 Published", size: "276 MB", records: 138900, status: "published" },
  { name: "NNS 2022 - National", type: "Clinical", year: 2022, region: "National", version: "v3 Published", size: "265 MB", records: 131500, status: "archived" },
  { name: "NNS 2021 - National", type: "Anthropometry", year: 2021, region: "National", version: "v3 Published", size: "258 MB", records: 128200, status: "archived" },
  { name: "FNRI Diet Survey 2024", type: "Dietary", year: 2024, region: "National", version: "v1 Raw", size: "98 MB", records: 52000, status: "raw" },
];

export function DataWarehouse() {
  const [search, setSearch] = useState("");

  const filtered = datasets.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.type.toLowerCase().includes(search.toLowerCase())
  );

  const statusBadge = (status: string) => {
    const map: Record<string, { bg: string; text: string }> = {
      published: { bg: "bg-green-50", text: "text-green-700" },
      cleaned: { bg: "bg-blue-50", text: "text-blue-700" },
      raw: { bg: "bg-gray-100", text: "text-gray-600" },
      archived: { bg: "bg-purple-50", text: "text-purple-700" },
    };
    const s = map[status];
    return <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${s.bg} ${s.text}`}>{status}</span>;
  };

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-gray-900 text-xl font-bold">Data Warehouse</h1>
          <p className="text-gray-500 text-sm mt-0.5">Historical nutrition datasets, versioning & archiving</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white rounded-lg w-fit" style={{ background: "#1E3A8A" }}>
          <Database size={13} /> New Dataset
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Datasets", value: "48", icon: Database, color: "#1E3A8A" },
          { label: "Total Records", value: "2.4M+", icon: Server, color: "#10B981" },
          { label: "Storage Used", value: "1.8 TB", icon: HardDrive, color: "#F59E0B" },
          { label: "Archived", value: "31", icon: Archive, color: "#6366F1" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <s.icon size={16} style={{ color: s.color }} />
              <span className="text-xs text-gray-500">{s.label}</span>
            </div>
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Version Flow */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <h3 className="font-semibold text-gray-800 text-sm mb-4">Data Versioning Pipeline</h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {[
            { label: "v1 Raw", desc: "Field collected", color: "#94a3b8" },
            { label: "→", desc: "", color: "#cbd5e1", isArrow: true },
            { label: "v2 Cleaned", desc: "Validated & cleaned", color: "#F59E0B" },
            { label: "→", desc: "", color: "#cbd5e1", isArrow: true },
            { label: "v3 Published", desc: "Final release", color: "#10B981" },
            { label: "→", desc: "", color: "#cbd5e1", isArrow: true },
            { label: "v4 Archived", desc: "Long-term storage", color: "#6366F1" },
          ].map((step, i) =>
            step.isArrow ? (
              <div key={i} className="text-gray-300 text-xl flex-shrink-0">→</div>
            ) : (
              <div key={i} className="flex-shrink-0 text-center p-3 rounded-xl border" style={{ borderColor: step.color + "40", background: step.color + "10", minWidth: "110px" }}>
                <div className="text-sm font-bold" style={{ color: step.color }}>{step.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{step.desc}</div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Datasets Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search datasets..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["Dataset Name", "Type", "Year", "Region", "Version", "Records", "Size", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((ds, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">{ds.name}</div>
                    {statusBadge(ds.status)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="flex items-center gap-1 text-xs text-gray-600">
                      <Tag size={11} /> {ds.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{ds.year}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{ds.region}</td>
                  <td className="px-4 py-3 text-xs font-medium whitespace-nowrap"
                    style={{ color: ds.status === "published" ? "#10B981" : ds.status === "cleaned" ? "#F59E0B" : "#94a3b8" }}>
                    {ds.version}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{ds.records.toLocaleString()}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{ds.size}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors"><Download size={13} /></button>
                      <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-purple-600 transition-colors"><Archive size={13} /></button>
                    </div>
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
