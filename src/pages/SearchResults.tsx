import React from "react";
// 💡 指定された5つのデータソースのみをインポート
import { allDeadlines } from "../data/deadlines";
import { allNews } from "../data/news";
import { linkCollection } from "../data/links"; 
import { allDocuments } from "../data/documents";
import { getAllSections } from "../data/organization"; // チーム紹介

import { 
  Search, Clock, ExternalLink, ChevronRight, 
  AlertCircle, Bell, FileText, Users, ArrowUpRight 
} from "lucide-react";

// 💡 リンク集用のカテゴリー色設定
const linkCategoryStyles: Record<string, string> = {
  work: "bg-blue-50 text-blue-600 border-blue-100",
  development: "bg-emerald-50 text-emerald-600 border-emerald-100",
  knowledge: "bg-amber-50 text-amber-600 border-amber-100",
  life: "bg-rose-50 text-rose-600 border-rose-100",
  portal: "bg-indigo-50 text-indigo-600 border-indigo-100",
};

interface SearchResultsProps {
  query: string;
  setActiveTab: (tab: string) => void;
  setActiveSectionId?: (id: string) => void;
  isMidnight?: boolean;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ query, setActiveTab, setActiveSectionId, isMidnight }) => {
  const q = (query || "").toLowerCase().trim();

  if (!q) return null;

  // --- 🔍 指定5カテゴリのスキャンエンジン ---
  
  // 1. 締め切り
  const foundDeadlines = (allDeadlines || []).filter(item => 
    [item.title, item.dept].some(text => text?.toLowerCase().includes(q))
  );

  // 2. お知らせ
  const foundNews = (allNews || []).filter(item => 
    [item.title, item.content, item.category].some(text => text?.toLowerCase().includes(q))
  );

  // 3. リンク集
  const foundLinks = (linkCollection || []).filter(item => 
    [item.title, item.desc, item.category].some(text => text?.toLowerCase().includes(q))
  );

  // 4. ドキュメント
  const foundDocs = (allDocuments || []).filter(item => 
    [item.title, item.desc].some(text => text?.toLowerCase().includes(q))
  );

  // 5. チーム紹介 (セクション名とID)
  const foundTeams = (getAllSections() || []).filter(item => 
    [item.name, item.id].some(text => text?.toLowerCase().includes(q))
  );

  const totalCount = foundDeadlines.length + foundNews.length + foundLinks.length + foundDocs.length + foundTeams.length;

  return (
    <div className="page-main-container font-sans text-left">
      {/* 共通ヘッダー規格 */}
      <header className={`header-underline-bold ${isMidnight ? 'border-blue-600' : 'border-[#064e3b]'}`}>
        <div className="flex flex-col md:flex-row justify-between items-end pb-1">
          <div className="flex items-center gap-7">
            <div className={`header-icon-squircle ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}>
              <Search size={32} strokeWidth={1.5} className="text-white" />
            </div>
            <div>
              <h2 className={`header-title-main ${isMidnight ? 'text-white' : 'text-[#1a2e25]'}`}>
                「{query}」の検索結果
              </h2>
              <div className="flex items-center gap-3 mt-4">
                <div className={`h-[2px] w-6 ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}></div>
                <p className="header-subtitle-sub uppercase tracking-[0.4em] opacity-40 italic">Refined Search</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f4f7f0] px-8 py-3 rounded-3xl border border-[#cbd5c0]/50 text-right">
            <span className="text-4xl font-[1000] text-[#064e3b] tracking-tighter tabular-nums">{totalCount}</span>
            <span className="text-[10px] font-black text-[#6b7a5f] uppercase ml-1">Hits</span>
          </div>
        </div>
      </header>

      {totalCount === 0 ? (
        <div className="py-24 text-center bg-white/50 rounded-[2.5rem] border-2 border-dashed border-[#cbd5c0]">
          <AlertCircle size={40} className="mx-auto text-[#cbd5c0] mb-4" />
          <p className="text-[#6b7a5f] font-bold text-lg">一致する情報は見つかりませんでした</p>
        </div>
      ) : (
        <div className="space-y-12">
          
          {/* --- 1. 締め切り --- */}
          {foundDeadlines.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-orange-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <Clock size={14} /> Deadlines ({foundDeadlines.length})
              </h3>
              <div className="standard-card">
                {foundDeadlines.map((item, idx) => (
                  <div key={`dl-${idx}`} onClick={() => setActiveTab("deadlines")} className="standard-list-row cursor-pointer">
                    <div className="w-1.5 h-10 rounded-full bg-orange-400 mr-6"></div>
                    <div className="flex flex-col flex-grow">
                      <h4 className={`text-lg font-black ${isMidnight ? 'text-slate-200' : 'text-[#1a2e25]'}`}>{item.title}</h4>
                      <p className="text-[11px] font-bold text-orange-500 uppercase">DUE: {item.date} / {item.dept}</p>
                    </div>
                    <ChevronRight size={18} className="text-slate-300" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* --- 2. お知らせ --- */}
          {foundNews.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <Bell size={14} /> Latest News ({foundNews.length})
              </h3>
              <div className="standard-card">
                {foundNews.map((item, idx) => (
                  <div key={`nw-${idx}`} onClick={() => setActiveTab("news")} className="standard-list-row cursor-pointer">
                    <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600 mr-4"><Bell size={20} /></div>
                    <div className="flex flex-col flex-grow">
                      <h4 className={`text-lg font-black ${isMidnight ? 'text-slate-200' : 'text-[#1a2e25]'}`}>{item.title}</h4>
                      <p className="text-[11px] font-bold text-slate-400">{item.date} | {item.category}</p>
                    </div>
                    <ChevronRight size={18} className="text-slate-300" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* --- 3. リンク集 (コンパクト規格) --- */}
          {foundLinks.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <ExternalLink size={14} /> Quick Links ({foundLinks.length})
              </h3>
              <div className="standard-card">
                {foundLinks.map((link, idx) => (
                  <a key={`lk-${idx}`} href={link.url} target="_blank" rel="noreferrer" className="list-row-compact">
                    <div className="flex items-center gap-4 w-32 shrink-0">
                      <span className={`text-[9px] font-[1000] px-3 py-1 rounded uppercase tracking-widest border shrink-0 w-full text-center ${linkCategoryStyles[link.category] || 'bg-slate-100'}`}>
                        {link.category}
                      </span>
                    </div>
                    <div className="flex flex-col flex-grow min-w-0">
                      <h4 className={`text-[15px] font-[1000] truncate ${isMidnight ? 'text-slate-200' : 'text-[#1a2e25]'}`}>{link.title}</h4>
                      <p className="text-[11px] font-bold text-slate-400 truncate mt-0.5 opacity-70">{link.desc}</p>
                    </div>
                    <ArrowUpRight size={16} className="text-slate-300" />
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* --- 4. ドキュメント --- */}
          {foundDocs.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <FileText size={14} /> Documents ({foundDocs.length})
              </h3>
              <div className="standard-card">
                {foundDocs.map((doc, idx) => (
                  <a key={`doc-${idx}`} href={doc.url} target="_blank" rel="noreferrer" className="standard-list-row">
                    <div className="bg-indigo-50 p-2 rounded-xl text-indigo-600 mr-4"><FileText size={20} /></div>
                    <div className="flex flex-col flex-grow">
                      <h4 className={`text-lg font-black ${isMidnight ? 'text-slate-200' : 'text-[#1a2e25]'}`}>{doc.title}</h4>
                      <p className="text-[11px] font-bold text-slate-400">{doc.desc}</p>
                    </div>
                    <ExternalLink size={18} className="text-slate-300" />
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* --- 5. チーム紹介 --- */}
          {foundTeams.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-indigo-900 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <Users size={14} /> Organization ({foundTeams.length})
              </h3>
              <div className="standard-card">
                {foundTeams.map((team, idx) => (
                  <div key={`tm-${idx}`} onClick={() => { setActiveTab("team"); setActiveSectionId?.(team.id); }} className="standard-list-row cursor-pointer">
                    <div className="bg-slate-100 p-2 rounded-xl text-slate-600 mr-4"><Users size={20} /></div>
                    <h4 className={`text-lg font-[1000] flex-grow ${isMidnight ? 'text-slate-200' : 'text-[#1a2e25]'}`}>
                      {team.id} <span className="text-blue-600 ml-2">| {team.name}</span>
                    </h4>
                    <ChevronRight size={18} className="text-slate-300" />
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      )}
    </div>
  );
};