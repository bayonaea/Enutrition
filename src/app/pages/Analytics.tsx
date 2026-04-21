import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell
} from "recharts";
import { Download, ZoomIn, Filter, Info } from "lucide-react";
import { BackButton } from "../components/BackButton";

const trendData = [
  { year: "2019", stunting: 29.4, wasting: 6.0, underweight: 19.0, obesity: 8.2 },
  { year: "2020", stunting: 27.1, wasting: 5.8, underweight: 17.8, obesity: 9.1 },
  { year: "2021", stunting: 25.8, wasting: 5.2, underweight: 16.5, obesity: 10.3 },
  { year: "2022", stunting: 22.3, wasting: 4.9, underweight: 14.2, obesity: 11.0 },
  { year: "2023", stunting: 19.7, wasting: 4.4, underweight: 12.8, obesity: 12.1 },
  { year: "2024", stunting: 17.2, wasting: 4.1, underweight: 11.4, obesity: 12.8 },
];

const regionComparison = [
  { region: "NCR", stunting: 8.2, obesity: 18.4, underweight: 5.1 },
  { region: "III", stunting: 11.5, obesity: 12.1, underweight: 9.2 },
  { region: "IV-A", stunting: 22.1, obesity: 10.8, underweight: 14.3 },
  { region: "VII", stunting: 17.8, obesity: 9.4, underweight: 12.8 },
  { region: "X", stunting: 20.7, obesity: 7.2, underweight: 15.1 },
  { region: "XI", stunting: 18.9, obesity: 6.8, underweight: 13.6 },
  { region: "XIII", stunting: 27.2, obesity: 4.1, underweight: 21.4 },
  { region: "BARMM", stunting: 31.5, obesity: 3.2, underweight: 24.8 },
];

const ageGroupData = [
  { age: "0–5 mo", stunting: 5.2 },
  { age: "6–11 mo", stunting: 12.4 },
  { age: "12–23 mo", stunting: 22.8 },
  { age: "24–35 mo", stunting: 19.6 },
  { age: "36–47 mo", stunting: 16.3 },
  { age: "48–59 mo", stunting: 14.1 },
];

const incomeData = [
  { income: "Below Poverty", stunting: 38.2, n: 1200 },
  { income: "Near Poor", stunting: 24.1, n: 1800 },
  { income: "Lower Middle", stunting: 14.8, n: 2400 },
  { income: "Upper Middle", stunting: 7.3, n: 1600 },
  { income: "Upper", stunting: 3.1, n: 800 },
];

