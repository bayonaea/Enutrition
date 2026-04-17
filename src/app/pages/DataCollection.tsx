import { useState } from "react";
import {
  Smartphone, Upload, CheckCircle, Clock, AlertCircle,
  MapPin, Camera, ChevronRight, ChevronLeft, User,
  Home, Activity, Utensils, Wifi, WifiOff, Plus
} from "lucide-react";

const surveys = [
  { id: "S-001", name: "NNS 2026 - Barangay Malinta", region: "Region III", status: "pending", count: 12, total: 30 },
  { id: "S-002", name: "NNS 2026 - Brgy. San Isidro", region: "Region IV-A", status: "in_progress", count: 28, total: 35 },
  { id: "S-003", name: "NNS 2026 - Brgy. Poblacion", region: "Region IX", status: "completed", count: 25, total: 25 },
  { id: "S-004", name: "NNS 2026 - Brgy. Rizal", region: "BARMM", status: "pending", count: 0, total: 40 },
];

const uploadQueue = [
  { name: "Survey_Batch_032.json", size: "2.4 MB", status: "uploaded", time: "5 min ago" },
  { name: "Survey_Batch_033.json", size: "1.8 MB", status: "pending", time: "Waiting for sync" },
  { name: "Photos_Batch_021.zip", size: "14.2 MB", status: "uploading", time: "62%" },
];

type WizardStep = 0 | 1 | 2 | 3 | 4;
const stepLabels = [
  { label: "Household", icon: Home },
  { label: "Child Info", icon: User },
  { label: "Measurements", icon: Activity },
  { label: "Diet", icon: Utensils },
  { label: "Geo + Photo", icon: MapPin },
];

