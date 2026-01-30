import React, { useState } from "react";
import { Bell, Search, ArrowUpRight } from "lucide-react";
import { allNews } from "../data/news";

// 💡 名前付きエクスポートを確実に実行
export const News: React.FC<{ isMidnight?: boolean }> = ({ isMidnight }) => {
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

  const filteredNews = (allNews || []).filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "一覧" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    return new Date(b.date.replace(/\./g, '/')).getTime() - new Date(a.date.replace(/\./g, '/')).getTime();
  });

  return (
    <div className="page-main-container font-sans">
      {/* 共通ヘッダー規格 */}
      <header className={`header-underline-bold ${isMidnight ? 'border-blue-600' : 'border-[#064e3b]'}`}>
        <div className="flex flex-col md:flex-row justify-between items-end pb-1">
          <div className="flex items-center gap-7">
            <div className={`header-icon-squircle ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}>
              <Bell size={32} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className={`header-title-main ${isMidnight ? 'text-white' : 'text-[#1a2e25]'}`}>お知らせ</h2>
              <div className="flex items-center gap-3 mt-4">
                <div className={`h-[2px] w-6 ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}></div>
                <p className="header-subtitle-sub">Corporate Updates</p>
              </div>
            </div>
          </div>

          <div className="relative w-full md:w-80 mt-8 md:mt-0 group pb-2">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className={`transition-colors ${isMidnight ? 'text-slate-500' : 'text-slate-300'}`} size={18} strokeWidth={3} />
            </div>
            <input 
              type="text" 
              placeholder="Search updates..." 
              className={`w-full pl-14 pr-6 py-4 rounded-2xl font-bold text-sm outline-none border transition-all ${isMidnight ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-100 text-[#1a2e25]'}`}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* 共通タブ規格 */}
      <div className="category-tab-container">
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

      {/* 共通リスト規格 */}
      <div className="standard-card">
        {filteredNews.map((item) => (
          <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="standard-list-row">
            <div className="flex items-center gap-4 w-32 shrink-0">
              <div className="text-[12px] font-bold text-slate-400 font-mono tracking-tighter">{item.date}</div>
            </div>
            <div className="flex items-center gap-4 flex-grow min-w-0 text-left">
              <span className={`text-[9px] font-[1000] px-3 py-1 rounded uppercase tracking-widest border shrink-0 ${item.category === "重要" ? "bg-red-50 text-red-600 border-red-100" : "bg-slate-100 text-slate-500 border-slate-200"}`}>
                {item.category}
              </span>
              {isNewPost(item.date) && (
                <span className="text-[9px] font-[1000] px-2 py-0.5 rounded italic bg-orange-500 text-white shrink-0">NEW</span>
              )}
              <h4 className={`text-lg font-black truncate tracking-tight ${isMidnight ? 'text-slate-200' : 'text-[#1a2e25]'}`}>{item.title}</h4>
            </div>
            <div className={`p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all ${isMidnight ? 'text-blue-400' : 'text-slate-400'}`}>
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};