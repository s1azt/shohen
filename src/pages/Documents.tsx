import React, { useState, useMemo } from "react";
import { FileText, Search, Folder, ArrowUpRight, CheckCircle } from "lucide-react";
import { allDocuments } from "../data/documents";

const DOCUMENT_CATEGORIES = ["一覧", ...Array.from(new Set(allDocuments.map(doc => doc.category)))];

export const Documents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("一覧");

  // フィルタリングロジック
  const filteredDocs = useMemo(() => {
    const lq = searchTerm.toLowerCase();
    return (allDocuments || []).filter(doc => {
      const matchesTab = activeTab === "一覧" || doc.category === activeTab;
      const matchesSearch = doc.title.toLowerCase().includes(lq) || doc.category.toLowerCase().includes(lq);
      return matchesTab && matchesSearch;
    });
  }, [searchTerm, activeTab]);

  return (
    <div className="page-main-container">
      {/* 1. ヘッダー：タイトルと検索窓のみに整理 */}
      <header className="header-underline-bold mb-4 border-(--gs-accent)">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-2">
          <div className="flex items-center gap-7 text-left">
            <div className="header-icon-squircle bg-(--gs-accent)">
              <Folder size={32} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="header-title-main text-[#1a2e25]">
                ドキュメント
              </h2>
              <div className="flex items-center gap-3 mt-4">
                <div className="h-[2px] w-6 bg-(--gs-accent)"></div>
                <p className="header-subtitle-sub uppercase tracking-[0.4em] opacity-40 italic">Documents</p>
              </div>
            </div>
          </div>

          {/* 検索窓：ヘッダーの右側に配置 */}
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
              placeholder="ドキュメント内検索" 
              className="w-full pl-12 pr-6 py-3.5 rounded-2xl font-bold text-[12px] outline-none border bg-slate-50 border-slate-100 text-[#1a2e25] focus:bg-white focus:ring-4 focus:ring-emerald-50/50"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* 2. カテゴリータブ：ヘッダーの下（境界線の外）に配置 */}
      <div className="category-tab-container mb-8">
        {DOCUMENT_CATEGORIES.map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveTab(cat)} 
            className={`category-tab-button ${activeTab === cat ? "tab-active-normal" : "tab-inactive"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. ドキュメントリスト（島形式） */}
      <div className="standard-card overflow-hidden shadow-xl border-none divide-y bg-white border-transparent divide-slate-50">
        {filteredDocs.length > 0 ? (
          filteredDocs.map((doc) => (
            <div 
              key={doc.id} 
              onClick={() => window.open(doc.url, '_blank')}
              className="flex items-center justify-between p-6 group cursor-pointer hover:bg-slate-50/80"
            >
              <div className="flex items-center gap-6 min-w-0">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-slate-50 text-slate-400 group-hover:bg-(--gs-accent) group-hover:text-white">
                  <FileText size={20} strokeWidth={2} />
                </div>
                
                <div className="text-left min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">
                      {doc.category}
                    </span>
                    {doc.updateDate && (
                      <span className="text-[9px] font-bold text-slate-300 tabular-nums leading-none">
                        • Updated: {doc.updateDate}
                      </span>
                    )}
                  </div>
                  <h4 className="text-[17px] font-black tracking-tight truncate leading-tight group-hover:translate-x-1 text-slate-800">
                    {doc.title}
                  </h4>
                </div>
              </div>
              
              <div className="flex items-center gap-8 shrink-0">
                <div className="hidden md:flex items-center gap-1.5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                   <CheckCircle size={12} />
                   <span className="text-[9px] font-black uppercase tracking-tighter">Certified</span>
                </div>
                <div className="p-2.5 rounded-lg group-hover:translate-x-1 text-slate-300 group-hover:bg-(--gs-accent) group-hover:text-white">
                  <ArrowUpRight size={18} strokeWidth={3} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-32 text-center text-slate-400 italic text-[12px] font-bold uppercase tracking-widest">
            No documents found
          </div>
        )}
      </div>


    </div>
  );
};