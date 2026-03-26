import React, { useState, useMemo } from "react";
import { Bell, Search, ArrowUpRight } from "lucide-react";
import { allNews } from "../data/news";

export const News: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("一覧");

  const categories = ["一覧", "重要", "社内", "通達", "イベント"];
  
  const isNewPost = (dateStr: string) => {
    const postDate = new Date(dateStr.replace(/\./g, '/'));
    const today = new Date();
    const diffTime = today.getTime() - postDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 3;
  };

  const filteredNews = useMemo(() => {
    const lq = searchTerm.toLowerCase();
    return (allNews || []).filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(lq);
      const matchesCategory = activeCategory === "一覧" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => b.date.localeCompare(a.date));
  }, [searchTerm, activeCategory]);

  return (
    <div className="page-main-container font-sans">
      {/* 1. ヘッダー：他ページと共通の「タイトル＋検索」構成 */}
      <header className="header-underline-bold mb-4 border-(--gs-accent)">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-2">
          <div className="flex items-center gap-7 text-left">
            <div className="header-icon-squircle bg-(--gs-accent)">
              <Bell size={32} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="header-title-main text-(--gs-text-primary)">お知らせ</h2>
              <div className="flex items-center gap-3 mt-4">
                <div className="h-[2px] w-6 bg-(--gs-accent)"></div>
                <p className="header-subtitle-sub uppercase tracking-[0.4em] opacity-40 italic">Corporate Updates</p>
              </div>
            </div>
          </div>

          {/* 検索窓：ヘッダー右端に配置 */}
          <div className="relative w-full md:w-80 group pb-1">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search 
                className="text-slate-300 group-focus-within:text-(--gs-accent)" 
                size={16} 
                strokeWidth={3} 
              />
            </div>
            <input 
              type="text" 
              placeholder="お知らせ内検索" 
              className="w-full pl-12 pr-6 py-3.5 rounded-2xl font-bold text-[12px] outline-none border bg-(--gs-card-bg) border-slate-100 text-(--gs-text-primary) focus:ring-4 focus:ring-emerald-50/50"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* 2. カテゴリータブ：ヘッダー境界線のすぐ下に配置（高さ統一） */}
      <div className="category-tab-container mb-8">
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

      {/* 3. お知らせリスト（島形式） */}
      <div className="standard-card">
        {filteredNews.length > 0 ? (
          filteredNews.map((item) => (
            <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="standard-list-row group">
              <div className="flex items-center gap-4 w-32 shrink-0">
                <div className="text-[12px] font-bold text-slate-400 font-mono tracking-tighter tabular-nums">{item.date}</div>
              </div>
              <div className="flex items-center gap-4 flex-grow min-w-0 text-left">
                <span className={`text-[9px] font-[1000] px-3 py-1 rounded uppercase tracking-widest border shrink-0 ${
                  item.category === "重要" 
                    ? "bg-red-50 text-red-600 border-red-100 shadow-sm" 
                    : "bg-slate-50 text-slate-500 border-slate-200"
                }`}>
                  {item.category}
                </span>
                {isNewPost(item.date) && (
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-[9px] font-[1000] px-2 py-0.5 rounded italic bg-orange-500 text-white shadow-sm">NEW</span>
                    <span className="w-1 h-1 rounded-full bg-orange-500 animate-pulse"></span>
                  </div>
                )}
                <h4 className="text-[17px] font-black truncate tracking-tight transition-transform group-hover:translate-x-1 text-(--gs-text-primary)">
                  {item.title}
                </h4>
              </div>
              <div className="p-2 rounded-lg opacity-0 group-hover:opacity-100 text-slate-300 bg-slate-50">
                <ArrowUpRight size={18} strokeWidth={3} />
              </div>
            </a>
          ))
        ) : (
          <div className="py-32 text-center text-slate-400 italic text-[12px] font-bold uppercase tracking-widest">
            No updates found
          </div>
        )}
      </div>

      <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em] pt-12 opacity-40">
        Corporate Communication Endpoint
      </p>
    </div>
  );
};