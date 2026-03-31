import React, { useState, useMemo } from "react";
import { Bell, ArrowUpRight } from "lucide-react";
import { allNews } from "../data/news";
import { isWithinDays, NEWS_NEW_DAYS } from "../utils/newBadge";
import { useReadNews } from "../utils/useReadNews";

export const News: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("一覧");
  const { isRead, markAsRead } = useReadNews();

  const categories = ["一覧", "セキュリティ/危機管理", "社内業務", "人事関連", "教育/研修関連", "その他"];
  const OTHER_CATEGORIES = ["社内行事", "通達", "お知らせ"];
  
  const isNewPost = (dateStr: string, id: string | number) => !isRead(id) && isWithinDays(dateStr, NEWS_NEW_DAYS);

  const filteredNews = useMemo(() => {
    return (allNews || []).filter(item => {
      const matchesCategory = activeCategory === "一覧"
        || (activeCategory === "その他" ? OTHER_CATEGORIES.includes(item.category) : item.category === activeCategory);
      return matchesCategory;
    }).sort((a, b) => b.date.localeCompare(a.date));
  }, [activeCategory]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-1000 pb-10 px-4">
      
      {/* 1. カテゴリー選択ナビゲーション（検索バーを削除し、タブを主役に） */}
      <div className="flex justify-center">
        <div className="flex bg-slate-100/80 p-1.5 rounded-[2rem] border border-slate-200 w-full overflow-x-auto scrollbar-hide backdrop-blur-sm shadow-sm">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)} 
              className={`flex-1 min-w-[130px] py-3 px-6 rounded-[1.6rem] font-black text-[13px] tracking-widest transition-all duration-300 ${
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

      {/* 2. お知らせリスト（島形式カード） */}
      <div className="rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-50 divide-y bg-(--gs-card-bg) divide-slate-100/50">
        {filteredNews.length > 0 ? (
          filteredNews.map((item) => (
            <a 
              key={item.id} 
              href={item.url} 
              target="_blank" 
              rel="noreferrer" 
              onClick={() => markAsRead(item.id)} 
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 px-8 group hover:bg-slate-50/80 transition-all duration-300 relative"
            >
              {/* 日付エリア */}
              <div className="flex items-center gap-4 w-32 shrink-0">
                <div className="text-[13px] font-bold text-slate-400 font-mono tracking-tighter tabular-nums group-hover:text-(--gs-accent) transition-colors">
                  {item.date}
                </div>
              </div>

              {/* コンテンツエリア */}
              <div className="flex items-center gap-4 flex-grow min-w-0 text-left">
                {/* カテゴリーバッジ */}
                <span className={`text-[9px] font-[1000] px-3 py-1.5 rounded-lg uppercase tracking-widest border shrink-0 transition-all ${
                  item.category === "セキュリティ/危機管理" 
                    ? "bg-red-50 text-red-600 border-red-100 shadow-sm group-hover:bg-red-600 group-hover:text-white" 
                    : "bg-slate-50 text-slate-500 border-slate-200 group-hover:bg-(--gs-accent)/10 group-hover:text-(--gs-accent) group-hover:border-(--gs-accent)/20"
                }`}>
                  {item.category}
                </span>

                {/* NEWバッジ */}
                {isNewPost(item.date, item.id) && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded italic bg-orange-500 text-white shadow-sm animate-pulse">NEW</span>
                  </div>
                )}

                {/* タイトル */}
                <h4 className="text-[17px] font-black truncate tracking-tight transition-transform group-hover:translate-x-1 text-(--gs-text-primary) flex-grow">
                  {item.title}
                </h4>
              </div>

              {/* アクションアイコン */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 p-2.5 rounded-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-white bg-(--gs-accent) shadow-lg hidden sm:block">
                <ArrowUpRight size={18} strokeWidth={3} />
              </div>
            </a>
          ))
        ) : (
          <div className="py-32 text-center">
            <div className="inline-flex p-6 rounded-full bg-slate-50 mb-4 text-slate-200">
              <Bell size={40} />
            </div>
            <p className="text-slate-400 italic text-[13px] font-black uppercase tracking-widest">
              No updates found
            </p>
          </div>
        )}
      </div>

      {/* フッター装飾 */}
      <div className="pt-12 pb-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-6" />
        <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">
          Corporate Communication Endpoint
        </p>
      </div>
    </div>
  );
};