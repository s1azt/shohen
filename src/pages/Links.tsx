import React, { useState } from "react";
import { Globe, Search, ArrowUpRight, ExternalLink } from "lucide-react";
import { linkCollection } from "../data/links";

export const Links: React.FC<{ isMidnight?: boolean }> = ({ isMidnight }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("すべて");

  const categories = ["すべて", "業務ツール", "開発・技術", "ナレッジ", "ポータル", "社内生活"] as const;

  const categoryMap: Record<string, string> = {
    "すべて": "すべて",
    "業務ツール": "work",
    "開発・技術": "development",
    "ナレッジ": "knowledge",
    "ポータル": "portal",
    "社内生活": "life"
  };

  // カテゴリごとの配色定義
  const colorMap: Record<string, { bg: string; text: string; border: string; icon: string }> = {
    work: { bg: "bg-emerald-50/50", text: "text-emerald-700", border: "border-emerald-100", icon: "text-emerald-500" },
    development: { bg: "bg-blue-50/50", text: "text-blue-700", border: "border-blue-100", icon: "text-blue-500" },
    knowledge: { bg: "bg-amber-50/50", text: "text-amber-700", border: "border-amber-100", icon: "text-amber-500" },
    portal: { bg: "bg-indigo-50/50", text: "text-indigo-700", border: "border-indigo-100", icon: "text-indigo-500" },
    life: { bg: "bg-rose-50/50", text: "text-rose-700", border: "border-rose-100", icon: "text-rose-500" },
  };

  const filteredLinks = (linkCollection || []).filter(link => {
    const matchesSearch = 
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      link.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const activeKey = categoryMap[activeCategory];
    const matchesCategory = activeKey === "すべて" || link.category === activeKey;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-main-container font-sans">
      
      {/* 1. ヘッダー（既存維持） */}
      <header className={`header-underline-bold mb-4 ${isMidnight ? 'border-blue-600' : 'border-[#064e3b]'}`}>
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-2 text-left">
          <div className="flex items-center gap-7">
            <div className={`header-icon-squircle ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}>
              <Globe size={32} strokeWidth={1.5} className="text-white" />
            </div>
            <div>
              <h2 className={`header-title-main ${isMidnight ? 'text-white' : 'text-[#1a2e25]'}`}>リンク集</h2>
              <div className="flex items-center gap-3 mt-4">
                <div className={`h-[2px] w-6 ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}></div>
                <p className="header-subtitle-sub uppercase tracking-[0.4em] opacity-40 italic">Link Assets</p>
              </div>
            </div>
          </div>

          <div className="relative w-full md:w-80 group pb-1">
            <Search className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${isMidnight ? 'text-slate-500 group-focus-within:text-blue-400' : 'text-slate-300 group-focus-within:text-[#064e3b]'}`} size={16} strokeWidth={3} />
            <input 
              type="text" 
              placeholder="Search library..." 
              className={`w-full pl-12 pr-6 py-3.5 rounded-2xl font-bold text-[12px] outline-none border transition-all ${
                isMidnight ? 'bg-slate-900 border-slate-800 text-white focus:border-blue-500/50' : 'bg-slate-50 border-slate-100 text-[#1a2e25] focus:bg-white focus:ring-4 focus:ring-emerald-50/50'
              }`}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* 2. カテゴリータブ */}
      <div className="category-tab-container mb-10">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)} 
            className={`category-tab-button ${activeCategory === cat ? (isMidnight ? "tab-active-midnight" : "tab-active-normal") : "tab-inactive"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. コンテンツ表示エリア */}
      {activeCategory === "すべて" ? (
        /* --- 縦並びリスト形式（すべて表示時） --- */
        <div className={`standard-card overflow-hidden shadow-xl border-none divide-y transition-all duration-700 ${
          isMidnight ? 'bg-slate-800/60 border-slate-700 divide-slate-700' : 'bg-white border-transparent divide-slate-50'
        }`}>
          {filteredLinks.map((link) => (
            <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className={`flex items-center justify-between p-4 px-8 transition-all group no-underline ${isMidnight ? 'hover:bg-slate-700/30' : 'hover:bg-slate-50/80'}`}>
              <div className="flex items-center gap-5 min-w-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${isMidnight ? 'bg-slate-700 text-blue-400' : 'bg-slate-50 text-slate-400 group-hover:bg-[#064e3b] group-hover:text-white'}`}>
                  <ExternalLink size={18} strokeWidth={2} />
                </div>
                <div className="text-left min-w-0">
                  <span className="text-[8px] font-[1000] text-slate-400 uppercase tracking-widest leading-none">{link.category}</span>
                  <h4 className={`text-[15px] font-black tracking-tight truncate leading-tight transition-all group-hover:translate-x-1 ${isMidnight ? 'text-slate-200' : 'text-slate-800'}`}>{link.title}</h4>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <p className="hidden lg:block text-[11px] font-bold text-slate-400 truncate opacity-60 max-w-[300px]">{link.desc}</p>
                <div className={`p-2 rounded-lg transition-all group-hover:translate-x-1 ${isMidnight ? 'text-blue-400 group-hover:bg-blue-600 group-hover:text-white' : 'text-slate-300 group-hover:bg-[#064e3b] group-hover:text-white'}`}>
                  <ArrowUpRight size={16} strokeWidth={3} />
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        /* --- カード形式（個別カテゴリ選択時） --- */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLinks.map((link) => {
            const colors = colorMap[link.category] || colorMap.work;
            return (
              <a 
                key={link.id} 
                href={link.url} 
                target="_blank" 
                rel="noreferrer" 
                className={`group flex flex-col p-7 rounded-[2.5rem] border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl no-underline text-left relative overflow-hidden ${
                  isMidnight 
                    ? 'bg-slate-800/40 border-slate-700 hover:border-blue-500/50' 
                    : `${colors.bg} ${colors.border} hover:bg-white`
                }`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
                    isMidnight 
                      ? 'bg-slate-700 text-blue-400 group-hover:bg-blue-600 group-hover:text-white' 
                      : `bg-white ${colors.icon} group-hover:bg-[#1a2e25] group-hover:text-white`
                  }`}>
                    <ExternalLink size={24} />
                  </div>
                  <ArrowUpRight size={20} strokeWidth={3} className={isMidnight ? 'text-slate-600 group-hover:text-blue-400' : 'text-slate-300 group-hover:text-[#1a2e25]'} />
                </div>
                
                <h4 className={`text-[17px] font-[1000] tracking-tight leading-tight mb-3 ${isMidnight ? 'text-slate-100' : 'text-[#1a2e25]'}`}>
                  {link.title}
                </h4>
                
                <p className={`text-[12px] font-bold leading-relaxed line-clamp-3 mb-4 ${isMidnight ? 'text-slate-400' : 'text-slate-600/80'}`}>
                  {link.desc}
                </p>

                <div className={`mt-auto pt-4 border-t border-dashed ${isMidnight ? 'border-slate-700' : 'border-black/5'}`}>
                  <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isMidnight ? 'text-blue-400/60' : colors.text}`}>
                    {activeCategory} Asset
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      )}

      {filteredLinks.length === 0 && (
        <div className="py-24 text-center text-slate-400 italic text-[12px] font-bold uppercase tracking-widest">No assets found</div>
      )}

      <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em] pt-16 opacity-40">Strategic Link Assets End</p>
    </div>
  );
};