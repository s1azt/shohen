import React, { useState } from "react";
import { columnArchives } from "../data/columns";
import { ChevronRight, Newspaper, ExternalLink, Calendar } from "lucide-react";

export const Column: React.FC = () => {
  const [selectedColumnId, setSelectedColumnId] = useState<number | null>(null);

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
              <div className="w-12 h-12 rounded-2xl bg-[#6b7a5f] flex items-center justify-center text-white font-black mr-4 shadow-sm">IT</div>
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

  // 記事一覧表示
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header className="flex items-center justify-between border-b border-[#cbd5c0] pb-4">
        <h2 className="text-2xl font-black text-[#3e4a36] flex items-center gap-3">
          <Newspaper className="text-[#6b7a5f]" /> 今週のコラム
        </h2>
        <span className="text-xs font-bold text-[#6b7a5f] uppercase tracking-widest">Archives</span>
      </header>

      {/* 最新の注目記事 */}
      <div 
        onClick={() => setSelectedColumnId(columnArchives[0].id)}
        className="bg-white rounded-[2rem] shadow-sm overflow-hidden border border-[#cbd5c0] cursor-pointer group hover:shadow-md transition-all flex flex-col md:flex-row h-auto md:h-80"
      >
        <div className="md:w-1/2 overflow-hidden">
          <img src={columnArchives[0].image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Latest" />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-red-100 text-red-600 text-[10px] font-black px-2 py-0.5 rounded-full">NEW</span>
            <span className="text-[#6b7a5f] text-xs font-bold">{columnArchives[0].date}</span>
          </div>
          <h3 className="text-2xl font-black text-[#3e4a36] mb-4 group-hover:text-[#6b7a5f] transition-colors leading-tight">
            {columnArchives[0].title}
          </h3>
          <p className="text-[#6b7a5f] text-sm line-clamp-2 mb-6 font-medium">{columnArchives[0].content}</p>
          <div className="flex items-center text-[#6b7a5f] font-black text-sm">
            記事を読む <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* 過去記事アーカイブ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {columnArchives.slice(1).map((col) => (
          <div 
            key={col.id} 
            onClick={() => setSelectedColumnId(col.id)}
            className="bg-[#f4f7f0] p-6 rounded-3xl border border-[#cbd5c0] cursor-pointer hover:bg-white hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-white p-3 rounded-2xl text-[#6b7a5f] shadow-sm group-hover:scale-110 transition-transform">
                <Newspaper size={24} />
              </div>
              <div>
                <p className="text-[10px] text-[#6b7a5f] font-bold opacity-60">{col.date}</p>
                <h4 className="font-bold text-[#3e4a36] line-clamp-1 group-hover:text-[#6b7a5f] transition-colors">{col.title}</h4>
              </div>
            </div>
            <p className="text-xs text-[#6b7a5f] line-clamp-2 mb-4 font-medium opacity-80">{col.content}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {col.tags.slice(0, 1).map(tag => (
                  <span key={tag} className="text-[9px] bg-white text-[#6b7a5f] px-2 py-0.5 rounded border border-[#cbd5c0]">{tag}</span>
                ))}
              </div>
              <ExternalLink size={14} className="text-[#cbd5c0] group-hover:text-[#6b7a5f]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};