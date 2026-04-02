import React, { useState } from "react";
import { columnArchives } from "../data/columns";
import { ChevronRight, Newspaper, ExternalLink, Star } from "lucide-react";
import { isWithinDays, COLUMN_NEW_DAYS } from "../utils/newBadge";
import { useReadNews } from "../utils/useReadNews";

const CATEGORIES = ["すべて", "GOOD NEWS", "ITトレンド", "宣伝", "その他"] as const;
type CategoryFilter = typeof CATEGORIES[number];

export const Column: React.FC = () => {
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("すべて");
  const { isRead, markAsRead } = useReadNews();

  const handleOpenColumn = (id: string) => {
    setSelectedColumnId(id);
    markAsRead(`col-${id}`);
  };

  // 記事詳細表示
  if (selectedColumnId) {
    const col = columnArchives.find((c) => c.id === selectedColumnId);
    if (!col) return null;

    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <button 
          onClick={() => setSelectedColumnId(null)}
          className="flex items-center text-[#6b7a5f] hover:text-[#3e4a36] font-bold group transition-colors"
        >
          <ChevronRight size={24} className="rotate-180 mr-1 group-hover:-translate-x-1 transition-transform" />
          コラム一覧に戻る
        </button>

        <article className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-[#cbd5c0]">
          <div className="h-80 relative">
            <img src={col.image} className="w-full h-full object-cover" alt="header" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
          </div>
          
          <div className="px-8 md:px-12 pb-12 -mt-10 relative">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[#6b7a5f] font-bold text-sm bg-[#f4f7f0] px-3 py-1 rounded-full">{col.date}</span>
              <div className="flex gap-2">
                {col.tags.map(tag => (
                  <span key={tag} className="text-[#6b7a5f] text-xs font-bold opacity-60">{tag}</span>
                ))}
              </div>
            </div>
            
            <h2 className="text-3xl font-black text-[#3e4a36] mb-8 leading-tight">{col.title}</h2>
            
            <div className="text-[#3e4a36] leading-loose text-lg space-y-6 whitespace-pre-wrap font-medium">
              {col.content}
            </div>

            <div className="mt-12 pt-8 border-t border-[#cbd5c0]/30 flex items-center">
              <div className="w-12 h-12 rounded-2xl bg-[#6b7a5f] flex items-center justify-center text-white font-black mr-4 shadow-sm">{col.author.charAt(0)}</div>
              <div>
                <p className="font-bold text-[#3e4a36]">{col.author}</p>
                <p className="text-xs text-[#6b7a5f]">Group Systems Dept. Professional Column</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }

  // 記事一覧表示（archived: true は一覧から除外。検索ではヒットします）
  const visibleColumns = columnArchives.filter(c => !c.archived);
  const filteredColumns = activeCategory === "すべて"
    ? [...visibleColumns].sort((a, b) => b.date.localeCompare(a.date))
    : [...visibleColumns]
        .filter(c => c.category === activeCategory)
        .sort((a, b) => b.date.localeCompare(a.date));
  const latestColumn = filteredColumns[0];

  return (
    <div className="page-main-container font-sans">
      <header className="header-underline-bold mb-4 border-(--gs-accent)">
        <div className="flex items-center gap-7 text-left pb-2">
          <div className="header-icon-squircle bg-(--gs-accent)">
            <Newspaper size={32} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="header-title-main text-(--gs-text-primary)">コラム</h2>
            <div className="flex items-center gap-3 mt-4">
              <div className="h-[2px] w-6 bg-(--gs-accent)"></div>
              <p className="header-subtitle-sub uppercase tracking-[0.4em] opacity-40">Column Archives</p>
            </div>
          </div>
        </div>
      </header>
      <div className="space-y-8">

      {/* カテゴリタブ */}
      <div className="category-tab-container">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`category-tab-button ${activeCategory === cat ? "tab-active-normal" : "tab-inactive"}`}
          >
            {cat === "GOOD NEWS" && <Star size={12} className="inline mr-1" />}{cat}
          </button>
        ))}
      </div>

      {/* 最新の注目記事 */}
      {latestColumn ? (
      <div 
        onClick={() => handleOpenColumn(latestColumn.id)}
        className="bg-white rounded-[2rem] shadow-sm overflow-hidden border border-[#cbd5c0] cursor-pointer group hover:shadow-md transition-all flex flex-col md:flex-row h-auto md:h-80"
      >
        <div className="md:w-1/2 overflow-hidden">
          <img src={latestColumn.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Latest" />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            {isWithinDays(latestColumn.date, COLUMN_NEW_DAYS) && !isRead(`col-${latestColumn.id}`) && (
              <span className="bg-red-100 text-red-600 text-[12px] font-black px-2 py-0.5 rounded-full">NEW</span>
            )}
            <span className="text-[#6b7a5f] text-xs font-bold">{latestColumn.date}</span>
          </div>
          <h3 className="text-2xl font-black text-[#3e4a36] mb-4 group-hover:text-[#6b7a5f] transition-colors leading-tight">
            {latestColumn.title}
          </h3>
          <p className="text-[#6b7a5f] text-sm line-clamp-2 mb-6 font-medium">{latestColumn.content}</p>
          <div className="flex items-center text-[#6b7a5f] font-black text-sm">
            記事を読む <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
      ) : (
        <div className="text-center py-20 text-[#6b7a5f] font-bold opacity-50">該当する記事がありません</div>
      )}

      {/* 過去記事アーカイブ */}
      {filteredColumns.length > 1 && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredColumns.slice(1).map((col) => (
          <div 
            key={col.id} 
            onClick={() => handleOpenColumn(col.id)}
            className="bg-[#f4f7f0] p-6 rounded-3xl border border-[#cbd5c0] cursor-pointer hover:bg-white hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-white p-3 rounded-2xl text-[#6b7a5f] shadow-sm group-hover:scale-110 transition-transform">
                {col.category === "GOOD NEWS" ? <Star size={24} /> : <Newspaper size={24} />}
              </div>
              <div>
                <p className="text-[12px] text-[#6b7a5f] font-bold opacity-60">{col.date}</p>
                <h4 className="font-bold text-[#3e4a36] line-clamp-1 group-hover:text-[#6b7a5f] transition-colors">{col.title}</h4>
              </div>
            </div>
            <p className="text-xs text-[#6b7a5f] line-clamp-2 mb-4 font-medium opacity-80">{col.content}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {col.tags.slice(0, 1).map(tag => (
                  <span key={tag} className="text-[12px] bg-white text-[#6b7a5f] px-2 py-0.5 rounded border border-[#cbd5c0]">{tag}</span>
                ))}
              </div>
              <ExternalLink size={14} className="text-[#cbd5c0] group-hover:text-[#6b7a5f]" />
            </div>
          </div>
        ))}
      </div>
      )}
      </div>
    </div>
  );
};