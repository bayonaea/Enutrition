import { useState } from "react";
import { Code2, Key, Copy, CheckCircle, Play, Activity, Plus, Eye, EyeOff } from "lucide-react";
import { BackButton } from "../components/BackButton";

const apiKeys = [
  { name: "DOH Integration", key: "sk_live_doh_x8k2m9...a4f1", created: "Jan 15, 2026", calls: 14820, status: "active" },
  { name: "PhilHealth API", key: "sk_live_phc_k3n8p2...m9q7", created: "Feb 3, 2026", calls: 8240, status: "active" },
  { name: "DSWD Portal", key: "sk_live_dswd_p1r5...k2n8", created: "Mar 22, 2026", calls: 3100, status: "active" },
  { name: "Test Key", key: "sk_test_test_abcd...xyz1", created: "Apr 1, 2026", calls: 42, status: "revoked" },
];

const endpoints = [
  { method: "GET", path: "/api/v1/nutrition/regions", desc: "Get malnutrition rates by region", category: "Analytics" },
  { method: "GET", path: "/api/v1/nutrition/trends", desc: "Get historical trend data (5-year)", category: "Analytics" },
  { method: "GET", path: "/api/v1/datasets", desc: "List available public datasets", category: "Datasets" },
  { method: "GET", path: "/api/v1/datasets/{id}/download", desc: "Download a dataset by ID", category: "Datasets" },
  { method: "POST", path: "/api/v1/surveys/submit", desc: "Submit field survey data", category: "Data Collection" },
  { method: "GET", path: "/api/v1/surveys/{id}", desc: "Get survey status by ID", category: "Data Collection" },
  { method: "GET", path: "/api/v1/indicators/national", desc: "Get national KPI snapshot", category: "Analytics" },
];

const sampleResponse = `{
  "status": "success",
  "data": {
    "year": 2024,
    "regions": [
      {
        "code": "NCR",
        "name": "National Capital Region",
        "indicators": {
          "stunting_rate": 8.2,
          "wasting_rate": 2.1,
          "underweight_rate": 5.4,
          "obesity_rate": 18.4
        },
        "sample_size": 12400,
        "last_updated": "2026-04-17"
      },
      {
        "code": "BARMM",
        "name": "Bangsamoro Region",
        "indicators": {
          "stunting_rate": 31.5,
          "wasting_rate": 8.2,
          "underweight_rate": 24.8,
          "obesity_rate": 3.2
        },
        "sample_size": 9800,
        "last_updated": "2026-04-17"
      }
    ]
  },
  "meta": {
    "total_records": 145200,
    "rate_limit": "1000/hour",
    "version": "v1"
  }
}`;

const sampleRequest = `curl -X GET \\
  "https://api.enutrition.gov.ph/api/v1/nutrition/regions?year=2024" \\
  -H "Authorization: Bearer sk_live_YOUR_API_KEY" \\
  -H "Content-Type: application/json"`;

