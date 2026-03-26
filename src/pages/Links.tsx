import React, { useState, useMemo } from "react";
import { Globe, Search, ArrowUpRight, ExternalLink } from "lucide-react";
import { linkCollection } from "../data/links";

const CATEGORY_MAP: Record<string, string> = {
  "一覧": "一覧",
  "勤怠・業務管理": "work",
  "開発・運用関連": "development",
  "晴海オフィス関連": "life",
  "人材育成関連": "portal",
};

const COLOR_MAP: Record<string, { bg: string; text: string; border: string; icon: string; iconBg: string; accent: string }> = {
  work:        { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: "text-emerald-500", iconBg: "bg-emerald-100", accent: "border-l-[5px] border-l-emerald-400" },
  development: { bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200",    icon: "text-blue-500",    iconBg: "bg-blue-100",    accent: "border-l-[5px] border-l-blue-400" },
  harumi:      { bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",   icon: "text-amber-500",   iconBg: "bg-amber-100",   accent: "border-l-[5px] border-l-amber-400" },
  portal:      { bg: "bg-indigo-50",  text: "text-indigo-700",  border: "border-indigo-200",  icon: "text-indigo-500",  iconBg: "bg-indigo-100",  accent: "border-l-[5px] border-l-indigo-400" },
  life:        { bg: "bg-rose-50",    text: "text-rose-700",    border: "border-rose-200",    icon: "text-rose-500",    iconBg: "bg-rose-100",    accent: "border-l-[5px] border-l-rose-400" },
};

export const Links: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("一覧");

  const categories = ["一覧", "勤怠・業務管理", "開発・運用関連", "晴海オフィス関連", "人材育成関連"] as const;

  const filteredLinks = useMemo(() => {
    const lq = searchTerm.toLowerCase();
    const activeKey = CATEGORY_MAP[activeCategory];
    return (linkCollection || []).filter(link => {
      const matchesSearch = link.title.toLowerCase().includes(lq) || link.desc.toLowerCase().includes(lq);
      const matchesCategory = activeKey === "一覧" || link.category === activeKey;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="page-main-container font-sans">
      
      {/* 1. ヘッダー（既存維持） */}
      <header className="header-underline-bold mb-4 border-(--gs-accent)">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-2 text-left">
          <div className="flex items-center gap-7">
            <div className="header-icon-squircle bg-(--gs-accent)">
              <Globe size={32} strokeWidth={1.5} className="text-white" />
            </div>
            <div>
              <h2 className="header-title-main text-[#1a2e25]">リンク集</h2>
              <div className="flex items-center gap-3 mt-4">
                <div className="h-[2px] w-6 bg-(--gs-accent)"></div>
                <p className="header-subtitle-sub uppercase tracking-[0.4em] opacity-40 italic">Link Assets</p>
              </div>
            </div>
          </div>

          <div className="relative w-full md:w-80 group pb-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 transition-colors text-slate-300 group-focus-within:text-(--gs-accent)" size={16} strokeWidth={3} />
            <input 
              type="text" 
              placeholder="リンク集内検索" 
              className="w-full pl-12 pr-6 py-3.5 rounded-2xl font-bold text-[12px] outline-none border transition-all bg-slate-50 border-slate-100 text-[#1a2e25] focus:bg-white focus:ring-4 focus:ring-emerald-50/50"
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
            className={`category-tab-button ${activeCategory === cat ? "tab-active-normal" : "tab-inactive"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. コンテンツ表示エリア */}
      {/* --- 縦並びリスト形式（すべて表示時） --- */}
      <div className={`${activeCategory !== "一覧" ? "hidden" : ""} standard-card transition-none overflow-hidden shadow-xl border-none divide-y bg-white border-transparent divide-slate-50`}>
        {filteredLinks.map((link) => {
          const colors = COLOR_MAP[link.category] || COLOR_MAP.work;
          return (
            <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className={`flex items-center justify-between p-4 px-8 group no-underline ${colors.accent} hover:bg-slate-50/80`}>
              <div className="flex items-center gap-5 min-w-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white ${colors.icon} group-hover:bg-(--gs-accent) group-hover:text-white`}>
                  <ExternalLink size={18} strokeWidth={2} />
                </div>
                <div className="text-left min-w-0">
                  <span className={`text-[8px] font-[1000] uppercase tracking-widest leading-none ${colors.text}`}>{link.category}</span>
                  <h4 className="text-[15px] font-black tracking-tight truncate leading-tight text-slate-800">{link.title}</h4>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <p className="hidden lg:block text-[11px] font-bold text-slate-400 truncate opacity-60 max-w-[300px]">{link.desc}</p>
                <div className={`p-2 rounded-lg ${colors.icon} group-hover:bg-(--gs-accent) group-hover:text-white`}>
                  <ArrowUpRight size={16} strokeWidth={3} />
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* --- カード形式（個別カテゴリ選択時） --- */}
      <div className={`${activeCategory === "一覧" ? "hidden" : ""} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-none`}>
          {filteredLinks.map((link) => {
            const colors = COLOR_MAP[link.category] || COLOR_MAP.work;
            return (
              <a 
                key={link.id} 
                href={link.url} 
                target="_blank" 
                rel="noreferrer" 
                className={`group flex flex-col p-7 rounded-[2.5rem] border-2 transition-none hover:-translate-y-2 hover:shadow-2xl no-underline text-left relative overflow-hidden ${colors.bg} ${colors.border} hover:brightness-105`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colors.iconBg} ${colors.icon} group-hover:bg-[#1a2e25] group-hover:text-white`}>
                    <ExternalLink size={24} />
                  </div>
                  <ArrowUpRight size={20} strokeWidth={3} className={`${colors.icon} group-hover:text-[#1a2e25]`} />
                </div>
                
                <h4 className="text-[17px] font-[1000] tracking-tight leading-tight mb-3 text-[#1a2e25]">
                  {link.title}
                </h4>
                
                <p className="text-[12px] font-bold leading-relaxed line-clamp-3 mb-4 text-[#1a2e25]/60">
                  {link.desc}
                </p>

                <div className="mt-auto pt-4 border-t border-dashed border-black/5">
                  <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${colors.text}`}>
                    {activeCategory} 
                  </span>
                </div>
              </a>
            );
          })}
        </div>

      {filteredLinks.length === 0 && (
        <div className="py-24 text-center text-slate-400 italic text-[12px] font-bold uppercase tracking-widest">No assets found</div>
      )}

      <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em] pt-16 opacity-40">Strategic Link Assets End</p>
    </div>
  );
};