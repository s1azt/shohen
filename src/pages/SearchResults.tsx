import React, { useMemo } from "react";
// 💡 確実に存在するデータソースのみをインポート
import { allDeadlines } from "../data/deadlines";
import { allNews } from "../data/news";
import { linkCollection, externalLinks } from "../data/links"; 
import { allDocuments } from "../data/documents";
import { getAllSections } from "../data/organization";
import { allGuides } from "../data/guides"; 
import { columnArchives } from "../data/columns";
import { COMPANIES } from "../data/companies";
import { allActionPlans } from "../data/actionPlans";

import { 
  Search, Clock, ExternalLink, ChevronRight, 
  AlertCircle, Bell, FileText, Users, ArrowUpRight, 
  LayoutGrid, Headset, GraduationCap, Newspaper, Building2, Target
} from "lucide-react";

const ALL_SECTIONS = getAllSections();

const PORTAL_ITEMS: { title: string; url: string; category: string; Icon: React.FC<{ size?: number }> }[] = [
  { title: "部会資料アーカイブ", url: "http://dominoap.nekonet.co.jp/tyo/tyo1304.nsf/", category: "Sidebar", Icon: FileText },
  { title: "全社座席表", url: externalLinks.seatingChart, category: "Sidebar", Icon: Users },
  ...(externalLinks.support || []).map(link => ({ title: link.label, url: link.url, category: "Support Info", Icon: Headset })),
];

