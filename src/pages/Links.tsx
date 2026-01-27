import React, { useState } from "react";
import { Search, Globe, ArrowUpRight, ExternalLink } from "lucide-react";
import { linkCollection, LinkItem } from "../data/links";

/**
 * カテゴリ定義
 */
const categories = [
  { id: "all", label: "All Resources", desc: "すべて" },
  { id: "work", label: "Work", desc: "業務・申請" },
  { id: "development", label: "Development", desc: "開発・運用" },
  { id: "knowledge", label: "Knowledge", desc: "ナレッジ" },
  { id: "portal", label: "Portal", desc: "ポータル" },
  { id: "life", label: "Life", desc: "社内生活" },
] as const;

/**
 * カテゴリごとのカラーマッピング
 */
const categoryStyles: Record<string, { light: string; dark: string; border: string; accent: string }> = {
  work: { light: "text-blue-700 bg-blue-50", dark: "text-blue-400 bg-blue-900/30", border: "border-blue-500", accent: "bg-blue-500" },
  development: { light: "text-emerald-700 bg-emerald-50", dark: "text-emerald-400 bg-emerald-900/30", border: "border-emerald-500", accent: "bg-emerald-500" },
  knowledge: { light: "text-amber-700 bg-amber-50", dark: "text-amber-400 bg-amber-900/30", border: "border-amber-500", accent: "bg-amber-500" },
  life: { light: "text-rose-700 bg-rose-50", dark: "text-rose-400 bg-rose-900/30", border: "border-rose-500", accent: "bg-rose-500" },
  portal: { light: "text-indigo-700 bg-indigo-50", dark: "text-indigo-400 bg-indigo-900/30", border: "border-indigo-500", accent: "bg-indigo-500" },
  all: { light: "text-slate-700 bg-slate-100", dark: "text-slate-300 bg-slate-800", border: "border-slate-400", accent: "bg-slate-400" },
};

export const Links: React.FC<{ isMidnight?: boolean }> = ({ isMidnight }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredLinks = (linkCollection || []).filter(link => {
    const matchesSearch = 
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || link.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-main-container">
      {/* 💡 ヘッダー：ナビゲーション */}
      <header className={`header-underline-bold ${isMidnight ? 'border-blue-600' : 'border-[#064e3b]'}`}>
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8">
          <div className="flex items-center gap-7">
            <div className={`header-icon-squircle ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}>
              <Globe size={32} strokeWidth={1.5} />
            </div>
            
            <div className="text-left">
              <h2 className={`header-title-main ${isMidnight ? 'text-white' : 'text-[#1a2e25]'}`}>
                Links
              </h2>
              <nav className="flex flex-wrap gap-x-6 gap-y-2 mt-4 ml-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="group flex flex-col items-start transition-all"
                  >
                    <span className={`text-[10px] font-[1000] uppercase tracking-[0.2em] leading-none ${
                      activeCategory === cat.id 
                        ? (isMidnight ? "text-blue-400" : "text-[#064e3b]") 
                        : "text-slate-300 hover:text-slate-500"
                    }`}>
                      {cat.label}
                    </span>
                    <div className={`h-1 mt-1 rounded-full transition-all duration-300 ${
                      activeCategory === cat.id 
                        ? `w-full ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}` 
                        : 'w-0 group-hover:w-4 bg-slate-200'
                    }`} />
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="relative w-full md:w-80 group pb-1">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search 
                className={`transition-colors ${isMidnight ? 'text-slate-500 group-focus-within:text-blue-400' : 'text-slate-300 group-focus-within:text-[#064e3b]'}`} 
                size={18} strokeWidth={3} 
              />
            </div>
            <input 
              type="text" 
              placeholder="Search resources..." 
              className={`w-full pl-14 pr-6 py-4 rounded-2xl font-bold text-sm outline-none border transition-all ${
                isMidnight 
                  ? 'bg-slate-900 border-slate-800 text-white focus:border-blue-500/50' 
                  : 'bg-slate-50 border-slate-100 text-[#1a2e25] focus:bg-white focus:ring-4 focus:ring-emerald-50/50'
              }`}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* 💡 コンテンツエリア：モード切替 */}
      {activeCategory === "all" ? (
        /* --- ALLモード: 全カテゴリーを1つのリストで一括表示 --- */
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex items-baseline gap-4 mb-6 ml-1">
            <div className="w-2 h-8 rounded-full bg-slate-400 opacity-80" />
            <h3 className={`text-2xl font-[1000] tracking-tighter uppercase ${isMidnight ? 'text-white' : 'text-[#1a2e25]'}`}>
              Master Index
            </h3>
          </div>
          
          <div className={`standard-card divide-y shadow-xl ${
            isMidnight ? 'bg-slate-800/60 border-slate-700 divide-slate-700' : 'bg-white border-transparent divide-slate-50'
          }`}>
            {filteredLinks.map((link) => {
              const style = categoryStyles[link.category];
              return (
                <a 
                  key={link.id} 
                  href={link.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center justify-between p-7 group hover:bg-slate-50/20 transition-all"
                >
                  <div className="flex items-center gap-8 min-w-0">
                    {/* カテゴリごとの色付きバッジ（一括表示時に識別しやすくするため） */}
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shrink-0 w-20 text-center ${
                      isMidnight ? style.dark : style.light
                    }`}>
                      {link.category}
                    </span>
                    <div className="min-w-0">
                      <h4 className={`text-lg font-black truncate tracking-tight transition-transform group-hover:translate-x-1 ${
                        isMidnight ? 'text-slate-200 group-hover:text-blue-400' : 'text-[#1a2e25] group-hover:text-[#064e3b]'
                      }`}>
                        {link.title}
                      </h4>
                      <p className="text-xs font-bold text-slate-400 truncate mt-1 group-hover:translate-x-1 transition-transform">
                        {link.desc}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight size={22} strokeWidth={3} className="text-slate-200 group-hover:text-slate-400 shrink-0" />
                </a>
              );
            })}
          </div>
        </div>
      ) : (
        /* --- カテゴリ別モード: 選ばれたジャンルをカード形式で表示 --- */
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex items-baseline gap-4 mb-8 ml-1">
            <div className={`w-2 h-8 rounded-full ${categoryStyles[activeCategory].accent} opacity-80`} />
            <h3 className={`text-3xl font-[1000] tracking-tighter uppercase ${isMidnight ? 'text-white' : 'text-[#1a2e25]'}`}>
              {categories.find(c => c.id === activeCategory)?.label}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLinks.map((link) => {
              const style = categoryStyles[link.category];
              return (
                <a 
                  key={link.id} 
                  href={link.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className={`p-8 standard-card border-none border-t-[5px] shadow-md hover:shadow-2xl aspect-[16/10] flex flex-col justify-between group transition-all duration-500 ${
                    isMidnight ? 'bg-slate-800/60' : 'bg-white'
                  } ${style.border}`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
                    isMidnight ? style.dark : style.light
                  } group-hover:scale-110 group-hover:shadow-lg`}>
                    <ExternalLink size={24} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className={`text-xl font-black leading-tight tracking-tight mb-2 ${
                      isMidnight ? 'text-slate-200' : 'text-[#1a2e25]'
                    }`}>
                      {link.title}
                    </h4>
                    <p className="text-xs font-bold text-slate-400 leading-relaxed line-clamp-2">
                      {link.desc}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* 検索結果がゼロの場合 */}
      {filteredLinks.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No resources found.</p>
        </div>
      )}
    </div>
  );
};