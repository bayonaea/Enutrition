import { useState } from "react";
import {
  Brain, TrendingUp, TrendingDown, AlertTriangle, Lightbulb,
  Target, RefreshCw, ChevronRight, Sparkles, Activity,
  MapPin, Users
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const insights = [
  {
    id: 1,
    type: "critical",
    region: "BARMM",
    title: "Critical: Stunting Rate 14.3% Above National Average",
    detail: "BARMM continues to show the highest stunting rate at 31.5%, which is 14.3 percentage points above the 2024 national average of 17.2%. The trend shows only marginal improvement over 3 years.",
    action: "Recommend immediate deployment of supplementary feeding program and conditional cash transfer expansion targeting 0–24 month children.",
    impact: "High",
    confidence: 94,
    category: "Alert",
    icon: AlertTriangle,
    color: "#EF4444",
    bg: "#fef2f2",
  },
  {
    id: 2,
    type: "warning",
    region: "National",
    title: "Rising Obesity Trend (+0.7% YoY) Requires Attention",
    detail: "National obesity rate has increased from 8.2% (2019) to 12.8% (2024), a growth of +56%. Regression model predicts 15.2% by 2027 without intervention.",
    action: "Launch school nutrition education program and reduce ultra-processed food availability in public schools.",
    impact: "Medium",
    confidence: 88,
    category: "Prediction",
    icon: TrendingUp,
    color: "#F59E0B",
    bg: "#fffbeb",
  },
  {
    id: 3,
    type: "positive",
    region: "NCR",
    title: "NCR Achieves Lowest Stunting Rate at 8.2%",
    detail: "The National Capital Region shows the strongest performance with stunting rate of 8.2%, below the WHO 10% target threshold. Strong correlation with urban food security programs.",
    action: "Document and replicate NCR's urban nutrition program model to other highly urbanized cities.",
    impact: "Medium",
    confidence: 91,
    category: "Best Practice",
    icon: TrendingDown,
    color: "#10B981",
    bg: "#f0fdf4",
  },
  {
    id: 4,
    type: "warning",
    region: "Region XIII",
    title: "Wasting Rate Increase of 12% This Quarter",
    detail: "Region XIII (Caraga) shows a sudden spike in wasting rate from 5.8% to 6.5% in Q1 2026, likely attributed to recent extreme weather events affecting food supply.",
    action: "Activate emergency food assistance protocol. Coordinate with DSWD for rapid response feeding program.",
    impact: "High",
    confidence: 79,
    category: "Alert",
    icon: AlertTriangle,
    color: "#F59E0B",
    bg: "#fffbeb",
  },
  {
    id: 5,
    type: "info",
    region: "National",
    title: "Stunting Reduction on Track for 2028 Target",
    detail: "Current linear regression model (y = -2.44x + 29.4) suggests the Philippines is on track to achieve the 10% stunting target by 2028 if current trajectory is maintained.",
    action: "Continue and expand successful programs: Garantisadong Pambata, School-based Feeding Program, and Pantawid Pamilyang Pilipino Program.",
    impact: "Low",
    confidence: 85,
    category: "Projection",
    icon: Target,
    color: "#6366F1",
    bg: "#f5f3ff",
  },
];

const projectionData = [
  { year: "2019", actual: 29.4, projected: null },
  { year: "2020", actual: 27.1, projected: null },
  { year: "2021", actual: 25.8, projected: null },
  { year: "2022", actual: 22.3, projected: null },
  { year: "2023", actual: 19.7, projected: null },
  { year: "2024", actual: 17.2, projected: 17.2 },
  { year: "2025", actual: null, projected: 14.8 },
  { year: "2026", actual: null, projected: 12.4 },
  { year: "2027", actual: null, projected: 10.0 },
  { year: "2028", actual: null, projected: 7.8 },
];

const chatMessages = [
  { role: "assistant", content: "Hello! I'm the E-Nutrition AI assistant. I can help you analyze nutrition trends, interpret data, and suggest evidence-based interventions. What would you like to explore?" },
];

export function AIInsights() {
  const [activeInsight, setActiveInsight] = useState<number | null>(null);
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"insights" | "projection" | "chat">("insights");

  const aiResponses: Record<string, string> = {
    default: "Based on the current data, I can see several patterns worth noting. Would you like me to focus on a specific region or indicator?",
    barmm: "BARMM continues to face the highest malnutrition burden in the Philippines. The primary contributing factors include: food insecurity (92% severity index), limited health facility access (78%), and poor water & sanitation (71%). I recommend prioritizing targeted supplementary feeding and maternal nutrition programs.",
    stunting: "National stunting rate has decreased from 29.4% (2019) to 17.2% (2024) — a 12.2 percentage point reduction. The regression equation y = -2.44x + 29.4 suggests we'll reach the 10% WHO target by approximately 2028 if the current trajectory is maintained.",
    obesity: "Obesity is the only malnutrition indicator trending upward nationally. From 8.2% in 2019 to 12.8% in 2024, this represents a 56% increase. The projection model estimates 15.2% by 2027 without intervention. School-based nutrition education and food environment policies are the most evidence-supported interventions.",
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user" as const, content: input };
    setMessages([...messages, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response = aiResponses.default;
      if (lowerInput.includes("barmm") || lowerInput.includes("bangsamoro")) response = aiResponses.barmm;
      else if (lowerInput.includes("stunt")) response = aiResponses.stunting;
      else if (lowerInput.includes("obes")) response = aiResponses.obesity;

      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setLoading(false);
    }, 1000);
  };

  const selectedInsight = insights.find(i => i.id === activeInsight);

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-gray-900 text-xl font-bold flex items-center gap-2">
            <Brain size={22} style={{ color: "#1E3A8A" }} />
            AI Insights
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Machine learning-powered nutrition intelligence and recommendations</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: "#eff6ff", color: "#1E3A8A" }}>
            <Sparkles size={12} /> AI Model v2.1 Active
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 bg-white">
            <RefreshCw size={13} /> Refresh
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {(["insights", "projection", "chat"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "insights" ? "🧠 Insights" : tab === "projection" ? "📈 Projections" : "💬 AI Chat"}
          </button>
        ))}
      </div>

      {activeTab === "insights" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Insight cards */}
          <div className="lg:col-span-2 space-y-3">
            {insights.map((insight) => (
              <div
                key={insight.id}
                onClick={() => setActiveInsight(activeInsight === insight.id ? null : insight.id)}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 cursor-pointer hover:shadow-md transition-all"
                style={{ borderLeft: `3px solid ${insight.color}` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: insight.bg }}>
                    <insight.icon size={16} style={{ color: insight.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: insight.bg, color: insight.color }}>
                          {insight.category}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-0.5"><MapPin size={9} /> {insight.region}</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          insight.impact === "High" ? "bg-red-50 text-red-700" :
                          insight.impact === "Medium" ? "bg-yellow-50 text-yellow-700" :
                          "bg-gray-100 text-gray-600"
                        }`}>
                          {insight.impact} Impact
                        </span>
                        <span className="text-xs text-gray-400">{insight.confidence}% confidence</span>
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">{insight.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{insight.detail}</p>

                    {activeInsight === insight.id && (
                      <div className="mt-3 p-3 rounded-lg" style={{ background: insight.bg }}>
                        <div className="flex items-center gap-1.5 mb-1">
                          <Lightbulb size={13} style={{ color: insight.color }} />
                          <span className="text-xs font-semibold" style={{ color: insight.color }}>Recommended Action</span>
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed">{insight.action}</p>
                      </div>
                    )}
                  </div>
                  <ChevronRight size={14} className={`text-gray-300 flex-shrink-0 mt-0.5 transition-transform ${activeInsight === insight.id ? "rotate-90" : ""}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Summary Panel */}
          <div className="space-y-3">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-1.5">
                <Activity size={14} style={{ color: "#1E3A8A" }} />
                AI Analysis Summary
              </h3>
              <div className="space-y-2.5">
                {[
                  { label: "Critical Alerts", value: insights.filter(i => i.type === "critical").length, color: "#EF4444", bg: "#fef2f2" },
                  { label: "Warnings", value: insights.filter(i => i.type === "warning").length, color: "#F59E0B", bg: "#fffbeb" },
                  { label: "Positive Trends", value: insights.filter(i => i.type === "positive").length, color: "#10B981", bg: "#f0fdf4" },
                  { label: "Projections", value: insights.filter(i => i.type === "info").length, color: "#6366F1", bg: "#f5f3ff" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between p-2.5 rounded-lg" style={{ background: s.bg }}>
                    <span className="text-xs text-gray-600">{s.label}</span>
                    <span className="text-sm font-bold" style={{ color: s.color }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">Top Priority Regions</h3>
              <div className="space-y-2">
                {[
                  { region: "BARMM", risk: 95, label: "Critical" },
                  { region: "Region XIII", risk: 78, label: "High" },
                  { region: "Region IX", risk: 72, label: "High" },
                  { region: "Region IV-B", risk: 65, label: "Medium" },
                ].map((r, i) => (
                  <div key={r.region} className="flex items-center gap-2">
                    <span className="w-4 text-xs text-gray-400 flex-shrink-0">{i + 1}.</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="font-medium text-gray-700">{r.region}</span>
                        <span className={`font-semibold ${r.risk > 80 ? "text-red-600" : r.risk > 60 ? "text-yellow-600" : "text-blue-600"}`}>{r.label}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{
                          width: `${r.risk}%`,
                          background: r.risk > 80 ? "#EF4444" : r.risk > 60 ? "#F59E0B" : "#6366F1"
                        }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Model Information</h3>
              <div className="space-y-1.5 text-xs text-gray-500">
                <div className="flex justify-between"><span>Model Version</span><span className="font-medium text-gray-700">v2.1.3</span></div>
                <div className="flex justify-between"><span>Training Data</span><span className="font-medium text-gray-700">2019–2024 NNS</span></div>
                <div className="flex justify-between"><span>Last Updated</span><span className="font-medium text-gray-700">Apr 15, 2026</span></div>
                <div className="flex justify-between"><span>Accuracy</span><span className="font-medium text-green-600">91.4%</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "projection" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">Stunting Rate Projection (2024–2028)</h3>
                <p className="text-xs text-gray-400 mt-0.5">Linear regression model: y = -2.44x + 29.4 | R² = 0.987</p>
              </div>
              <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-1"><div className="w-6 h-0.5 bg-blue-600 rounded" /> Actual</span>
                <span className="flex items-center gap-1"><div className="w-6 h-0.5 border-t-2 border-dashed border-orange-400" style={{ height: 0 }} />Projected</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} unit="%" domain={[0, 35]} />
                <Tooltip
                  contentStyle={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "12px" }}
                  formatter={(value: number) => value ? [`${value}%`] : ["No data"]}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#1E3A8A"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "white", strokeWidth: 2, stroke: "#1E3A8A" }}
                  connectNulls={false}
                />
                <Line
                  type="monotone"
                  dataKey="projected"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  strokeDasharray="6 3"
                  dot={{ r: 3, fill: "#F59E0B" }}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-3 p-3 rounded-lg text-xs" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
              <span className="font-medium text-green-800">✅ On-Track: </span>
              <span className="text-green-700">The Philippines is projected to reach the 10% WHO stunting threshold by 2027–2028. The current rate of decline (-2.44 pp/year) must be sustained through continued program implementation.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { year: "2025", projected: "14.8%", delta: "-2.4pp", status: "Achievable" },
              { year: "2026", projected: "12.4%", delta: "-2.4pp", status: "On Track" },
              { year: "2028 Target", projected: "7.8%", delta: "WHO <10% Goal", status: "Achievable" },
            ].map((proj) => (
              <div key={proj.year} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                <div className="text-sm font-semibold text-gray-500 mb-1">{proj.year}</div>
                <div className="text-3xl font-bold" style={{ color: "#1E3A8A" }}>{proj.projected}</div>
                <div className="text-xs text-gray-400 mt-0.5">{proj.delta}</div>
                <div className="mt-2 text-xs px-2 py-0.5 rounded-full font-medium bg-green-50 text-green-700 inline-block">{proj.status}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "chat" && (
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col" style={{ height: "560px" }}>
            {/* Chat header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-100">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#eff6ff" }}>
                <Brain size={18} style={{ color: "#1E3A8A" }} />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">E-Nutrition AI Assistant</div>
                <div className="text-xs text-green-600 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Online</div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5" style={{ background: "#eff6ff" }}>
                      <Brain size={14} style={{ color: "#1E3A8A" }} />
                    </div>
                  )}
                  <div
                    className={`max-w-xs lg:max-w-md px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-800 rounded-bl-sm"
                    }`}
                    style={msg.role === "user" ? { background: "#1E3A8A" } : {}}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#eff6ff" }}>
                    <Brain size={14} style={{ color: "#1E3A8A" }} />
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-2.5 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            <div className="px-4 pb-2 flex gap-2 flex-wrap">
              {["What is the stunting trend?", "Analyze BARMM data", "Obesity projections", "Best performing region"].map((s) => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className="text-xs px-2.5 py-1 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about nutrition trends, regions, or interventions..."
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="px-4 py-2.5 text-sm text-white rounded-xl disabled:opacity-50 transition-colors"
                style={{ background: "#1E3A8A" }}
              >
                <Sparkles size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