interface SearchResultsProps {
  query: string;
  setActiveTab: (tab: string) => void;
  setActiveSectionId?: (id: string) => void;
  setActiveCompanyAbbr?: (abbr: string) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ query, setActiveTab, setActiveSectionId, setActiveCompanyAbbr }) => {
  const q = (query || "").toLowerCase().trim();

  const foundGuides = useMemo(() =>
    (allGuides || []).filter(item => [item.title, item.description].some(t => t?.toLowerCase().includes(q)))
  , [q]);

  const foundDeadlines = useMemo(() =>
    (allDeadlines || []).filter(item => [item.title, item.dept].some(t => t?.toLowerCase().includes(q)))
  , [q]);

  const foundNews = useMemo(() =>
    (allNews || []).filter(item => [item.title, item.category].some(t => t?.toLowerCase().includes(q)))
  , [q]);

  const foundLinks = useMemo(() =>
    (linkCollection || []).filter(item => [item.title, item.desc, item.category].some(t => t?.toLowerCase().includes(q)))
  , [q]);

  const foundDocs = useMemo(() =>
    (allDocuments || []).filter(item => [item.title, item.category].some(t => t?.toLowerCase().includes(q)))
  , [q]);

  const foundTeams = useMemo(() =>
    (ALL_SECTIONS || []).filter(item => [item.name, item.id].some(t => t?.toLowerCase().includes(q)))
  , [q]);

  const foundCommon = useMemo(() =>
    PORTAL_ITEMS.filter(item => item.title.toLowerCase().includes(q))
  , [q]);

  const foundColumns = useMemo(() =>
    (columnArchives || []).filter(item => [item.title, item.category, item.author].some(t => t?.toLowerCase().includes(q)))
  , [q]);

  const foundCompanies = useMemo(() =>
    (COMPANIES || []).filter(item => [item.abbr, item.full, item.desc].some(t => t?.toLowerCase().includes(q)))
  , [q]);

  const foundActionPlans = useMemo(() =>
    (allActionPlans || []).filter(item => [item.title, item.description, item.owner, item.category].some(t => t?.toLowerCase().includes(q)))
  , [q]);

  if (!q) return null;

  // 💡 合計カウントの計算（安全な項目のみ）
  const totalCount = foundDeadlines.length + foundNews.length + foundLinks.length + 
                   foundDocs.length + foundTeams.length + foundCommon.length + 
                   foundGuides.length + foundColumns.length + 
                   foundCompanies.length + foundActionPlans.length;

  return (
    <div className="page-main-container font-sans text-left">
      <header className="header-underline-bold border-(--gs-accent)">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div className="flex items-center gap-7 text-left">
            <div className="header-icon-squircle bg-(--gs-accent)">
              <Search size={32} strokeWidth={1.5} className="text-white" />
            </div>
            <div>
              <h2 className="header-title-main text-(--gs-text-primary)">
                「{query}」の検索結果
              </h2>
              <div className="flex items-center gap-3 mt-4 opacity-40">
                <div className="h-[2px] w-6 bg-(--gs-accent)"></div>
                <p className="header-subtitle-sub uppercase tracking-[0.4em]">Global Search</p>
              </div>
            </div>
          </div>
          <div className="px-8 py-3 rounded-3xl border bg-[#f4f7f0] border-[#cbd5c0]/50">
            <span className="text-4xl font-black tracking-tighter tabular-nums text-(--gs-accent)">{totalCount}</span>
            <span className="text-[12px] font-black text-slate-400 uppercase ml-2 tracking-widest">Hits Found</span>
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
              <h3 className="text-[12px] font-black text-indigo-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <GraduationCap size={14} /> Newcomer Guide ({foundGuides.length})
              </h3>
              <div className="standard-card">
                {foundGuides.map((item, idx) => (
                  <div key={`ob-${item.id}`} onClick={() => setActiveTab("guide")} className="standard-list-row group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-indigo-50 text-indigo-600">
                      <GraduationCap size={18} />
                    </div>
                    <div className="flex flex-col flex-grow text-left">
                      <h4 className="text-[17px] font-black text-(--gs-text-primary)">{item.title}</h4>
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
              <h3 className="text-[12px] font-black text-emerald-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <Bell size={14} /> News Updates ({foundNews.length})
              </h3>
              <div className="standard-card">
                {foundNews.map((item, idx) => (
                  <div key={`nw-${item.id}`} onClick={() => setActiveTab("news")} className="standard-list-row group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-emerald-50 text-emerald-600">
                      <Bell size={18} />
                    </div>
                    <div className="flex flex-col flex-grow text-left">
                      <h4 className="text-[17px] font-black text-(--gs-text-primary)">{item.title}</h4>
                      <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">{item.date} • {item.category}</p>
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
              <h3 className="text-[12px] font-black text-orange-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <Clock size={14} /> Deadlines ({foundDeadlines.length})
              </h3>
              <div className="standard-card">
                {foundDeadlines.map((item, idx) => (
                  <div key={`dl-${item.id}`} onClick={() => setActiveTab("deadlines")} className="standard-list-row group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-orange-50 text-orange-500">
                      <Clock size={18} />
                    </div>
                    <div className="flex flex-col flex-grow text-left">
                      <h4 className="text-[17px] font-black text-(--gs-text-primary)">{item.title}</h4>
                      <p className="text-[12px] font-bold text-orange-500 uppercase tracking-widest">Due: {item.date} • {item.dept}</p>
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
              <h3 className="text-[12px] font-black text-blue-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <ExternalLink size={14} /> Links ({foundLinks.length})
              </h3>
              <div className="standard-card">
                {foundLinks.map((link, idx) => (
                  <a key={`lk-${link.id}`} href={link.url} target="_blank" rel="noreferrer" className="standard-list-row group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-blue-50 text-blue-500">
                      <ExternalLink size={18} />
                    </div>
                    <div className="flex flex-col flex-grow min-w-0 text-left">
                      <h4 className="text-[17px] font-black truncate text-(--gs-text-primary)">{link.title}</h4>
                      <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest truncate">{link.category} • {link.desc}</p>
                    </div>
                    <ArrowUpRight size={18} className="text-slate-200 group-hover:text-(--gs-accent)" />
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* 5. ドキュメント (Documents) */}
          {foundDocs.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-[12px] font-black text-indigo-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <FileText size={14} /> Documents ({foundDocs.length})
              </h3>
              <div className="standard-card">
                {foundDocs.map((doc, idx) => (
                  <a key={`doc-${doc.id}`} href={doc.url} target="_blank" rel="noreferrer" className="standard-list-row group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-indigo-50 text-indigo-500">
                      <FileText size={18} />
                    </div>
                    <div className="flex flex-col flex-grow text-left">
                      <h4 className="text-[17px] font-black text-(--gs-text-primary)">{doc.title}</h4>
                      <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">{doc.category}</p>
                    </div>
                    <ArrowUpRight size={18} className="text-slate-200 group-hover:text-(--gs-accent)" />
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* 6. ポータル & サポート */}
          {foundCommon.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-[12px] font-black uppercase tracking-[0.3em] ml-2 flex items-center gap-2 text-slate-500">
                <LayoutGrid size={14} /> Portal & Support ({foundCommon.length})
              </h3>
              <div className="standard-card">
                {foundCommon.map((item, idx) => (
                  <a key={`cm-${item.title}`} href={item.url} target="_blank" rel="noreferrer" className="standard-list-row group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-slate-50 text-slate-400 group-hover:bg-(--gs-accent) group-hover:text-white">
                      <item.Icon size={18} />
                    </div>
                    <div className="flex flex-col flex-grow text-left">
                      <h4 className="text-[17px] font-black tracking-tight text-(--gs-text-primary)">{item.title}</h4>
                      <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">{item.category}</p>
                    </div>
                    <ArrowUpRight size={18} className="text-slate-200 group-hover:text-(--gs-accent)" />
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* 7. チーム紹介 (Organization) */}
          {foundTeams.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <Users size={14} /> Organization ({foundTeams.length})
              </h3>
              <div className="standard-card">
                {foundTeams.map((team, idx) => (
                  <div key={`tm-${team.id}`} onClick={() => { setActiveTab("team"); setActiveSectionId?.(team.id); }} className="standard-list-row group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-slate-100 text-slate-600">
                      <Users size={18} />
                    </div>
                    <h4 className="text-[17px] font-black flex-grow text-left text-(--gs-text-primary)">
                      {team.id} <span className="ml-2 opacity-50">| {team.name}</span>
                    </h4>
                    <ChevronRight size={18} className="text-slate-200 group-hover:translate-x-1" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 8. コラム (Column) */}
          {foundColumns.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-[12px] font-black text-teal-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <Newspaper size={14} /> Column ({foundColumns.length})
              </h3>
              <div className="standard-card">
                {foundColumns.map((col) => (
                  <div key={`col-${col.id}`} onClick={() => setActiveTab("column")} className="standard-list-row group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-teal-50 text-teal-600">
                      <Newspaper size={18} />
                    </div>
                    <div className="flex flex-col flex-grow text-left">
                      <h4 className="text-[17px] font-black text-(--gs-text-primary)">{col.title}</h4>
                      <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">{col.date} • {col.category}</p>
                    </div>
                    <ChevronRight size={18} className="text-slate-200" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 9. 関連会社紹介 (Companies) */}
          {foundCompanies.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-[12px] font-black text-violet-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <Building2 size={14} /> Related Companies ({foundCompanies.length})
              </h3>
              <div className="standard-card">
                {foundCompanies.map((company) => (
                  <div key={`co-${company.abbr}`} onClick={() => setActiveCompanyAbbr?.(company.abbr)} className="standard-list-row group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-violet-50 text-violet-600">
                      <Building2 size={18} />
                    </div>
                    <div className="flex flex-col flex-grow text-left">
                      <h4 className="text-[17px] font-black text-(--gs-text-primary)">{company.abbr} <span className="font-medium text-sm opacity-60">{company.full}</span></h4>
                      <p className="text-[12px] text-slate-400 leading-snug line-clamp-2">{company.desc}</p>
                    </div>
                    <ChevronRight size={18} className="text-slate-200" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 10. アクションプラン (Action Plans) */}
          {foundActionPlans.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-[12px] font-black text-amber-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <Target size={14} /> Action Plans ({foundActionPlans.length})
              </h3>
              <div className="standard-card">
                {foundActionPlans.map((plan) => (
                  <div key={`ap-${plan.id}`} onClick={() => setActiveTab("actionplan")} className="standard-list-row group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-amber-50 text-amber-600">
                      <Target size={18} />
                    </div>
                    <div className="flex flex-col flex-grow text-left">
                      <h4 className="text-[17px] font-black text-(--gs-text-primary)">{plan.title}</h4>
                      <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">{plan.fiscalYear}年度 • {plan.category} • {plan.status}</p>
                    </div>
                    <ChevronRight size={18} className="text-slate-200" />
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      )}

      <p className="text-center text-[12px] font-bold text-slate-400 uppercase tracking-[0.5em] pt-20 opacity-40">
        End of Global Search Result
      </p>
    </div>
  );
};