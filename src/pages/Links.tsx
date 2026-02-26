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
      
      {/* 1. ヘッダー（規格維持） */}
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
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search 
                className={`transition-colors ${isMidnight ? 'text-slate-500 group-focus-within:text-blue-400' : 'text-slate-300 group-focus-within:text-[#064e3b]'}`} 
                size={16} strokeWidth={3} 
              />
            </div>
            <input 
              type="text" 
              placeholder="Search library..." 
              className={`w-full pl-12 pr-6 py-3.5 rounded-2xl font-bold text-[12px] outline-none border transition-all ${
                isMidnight 
                  ? 'bg-slate-900 border-slate-800 text-white focus:border-blue-500/50' 
                  : 'bg-slate-50 border-slate-100 text-[#1a2e25] focus:bg-white focus:ring-4 focus:ring-emerald-50/50'
              }`}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* 2. カテゴリータブ（規格維持） */}
      <div className="category-tab-container mb-8">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)} 
            className={`category-tab-button ${
              activeCategory === cat 
                ? (isMidnight ? "tab-active-midnight" : "tab-active-normal") 
                : "tab-inactive"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. スリム化されたリンク一覧 */}
      <div className={`standard-card overflow-hidden shadow-xl border-none divide-y transition-all duration-700 ${
        isMidnight ? 'bg-slate-800/60 border-slate-700 divide-slate-700' : 'bg-white border-transparent divide-slate-50'
      }`}>
        {filteredLinks.length > 0 ? (
          filteredLinks.map((link) => (
            <a 
              key={link.id} 
              href={link.url} 
              target="_blank" 
              rel="noreferrer" 
              className={`flex items-center justify-between p-4 px-8 transition-all group no-underline ${
                isMidnight ? 'hover:bg-slate-700/30' : 'hover:bg-slate-50/80'
              }`}
            >
              <div className="flex items-center gap-5 min-w-0">
                {/* 💡 アイコンを w-12 → w-10 へ小さく */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                  isMidnight 
                    ? 'bg-slate-700 text-blue-400 group-hover:bg-blue-600 group-hover:text-white' 
                    : 'bg-slate-50 text-slate-400 group-hover:bg-[#064e3b] group-hover:text-white'
                }`}>
                  <ExternalLink size={18} strokeWidth={2} />
                </div>
                
                <div className="text-left min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="text-[8px] font-[1000] text-slate-400 uppercase tracking-widest leading-none">
                      {link.category}
                    </span>
                  </div>
                  {/* 💡 タイトルのフォントサイズを微調整して凝縮感を出す */}
                  <h4 className={`text-[15px] font-black tracking-tight truncate leading-tight transition-all group-hover:translate-x-1 ${
                    isMidnight ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    {link.title}
                  </h4>
                </div>
              </div>
              
              <div className="flex items-center gap-4 shrink-0">
                {/* 💡 説明文を右側に配置し、一行の厚みを抑えるレイアウト */}
                <p className="hidden lg:block text-[11px] font-bold text-slate-400 truncate opacity-60 max-w-[300px]">
                  {link.desc}
                </p>
                <div className={`p-2 rounded-lg transition-all group-hover:translate-x-1 ${
                  isMidnight ? 'text-blue-400 group-hover:bg-blue-600 group-hover:text-white' : 'text-slate-300 group-hover:bg-[#064e3b] group-hover:text-white'
                }`}>
                  <ArrowUpRight size={16} strokeWidth={3} />
                </div>
              </div>
            </a>
          ))
        ) : (
          <div className="py-24 text-center text-slate-400 italic text-[12px] font-bold uppercase tracking-widest">
            No assets found
          </div>
        )}
      </div>

      <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em] pt-12 opacity-40">
        Strategic Link Assets End
      </p>
    </div>
  );
};