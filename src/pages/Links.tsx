import React, { useState, useMemo } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { linkCollection } from "../data/links";

const getFaviconUrl = (url: string) => {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  } catch {
    return null;
  }
};

const LinkFavicon: React.FC<{ url: string; size?: number; className?: string }> = ({ url, size = 20, className = "" }) => {
  const [failed, setFailed] = React.useState(false);
  const faviconUrl = getFaviconUrl(url);
  if (!faviconUrl || failed) return <ExternalLink size={size} strokeWidth={2} />;
  return (
    <img
      src={faviconUrl}
      width={size}
      height={size}
      className={`object-contain ${className}`}
      onError={() => setFailed(true)}
      alt=""
    />
  );
};

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
  const [activeCategory, setActiveCategory] = useState("一覧");

  const categories = ["一覧", "勤怠・業務管理", "開発・運用関連", "晴海オフィス関連", "人材育成関連"] as const;
  
  // 一覧表示時に並べる4つの実体カテゴリー
  const columnCategories = ["勤怠・業務管理", "開発・運用関連", "晴海オフィス関連", "人材育成関連"] as const;

  const filteredLinks = useMemo(() => {
    const activeKey = CATEGORY_MAP[activeCategory];
    return (linkCollection || []).filter(link => {
      const matchesCategory = activeKey === "一覧" || link.category === activeKey;
      return matchesCategory;
    });
  }, [activeCategory]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-1000 pb-10 px-4">
      
      {/* 1. カテゴリーナビゲーション */}
      <div className="flex justify-center">
        <div className="flex bg-slate-100/80 p-1.5 rounded-[2rem] border border-slate-200 w-full overflow-x-auto scrollbar-hide backdrop-blur-sm shadow-sm">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)} 
              className={`flex-1 min-w-[150px] py-3.5 px-6 rounded-[1.6rem] font-black text-[13px] tracking-widest transition-all duration-300 ${
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

      {/* 2. コンテンツ表示エリア */}
      
      {/* --- カテゴリ別4列表示（「一覧」選択時） --- */}
      <div className={`${activeCategory !== "一覧" ? "hidden" : ""} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start animate-in fade-in duration-500`}>
        {columnCategories.map((catName) => {
          const catKey = CATEGORY_MAP[catName];
          const links = (linkCollection || []).filter(l => l.category === catKey);
          const colors = COLOR_MAP[catKey] || COLOR_MAP.work;
          
          return (
            <div key={catName} className="space-y-4">
              {/* 列ヘッダー */}
              <div className="flex items-center gap-2 px-2 border-b border-slate-100 pb-2">
                <div className={`w-1 h-4 rounded-full`} style={{backgroundColor: `var(--gs-accent)`}} />
                <h3 className="font-black text-[14px] tracking-tight text-(--gs-text-primary) uppercase">
                  {catName}
                </h3>
              </div>

              {/* コンパクトなリンクカードリスト（一覧性を高めるため） */}
              <div className="space-y-2">
                {links.map((link) => (
                  <a 
                    key={link.id} 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`flex items-center gap-3 p-3 rounded-2xl bg-(--gs-card-bg) border border-slate-100 hover:border-(--gs-accent)/30 hover:shadow-md transition-all group no-underline`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${colors.iconBg} ${colors.icon} group-hover:bg-(--gs-accent) group-hover:text-white transition-all duration-300 shadow-sm`}>
                      <LinkFavicon url={link.url} size={16} />
                    </div>
                    <div className="min-w-0 flex-grow text-left">
                      <h4 className="text-[13px] font-bold tracking-tight truncate text-(--gs-text-primary) group-hover:text-(--gs-accent)">
                        {link.title}
                      </h4>
                    </div>
                    <ArrowUpRight size={14} className="text-slate-300 group-hover:text-(--gs-accent) shrink-0 transition-colors" />
                  </a>
                ))}
                {links.length === 0 && (
                  <div className="py-4 text-center text-slate-300 text-[11px] font-bold italic">
                    No Links
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* --- カード形式（個別カテゴリ選択時：以前のデザインを維持） --- */}
      <div className={`${activeCategory === "一覧" ? "hidden" : ""} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500`}>
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
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.iconBg} ${colors.icon} group-hover:bg-(--gs-accent) group-hover:text-white transition-all duration-300 group-hover:rotate-6 shadow-sm`}>
                    <LinkFavicon url={link.url} size={20} />
                  </div>
                  <ArrowUpRight size={18} strokeWidth={3} className="text-slate-400 group-hover:text-(--gs-accent) transition-colors" />
                </div>
                
                <h4 className="text-[19px] font-black tracking-tight leading-tight mb-3 text-(--gs-text-primary)">
                  {link.title}
                </h4>
                
                <p className="text-[14px] font-medium leading-relaxed line-clamp-2 mb-5 text-(--gs-text-primary)/60">
                  {link.desc}
                </p>

                <div className="mt-auto pt-4 border-t border-dashed border-slate-100">
                  <span className={`text-[12px] font-black uppercase tracking-[0.2em] bg-slate-50 px-3 py-1 rounded-lg ${colors.text}`}>
                    {activeCategory}
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* 3. フッター装飾 */}
      <div className="pt-16 pb-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-8" />
        <p className="text-center text-[12px] font-black text-slate-500 uppercase tracking-[0.5em]">
          Strategic Link Assets End
        </p>
      </div>
    </div>
  );
};