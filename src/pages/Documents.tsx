import React, { useState, useMemo } from "react";
import { FileText, Search, ArrowUpRight } from "lucide-react";
import { allDocuments } from "../data/documents";

const DOCUMENT_CATEGORIES = ["一覧", ...Array.from(new Set(allDocuments.map(doc => doc.category)))];

export const Documents: React.FC = () => {
  const [activeTab, setActiveTab] = useState("一覧");

  // フィルタリングロジック（検索を削除し、タブ選択のみに変更）
  const filteredDocs = useMemo(() => {
    return (allDocuments || []).filter(doc => {
      const matchesTab = activeTab === "一覧" || doc.category === activeTab;
      return matchesTab;
    });
  }, [activeTab]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-1000 pb-10 px-4">
      
      {/* 1. カテゴリーナビゲーション（検索バーを削除し、フルワイドに） */}
      <div className="flex justify-center">
        <div className="flex bg-slate-100/80 p-1.5 rounded-[2rem] border border-slate-200 w-full overflow-x-auto scrollbar-hide backdrop-blur-sm shadow-sm">
          {DOCUMENT_CATEGORIES.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveTab(cat)} 
              className={`flex-1 min-w-[120px] py-3.5 px-6 rounded-[1.6rem] font-black text-[13px] tracking-widest transition-all duration-300 ${
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

      {/* 2. ドキュメントリスト（島形式カード） */}
      <div className="rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-50 divide-y bg-(--gs-card-bg) divide-slate-100/50">
        {filteredDocs.length > 0 ? (
          filteredDocs.map((doc) => (
            <div 
              key={doc.id} 
              onClick={() => window.open(doc.url, '_blank')}
              className="flex items-center justify-between p-6 px-8 group cursor-pointer hover:bg-slate-50/80 transition-all duration-300 relative"
            >
              <div className="flex items-center gap-6 min-w-0">
                {/* アイコン */}
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-slate-50 text-slate-400 group-hover:bg-(--gs-accent) group-hover:text-white transition-all duration-300 group-hover:rotate-6 shadow-sm">
                  <FileText size={22} strokeWidth={2} />
                </div>
                
                {/* テキスト情報 */}
                <div className="text-left min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-[10px] font-black text-(--gs-accent) uppercase tracking-widest leading-none bg-(--gs-accent)/5 px-2.5 py-1 rounded-md border border-(--gs-accent)/10">
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
                <div className="p-2.5 rounded-xl text-slate-200 group-hover:bg-(--gs-accent) group-hover:text-white transition-all group-hover:translate-x-1 shadow-none group-hover:shadow-lg">
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

      {/* フッター装飾 */}
      <div className="pt-12 pb-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-6" />
        <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">
          Internal Document Assets End
        </p>
      </div>
    </div>
  );
};