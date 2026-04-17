import { Outlet, NavLink, useNavigate, useLocation } from "react-router";
import { useState } from "react";
import {
  LayoutDashboard, ClipboardList, Database, BarChart3, Globe,
  Users, Code2, GraduationCap, FileText, Megaphone, Brain,
  ChevronLeft, ChevronRight, Bell, Search, User, LogOut,
  Server, Menu, X
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard, section: "overview" },
  { label: "Data Collection", path: "/data-collection", icon: ClipboardList, section: "data" },
  { label: "Data Management", path: "/data-management", icon: Database, section: "data" },
  { label: "Data Warehouse", path: "/data-warehouse", icon: Server, section: "data" },
  { label: "Analytics", path: "/analytics", icon: BarChart3, section: "insights" },
  { label: "AI Insights", path: "/ai-insights", icon: Brain, section: "insights" },
  { label: "Report Generator", path: "/reports", icon: FileText, section: "insights" },
  { label: "Public Portal", path: "/public-portal", icon: Globe, section: "portal" },
  { label: "Announcements", path: "/announcements", icon: Megaphone, section: "portal" },
  { label: "User Management", path: "/users", icon: Users, section: "admin" },
  { label: "API & Integration", path: "/api", icon: Code2, section: "admin" },
  { label: "Training", path: "/training", icon: GraduationCap, section: "admin" },
];

const sectionLabels: Record<string, string> = {
  overview: "Overview",
  data: "Data Pipeline",
  insights: "Insights & Reports",
  portal: "Public Access",
  admin: "Administration",
};

export function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const groupedNav = navItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, typeof navItems>);

  const sectionOrder = ["overview", "data", "insights", "portal", "admin"];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative z-50 flex flex-col h-full transition-all duration-300 ease-in-out
          ${collapsed ? "w-16" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{ background: "linear-gradient(180deg, #0f2356 0%, #1E3A8A 60%, #1a3a7a 100%)" }}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#10B981" }}>
                <span className="text-white text-xs font-bold">EN</span>
              </div>
              <div>
                <div className="text-white text-sm font-bold leading-tight">E-Nutrition</div>
                <div className="text-blue-200 text-xs">National System</div>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto" style={{ background: "#10B981" }}>
              <span className="text-white text-xs font-bold">EN</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-6 h-6 rounded text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-blue-200 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin">
          {sectionOrder.map((section) => (
            <div key={section} className="mb-1">
              {!collapsed && (
                <div className="px-4 py-1.5 text-blue-300/60 text-[10px] uppercase tracking-widest font-semibold">
                  {sectionLabels[section]}
                </div>
              )}
              {groupedNav[section]?.map((item) => {
                const isActive = item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path);
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`
                      flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm transition-all duration-150
                      ${isActive
                        ? "bg-white/15 text-white shadow-sm"
                        : "text-blue-200 hover:bg-white/8 hover:text-white"
                      }
                      ${collapsed ? "justify-center" : ""}
                    `}
                  >
                    <item.icon size={16} className={isActive ? "text-green-400" : ""} />
                    {!collapsed && <span>{item.label}</span>}
                    {!collapsed && isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400" />
                    )}
                  </NavLink>
                );
              })}
              {!collapsed && <div className="mx-4 mt-2 border-b border-white/5" />}
            </div>
          ))}
        </nav>

        {/* User profile */}
        <div className="p-3 border-t border-white/10">
          {!collapsed ? (
            <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-xs font-medium truncate">Juan Dela Cruz</div>
                <div className="text-blue-300 text-[10px] truncate">System Admin</div>
              </div>
              <button onClick={() => navigate("/login")} className="text-blue-300 hover:text-white">
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
                JD
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between px-4 lg:px-6 py-3 bg-white border-b border-gray-100 shadow-sm z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu size={20} />
            </button>
            <div className="relative hidden sm:block">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search modules, data, reports..."
                className="pl-9 pr-4 py-1.5 text-sm bg-gray-100 rounded-lg border-0 outline-none focus:bg-gray-200 w-64 lg:w-80 transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: "#dcfce7", color: "#166534" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              System Online
            </div>
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <User size={18} />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
