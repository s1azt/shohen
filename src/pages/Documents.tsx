import React, { useState, useMemo } from "react";
import { FileText, Search, ArrowUpRight } from "lucide-react";
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
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-1000 pb-10 px-4">
      
      {/* 1. インテリジェント・検索 & フィルタバー */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          
          {/* 検索入力エリア */}
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search 
                className="text-slate-300 group-focus-within:text-(--gs-accent)" 
                size={16} 
                strokeWidth={3} 
              />
            </div>
            <input 
              type="text" 
              placeholder="ドキュメント名で検索..." 
              className="w-full pl-12 pr-6 py-3.5 rounded-[1.6rem] font-bold text-[13px] outline-none border bg-(--gs-card-bg) border-slate-100 text-(--gs-text-primary) shadow-sm focus:ring-4 focus:ring-(--gs-accent)/5 focus:border-(--gs-accent)/20 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* カテゴリー切り替えエリア */}
          <div className="flex bg-slate-100/80 p-1.5 rounded-[1.6rem] border border-slate-200 w-full overflow-x-auto scrollbar-hide backdrop-blur-sm">
            {DOCUMENT_CATEGORIES.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveTab(cat)} 
                className={`flex-1 min-w-[90px] py-2.5 px-5 rounded-[1.2rem] font-black text-[12px] tracking-widest transition-all duration-300 ${
                  activeTab === cat 
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

      {/* 2. ドキュメントリスト（島形式カード） */}
      <div className="rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-50 divide-y bg-(--gs-card-bg) divide-slate-50">
        {filteredDocs.length > 0 ? (
          filteredDocs.map((doc) => (
            <div 
              key={doc.id} 
              onClick={() => window.open(doc.url, '_blank')}
              className="flex items-center justify-between p-6 group cursor-pointer hover:bg-slate-50/80 transition-colors"
            >
              <div className="flex items-center gap-6 min-w-0">
                {/* アイコン */}
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-slate-50 text-slate-400 group-hover:bg-(--gs-accent) group-hover:text-white transition-all duration-300 group-hover:rotate-6">
                  <FileText size={22} strokeWidth={2} />
                </div>
                
                {/* テキスト情報 */}
                <div className="text-left min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-black text-(--gs-accent) uppercase tracking-widest leading-none bg-(--gs-accent)/5 px-2 py-1 rounded">
                      {doc.category}
                    </span>
                    {doc.updateDate && (
                      <span className="text-[10px] font-bold text-slate-300 tabular-nums leading-none">
                        Updated: {doc.updateDate}
                      </span>
                    )}
                  </div>
                  <h4 className="text-[17px] font-black tracking-tight truncate leading-tight group-hover:translate-x-1 transition-transform text-(--gs-text-primary)">
                    {doc.title}
                  </h4>
                </div>
              </div>
              
              {/* アクションボタン */}
              <div className="flex items-center gap-4 shrink-0 pl-4">
                <div className="p-2.5 rounded-xl text-slate-200 group-hover:bg-(--gs-accent) group-hover:text-white transition-all">
                  <ArrowUpRight size={20} strokeWidth={3} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-32 text-center">
            <div className="inline-flex p-6 rounded-full bg-slate-50 mb-4">
              <Search size={32} className="text-slate-200" />
            </div>
            <p className="text-slate-400 italic text-[13px] font-black uppercase tracking-widest">
              No documents found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};