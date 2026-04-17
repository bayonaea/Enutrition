import { useState } from "react";
import { Megaphone, Plus, Edit3, Trash2, Eye, Calendar, Tag, Globe, Pin } from "lucide-react";

const posts = [
  {
    id: 1,
    type: "announcement",
    title: "NNS 2026 Field Operations Commence Next Month",
    excerpt: "The National Nutrition Council announces the start of field operations for the 2026 National Nutrition Survey beginning May 15, 2026. All regional coordinators are advised to...",
    author: "NNC Communications",
    date: "April 15, 2026",
    status: "published",
    pinned: true,
    views: 1240,
    tags: ["NNS 2026", "Field Operations"],
  },
  {
    id: 2,
    type: "event",
    title: "Training Workshop: E-Nutrition Platform Orientation",
    excerpt: "Join us for a two-day orientation training on the new E-Nutrition digital platform for all regional field supervisors and LGU nutrition officers...",
    author: "Training Division",
    date: "April 12, 2026",
    status: "published",
    pinned: false,
    views: 842,
    tags: ["Training", "Platform"],
  },
  {
    id: 3,
    type: "news",
    title: "Philippines Achieves Significant Reduction in Child Stunting",
    excerpt: "Latest data from the National Nutrition Survey shows a significant 12.2 percentage point reduction in child stunting from 2019 to 2024, marking a historic milestone...",
    author: "Research Division",
    date: "April 10, 2026",
    status: "published",
    pinned: false,
    views: 3201,
    tags: ["Research", "Stunting"],
  },
  {
    id: 4,
    type: "opportunity",
    title: "Call for Applications: Nutrition Research Grant 2026",
    excerpt: "The National Nutrition Council is accepting applications for the 2026 Nutrition Research Grant. Eligible researchers may apply for grants up to PHP 2,000,000...",
    author: "Research Division",
    date: "April 8, 2026",
    status: "draft",
    pinned: false,
    views: 0,
    tags: ["Grant", "Research"],
  },
  {
    id: 5,
    type: "news",
    title: "New Partnership with DOH for Integrated Nutrition Data",
    excerpt: "The NNC and Department of Health have formalized a data-sharing agreement that will integrate nutrition data with the health management information system...",
    author: "NNC Communications",
    date: "April 5, 2026",
    status: "published",
    pinned: false,
    views: 1840,
    tags: ["Partnership", "DOH"],
  },
];

const typeConfig: Record<string, { color: string; bg: string; label: string; icon: string }> = {
  announcement: { color: "#1E3A8A", bg: "#eff6ff", label: "Announcement", icon: "📢" },
  event: { color: "#10B981", bg: "#f0fdf4", label: "Event", icon: "📅" },
  news: { color: "#6366F1", bg: "#f5f3ff", label: "News", icon: "📰" },
  opportunity: { color: "#F59E0B", bg: "#fffbeb", label: "Opportunity", icon: "💼" },
};

export function Announcements() {
  const [activeTab, setActiveTab] = useState<"all" | "drafts" | "editor">("all");
  const [filterType, setFilterType] = useState("all");
  const [editForm, setEditForm] = useState({
    title: "",
    type: "announcement",
    content: "",
    tags: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const filtered = posts.filter((p) => {
    const matchType = filterType === "all" || p.type === filterType;
    const matchTab = activeTab === "drafts" ? p.status === "draft" : p.status === "published";
    return matchType && matchTab;
  });

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-gray-900 text-xl font-bold">Announcements & CMS</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage news, events, and official announcements</p>
        </div>
        <button
          onClick={() => { setActiveTab("editor"); setIsEditing(true); }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white rounded-lg w-fit"
          style={{ background: "#1E3A8A" }}
        >
          <Plus size={14} /> New Post
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Published", value: posts.filter(p => p.status === "published").length, color: "#10B981" },
          { label: "Drafts", value: posts.filter(p => p.status === "draft").length, color: "#F59E0B" },
          { label: "Total Views", value: posts.reduce((a, p) => a + p.views, 0).toLocaleString(), color: "#1E3A8A" },
          { label: "Pinned", value: posts.filter(p => p.pinned).length, color: "#6366F1" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
            <div className="text-xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {(["all", "drafts", "editor"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
              activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "all" ? "📋 Published" : tab === "drafts" ? "📝 Drafts" : "✏️ Editor"}
          </button>
        ))}
      </div>

      {(activeTab === "all" || activeTab === "drafts") && (
        <>
          {/* Type Filter */}
          <div className="flex gap-2 flex-wrap">
            {["all", "announcement", "event", "news", "opportunity"].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all capitalize ${
                  filterType === t
                    ? "text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={filterType === t ? { background: "#1E3A8A" } : {}}
              >
                {t === "all" ? "All Types" : typeConfig[t]?.icon + " " + typeConfig[t]?.label}
              </button>
            ))}
          </div>

          {/* Posts */}
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-400">
                <Megaphone size={28} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm">No posts found</p>
              </div>
            ) : filtered.map((post) => {
              const cfg = typeConfig[post.type];
              return (
                <div key={post.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: cfg.bg, color: cfg.color }}>
                          {cfg.icon} {cfg.label}
                        </span>
                        {post.pinned && (
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-orange-50 text-orange-600 flex items-center gap-0.5">
                            <Pin size={9} /> Pinned
                          </span>
                        )}
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          post.status === "published" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                        }`}>
                          {post.status}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900">{post.title}</h3>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Calendar size={10} /> {post.date}</span>
                        <span>by {post.author}</span>
                        {post.views > 0 && <span className="flex items-center gap-1"><Eye size={10} /> {post.views.toLocaleString()} views</span>}
                      </div>
                      <div className="flex gap-1.5 mt-2">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 flex items-center gap-0.5">
                            <Tag size={8} /> {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0 mt-1">
                      <button className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors"><Eye size={13} /></button>
                      <button className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-yellow-600 transition-colors" onClick={() => setActiveTab("editor")}><Edit3 size={13} /></button>
                      <button className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={13} /></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {activeTab === "editor" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-3">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">Post Title *</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  placeholder="Enter a clear, descriptive title..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 font-medium"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">Content *</label>
                <textarea
                  value={editForm.content}
                  onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                  placeholder="Write your announcement here..."
                  rows={10}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 resize-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
              <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wide">Publish Settings</h3>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Post Type</label>
                <select
                  value={editForm.type}
                  onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none bg-white"
                >
                  <option value="announcement">📢 Announcement</option>
                  <option value="event">📅 Event</option>
                  <option value="news">📰 News</option>
                  <option value="opportunity">💼 Opportunity</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={editForm.tags}
                  onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                  placeholder="e.g. NNS 2026, Training"
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <input type="checkbox" style={{ accentColor: "#1E3A8A" }} />
                <label className="text-gray-600">Pin this post</label>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked style={{ accentColor: "#1E3A8A" }} />
                <label className="text-gray-600">Show on public portal</label>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button className="py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  Save Draft
                </button>
                <button className="py-2 text-sm text-white rounded-lg transition-colors" style={{ background: "#1E3A8A" }}>
                  Publish Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
