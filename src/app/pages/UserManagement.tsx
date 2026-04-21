import { useState } from "react";
import { Users, Plus, Edit3, Trash2, Shield, Search, Key } from "lucide-react";
import { BackButton } from "../components/BackButton";

const users = [
  { id: 1, name: "Juan Dela Cruz", email: "jdelacruz@nnc.gov.ph", role: "admin", region: "National", status: "active", last: "Today, 10:45 AM" },
  { id: 2, name: "Maria Santos", email: "msantos@lgu-bulacan.gov.ph", role: "lgu", region: "Region III", status: "active", last: "Today, 08:12 AM" },
  { id: 3, name: "Dr. Juana Reyes", email: "jreyes@doh.gov.ph", role: "researcher", region: "National", status: "active", last: "Yesterday" },
  { id: 4, name: "Ben Cruz", email: "bcruz@nnc.gov.ph", role: "analyst", region: "Region X", status: "active", last: "Apr 15, 2026" },
  { id: 5, name: "Sitti Abdulrahman", email: "sabdulrahman@barmm.gov.ph", role: "lgu", region: "BARMM", status: "inactive", last: "Apr 10, 2026" },
  { id: 6, name: "Public API User", email: "api@doh.gov.ph", role: "public", region: "—", status: "active", last: "Today, 11:20 AM" },
];

const permissions: Record<string, Record<string, boolean>> = {
  admin: { view: true, edit: true, download: true, upload: true, manage_users: true, api: true },
  researcher: { view: true, edit: false, download: true, upload: true, manage_users: false, api: true },
  analyst: { view: true, edit: false, download: true, upload: false, manage_users: false, api: false },
  lgu: { view: true, edit: false, download: true, upload: false, manage_users: false, api: false },
  public: { view: true, edit: false, download: false, upload: false, manage_users: false, api: false },
};

const roleColors: Record<string, { bg: string; text: string }> = {
  admin: { bg: "bg-purple-50", text: "text-purple-700" },
  researcher: { bg: "bg-blue-50", text: "text-blue-700" },
  analyst: { bg: "bg-indigo-50", text: "text-indigo-700" },
  lgu: { bg: "bg-green-50", text: "text-green-700" },
  public: { bg: "bg-gray-100", text: "text-gray-600" },
};

const permLabels = ["view", "edit", "download", "upload", "manage_users", "api"];
const permDisplay: Record<string, string> = {
  view: "View Data", edit: "Edit Records", download: "Download", upload: "Upload Data", manage_users: "Manage Users", api: "API Access"
};

export function UserManagement() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"users" | "roles">("users");

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.region.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <BackButton />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-gray-900 text-xl font-bold">User Management</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage system users, roles, and access permissions</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white rounded-lg w-fit" style={{ background: "#1E3A8A" }}>
          <Plus size={14} /> Add User
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Users", value: users.length, color: "#1E3A8A" },
          { label: "Active", value: users.filter(u => u.status === "active").length, color: "#10B981" },
          { label: "LGU Officers", value: users.filter(u => u.role === "lgu").length, color: "#6366F1" },
          { label: "Inactive", value: users.filter(u => u.status === "inactive").length, color: "#F59E0B" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {(["users", "roles"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
              activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "users" ? "👤 Users" : "🔐 Roles & Permissions"}
          </button>
        ))}
      </div>

      {activeTab === "users" && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["User", "Role", "Region", "Status", "Last Login", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                          style={{ background: "#1E3A8A" }}>
                          {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${roleColors[user.role].bg} ${roleColors[user.role].text}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{user.region}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        user.status === "active" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                      }`}>
                        {user.status === "active" ? "● Active" : "○ Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{user.last}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-blue-600"><Edit3 size={13} /></button>
                        <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-yellow-600"><Key size={13} /></button>
                        <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-red-600"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "roles" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <Shield size={16} style={{ color: "#1E3A8A" }} />
              <h3 className="font-semibold text-gray-800 text-sm">Role Permission Matrix</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Permission</th>
                    {Object.keys(permissions).map((role) => (
                      <th key={role} className="px-4 py-3 text-center text-xs font-semibold text-gray-500 capitalize whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full ${roleColors[role].bg} ${roleColors[role].text}`}>
                          {role}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {permLabels.map((perm) => (
                    <tr key={perm} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-700">{permDisplay[perm]}</td>
                      {Object.keys(permissions).map((role) => (
                        <td key={role} className="px-4 py-3 text-center">
                          <div className="flex justify-center">
                            <div
                              className={`w-8 h-4 rounded-full transition-colors relative cursor-pointer ${
                                permissions[role][perm] ? "bg-green-500" : "bg-gray-200"
                              }`}
                            >
                              <div
                                className={`w-3 h-3 rounded-full bg-white shadow-sm absolute top-0.5 transition-all ${
                                  permissions[role][perm] ? "left-4" : "left-0.5"
                                }`}
                              />
                            </div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
