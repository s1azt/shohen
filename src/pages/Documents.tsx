import React, { useState } from "react";
import { FileText, Search, Folder, ArrowUpRight } from "lucide-react";
import { allDocuments } from "../data/documents";

export const Documents: React.FC<{ isMidnight?: boolean }> = ({ isMidnight }) => {
  // 💡 変数名を統一し、型エラーを解消
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDocs = (allDocuments || []).filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-main-container">
      {/* 💡 極太アンダーラインヘッダー：全ページ共通規格 */}
      <header className={`header-underline-bold ${isMidnight ? 'border-blue-600' : 'border-[#064e3b]'}`}>
        <div className="flex flex-col md:flex-row justify-between items-end">
          <div className="flex items-center gap-7">
            {/* Squircle アイコン */}
            <div className={`header-icon-squircle ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}>
              <Folder size={32} strokeWidth={1.5} />
            </div>
            
            <div className="text-left">
              {/* プロ仕様タイポグラフィ：Inter 1000 weight */}
              <h2 className={`header-title-main ${isMidnight ? 'text-white' : 'text-[#1a2e25]'}`}>
                ドキュメント
              </h2>
              <div className="flex items-center gap-3 mt-4">
                <div className={`h-[2px] w-6 ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}></div>
                <p className="header-subtitle-sub">Library & Templates</p>
              </div>
            </div>
          </div>

          {/* 検索窓：ラインの上に浮かぶミニマルなデザイン */}
          <div className="relative w-full md:w-80 mt-8 md:mt-0 group pb-1">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search 
                className={`transition-colors ${isMidnight ? 'text-slate-500 group-focus-within:text-blue-400' : 'text-slate-300 group-focus-within:text-[#064e3b]'}`} 
                size={18} 
                strokeWidth={3} 
              />
            </div>
            <input 
              type="text" 
              placeholder="Search files..." 
              className={`w-full pl-14 pr-6 py-4 rounded-2xl font-bold text-sm outline-none border transition-all ${
                isMidnight 
                  ? 'bg-slate-900 border-slate-800 text-white focus:border-blue-500/50' 
                  : 'bg-slate-50 border-slate-100 text-[#1a2e25] focus:bg-white focus:ring-4 focus:ring-emerald-50/50'
              }`}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* 💡 浮かび上がる「島」のリスト */}
      <div className={`standard-card shadow-xl border-none divide-y transition-all duration-1000 ${
        isMidnight ? 'bg-slate-800/60 border-slate-700 divide-slate-700' : 'bg-white border-transparent divide-slate-50'
      }`}>
        {filteredDocs.length > 0 ? (
          filteredDocs.map((doc: any) => (
            <a 
              key={doc.id} 
              href={doc.url} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center justify-between p-8 hover:bg-slate-50/50 transition-all group"
            >
              <div className="flex items-center gap-8 min-w-0">
                {/* ファイルアイコンもSquircleの意図を汲んだ形状に */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all ${
                  isMidnight 
                    ? 'bg-slate-700 text-blue-400 group-hover:bg-blue-600 group-hover:text-white' 
                    : 'bg-slate-50 text-slate-400 group-hover:bg-[#064e3b] group-hover:text-white'
                }`}>
                  <FileText size={24} strokeWidth={2} />
                </div>
                
                <div className="min-w-0">
                  <h4 className={`text-xl font-black truncate tracking-tight transition-colors ${
                    isMidnight ? 'text-slate-200 group-hover:text-blue-400' : 'text-[#1a2e25] group-hover:text-[#064e3b]'
                  }`}>
                    {doc.title}
                  </h4>
                  <div className="flex gap-4 mt-1 items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-md">
                      {doc.category}
                    </span>
                    {/* データにtypeがある場合のみ表示（型エラー回避） */}
                    {doc.type && (
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                        • {doc.type}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className={`p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 ${
                isMidnight ? 'bg-slate-700 text-blue-400' : 'bg-slate-50 text-slate-400'
              }`}>
                <ArrowUpRight size={22} strokeWidth={3} />
              </div>
            </a>
          ))
        ) : (
          <div className="py-32 text-center text-slate-400 italic text-sm">
            No documents found matching your search.
          </div>
        )}
      </div>

      <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em] pt-12 opacity-40">
        End of technical documentation library
      </p>
    </div>
  );
};