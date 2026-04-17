import { useNavigate } from "react-router";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area
} from "recharts";
import {
  TrendingDown, TrendingUp, AlertTriangle, Users, Activity,
  ChevronRight, Download, RefreshCw, Calendar, MapPin, ArrowUp, ArrowDown
} from "lucide-react";

const malnutritionTrend = [
  { year: "2019", stunting: 29.4, wasting: 6.0, underweight: 19.0, obesity: 8.2 },
  { year: "2020", stunting: 27.1, wasting: 5.8, underweight: 17.8, obesity: 9.1 },
  { year: "2021", stunting: 25.8, wasting: 5.2, underweight: 16.5, obesity: 10.3 },
  { year: "2022", stunting: 22.3, wasting: 4.9, underweight: 14.2, obesity: 11.0 },
  { year: "2023", stunting: 19.7, wasting: 4.4, underweight: 12.8, obesity: 12.1 },
  { year: "2024", stunting: 17.2, wasting: 4.1, underweight: 11.4, obesity: 12.8 },
];

const regionData = [
  { region: "NCR", rate: 8.2 },
  { region: "CAR", rate: 18.4 },
  { region: "I", rate: 14.1 },
  { region: "II", rate: 16.3 },
  { region: "III", rate: 11.5 },
  { region: "IV-A", rate: 22.1 },
  { region: "IV-B", rate: 24.8 },
  { region: "V", rate: 21.6 },
  { region: "VI", rate: 19.3 },
  { region: "VII", rate: 17.8 },
  { region: "VIII", rate: 23.4 },
  { region: "IX", rate: 26.1 },
  { region: "X", rate: 20.7 },
  { region: "XI", rate: 18.9 },
  { region: "XII", rate: 25.3 },
  { region: "XIII", rate: 27.2 },
  { region: "BARMM", rate: 31.5 },
];

const nutritionBreakdown = [
  { name: "Normal", value: 68.2, color: "#10B981" },
  { name: "Stunted", value: 17.2, color: "#F59E0B" },
  { name: "Wasted", value: 4.1, color: "#EF4444" },
  { name: "Underweight", value: 11.4, color: "#6366F1" },
];

const alerts = [
  { region: "BARMM", type: "critical", message: "Stunting rate 31.5% — exceeds national threshold", change: "+2.1%" },
  { region: "Region XIII", type: "warning", message: "Underweight children increased 12% this quarter", change: "+12%" },
  { region: "Region IV-A", type: "warning", message: "Rising obesity trend detected (+8% YoY)", change: "+8%" },
  { region: "Region IX", type: "warning", message: "Wasting rate above 6% threshold", change: "+0.8%" },
];

const recentActivity = [
  { action: "Survey batch uploaded", user: "Maria S.", time: "5 min ago", type: "upload" },
  { action: "Data validation completed", user: "System", time: "18 min ago", type: "validate" },
  { action: "Regional report generated", user: "Jose R.", time: "1 hr ago", type: "report" },
  { action: "New user registered", user: "Admin", time: "2 hrs ago", type: "user" },
  { action: "API key issued", user: "DOH Integration", time: "3 hrs ago", type: "api" },
];