export function Analytics() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [indicator, setIndicator] = useState("stunting");
  const [ageFilter, setAgeFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <BackButton />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-gray-900 text-xl font-bold">Deep Analytics</h1>
          <p className="text-gray-500 text-sm mt-0.5">Drill-down analysis, trends, and cross-regional comparison</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={indicator}
            onChange={(e) => setIndicator(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none bg-white"
          >
            <option value="stunting">Stunting</option>
            <option value="wasting">Wasting</option>
            <option value="underweight">Underweight</option>
            <option value="obesity">Obesity</option>
          </select>
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none bg-white">
            <option>2019–2024</option>
            <option>2022–2024</option>
          </select>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white rounded-lg" style={{ background: "#1E3A8A" }}>
            <Download size={13} /> Export
          </button>
        </div>
      </div>

      {/* Trend + Regression */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm capitalize">
              {indicator} Rate Trend — Linear Regression (y = ax + b)
            </h3>
            <p className="text-gray-400 text-xs mt-0.5">Projected trajectory based on 2019–2024 data</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-green-600 font-medium">
              <div className="w-8 h-0.5 bg-green-500 rounded" />
              Actual
            </span>
            <span className="flex items-center gap-1 text-blue-400 font-medium">
              <div className="w-8 h-0.5 bg-blue-300 rounded border-dashed" style={{ borderTop: "2px dashed #93c5fd", height: "0" }} />
              Trend
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} unit="%" />
            <Tooltip
              contentStyle={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "12px" }}
              formatter={(value: number) => [`${value}%`]}
            />
            <Line
              type="monotone"
              dataKey={indicator}
              stroke={indicator === "stunting" ? "#F59E0B" : indicator === "wasting" ? "#EF4444" : indicator === "underweight" ? "#6366F1" : "#1E3A8A"}
              strokeWidth={2.5}
              dot={{ r: 4, fill: "white", strokeWidth: 2 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-3 p-3 rounded-lg text-xs" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
          <span className="font-medium text-green-800">📉 Analysis: </span>
          <span className="text-green-700">
            {indicator === "obesity"
              ? "Rising trend detected. a = +0.92, b = 8.2 — Obesity is projected to reach 15.2% by 2027 without intervention."
              : `Declining trend. a = -2.4, b = 29.4 — ${indicator.charAt(0).toUpperCase() + indicator.slice(1)} is projected to reach 12.8% by 2027 at current trajectory.`}
          </span>
        </div>
      </div>

      {/* Region Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 text-sm">Regional Comparison</h3>
            <button
              className="text-xs flex items-center gap-1"
              style={{ color: "#1E3A8A" }}
              onClick={() => setShowModal(true)}
            >
              <ZoomIn size={12} /> Drill Down
            </button>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={regionComparison} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="region" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip
                contentStyle={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "12px" }}
                formatter={(value: number) => [`${value}%`]}
              />
              <Bar dataKey="stunting" name="Stunting" radius={[3, 3, 0, 0]}>
                {regionComparison.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.stunting > 25 ? "#EF4444" : entry.stunting > 18 ? "#F59E0B" : "#10B981"}
                    style={{ cursor: "pointer" }}
                    onClick={() => { setSelectedRegion(entry.region); setShowModal(true); }}
                  />
                ))}
              </Bar>
              <Bar dataKey="obesity" name="Obesity" fill="#1E3A8A" radius={[3, 3, 0, 0]} opacity={0.4} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><Info size={10} /> Click a bar to open detailed regional analysis</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 text-sm">Stunting by Age Group</h3>
            <select
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1 outline-none bg-white"
            >
              <option value="all">All Regions</option>
              <option value="ncr">NCR</option>
              <option value="barmm">BARMM</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ageGroupData} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="age" tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip
                contentStyle={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "12px" }}
                formatter={(value: number) => [`${value}%`, "Stunting Rate"]}
              />
              <Bar dataKey="stunting" fill="#6366F1" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Income vs Stunting */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-1">Income Level vs. Stunting Rate</h3>
        <p className="text-gray-400 text-xs mb-3">Strong inverse correlation (r = -0.94) — lower income groups have significantly higher stunting rates</p>
        <div className="grid grid-cols-5 gap-2">
          {incomeData.map((d, i) => (
            <div key={i} className="text-center p-3 rounded-xl" style={{ background: `rgba(239,68,68,${d.stunting / 50})` }}>
              <div className="text-sm font-bold" style={{ color: d.stunting > 25 ? "white" : "#1f2937" }}>{d.stunting}%</div>
              <div className="text-xs mt-0.5" style={{ color: d.stunting > 25 ? "rgba(255,255,255,0.8)" : "#6b7280" }}>{d.income}</div>
              <div className="text-xs mt-0.5" style={{ color: d.stunting > 25 ? "rgba(255,255,255,0.6)" : "#9ca3af" }}>n={d.n.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Drill-Down Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900">Region {selectedRegion || "BARMM"} — Deep Analytics</h3>
                <p className="text-xs text-gray-500 mt-0.5">Detailed nutrition indicators breakdown</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Stunting", value: "31.5%", color: "#EF4444" },
                  { label: "Wasting", value: "8.2%", color: "#F59E0B" },
                  { label: "Underweight", value: "24.8%", color: "#6366F1" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 rounded-xl" style={{ background: stat.color + "12" }}>
                    <div className="text-xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-lg text-sm" style={{ background: "#fef2f2", border: "1px solid #fecaca" }}>
                <div className="font-medium text-red-800 mb-1">⚠️ Critical Alert</div>
                <p className="text-red-700 text-xs">Stunting rate of 31.5% is 14.3 percentage points above the national average. Immediate intervention recommended.</p>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-700 mb-2">Contributing Factors</div>
                {[
                  { factor: "Food insecurity", severity: 92 },
                  { factor: "Limited health facility access", severity: 78 },
                  { factor: "Poor water & sanitation", severity: 71 },
                  { factor: "Low maternal education", severity: 65 },
                ].map((f) => (
                  <div key={f.factor} className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">{f.factor}</span>
                      <span className="font-medium text-gray-800">{f.severity}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${f.severity}%`, background: "#EF4444" }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-lg text-xs" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                <div className="font-medium text-green-800 mb-1">💡 AI Recommendation</div>
                <p className="text-green-700">Prioritize supplementary feeding programs and conditional cash transfers. Target 0–24 month children for highest impact.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