export function DataCollection() {
  const [activeTab, setActiveTab] = useState<"surveys" | "form" | "uploads">("surveys");
  const [wizardStep, setWizardStep] = useState<WizardStep>(0);
  const [isOffline, setIsOffline] = useState(false);
  const [formData, setFormData] = useState({
    hhid: "HH-2026-0391",
    province: "Bulacan",
    municipality: "Malolos",
    barangay: "Mojon",
    respondent: "",
    members: "5",
    childName: "",
    childAge: "",
    childSex: "Male",
    weight: "",
    height: "",
    muac: "",
    breastfed: "Yes",
    meals: "3",
    foodGroups: [] as string[],
  });

  const statusBadge = (status: string) => {
    const map: Record<string, { bg: string; text: string; label: string; icon: React.ReactNode }> = {
      pending: { bg: "bg-gray-100", text: "text-gray-600", label: "Pending", icon: <Clock size={11} /> },
      in_progress: { bg: "bg-blue-50", text: "text-blue-700", label: "In Progress", icon: <Activity size={11} /> },
      completed: { bg: "bg-green-50", text: "text-green-700", label: "Completed", icon: <CheckCircle size={11} /> },
    };
    const s = map[status];
    return (
      <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
        {s.icon} {s.label}
      </span>
    );
  };

  return (
    <div className="p-4 lg:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-gray-900 text-xl font-bold">Data Collection</h1>
          <p className="text-gray-500 text-sm mt-0.5">Field survey management and offline data collection</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              isOffline ? "bg-orange-50 border-orange-200 text-orange-700" : "bg-green-50 border-green-200 text-green-700"
            }`}
          >
            {isOffline ? <WifiOff size={14} /> : <Wifi size={14} />}
            {isOffline ? "Offline Mode" : "Online"}
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white rounded-lg"
            style={{ background: "#1E3A8A" }}
            onClick={() => setActiveTab("form")}
          >
            <Plus size={14} /> New Survey
          </button>
        </div>
      </div>

      {/* Offline Banner */}
      {isOffline && (
        <div className="flex items-center gap-3 p-3 rounded-lg border" style={{ background: "#fff7ed", borderColor: "#fed7aa" }}>
          <WifiOff size={16} className="text-orange-500 flex-shrink-0" />
          <div className="text-sm">
            <span className="font-medium text-orange-700">Offline Mode Active</span>
            <span className="text-orange-600"> — Data will be stored locally and synced when connection is restored.</span>
          </div>
        </div>
      )}

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Today's Surveys", value: "28", color: "#1E3A8A" },
          { label: "Pending Uploads", value: "3", color: "#F59E0B" },
          { label: "Completed", value: "65", color: "#10B981" },
          { label: "Total Records", value: "941", color: "#6366F1" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {(["surveys", "form", "uploads"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
              activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "surveys" ? "📋 Survey List" : tab === "form" ? "✍️ Data Entry" : "☁️ Upload Queue"}
          </button>
        ))}
      </div>

      {/* Survey List Tab */}
      {activeTab === "surveys" && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 text-sm">Assigned Surveys</h3>
            <span className="text-xs text-gray-400">{surveys.length} assignments</span>
          </div>
          <div className="divide-y divide-gray-50">
            {surveys.map((survey) => (
              <div key={survey.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => setActiveTab("form")}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-gray-400">{survey.id}</span>
                      {statusBadge(survey.status)}
                    </div>
                    <div className="text-sm font-medium text-gray-900 truncate">{survey.name}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <MapPin size={10} /> {survey.region}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs font-semibold text-gray-700">{survey.count}/{survey.total}</div>
                    <div className="text-xs text-gray-400">households</div>
                    <div className="mt-1.5 w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(survey.count / survey.total) * 100}%`,
                          background: survey.status === "completed" ? "#10B981" : "#1E3A8A"
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form Wizard Tab */}
      {activeTab === "form" && (
        <div className="max-w-2xl mx-auto">
          {/* Progress indicator */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Step {wizardStep + 1} of 5 — {stepLabels[wizardStep].label}</span>
              <span className="text-xs text-gray-400">Form: NNS-2026-HH</span>
            </div>
            <div className="flex gap-1.5">
              {stepLabels.map((step, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`w-full h-1.5 rounded-full transition-all ${
                      i < wizardStep ? "bg-green-500" : i === wizardStep ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                  <div className={`text-[10px] hidden sm:block ${i === wizardStep ? "text-blue-600 font-medium" : "text-gray-400"}`}>
                    {step.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form content */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            {wizardStep === 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Home size={18} style={{ color: "#1E3A8A" }} />
                  <h3 className="font-semibold text-gray-900">Household Information</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Household ID</label>
                    <input value={formData.hhid} readOnly className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">No. of Members</label>
                    <input
                      type="number"
                      value={formData.members}
                      onChange={(e) => setFormData({ ...formData, members: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Province *</label>
                    <input value={formData.province} readOnly className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Municipality *</label>
                    <input value={formData.municipality} readOnly className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Respondent Name *</label>
                    <input
                      type="text"
                      value={formData.respondent}
                      onChange={(e) => setFormData({ ...formData, respondent: e.target.value })}
                      placeholder="Enter name of household head"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {wizardStep === 1 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <User size={18} style={{ color: "#1E3A8A" }} />
                  <h3 className="font-semibold text-gray-900">Child Information</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Child's Full Name *</label>
                    <input
                      type="text"
                      value={formData.childName}
                      onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                      placeholder="Enter child's complete name"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Age (months) *</label>
                    <input
                      type="number"
                      value={formData.childAge}
                      onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                      placeholder="e.g. 24"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Sex *</label>
                    <select
                      value={formData.childSex}
                      onChange={(e) => setFormData({ ...formData, childSex: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                    >
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </div>
                <div className="p-3 rounded-lg text-xs" style={{ background: "#eff6ff", color: "#1d4ed8" }}>
                  💡 Age must be between 0–59 months for this survey. Older children use a different form.
                </div>
              </div>
            )}

            {wizardStep === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Activity size={18} style={{ color: "#1E3A8A" }} />
                  <h3 className="font-semibold text-gray-900">Anthropometric Measurements</h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Weight (kg)", key: "weight", placeholder: "e.g. 12.5", unit: "kg" },
                    { label: "Height/Length (cm)", key: "height", placeholder: "e.g. 85.0", unit: "cm" },
                    { label: "MUAC (cm)", key: "muac", placeholder: "e.g. 14.5", unit: "cm" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-xs font-medium text-gray-600 mb-1">{field.label}</label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          placeholder={field.placeholder}
                          value={(formData as any)[field.key]}
                          onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm pr-8 outline-none focus:border-blue-500"
                        />
                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">{field.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-lg border" style={{ background: "#fefce8", borderColor: "#fde68a" }}>
                  <div className="text-xs font-medium text-yellow-800 mb-1">⚠️ Validation Rules</div>
                  <div className="text-xs text-yellow-700 space-y-0.5">
                    <div>• Weight: 1.0 – 25.0 kg for children 0–59 months</div>
                    <div>• Height: 40 – 130 cm</div>
                    <div>• MUAC: 8 – 22 cm</div>
                  </div>
                </div>
              </div>
            )}

            {wizardStep === 3 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Utensils size={18} style={{ color: "#1E3A8A" }} />
                  <h3 className="font-semibold text-gray-900">Dietary Assessment (24-hour Recall)</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Currently Breastfed?</label>
                    <select
                      value={formData.breastfed}
                      onChange={(e) => setFormData({ ...formData, breastfed: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                    >
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Number of Meals</label>
                    <select
                      value={formData.meals}
                      onChange={(e) => setFormData({ ...formData, meals: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                    >
                      {["1", "2", "3", "4", "5+"].map((n) => <option key={n}>{n}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Food Groups Consumed (check all)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Grains/Roots", "Legumes", "Dairy", "Eggs", "Meat/Fish", "Vitamin A-rich Veg", "Other Vegetables", "Fruits"].map((food) => (
                      <label key={food} className="flex items-center gap-2 p-2 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer text-xs">
                        <input
                          type="checkbox"
                          checked={formData.foodGroups.includes(food)}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              foodGroups: e.target.checked
                                ? [...formData.foodGroups, food]
                                : formData.foodGroups.filter((f) => f !== food)
                            });
                          }}
                          style={{ accentColor: "#1E3A8A" }}
                        />
                        {food}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {wizardStep === 4 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={18} style={{ color: "#1E3A8A" }} />
                  <h3 className="font-semibold text-gray-900">Geolocation & Photo</h3>
                </div>
                <div className="p-4 rounded-xl border-2 border-dashed" style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}>
                  <div className="text-center">
                    <MapPin size={28} className="mx-auto mb-2" style={{ color: "#1E3A8A" }} />
                    <div className="text-sm font-medium text-blue-800">GPS Location Captured</div>
                    <div className="font-mono text-xs text-blue-600 mt-1">14°51'32.4"N 120°48'45.6"E</div>
                    <div className="text-xs text-blue-500 mt-0.5">Accuracy: ±3m · Altitude: 18m</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((n) => (
                    <button key={n} className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
                      <Camera size={20} className="text-gray-400 mb-1" />
                      <span className="text-xs text-gray-400">Photo {n}</span>
                    </button>
                  ))}
                </div>
                <div className="p-3 rounded-lg" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                  <div className="text-xs font-medium text-green-800 mb-1">✅ Ready to Submit</div>
                  <div className="text-xs text-green-700">All required fields are complete. Review data before final submission.</div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => setWizardStep((prev) => Math.max(0, prev - 1) as WizardStep)}
                disabled={wizardStep === 0}
                className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft size={15} /> Previous
              </button>
              <button
                onClick={() => setWizardStep((prev) => Math.min(4, prev + 1) as WizardStep)}
                className="flex items-center gap-2 px-5 py-2 text-sm text-white rounded-lg transition-colors"
                style={{ background: wizardStep === 4 ? "#10B981" : "#1E3A8A" }}
              >
                {wizardStep === 4 ? "✓ Submit Survey" : <>Next <ChevronRight size={15} /></>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Queue Tab */}
      {activeTab === "uploads" && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 text-sm">Upload Queue</h3>
            <button className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg text-white" style={{ background: "#10B981" }}>
              <Upload size={12} /> Sync All
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {uploadQueue.map((file, i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  file.status === "uploaded" ? "bg-green-50" : file.status === "uploading" ? "bg-blue-50" : "bg-gray-100"
                }`}>
                  {file.status === "uploaded" ? <CheckCircle size={15} className="text-green-500" /> :
                    file.status === "uploading" ? <Upload size={15} className="text-blue-500" /> :
                    <Clock size={15} className="text-gray-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800 truncate">{file.name}</div>
                  <div className="text-xs text-gray-400">{file.size} · {file.time}</div>
                  {file.status === "uploading" && (
                    <div className="mt-1.5 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: file.time }} />
                    </div>
                  )}
                </div>
                <span className={`text-xs font-medium capitalize flex-shrink-0 ${
                  file.status === "uploaded" ? "text-green-600" :
                  file.status === "uploading" ? "text-blue-600" : "text-gray-400"
                }`}>
                  {file.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
