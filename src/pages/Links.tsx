import React, { useState } from "react";
import { Search, Globe, LayoutGrid, List as ListIcon, ArrowUpRight, ExternalLink } from "lucide-react";
import { linkCollection } from "../data/links";

export const Links: React.FC<{ isMidnight?: boolean }> = ({ isMidnight }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "card">("list");

  const filteredLinks = (linkCollection || []).filter(link => 
    link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-main-container">
      {/* 💡 極太アンダーラインヘッダー：全ページ共通規格 */}
      <header className={`header-underline-bold ${isMidnight ? 'border-blue-600' : 'border-[#064e3b]'}`}>
        <div className="flex flex-col md:flex-row justify-between items-end">
          <div className="flex items-center gap-7">
            {/* Squircle アイコン */}
            <div className={`header-icon-squircle ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}>
              <Globe size={32} strokeWidth={1.5} />
            </div>
            
            <div className="text-left">
              <h2 className={`header-title-main ${isMidnight ? 'text-white' : 'text-[#1a2e25]'}`}>
                Links
              </h2>
              <div className="flex gap-6 mt-4 ml-1">
                {/* 表示モード切替ボタンもタイポグラフィを統一 */}
                <button 
                  onClick={() => setViewMode("list")}
                  className={`flex items-center gap-2 text-[10px] font-[1000] uppercase tracking-[0.2em] transition-colors ${
                    viewMode === "list" ? (isMidnight ? "text-blue-400" : "text-[#064e3b]") : "text-slate-300 hover:text-slate-500"
                  }`}
                >
                  <ListIcon size={14} strokeWidth={3} /> All List
                </button>
                <button 
                  onClick={() => setViewMode("card")}
                  className={`flex items-center gap-2 text-[10px] font-[1000] uppercase tracking-[0.2em] transition-colors ${
                    viewMode === "card" ? (isMidnight ? "text-blue-400" : "text-[#064e3b]") : "text-slate-300 hover:text-slate-500"
                  }`}
                >
                  <LayoutGrid size={14} strokeWidth={3} /> Categories
                </button>
              </div>
            </div>
          </div>

          {/* 検索窓 */}
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
              placeholder="Search resources..." 
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

      {/* 💡 コンテンツ：表示モードによって切り替え */}
      {viewMode === "list" ? (
        <div className={`standard-card divide-y shadow-xl ${
          isMidnight ? 'bg-slate-800/60 border-slate-700 divide-slate-700' : 'bg-white border-transparent divide-slate-50'
        }`}>
          {filteredLinks.map((link) => (
            <a 
              key={link.id} 
              href={link.url} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center justify-between p-7 group hover:bg-slate-50/50 transition-all"
            >
              <div className="flex items-center gap-8 min-w-0">
                <span className={`w-24 text-[9px] font-[1000] uppercase tracking-widest shrink-0 ${
                  isMidnight ? 'text-blue-400' : 'text-slate-300'
                }`}>
                  {link.category}
                </span>
                <h4 className={`text-lg font-black truncate tracking-tight transition-transform group-hover:translate-x-1 ${
                  isMidnight ? 'text-slate-200 group-hover:text-blue-400' : 'text-[#1a2e25] group-hover:text-[#064e3b]'
                }`}>
                  {link.title}
                </h4>
              </div>
              <ArrowUpRight size={20} strokeWidth={2.5} className="text-slate-200 group-hover:text-slate-400 transition-all" />
            </a>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredLinks.map((link) => (
            <a 
              key={link.id} 
              href={link.url} 
              target="_blank" 
              rel="noreferrer" 
              className={`p-8 standard-card border-none shadow-md hover:shadow-2xl aspect-[16/10] flex flex-col justify-between group transition-all duration-500 ${
                isMidnight ? 'bg-slate-800/60 hover:border-blue-500' : 'bg-white hover:border-emerald-100'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                isMidnight 
                  ? 'bg-slate-700 text-blue-400 group-hover:bg-blue-600 group-hover:text-white' 
                  : 'bg-slate-50 text-slate-300 group-hover:bg-[#1a2e25] group-hover:text-white'
              }`}>
                <ExternalLink size={24} strokeWidth={2} />
              </div>
              <div>
                <span className="text-[10px] font-[1000] text-slate-300 uppercase tracking-[0.2em] mb-2 block">
                  {link.category}
                </span>
                <h4 className={`text-xl font-black leading-tight tracking-tight ${
                  isMidnight ? 'text-slate-200' : 'text-[#1a2e25]'
                }`}>
                  {link.title}
                </h4>
              </div>
            </a>
          ))}
        </div>
      )}

      <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em] pt-8 opacity-40">
        End of internal resources
      </p>
    </div>
  );
};