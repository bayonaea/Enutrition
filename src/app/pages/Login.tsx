import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Lock, User, Shield } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg, #0f2356 0%, #1E3A8A 50%, #1a5276 100%)" }}>
      {/* Left branding panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white"
              style={{
                width: `${(i + 1) * 120}px`,
                height: `${(i + 1) * 120}px`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>

        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white" style={{ background: "#10B981" }}>
              EN
            </div>
            <div>
              <div className="text-white text-lg font-bold">E-Nutrition</div>
              <div className="text-blue-200 text-xs">National Decision Support System</div>
            </div>
          </div>
        </div>

        <div className="relative space-y-6">
          <div>
            <h1 className="text-white text-4xl font-bold leading-tight">
              National Nutrition<br />
              <span style={{ color: "#10B981" }}>Intelligence Platform</span>
            </h1>
            <p className="text-blue-200 mt-3 text-sm leading-relaxed">
              A unified digital platform for evidence-based nutrition policy planning,
              field data collection, and real-time analytics for the Philippines.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Regions Covered", value: "17" },
              { label: "Data Records", value: "2.4M+" },
              { label: "Active Users", value: "3,200" },
            ].map((stat) => (
              <div key={stat.label} className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div className="text-white text-xl font-bold">{stat.value}</div>
                <div className="text-blue-300 text-xs mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-blue-300 text-xs">
            <Shield size={14} style={{ color: "#10B981" }} />
            <span>DICT-certified secure platform · ISO 27001 compliant</span>
          </div>
        </div>

        <div className="relative flex items-center gap-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Official_Seal_of_the_National_Nutrition_Council.png/120px-Official_Seal_of_the_National_Nutrition_Council.png"
            alt="NNC" className="w-10 h-10 opacity-70" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <div>
            <div className="text-blue-300 text-xs">Developed for</div>
            <div className="text-white text-sm font-semibold">National Nutrition Council</div>
            <div className="text-blue-300 text-xs">Republic of the Philippines</div>
          </div>
        </div>
      </div>

      {/* Right login panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white lg:rounded-l-3xl">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white" style={{ background: "#1E3A8A" }}>
              EN
            </div>
            <div>
              <div className="font-bold" style={{ color: "#1E3A8A" }}>E-Nutrition</div>
              <div className="text-gray-400 text-xs">National System</div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
            <p className="text-gray-500 text-sm mt-1">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Username / Email</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300" style={{ accentColor: "#1E3A8A" }} />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="font-medium" style={{ color: "#1E3A8A" }}>Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 text-white text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              style={{ background: loading ? "#93c5fd" : "#1E3A8A" }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : "Sign In to E-Nutrition"}
            </button>
          </form>

          <div className="mt-6 p-3 rounded-lg" style={{ background: "#f0f9ff", border: "1px solid #bae6fd" }}>
            <div className="text-xs text-blue-700 font-medium mb-1">Demo Credentials</div>
            <div className="text-xs text-blue-600 space-y-0.5">
              <div>Admin: <span className="font-mono font-medium">admin / admin123</span></div>
              <div>LGU Officer: <span className="font-mono font-medium">lgu_user / lgu123</span></div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex justify-center gap-4 text-xs text-gray-400">
              <a href="#">Privacy Policy</a>
              <span>·</span>
              <a href="#">Terms of Use</a>
              <span>·</span>
              <a href="#">Support</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
