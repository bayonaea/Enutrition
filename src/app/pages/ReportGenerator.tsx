import { useState } from "react";
import {
  FileText, BarChart3, Table, Type, Image, Plus,
  Download, Eye, GripVertical, Trash2, Settings, ChevronDown
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type BlockType = "title" | "text" | "chart" | "table" | "divider";

interface Block {
  id: string;
  type: BlockType;
  content?: string;
}

const previewChartData = [
  { region: "NCR", rate: 8.2 },
  { region: "IV-A", rate: 22.1 },
  { region: "IX", rate: 26.1 },
  { region: "XIII", rate: 27.2 },
  { region: "BARMM", rate: 31.5 },
];

const previewTableData = [
  ["Region", "Stunting %", "Wasting %", "Underweight %"],
  ["NCR", "8.2%", "2.1%", "5.4%"],
  ["BARMM", "31.5%", "8.2%", "24.8%"],
  ["Region XIII", "27.2%", "6.8%", "21.4%"],
];

const blockMenu: { type: BlockType; label: string; icon: React.ReactNode }[] = [
  { type: "title", label: "Heading", icon: <Type size={14} /> },
  { type: "text", label: "Text Block", icon: <FileText size={14} /> },
  { type: "chart", label: "Chart", icon: <BarChart3 size={14} /> },
  { type: "table", label: "Table", icon: <Table size={14} /> },
  { type: "divider", label: "Divider", icon: <span className="text-gray-400 text-xs">—</span> },
];

export function ReportGenerator() {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: "1", type: "title", content: "Regional Nutrition Status Report — Q1 2026" },
    { id: "2", type: "text", content: "This report presents the latest nutrition indicators across selected regions of the Philippines. Data sourced from the National Nutrition Survey 2024 with supplementary field surveys conducted Q1 2026." },
    { id: "3", type: "chart" },
    { id: "4", type: "table" },
  ]);
  const [showBlockMenu, setShowBlockMenu] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [generating, setGenerating] = useState(false);

  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: Date.now().toString(),
      type,
      content: type === "title" ? "New Section" : type === "text" ? "Enter text here..." : undefined,
    };
    setBlocks([...blocks, newBlock]);
    setShowBlockMenu(false);
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter((b) => b.id !== id));
  };

  const updateContent = (id: string, content: string) => {
    setBlocks(blocks.map((b) => b.id === id ? { ...b, content } : b));
  };

  const generatePDF = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2000);
  };

  const renderBlock = (block: Block, isPreview = false) => {
    switch (block.type) {
      case "title":
        return (
          <div key={block.id} className={`${isPreview ? "" : "group relative"}`}>
            {!isPreview && (
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                <GripVertical size={16} className="text-gray-300 cursor-grab" />
              </div>
            )}
            {isPreview ? (
              <h2 className="text-xl font-bold py-2 border-b-2 mb-3" style={{ color: "#1E3A8A", borderColor: "#1E3A8A" }}>
                {block.content}
              </h2>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  value={block.content || ""}
                  onChange={(e) => updateContent(block.id, e.target.value)}
                  className="flex-1 text-lg font-bold text-gray-900 border-b-2 py-1 outline-none focus:border-blue-500 transition-colors bg-transparent"
                  style={{ borderColor: "#1E3A8A" }}
                />
                <button onClick={() => removeBlock(block.id)} className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>
        );

      case "text":
        return (
          <div key={block.id} className={`${isPreview ? "" : "group relative"}`}>
            {isPreview ? (
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{block.content}</p>
            ) : (
              <div className="flex gap-2">
                <textarea
                  value={block.content || ""}
                  onChange={(e) => updateContent(block.id, e.target.value)}
                  rows={3}
                  className="flex-1 text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 resize-none"
                />
                <button onClick={() => removeBlock(block.id)} className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 mt-1 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>
        );

      case "chart":
        return (
          <div key={block.id} className={`${isPreview ? "" : "group relative border border-gray-100 rounded-xl p-3"}`}>
            {!isPreview && (
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500 flex items-center gap-1"><BarChart3 size={12} /> Bar Chart — Regional Stunting</span>
                <button onClick={() => removeBlock(block.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            )}
            {isPreview && <div className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Regional Stunting Rates (%)</div>}
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={previewChartData} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="region" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip contentStyle={{ fontSize: "11px", borderRadius: "8px" }} formatter={(v: number) => [`${v}%`]} />
                <Bar dataKey="rate" fill="#1E3A8A" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case "table":
        return (
          <div key={block.id} className={`${isPreview ? "" : "group relative border border-gray-100 rounded-xl p-3"}`}>
            {!isPreview && (
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500 flex items-center gap-1"><Table size={12} /> Data Table</span>
                <button onClick={() => removeBlock(block.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr style={{ background: "#1E3A8A" }}>
                    {previewTableData[0].map((h, i) => (
                      <th key={i} className="px-3 py-2 text-left font-semibold text-white whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewTableData.slice(1).map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      {row.map((cell, j) => (
                        <td key={j} className="px-3 py-2 text-gray-600 whitespace-nowrap">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "divider":
        return (
          <div key={block.id} className={`group relative py-2 ${isPreview ? "" : ""}`}>
            <hr className="border-gray-200" />
            {!isPreview && (
              <button onClick={() => removeBlock(block.id)} className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-colors">
                <Trash2 size={12} />
              </button>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-gray-900 text-xl font-bold">Report Generator</h1>
          <p className="text-gray-500 text-sm mt-0.5">Drag-and-drop report builder with PDF export</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreviewing(!previewing)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 bg-white"
          >
            <Eye size={13} /> {previewing ? "Edit Mode" : "Preview"}
          </button>
          <button
            onClick={generatePDF}
            disabled={generating}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white rounded-lg transition-colors"
            style={{ background: generating ? "#93c5fd" : "#1E3A8A" }}
          >
            {generating ? (
              <><div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</>
            ) : (
              <><Download size={13} /> Generate PDF</>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Block Palette */}
        {!previewing && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Add Blocks</h3>
            <div className="space-y-1.5">
              {blockMenu.map((item) => (
                <button
                  key={item.type}
                  onClick={() => addBlock(item.type)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left border border-gray-100 hover:border-gray-200"
                >
                  <span className="text-gray-500">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-4 border-t border-gray-100 pt-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Report Settings</h3>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Orientation</label>
                  <select className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none bg-white">
                    <option>Portrait</option>
                    <option>Landscape</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Paper Size</label>
                  <select className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none bg-white">
                    <option>A4</option>
                    <option>Letter</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <input type="checkbox" defaultChecked style={{ accentColor: "#1E3A8A" }} />
                  Include NNC logo
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <input type="checkbox" defaultChecked style={{ accentColor: "#1E3A8A" }} />
                  Include page numbers
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Editor / Preview */}
        <div className={`${previewing ? "lg:col-span-4" : "lg:col-span-3"}`}>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            {/* Document header */}
            <div className="px-6 pt-5 pb-3 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>📄</span>
                <span>E-Nutrition System · NNC Philippines</span>
                {previewing && <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full font-medium">Preview Mode</span>}
              </div>
              <span className="text-xs text-gray-300">April 17, 2026</span>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 min-h-96">
              {blocks.map((block) => renderBlock(block, previewing))}

              {!previewing && (
                <div className="relative">
                  <button
                    onClick={() => setShowBlockMenu(!showBlockMenu)}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 py-2 transition-colors"
                  >
                    <div className="w-5 h-5 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <Plus size={11} />
                    </div>
                    Add block
                  </button>
                  {showBlockMenu && (
                    <div className="absolute left-0 top-9 bg-white border border-gray-200 rounded-xl shadow-lg z-10 py-1 w-48">
                      {blockMenu.map((item) => (
                        <button
                          key={item.type}
                          onClick={() => addBlock(item.type)}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left"
                        >
                          {item.icon} {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <span>Page 1 of 1</span>
              <span>CONFIDENTIAL — National Nutrition Council</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
