import React from "react";
// 💡 確実に存在するデータソースのみをインポート
import { allDeadlines } from "../data/deadlines";
import { allNews } from "../data/news";
import { linkCollection, externalLinks } from "../data/links"; 
import { allDocuments } from "../data/documents";
import { getAllSections } from "../data/organization";
import { allGuides } from "../data/guides"; 

import { 
  Search, Clock, ExternalLink, ChevronRight, 
  AlertCircle, Bell, FileText, Users, ArrowUpRight, 
  LayoutGrid, Headset, GraduationCap 
} from "lucide-react";

interface SearchResultsProps {
  query: string;
  setActiveTab: (tab: string) => void;
  setActiveSectionId?: (id: string) => void;
  isMidnight?: boolean;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ query, setActiveTab, setActiveSectionId, isMidnight }) => {
  const q = (query || "").toLowerCase().trim();

  if (!q) return null;

  // --- 🔍 スキャンエンジン（安定版：エラー要因を排除） ---
  
  // 1. 新人ガイド (Guide)
  const foundGuides = (allGuides || []).filter(item => 
    [item.title, item.description].some(text => text?.toLowerCase().includes(q))
  );

  // 2. 締め切り
  const foundDeadlines = (allDeadlines || []).filter(item => 
    [item.title, item.dept].some(text => text?.toLowerCase().includes(q))
  );

  // 3. お知らせ
  const foundNews = (allNews || []).filter(item => 
    [item.title, item.category].some(text => text?.toLowerCase().includes(q))
  );

  // 4. リンク集
  const foundLinks = (linkCollection || []).filter(item => 
    [item.title, item.desc, item.category].some(text => text?.toLowerCase().includes(q))
  );

  // 5. ドキュメント
  const foundDocs = (allDocuments || []).filter(item => 
    [item.title, item.category].some(text => text?.toLowerCase().includes(q))
  );

  // 6. チーム紹介
  const foundTeams = (getAllSections() || []).filter(item => 
    [item.name, item.id].some(text => text?.toLowerCase().includes(q))
  );

  // 7. ポータル・サイドバー・お問い合わせ先
  const portalAndSupportItems = [
    { title: "部会資料アーカイブ", url: "http://dominoap.nekonet.co.jp/tyo/tyo1304.nsf/", category: "Sidebar", icon: <FileText size={18} /> },
    { title: "全社座席表", url: externalLinks.seatingChart, category: "Sidebar", icon: <Users size={18} /> },
    ...(externalLinks.support || []).map(link => ({
      title: link.label,
      url: link.url,
      category: "Support Info",
      icon: <Headset size={18} />
    }))
  ];

  const foundCommon = portalAndSupportItems.filter(item => 
    item.title.toLowerCase().includes(q)
  );

  // 💡 合計カウントの計算（安全な項目のみ）
  const totalCount = foundDeadlines.length + foundNews.length + foundLinks.length + 
                   foundDocs.length + foundTeams.length + foundCommon.length + 
                   foundGuides.length;

  return (
    <div className="page-main-container font-sans text-left">
      <header className={`header-underline-bold ${isMidnight ? 'border-blue-600' : 'border-[#064e3b]'}`}>
        <div className="flex flex-col md:flex-row justify-between items-end pb-1 gap-6">
          <div className="flex items-center gap-7 text-left">
            <div className={`header-icon-squircle ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}>
              <Search size={32} strokeWidth={1.5} className="text-white" />
            </div>
            <div>
              <h2 className={`header-title-main ${isMidnight ? 'text-white' : 'text-[#1a2e25]'}`}>
                「{query}」の検索結果
              </h2>
              <div className="flex items-center gap-3 mt-4 opacity-40 italic">
                <div className={`h-[2px] w-6 ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}></div>
                <p className="header-subtitle-sub uppercase tracking-[0.4em]">Global Search</p>
              </div>
            </div>
          </div>
          <div className={`px-8 py-3 rounded-3xl border ${isMidnight ? 'bg-slate-800 border-slate-700' : 'bg-[#f4f7f0] border-[#cbd5c0]/50'}`}>
            <span className={`text-4xl font-black tracking-tighter tabular-nums ${isMidnight ? 'text-blue-400' : 'text-[#064e3b]'}`}>{totalCount}</span>
            <span className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Hits Found</span>
          </div>
        </div>
      </header>

      {totalCount === 0 ? (
        <div className="py-24 text-center bg-white/50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-bold tracking-widest uppercase italic">No matching assets found</p>
        </div>
      ) : (
        <div className="space-y-12 animate-in fade-in duration-500">
          
          {/* 1. 新人ガイド (Guide) */}
          {foundGuides.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <GraduationCap size={14} /> Newcomer Guide ({foundGuides.length})
              </h3>
              <div className="standard-card">
                {foundGuides.map((item, idx) => (
                  <div key={`ob-${idx}`} onClick={() => setActiveTab("onboarding")} className="standard-list-row group cursor-pointer">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isMidnight ? 'bg-slate-700 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                      <GraduationCap size={18} />
                    </div>
                    <div className="flex flex-col flex-grow text-left">
                      <h4 className={`text-[17px] font-black ${isMidnight ? 'text-slate-200' : 'text-[#1a2e25]'}`}>{item.title}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Guide Detail</p>
                    </div>
                    <ChevronRight size={18} className="text-slate-200" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 2. お知らせ (News) */}
          {foundNews.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <Bell size={14} /> News Updates ({foundNews.length})
              </h3>
              <div className="standard-card">
                {foundNews.map((item, idx) => (
                  <div key={`nw-${idx}`} onClick={() => setActiveTab("news")} className="standard-list-row group cursor-pointer">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isMidnight ? 'bg-slate-700 text-blue-400' : 'bg-emerald-50 text-emerald-600'}`}>
                      <Bell size={18} />
                    </div>
                    <div className="flex flex-col flex-grow text-left">
                      <h4 className={`text-[17px] font-black ${isMidnight ? 'text-slate-200' : 'text-[#1a2e25]'}`}>{item.title}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.date} • {item.category}</p>
                    </div>
                    <ChevronRight size={18} className="text-slate-200" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 3. 締め切り (Deadlines) */}
          {foundDeadlines.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-orange-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <Clock size={14} /> Deadlines ({foundDeadlines.length})
              </h3>
              <div className="standard-card">
                {foundDeadlines.map((item, idx) => (
                  <div key={`dl-${idx}`} onClick={() => setActiveTab("deadlines")} className="standard-list-row group cursor-pointer">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isMidnight ? 'bg-slate-700 text-orange-400' : 'bg-orange-50 text-orange-500'}`}>
                      <Clock size={18} />
                    </div>
                    <div className="flex flex-col flex-grow text-left">
                      <h4 className={`text-[17px] font-black ${isMidnight ? 'text-slate-200' : 'text-[#1a2e25]'}`}>{item.title}</h4>
                      <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Due: {item.date} • {item.dept}</p>
                    </div>
                    <ChevronRight size={18} className="text-slate-200" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 4. リンク集 (Links) */}
          {foundLinks.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <ExternalLink size={14} /> Links ({foundLinks.length})
              </h3>
              <div className="standard-card">
                {foundLinks.map((link, idx) => (
                  <a key={`lk-${idx}`} href={link.url} target="_blank" rel="noreferrer" className="standard-list-row group">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isMidnight ? 'bg-slate-700 text-blue-400' : 'bg-blue-50 text-blue-500'}`}>
                      <ExternalLink size={18} />
                    </div>
                    <div className="flex flex-col flex-grow min-w-0 text-left">
                      <h4 className={`text-[17px] font-black truncate ${isMidnight ? 'text-slate-200' : 'text-[#1a2e25]'}`}>{link.title}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{link.category} • {link.desc}</p>
                    </div>
                    <ArrowUpRight size={18} className="text-slate-200 group-hover:text-[#064e3b]" />
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* 5. ドキュメント (Documents) */}
          {foundDocs.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <FileText size={14} /> Documents ({foundDocs.length})
              </h3>
              <div className="standard-card">
                {foundDocs.map((doc, idx) => (
                  <a key={`doc-${idx}`} href={doc.url} target="_blank" rel="noreferrer" className="standard-list-row group">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isMidnight ? 'bg-slate-700 text-indigo-400' : 'bg-indigo-50 text-indigo-500'}`}>
                      <FileText size={18} />
                    </div>
                    <div className="flex flex-col flex-grow text-left">
                      <h4 className={`text-[17px] font-black ${isMidnight ? 'text-slate-200' : 'text-[#1a2e25]'}`}>{doc.title}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{doc.category}</p>
                    </div>
                    <ArrowUpRight size={18} className="text-slate-200 group-hover:text-[#064e3b]" />
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* 6. ポータル & サポート */}
          {foundCommon.length > 0 && (
            <section className="space-y-4">
              <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] ml-2 flex items-center gap-2 ${isMidnight ? 'text-blue-400' : 'text-slate-500'}`}>
                <LayoutGrid size={14} /> Portal & Support ({foundCommon.length})
              </h3>
              <div className="standard-card">
                {foundCommon.map((item, idx) => (
                  <a key={`cm-${idx}`} href={item.url} target="_blank" rel="noreferrer" className="standard-list-row group">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isMidnight ? 'bg-slate-700 text-blue-400' : 'bg-slate-50 text-slate-400 group-hover:bg-[#064e3b] group-hover:text-white transition-all'}`}>
                      {item.icon}
                    </div>
                    <div className="flex flex-col flex-grow text-left">
                      <h4 className={`text-[17px] font-black tracking-tight ${isMidnight ? 'text-slate-200' : 'text-[#1a2e25]'}`}>{item.title}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.category}</p>
                    </div>
                    <ArrowUpRight size={18} className="text-slate-200 group-hover:text-[#064e3b]" />
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* 7. チーム紹介 (Organization) */}
          {foundTeams.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <Users size={14} /> Organization ({foundTeams.length})
              </h3>
              <div className="standard-card">
                {foundTeams.map((team, idx) => (
                  <div key={`tm-${idx}`} onClick={() => { setActiveTab("team"); setActiveSectionId?.(team.id); }} className="standard-list-row group cursor-pointer">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isMidnight ? 'bg-slate-700 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                      <Users size={18} />
                    </div>
                    <h4 className={`text-[17px] font-black flex-grow text-left ${isMidnight ? 'text-slate-200' : 'text-[#1a2e25]'}`}>
                      {team.id} <span className="ml-2 opacity-50">| {team.name}</span>
                    </h4>
                    <ChevronRight size={18} className="text-slate-200 group-hover:translate-x-1" />
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      )}

      <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em] pt-20 opacity-40">
        End of Global Search Result
      </p>
    </div>
  );
};