export function Dashboard() {
  const navigate = useNavigate();

  const kpiCards = [
    {
      label: "Stunting Rate",
      value: "17.2%",
      change: "-2.5%",
      trend: "down",
      good: true,
      icon: TrendingDown,
      color: "#F59E0B",
      bg: "#fffbeb",
      sub: "vs 19.7% in 2023",
    },
    {
      label: "Wasting Rate",
      value: "4.1%",
      change: "-0.3%",
      trend: "down",
      good: true,
      icon: Activity,
      color: "#EF4444",
      bg: "#fef2f2",
      sub: "Below 5% target ✓",
    },
    {
      label: "Underweight",
      value: "11.4%",
      change: "-1.4%",
      trend: "down",
      good: true,
      icon: Users,
      color: "#6366F1",
      bg: "#f5f3ff",
      sub: "vs 12.8% in 2023",
    },
    {
      label: "Obesity Rate",
      value: "12.8%",
      change: "+0.7%",
      trend: "up",
      good: false,
      icon: TrendingUp,
      color: "#1E3A8A",
      bg: "#eff6ff",
      sub: "Increasing trend ⚠️",
    },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-gray-900 text-xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5 flex items-center gap-1.5">
            <Calendar size={13} />
            National Nutrition Survey · Updated April 17, 2026
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none bg-white">
            <option>All Regions</option>
            <option>NCR</option>
            <option>BARMM</option>
          </select>
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none bg-white">
            <option>2024</option>
            <option>2023</option>
          </select>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors">
            <RefreshCw size={13} />
            Refresh
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white rounded-lg transition-colors"
            style={{ background: "#1E3A8A" }}
          >
            <Download size={13} />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpiCards.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg" style={{ background: kpi.bg }}>
                <kpi.icon size={18} style={{ color: kpi.color }} />
              </div>
              <span className={`text-xs font-medium flex items-center gap-0.5 px-2 py-0.5 rounded-full ${
                kpi.good ? "text-green-700 bg-green-50" : "text-red-700 bg-red-50"
              }`}>
                {kpi.good ? <ArrowDown size={10} /> : <ArrowUp size={10} />}
                {kpi.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
            <div className="text-sm text-gray-600 mt-0.5">{kpi.label}</div>
            <div className="text-xs text-gray-400 mt-1">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-gray-900 font-semibold text-sm">Malnutrition Trend (2019–2024)</h3>
              <p className="text-gray-400 text-xs mt-0.5">Linear regression analysis across indicators</p>
            </div>
            <div className="flex gap-3 text-xs">
              {[
                { label: "Stunting", color: "#F59E0B" },
                { label: "Wasting", color: "#EF4444" },
                { label: "Underweight", color: "#6366F1" },
                { label: "Obesity", color: "#1E3A8A" },
              ].map((l) => (
                <div key={l.label} className="hidden sm:flex items-center gap-1">
                  <div className="w-2.5 h-0.5 rounded" style={{ background: l.color }} />
                  <span className="text-gray-500">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={malnutritionTrend}>
              <defs>
                {[
                  { id: "stunting", color: "#F59E0B" },
                  { id: "wasting", color: "#EF4444" },
                  { id: "underweight", color: "#6366F1" },
                  { id: "obesity", color: "#1E3A8A" },
                ].map(({ id, color }) => (
                  <linearGradient key={id} id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.1} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip
                contentStyle={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "12px" }}
                formatter={(value: number) => [`${value}%`]}
              />
              <Area type="monotone" dataKey="stunting" stroke="#F59E0B" strokeWidth={2} fill="url(#grad-stunting)" dot={{ r: 3, fill: "#F59E0B" }} />
              <Area type="monotone" dataKey="wasting" stroke="#EF4444" strokeWidth={2} fill="url(#grad-wasting)" dot={{ r: 3, fill: "#EF4444" }} />
              <Area type="monotone" dataKey="underweight" stroke="#6366F1" strokeWidth={2} fill="url(#grad-underweight)" dot={{ r: 3, fill: "#6366F1" }} />
              <Area type="monotone" dataKey="obesity" stroke="#1E3A8A" strokeWidth={2} fill="url(#grad-obesity)" dot={{ r: 3, fill: "#1E3A8A" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <h3 className="text-gray-900 font-semibold text-sm mb-1">Nutrition Status</h3>
          <p className="text-gray-400 text-xs mb-3">National distribution (2024)</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={nutritionBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={2}>
                {nutritionBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ fontSize: "11px", borderRadius: "8px" }}
                formatter={(value: number) => [`${value}%`]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {nutritionBreakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Region Heatmap + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Regional Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-gray-900 font-semibold text-sm">Regional Stunting Rate (%)</h3>
              <p className="text-gray-400 text-xs mt-0.5">Click region to drill down into detailed analytics</p>
            </div>
            <button
              onClick={() => navigate("/analytics")}
              className="text-xs flex items-center gap-1 font-medium"
              style={{ color: "#1E3A8A" }}
            >
              Full Analytics <ChevronRight size={12} />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={regionData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="region" tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip
                contentStyle={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "12px" }}
                formatter={(value: number) => [`${value}%`, "Stunting Rate"]}
              />
              <Bar dataKey="rate" radius={[3, 3, 0, 0]}>
                {regionData.map((entry, i) => (
                  <Cell key={i} fill={entry.rate > 25 ? "#EF4444" : entry.rate > 18 ? "#F59E0B" : "#10B981"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-green-500 inline-block" /> Below 18%</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-yellow-400 inline-block" /> 18–25%</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-red-500 inline-block" /> Above 25% ⚠️</span>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-900 font-semibold text-sm flex items-center gap-1.5">
              <AlertTriangle size={14} className="text-orange-500" />
              Active Alerts
            </h3>
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">{alerts.length}</span>
          </div>
          <div className="space-y-2.5">
            {alerts.map((alert, i) => (
              <div key={i} className={`p-3 rounded-lg border text-xs cursor-pointer hover:shadow-sm transition-shadow ${
                alert.type === "critical"
                  ? "bg-red-50 border-red-100"
                  : "bg-orange-50 border-orange-100"
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-semibold ${alert.type === "critical" ? "text-red-700" : "text-orange-700"}`}>
                    {alert.region}
                  </span>
                  <span className={`text-[10px] font-bold ${alert.type === "critical" ? "text-red-600" : "text-orange-500"}`}>
                    {alert.change}
                  </span>
                </div>
                <p className="text-gray-600 leading-snug">{alert.message}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("/ai-insights")}
            className="mt-3 w-full text-xs font-medium py-2 rounded-lg text-white transition-colors"
            style={{ background: "#1E3A8A" }}
          >
            View AI Recommendations →
          </button>
        </div>
      </div>

      {/* Quick Navigation + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Quick Access */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <h3 className="text-gray-900 font-semibold text-sm mb-3">Quick Access</h3>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Field Survey", path: "/data-collection", color: "#10B981", emoji: "📱" },
              { label: "Data Mgmt", path: "/data-management", color: "#1E3A8A", emoji: "🗄️" },
              { label: "Analytics", path: "/analytics", color: "#6366F1", emoji: "📊" },
              { label: "Reports", path: "/reports", color: "#F59E0B", emoji: "📄" },
              { label: "AI Insights", path: "/ai-insights", color: "#EF4444", emoji: "🧠" },
              { label: "Portal", path: "/public-portal", color: "#0ea5e9", emoji: "🌐" },
            ].map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center p-3 rounded-xl text-center hover:scale-105 transition-transform cursor-pointer"
                style={{ background: `${item.color}15` }}
              >
                <span className="text-xl mb-1">{item.emoji}</span>
                <span className="text-xs font-medium text-gray-700">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <h3 className="text-gray-900 font-semibold text-sm mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((act, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs"
                  style={{ background: "#eff6ff" }}>
                  {act.type === "upload" ? "⬆️" : act.type === "validate" ? "✅" : act.type === "report" ? "📋" : act.type === "user" ? "👤" : "🔑"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-800">{act.action}</div>
                  <div className="text-xs text-gray-400">by {act.user} · {act.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
