import React, { useState } from "react";
import { Bell, Search, ArrowUpRight } from "lucide-react";
import { allNews } from "../data/news";

export const News: React.FC<{ isMidnight?: boolean }> = ({ isMidnight }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("すべて");

  const categories = ["すべて", "重要", "社内", "通達", "イベント"];
  
  // NEWバッジの判定ロジック (3日以内)
  const isNewPost = (dateStr: string) => {
    const postDate = new Date(dateStr.replace(/\./g, '/'));
    const today = new Date();
    const diffTime = today.getTime() - postDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 3;
  };

  const filteredNews = (allNews || []).filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "すべて" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    return new Date(b.date.replace(/\./g, '/')).getTime() - new Date(a.date.replace(/\./g, '/')).getTime();
  });

  return (
    <div className="page-main-container">
      {/* 極太アンダーラインヘッダー */}
      <header className={`header-underline-bold ${isMidnight ? 'border-blue-600' : 'border-[#064e3b]'}`}>
        <div className="flex flex-col md:flex-row justify-between items-end">
          <div className="flex items-center gap-7">
            <div className={`header-icon-squircle ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}>
              <Bell size={32} strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <h2 className={`header-title-main text-6xl ${isMidnight ? 'text-white' : 'text-[#1a2e25]'}`}>
                News
              </h2>
              <div className="flex items-center gap-3 mt-4">
                <div className={`h-[2px] w-6 ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}></div>
                <p className="header-subtitle-sub">Corporate Updates</p>
              </div>
            </div>
          </div>

          <div className="relative w-full md:w-80 mt-8 md:mt-0 group pb-1">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className={`transition-colors ${isMidnight ? 'text-slate-500 group-focus-within:text-blue-400' : 'text-slate-300 group-focus-within:text-[#064e3b]'}`} size={18} strokeWidth={3} />
            </div>
            <input 
              type="text" 
              placeholder="Search updates..." 
              className={`w-full pl-14 pr-6 py-4 rounded-2xl font-bold text-sm outline-none border transition-all ${isMidnight ? 'bg-slate-900 border-slate-800 text-white focus:border-blue-500/50' : 'bg-slate-50 border-slate-100 text-[#1a2e25] focus:bg-white focus:ring-4 focus:ring-emerald-50/50'}`}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* カテゴリーフィルター */}
      <div className="flex gap-2 overflow-x-auto pb-4 px-1 scrollbar-hide">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-6 py-2.5 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${activeCategory === cat ? (isMidnight ? "bg-blue-600 text-white shadow-lg" : "bg-[#064e3b] text-white shadow-lg") : "text-slate-400 hover:text-slate-700"}`}>{cat}</button>
        ))}
      </div>

      {/* お知らせリスト */}
      <div className={`standard-card divide-y shadow-xl transition-all duration-1000 ${isMidnight ? 'bg-slate-800/60 border-slate-700 divide-slate-700' : 'bg-white border-transparent divide-slate-50'}`}>
        {filteredNews.length > 0 ? (
          filteredNews.map((item) => {
            const isUrgent = item.category === "重要";
            const isRecent = isNewPost(item.date);
            
            return (
              <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-8 hover:bg-slate-50/50 transition-all group">
                <div className="flex items-center gap-4 w-32 shrink-0">
                  <div className="text-[12px] font-bold text-slate-400 font-mono tracking-tighter">
                    {item.date}
                  </div>
                  {/* 💡 モバイル用パルスもオレンジに統一 */}
                  {isRecent && (
                    <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse md:hidden" />
                  )}
                </div>

                <div className="flex items-center gap-4 flex-grow min-w-0">
                  <span className={`text-[9px] font-[1000] px-3 py-1 rounded uppercase tracking-widest border shrink-0 ${isUrgent ? "bg-red-50 text-red-600 border-red-100 shadow-sm" : (isMidnight ? "bg-slate-700 text-slate-400 border-slate-600" : "bg-slate-100 text-slate-500 border-slate-200")}`}>
                    {item.category}
                  </span>

                  {/* 💡 NEWバッジをホームに合わせたオレンジに修正 */}
                  {isRecent && (
                    <span className={`text-[9px] font-[1000] px-2 py-0.5 rounded italic tracking-tighter shrink-0 ${isMidnight ? "bg-orange-500/20 text-orange-400" : "bg-orange-500 text-white shadow-sm shadow-orange-200"}`}>
                      NEW
                    </span>
                  )}
                  
                  <h4 className={`text-lg font-black truncate tracking-tight transition-transform group-hover:translate-x-1 ${isMidnight ? 'text-slate-200 group-hover:text-blue-400' : 'text-[#1a2e25] group-hover:text-[#064e3b]'}`}>
                    {item.title}
                  </h4>
                </div>
                
                <div className={`p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 ${isMidnight ? 'bg-slate-700 text-blue-400' : 'bg-slate-50 text-slate-400'}`}>
                  <ArrowUpRight size={18} strokeWidth={2.5} />
                </div>
              </a>
            )
          })
        ) : (
          <div className="py-32 text-center text-slate-400 italic text-sm">No updates found matching your search.</div>
        )}
      </div>
    </div>
  );
};