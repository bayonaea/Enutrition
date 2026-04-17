import { useState } from "react";
import { Search, Download, Eye, Calendar, MapPin, Tag, Globe } from "lucide-react";

const datasets = [
  {
    id: 1, title: "National Nutrition Survey 2024 — Public Use File",
    category: "Anthropometry", region: "National", year: 2024,
    format: "CSV", size: "284 MB", downloads: 1842,
    description: "Complete dataset of anthropometric measurements from the 2024 National Nutrition Survey covering all 17 regions.",
    preview: [["Household ID", "Age (mo)", "Sex", "Weight (kg)", "Height (cm)", "Z-Score"], ["HH-0001", "24", "M", "10.2", "82.1", "-1.4"], ["HH-0002", "36", "F", "12.1", "90.3", "-0.8"]],
  },
  {
    id: 2, title: "Dietary Assessment Survey 2024",
    category: "Dietary", region: "National", year: 2024,
    format: "Excel", size: "98 MB", downloads: 934,
    description: "24-hour dietary recall data including food group diversity scores and nutrient intake estimates.",
    preview: [["ID", "Region", "Meals/Day", "Food Groups", "Energy (kcal)"], ["001", "NCR", "3", "5", "1840"], ["002", "CAR", "2", "3", "1420"]],
  },
  {
    id: 3, title: "Regional Malnutrition Indicators 2019–2024",
    category: "Statistics", region: "All Regions", year: 2024,
    format: "CSV", size: "4.2 MB", downloads: 3201,
    description: "Time-series summary statistics of key malnutrition indicators by region and year.",
    preview: [["Region", "Year", "Stunting %", "Wasting %", "Underweight %"], ["NCR", "2024", "8.2", "2.1", "5.4"], ["BARMM", "2024", "31.5", "8.2", "24.8"]],
  },
  {
    id: 4, title: "NNS 2023 Final Report (PDF)",
    category: "Reports", region: "National", year: 2023,
    format: "PDF", size: "8.4 MB", downloads: 5688,
    description: "Official final report of the 2023 National Nutrition Survey with full analysis and policy recommendations.",
    preview: [],
  },
  {
    id: 5, title: "Child Growth Standards Reference Table",
    category: "Reference", region: "National", year: 2022,
    format: "Excel", size: "1.2 MB", downloads: 2104,
    description: "WHO-based reference tables for height-for-age, weight-for-height, and MUAC Z-scores.",
    preview: [],
  },
];

export function PublicPortal() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [year, setYear] = useState("all");
  const [previewId, setPreviewId] = useState<number | null>(null);

  const filtered = datasets.filter((d) => {
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || d.category === category;
    const matchYear = year === "all" || d.year === parseInt(year);
    return matchSearch && matchCat && matchYear;
  });

  const previewDataset = datasets.find((d) => d.id === previewId);

  return (
    <div className="p-4 lg:p-6 space-y-5">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
        <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: "#eff6ff" }}>
          <Globe size={24} style={{ color: "#1E3A8A" }} />
        </div>
        <h1 className="text-xl font-bold text-gray-900">Public Data Portal</h1>
        <p className="text-gray-500 text-sm mt-1 max-w-md mx-auto">
          Access and download official nutrition datasets, reports, and research files from the National Nutrition Council.
        </p>

        {/* Search */}
        <div className="mt-4 max-w-lg mx-auto relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search datasets, reports, surveys..."
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Tag size={14} className="text-gray-400" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none bg-white"
            >
              <option value="all">All Categories</option>
              <option>Anthropometry</option>
              <option>Dietary</option>
              <option>Statistics</option>
              <option>Reports</option>
              <option>Reference</option>
            </select>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-gray-400" />
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none bg-white"
            >
              <option value="all">All Years</option>
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
            </select>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-gray-400" />
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none bg-white">
              <option>All Regions</option>
              <option>NCR</option>
              <option>BARMM</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{filtered.length} dataset(s) found</span>
        <span className="text-xs text-gray-400">Total downloads: {datasets.reduce((a, d) => a + d.downloads, 0).toLocaleString()}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((dataset) => (
          <div key={dataset.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "#eff6ff", color: "#1E3A8A" }}>
                    {dataset.category}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    dataset.format === "CSV" ? "bg-green-50 text-green-700" :
                    dataset.format === "Excel" ? "bg-emerald-50 text-emerald-700" :
                    "bg-red-50 text-red-700"
                  }`}>
                    {dataset.format}
                  </span>
                  <span className="text-xs text-gray-400">{dataset.year}</span>
                </div>
                <h3 className="text-sm font-semibold text-gray-900">{dataset.title}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{dataset.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1"><MapPin size={10} /> {dataset.region}</span>
                <span>{dataset.size}</span>
                <span className="flex items-center gap-1"><Download size={10} /> {dataset.downloads.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {dataset.preview.length > 0 && (
                  <button
                    onClick={() => setPreviewId(dataset.id)}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Eye size={12} /> Preview
                  </button>
                )}
                <button
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-white rounded-lg transition-colors"
                  style={{ background: "#1E3A8A" }}
                >
                  <Download size={12} /> Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewId && previewDataset && previewDataset.preview.length > 0 && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{previewDataset.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">Preview — first 3 rows of dataset</p>
              </div>
              <button onClick={() => setPreviewId(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            <div className="p-5">
              <div className="overflow-x-auto">
                <table className="w-full text-xs border border-gray-200 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-50">
                      {previewDataset.preview[0]?.map((h, i) => (
                        <th key={i} className="px-3 py-2 text-left font-semibold text-gray-600 whitespace-nowrap border-b border-gray-200">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewDataset.preview.slice(1).map((row, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                        {row.map((cell, j) => (
                          <td key={j} className="px-3 py-2 text-gray-600 whitespace-nowrap">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-gray-400">Showing 2 of {previewDataset.downloads > 1000 ? "145,200" : "52,000"} rows</span>
                <button className="flex items-center gap-1.5 px-4 py-2 text-sm text-white rounded-lg" style={{ background: "#1E3A8A" }}>
                  <Download size={13} /> Download Full Dataset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
