import React, { useState, useMemo } from "react";
import { Search, ArrowUpRight, ExternalLink } from "lucide-react";
import { linkCollection } from "../data/links";

const CATEGORY_MAP: Record<string, string> = {
  "一覧": "一覧",
  "勤怠・業務管理": "work",
  "開発・運用関連": "development",
  "晴海オフィス関連": "life",
  "人材育成関連": "portal",
};

const COLOR_MAP: Record<string, { bg: string; text: string; border: string; icon: string; iconBg: string; accent: string }> = {
  work:         { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: "text-emerald-500", iconBg: "bg-emerald-100", accent: "border-l-[5px] border-l-emerald-400" },
  development: { bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200",    icon: "text-blue-500",    iconBg: "bg-blue-100",    accent: "border-l-[5px] border-l-blue-400" },
  harumi:       { bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",   icon: "text-amber-500",   iconBg: "bg-amber-100",   accent: "border-l-[5px] border-l-amber-400" },
  portal:       { bg: "bg-indigo-50",  text: "text-indigo-700",  border: "border-indigo-200",  icon: "text-indigo-500",  iconBg: "bg-indigo-100",  accent: "border-l-[5px] border-l-indigo-400" },
  life:         { bg: "bg-rose-50",    text: "text-rose-700",    border: "border-rose-200",    icon: "text-rose-500",    iconBg: "bg-rose-100",    accent: "border-l-[5px] border-l-rose-400" },
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
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-1000 pb-10 px-4">
      
      {/* 1. インテリジェント・ナビゲーション & 検索バー */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col xl:flex-row gap-5 items-center">
          
          {/* 検索入力 */}
          <div className="relative w-full xl:w-80 group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search 
                className="text-slate-300 group-focus-within:text-(--gs-accent)" 
                size={16} 
                strokeWidth={3} 
              />
            </div>
            <input 
              type="text" 
              placeholder="リンクを検索..." 
              className="w-full pl-12 pr-6 py-3.5 rounded-[1.6rem] font-bold text-[13px] outline-none border bg-(--gs-card-bg) border-slate-100 text-(--gs-text-primary) shadow-sm focus:ring-4 focus:ring-(--gs-accent)/5 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* カテゴリー選択タブ */}
          <div className="flex bg-slate-100/80 p-1.5 rounded-[1.8rem] border border-slate-200 w-full overflow-x-auto scrollbar-hide backdrop-blur-sm">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)} 
                className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-[1.4rem] font-black text-[12px] tracking-widest transition-all duration-300 ${
                  activeCategory === cat 
                    ? "bg-white text-(--gs-accent) shadow-md transform scale-[1.02]" 
                    : "text-slate-400 hover:text-slate-600 hover:bg-white/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. コンテンツ表示エリア */}
      
      {/* --- リスト形式（「一覧」選択時） --- */}
      <div className={`${activeCategory !== "一覧" ? "hidden" : ""} rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-50 divide-y bg-(--gs-card-bg) divide-slate-50`}>
        {filteredLinks.map((link) => {
          const colors = COLOR_MAP[link.category] || COLOR_MAP.work;
          return (
            <a 
              key={link.id} 
              href={link.url} 
              target="_blank" 
              rel="noreferrer" 
              className={`flex items-center justify-between p-5 px-8 group no-underline transition-colors ${colors.accent} hover:bg-slate-50/80`}
            >
              <div className="flex items-center gap-6 min-w-0">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 bg-white shadow-sm ${colors.icon} group-hover:bg-(--gs-accent) group-hover:text-white transition-all duration-300`}>
                  <ExternalLink size={20} strokeWidth={2} />
                </div>
                <div className="text-left min-w-0">
                  <span className={`text-[10px] font-black uppercase tracking-widest leading-none mb-1 block ${colors.text}`}>
                    {link.category}
                  </span>
                  <h4 className="text-[16px] font-black tracking-tight truncate leading-tight text-(--gs-text-primary)">
                    {link.title}
                  </h4>
                </div>
              </div>
              <div className="flex items-center gap-6 shrink-0 pl-4">
                <p className="hidden lg:block text-[12px] font-medium text-slate-400 truncate opacity-70 max-w-[350px]">
                  {link.desc}
                </p>
                <div className={`p-2.5 rounded-xl transition-all duration-300 ${colors.icon} group-hover:bg-(--gs-accent) group-hover:text-white group-hover:translate-x-1`}>
                  <ArrowUpRight size={18} strokeWidth={3} />
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* --- カード形式（個別カテゴリ選択時） --- */}
      <div className={`${activeCategory === "一覧" ? "hidden" : ""} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
        {filteredLinks.map((link) => {
          const colors = COLOR_MAP[link.category] || COLOR_MAP.work;
          return (
            <a 
              key={link.id} 
              href={link.url} 
              target="_blank" 
              rel="noreferrer" 
              className="group flex flex-col rounded-[2.5rem] border border-slate-100 hover:border-(--gs-accent)/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl no-underline text-left relative overflow-hidden bg-(--gs-card-bg)"
            >
              <div className={`h-1.5 w-full ${colors.iconBg} opacity-50`} />
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colors.iconBg} ${colors.icon} group-hover:bg-(--gs-accent) group-hover:text-white transition-all duration-300 group-hover:rotate-6`}>
                    <ExternalLink size={24} />
                  </div>
                  <ArrowUpRight size={20} strokeWidth={3} className="text-slate-200 group-hover:text-(--gs-accent) transition-colors" />
                </div>
                
                <h4 className="text-[18px] font-black tracking-tight leading-tight mb-3 text-(--gs-text-primary)">
                  {link.title}
                </h4>
                
                <p className="text-[13px] font-medium leading-relaxed line-clamp-3 mb-6 text-(--gs-text-primary)/50">
                  {link.desc}
                </p>

                <div className="mt-auto pt-5 border-t border-dashed border-slate-100">
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] bg-slate-50 px-2 py-1 rounded ${colors.text}`}>
                    {activeCategory}
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* 3. 検索結果なし・フッター */}
      {filteredLinks.length === 0 && (
        <div className="py-32 text-center">
          <div className="inline-flex p-6 rounded-full bg-slate-50 mb-4 text-slate-200">
            <ExternalLink size={40} />
          </div>
          <p className="text-slate-400 italic text-[13px] font-black uppercase tracking-widest">
            No assets found
          </p>
        </div>
      )}

      <div className="pt-16 pb-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-4" />
        <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">
          Strategic Link Assets End
        </p>
      </div>
    </div>
  );
};