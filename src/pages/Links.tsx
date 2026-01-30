import React, { useState } from "react";
import { Globe, Search, ArrowUpRight, ExternalLink } from "lucide-react";
import { linkCollection } from "../data/links";

// 💡 名前付きエクスポートを確実に実行（App.tsxのエラー回避）
export const Links: React.FC<{ isMidnight?: boolean }> = ({ isMidnight }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("一覧");

  // カテゴリー名を日本語に定義
  const categories = ["一覧", "業務ツール", "開発・技術", "ナレッジ", "ポータル", "社内生活"] as const;

  // 内部データキーとのマッピング
  const categoryMap: Record<string, string> = {
    "一覧": "一覧",
    "業務ツール": "work",
    "開発・技術": "development",
    "ナレッジ": "knowledge",
    "ポータル": "portal",
    "社内生活": "life"
  };

  const filteredLinks = (linkCollection || []).filter(link => {
    const matchesSearch = 
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      link.desc.toLowerCase().includes(searchTerm.toLowerCase());
    
    const activeKey = categoryMap[activeCategory];
    const matchesCategory = activeKey === "一覧" || link.category === activeKey;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-main-container font-sans">
      
      {/* 1. ヘッダー：News.tsx とミリ単位で共通の規格（index.cssのクラスを使用） */}
      <header className={`header-underline-bold ${isMidnight ? 'border-blue-600' : 'border-[#064e3b]'}`}>
        <div className="flex flex-col md:flex-row justify-between items-end pb-1">
          <div className="flex items-center gap-7">
            {/* Newsと同じ32px/1.5のアイコン規格 */}
            <div className={`header-icon-squircle ${isMidnight ? 'bg-blue-600 shadow-blue-900/20' : 'bg-[#064e3b] shadow-emerald-900/20'}`}>
              <Globe size={32} strokeWidth={1.5} className="text-white" />
            </div>
            <div className="text-left">
              {/* index.css の header-title-main 規格 */}
              <h2 className={`header-title-main ${isMidnight ? 'text-white' : 'text-[#1a2e25]'}`}>
                リンク集
              </h2>
              <div className="flex items-center gap-3 mt-4">
                <div className={`h-[2px] w-6 ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}></div>
                <p className="header-subtitle-sub">Link Assets</p>
              </div>
            </div>
          </div>

          {/* 検索バー：Newsと位置・サイズを完全同期 */}
          <div className="relative w-full md:w-80 mt-8 md:mt-0 group pb-2">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search 
                className={`transition-colors ${isMidnight ? 'text-slate-500 group-focus-within:text-blue-400' : 'text-slate-300 group-focus-within:text-[#064e3b]'}`} 
                size={18} strokeWidth={3} 
              />
            </div>
            <input 
              type="text" 
              placeholder="キーワードで検索..." 
              className={`w-full pl-14 pr-6 py-4 rounded-2xl font-bold text-sm outline-none border transition-all ${
                isMidnight 
                  ? 'bg-slate-900 border-slate-800 text-white focus:border-blue-500/50 shadow-inner' 
                  : 'bg-slate-50 border-slate-100 text-[#1a2e25] focus:bg-white focus:ring-4 focus:ring-emerald-50/50 shadow-sm'
              }`}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* 2. カテゴリータブ：News.tsx と同一規格（index.cssのクラスを使用） */}
      <div className="category-tab-container">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)} 
            className={`category-tab-button ${
              activeCategory === cat 
                ? (isMidnight ? "tab-active-midnight" : "tab-active-normal") 
                : "tab-inactive"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. コンテンツエリア：一覧時は「コンパクト規格」、カテゴリ選択時は「タイル」 */}
      {activeCategory === "一覧" ? (
        <div className="standard-card">
          {filteredLinks.length > 0 ? (
            filteredLinks.map((link) => (
              <a 
                key={link.id} 
                href={link.url} 
                target="_blank" 
                rel="noreferrer" 
                className="list-row-compact" /* 💡 密度を高めた p-4 規格 */
              >
                {/* Newsの日付エリアと同じ w-32 の開始位置 */}
                <div className="flex items-center gap-4 w-32 shrink-0">
                  <span className={`text-[9px] font-[1000] px-3 py-1 rounded uppercase tracking-widest border shrink-0 w-full text-center ${
                    isMidnight ? 'bg-slate-700 text-slate-300 border-slate-600' : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}>
                    {link.category}
                  </span>
                </div>

                <div className="flex flex-col flex-grow min-w-0 text-left">
                  <h4 className={`text-[15px] font-[1000] truncate tracking-tight transition-transform group-hover:translate-x-1 duration-300 ${
                    isMidnight ? 'text-slate-200 group-hover:text-blue-400' : 'text-[#1a2e25] group-hover:text-[#064e3b]'
                  }`}>
                    {link.title}
                  </h4>
                  <p className="text-[11px] font-bold text-slate-400 truncate mt-0.5 opacity-70">
                    {link.desc}
                  </p>
                </div>

                <div className={`p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 ${
                  isMidnight ? 'text-blue-400' : 'text-slate-300'
                }`}>
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </div>
              </a>
            ))
          ) : (
            <div className="py-32 text-center text-slate-400 font-bold tracking-widest">NO ASSETS FOUND</div>
          )}
        </div>
      ) : (
        /* カテゴリ別タイル表示（タイル時は視認性重視のサイズを維持） */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in zoom-in-95 duration-500 text-left">
          {filteredLinks.map((link) => (
            <a 
              key={link.id} 
              href={link.url} 
              target="_blank" 
              rel="noreferrer" 
              className={`p-8 rounded-[2.5rem] shadow-md hover:shadow-2xl flex flex-col justify-between group transition-all duration-500 border-t-[6px] h-full min-h-[220px] aspect-[16/10] relative overflow-hidden bg-white border-white ${
                isMidnight ? 'is-midnight' : ''
              }`}
              style={{ borderTopColor: isMidnight ? '#3b82f6' : '#064e3b' }}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-sm group-hover:scale-110 shrink-0 bg-slate-50 text-slate-400`}>
                <ExternalLink size={24} strokeWidth={2.5} />
              </div>
              <div className="mt-6">
                <h4 className={`text-xl font-[1000] leading-tight tracking-tight mb-2 line-clamp-2 ${isMidnight ? 'text-slate-200' : 'text-[#1a2e25]'}`}>{link.title}</h4>
                <p className="text-[12px] font-bold text-slate-400 leading-relaxed line-clamp-2 opacity-80">{link.desc}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};