export function ApiIntegration() {
  const [activeTab, setActiveTab] = useState<"keys" | "docs" | "test">("keys");
  const [showKeys, setShowKeys] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0]);
  const [testResult, setTestResult] = useState("");
  const [running, setRunning] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runTest = () => {
    setRunning(true);
    setTestResult("");
    setTimeout(() => {
      setTestResult(sampleResponse);
      setRunning(false);
    }, 1200);
  };

  const methodColor = (method: string) => {
    const colors: Record<string, string> = { GET: "text-green-700 bg-green-50", POST: "text-blue-700 bg-blue-50", PUT: "text-yellow-700 bg-yellow-50", DELETE: "text-red-700 bg-red-50" };
    return colors[method] || "text-gray-600 bg-gray-100";
  };

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <BackButton />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-gray-900 text-xl font-bold">API & Integration</h1>
          <p className="text-gray-500 text-sm mt-0.5">Developer portal, API keys, and endpoint documentation</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0" }}>
            <Activity size={12} /> API Status: Operational
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "API Calls (Today)", value: "26,162", color: "#1E3A8A" },
          { label: "Active Keys", value: "3", color: "#10B981" },
          { label: "Avg Response", value: "142ms", color: "#6366F1" },
          { label: "Success Rate", value: "99.8%", color: "#F59E0B" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
            <div className="text-xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {(["keys", "docs", "test"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "keys" ? "🔑 API Keys" : tab === "docs" ? "📖 Endpoints" : "▶ Try API"}
          </button>
        ))}
      </div>

      {/* API Keys Tab */}
      {activeTab === "keys" && (
        <div className="space-y-3">
          <div className="flex justify-end">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white rounded-lg" style={{ background: "#1E3A8A" }}>
              <Plus size={13} /> Generate New Key
            </button>
          </div>
          {apiKeys.map((key, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#eff6ff" }}>
                    <Key size={16} style={{ color: "#1E3A8A" }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{key.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {showKeys[i] ? key.key.replace("...", "a4f1b2c3d9e8") : key.key}
                      </code>
                      <button
                        onClick={() => setShowKeys({ ...showKeys, [i]: !showKeys[i] })}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {showKeys[i] ? <EyeOff size={12} /> : <Eye size={12} />}
                      </button>
                      <button onClick={() => copyToClipboard(key.key)} className="text-gray-400 hover:text-gray-600">
                        {copied ? <CheckCircle size={12} className="text-green-500" /> : <Copy size={12} />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    key.status === "active" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  }`}>
                    {key.status}
                  </span>
                  <div className="text-xs text-gray-400 mt-1">Created {key.created}</div>
                  <div className="text-xs text-gray-500 mt-0.5 font-medium">{key.calls.toLocaleString()} calls</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Endpoints Tab */}
      {activeTab === "docs" && (
        <div className="space-y-2">
          {["Analytics", "Datasets", "Data Collection"].map((cat) => (
            <div key={cat} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50">
                <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wide">{cat}</h3>
              </div>
              {endpoints.filter((e) => e.category === cat).map((ep, i) => (
                <div key={i} className="px-4 py-3 border-b border-gray-50 last:border-0 flex items-center gap-3 hover:bg-gray-50 cursor-pointer"
                  onClick={() => { setSelectedEndpoint(ep); setActiveTab("test"); }}>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded font-mono flex-shrink-0 ${methodColor(ep.method)}`}>
                    {ep.method}
                  </span>
                  <code className="text-xs font-mono text-gray-700 flex-1">{ep.path}</code>
                  <span className="text-xs text-gray-400 hidden sm:block">{ep.desc}</span>
                  <Play size={12} className="text-gray-300 flex-shrink-0" />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Try API Tab */}
      {activeTab === "test" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">Request Builder</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Endpoint</label>
                  <div className="flex gap-2">
                    <span className={`text-xs font-bold px-2.5 py-2 rounded-lg flex-shrink-0 flex items-center ${methodColor(selectedEndpoint.method)}`}>
                      {selectedEndpoint.method}
                    </span>
                    <input
                      className="flex-1 text-xs font-mono border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 bg-gray-50"
                      value={`https://api.enutrition.gov.ph${selectedEndpoint.path}`}
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Authorization</label>
                  <input
                    placeholder="Bearer sk_live_YOUR_API_KEY"
                    className="w-full text-xs font-mono border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">cURL Command</label>
                  <div className="relative">
                    <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded-lg overflow-x-auto leading-relaxed">{sampleRequest}</pre>
                    <button
                      onClick={() => copyToClipboard(sampleRequest)}
                      className="absolute top-2 right-2 p-1.5 rounded bg-gray-700 text-gray-300 hover:text-white"
                    >
                      <Copy size={11} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={runTest}
                  disabled={running}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-sm text-white rounded-lg font-medium transition-colors"
                  style={{ background: running ? "#93c5fd" : "#10B981" }}
                >
                  {running ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                  ) : (
                    <><Play size={14} /> Send Request</>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 text-sm">Response</h3>
              {testResult && (
                <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  200 OK · 142ms
                </span>
              )}
            </div>
            {testResult ? (
              <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded-lg overflow-auto h-80 leading-relaxed">
                {testResult}
              </pre>
            ) : (
              <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Code2 size={28} className="mx-auto mb-2 opacity-40" />
                  <p className="text-sm">Click "Send Request" to see response</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
