import React, { useState } from "react";
import { Search, Globe, ArrowUpRight, ExternalLink } from "lucide-react";
import { linkCollection, LinkItem } from "../data/links";

/**
 * カテゴリ定義
 */
const categories = ["一覧", "業務・申請", "揮発・運用", "ナレッジ", "ポータル", "社内生活"] as const;

/**
 * カラーマッピング（リストバッジ用とカードアクセント用を統合）
 */
const categoryStyles: Record<string, { badge: string; border: string; icon: string }> = {
  work: { 
    badge: "bg-blue-50 text-blue-600 border-blue-100", 
    border: "border-blue-500", 
    icon: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
  },
  development: { 
    badge: "bg-emerald-50 text-emerald-600 border-emerald-100", 
    border: "border-emerald-500", 
    icon: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" 
  },
  knowledge: { 
    badge: "bg-amber-50 text-amber-600 border-amber-100", 
    border: "border-amber-500", 
    icon: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" 
  },
  life: { 
    badge: "bg-rose-50 text-rose-600 border-rose-100", 
    border: "border-rose-500", 
    icon: "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400" 
  },
  portal: { 
    badge: "bg-indigo-50 text-indigo-600 border-indigo-100", 
    border: "border-indigo-500", 
    icon: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400" 
  },
};

export const Links: React.FC<{ isMidnight?: boolean }> = ({ isMidnight }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("一覧");

  const filteredLinks = (linkCollection || []).filter(link => {
    const matchesSearch = 
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "一覧" || link.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-main-container">
      {/* 💡 ヘッダー：共通規格 */}
      <header className={`header-underline-bold ${isMidnight ? 'border-blue-600' : 'border-[#064e3b]'}`}>
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="flex items-center gap-7">
            <div className={`header-icon-squircle ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}>
              <Globe size={32} strokeWidth={1.5} />
            </div>
            
            <div className="text-left">
              <h2 className={`header-title-main text-6xl ${isMidnight ? 'text-white' : 'text-[#1a2e25]'}`}>
                リンク集
              </h2>
              <div className="flex items-center gap-3 mt-4">
                <div className={`h-[2px] w-6 ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}></div>
                <p className="header-subtitle-sub">Internal Resource Directory</p>
              </div>
            </div>
          </div>

          {/* 検索窓 */}
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

      {/* 💡 カテゴリーフィルター（ご指定の深緑デザインを維持） */}
      <div className="flex gap-4 overflow-x-auto pb-8 px-1 scrollbar-hide">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)} 
            className={`px-5 py-2 rounded-lg text-sm font-bold tracking-wider transition-all whitespace-nowrap ${
              activeCategory === cat 
                ? (isMidnight ? "bg-blue-600 text-white shadow-md" : "bg-[#14532d] text-white shadow-md") 
                : (isMidnight ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-[#14532d]")
            }`}
          >
            {cat === "一覧" ? "一覧" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* 💡 表示ロジックの切り替え */}
      {activeCategory === "一覧" ? (
        /* --- 一覧モード: お知らせ風のリスト形式 --- */
        <div className={`standard-card divide-y shadow-xl animate-in fade-in duration-500 ${
          isMidnight ? 'bg-slate-800/60 border-slate-700 divide-slate-700' : 'bg-white border-transparent divide-slate-50'
        }`}>
          {filteredLinks.map((link) => (
            <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-7 hover:bg-slate-50/50 transition-all group">
              <div className="text-[12px] font-bold text-slate-400 font-mono tracking-tighter w-20 shrink-0">{link.id}</div>
              <div className="flex items-center gap-5 flex-grow min-w-0">
                <span className={`text-[9px] font-[1000] px-3 py-1 rounded uppercase tracking-widest border shrink-0 ${
                  isMidnight ? 'bg-slate-700 text-slate-300 border-slate-600' : categoryStyles[link.category].badge
                }`}>{link.category}</span>
                <div className="min-w-0">
                  <h4 className={`text-lg font-black truncate tracking-tight transition-transform group-hover:translate-x-1 ${isMidnight ? 'text-slate-200 group-hover:text-blue-400' : 'text-[#1a2e25] group-hover:text-[#064e3b]'}`}>{link.title}</h4>
                  <p className="text-xs font-bold text-slate-400 truncate mt-0.5 group-hover:translate-x-1 transition-transform">{link.desc}</p>
                </div>
              </div>
              <ArrowUpRight size={18} strokeWidth={2.5} className="opacity-0 group-hover:opacity-100 transition-all text-slate-400" />
            </a>
          ))}
        </div>
      ) : (
        /* --- カテゴリ別モード: リッチなカード形式 --- */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in zoom-in-95 duration-500">
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
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-sm group-hover:scale-110 ${style.icon}`}>
                  <ExternalLink size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className={`text-xl font-black leading-tight tracking-tight mb-2 ${isMidnight ? 'text-slate-200' : 'text-[#1a2e25]'}`}>{link.title}</h4>
                  <p className="text-xs font-bold text-slate-400 leading-relaxed line-clamp-2">{link.desc}</p>
                </div>
              </a>
            );
          })}
        </div>
      )}

      {/* 検索結果がゼロの場合 */}
      {filteredLinks.length === 0 && (
        <div className="py-32 text-center text-slate-400 italic text-sm">No resources found matching your search.</div>
      )}
    </div>
  );
};