import React, { useState, useEffect } from "react";
import { getAllSections, getSectionById, organizationData } from "../data/organization";
import { Users, ChevronDown, FileText, UserCheck, LayoutGrid } from "lucide-react";

interface TeamProps {
  activeSectionId: string;
  isMidnight?: boolean;
}

export const Team: React.FC<TeamProps> = ({ activeSectionId: initialId, isMidnight }) => {
  const [localActiveId, setLocalActiveId] = useState(() => {
    return localStorage.getItem("team_selected_section") || initialId || "HC10";
  });
  // 💡 アニメーションのために、文字列の配列ではなく、オブジェクトのマップやSetで管理する方が効率的ですが、
  // 既存ロジックを維持しつつアニメーションを実現するため、ここではレンダリングロジック側を変更します。
  const [expandedTeams, setExpandedTeams] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem("team_selected_section", localActiveId);
  }, [localActiveId]);

  const sections = getAllSections();
  const currentSection = getSectionById(localActiveId);

  const openTeam = (teamId: string) => {
    setExpandedTeams([teamId]); 
  };

  const closeTeam = (teamId: string) => {
    setExpandedTeams((prev) => prev.filter((id) => id !== teamId));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-1000 pb-10 px-4">
      
      {/* 1. スリムヘッダー (変更なし) */}
      <div className={`rounded-[2.5rem] p-5 shadow-xl flex flex-col lg:flex-row items-center gap-6 transition-colors duration-[3000ms] ${
        isMidnight ? "bg-[#112240]" : "bg-[#064e3b]"
      }`}>
        <div className="flex items-center gap-5 px-6 border-r border-white/10 shrink-0">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
            isMidnight ? "bg-blue-400/20 text-blue-400" : "bg-white/10 text-emerald-300"
          }`}>
            <Users size={24} />
          </div>
          <div className="text-left text-white">
            <div className={`text-[9px] font-black uppercase tracking-widest leading-none mb-1 ${
              isMidnight ? "text-blue-400" : "text-emerald-400"
            }`}>Director</div>
            <div className="text-xl font-black tracking-tighter leading-none">{organizationData.director.name}</div>
          </div>
        </div>

        <div className="flex bg-black/10 p-1.5 rounded-2xl flex-grow overflow-x-auto scrollbar-hide">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setLocalActiveId(sec.id)}
              className={`flex-1 min-w-[110px] py-3 px-6 rounded-xl font-black transition-all text-[11px] tracking-widest ${
                localActiveId === sec.id
                  ? (isMidnight ? "bg-blue-500 text-white shadow-lg" : "bg-white text-[#064e3b] shadow-lg")
                  : "text-emerald-100/50 hover:text-white"
              }`}
            >
              {sec.id}
            </button>
          ))}
        </div>
      </div>

      {/* 2. セクションインテリジェンス (変更なし) */}
      {currentSection && (
        <div className="space-y-6">
          <div className={`p-10 rounded-[3rem] border shadow-sm relative overflow-hidden transition-colors duration-[3000ms] ${
            isMidnight ? "bg-slate-800/50 border-slate-700" : "bg-white border-slate-100"
          }`}>
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div className="flex-grow text-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-1.5 h-6 rounded-full ${isMidnight ? "bg-blue-500" : "bg-emerald-500"}`} />
                  <span className={`text-[10px] font-black uppercase tracking-[0.4em] opacity-80 ${
                    isMidnight ? "text-blue-400" : "text-[#064e3b]"
                  }`}>Section Intelligence</span>
                </div>
                <h3 className={`text-4xl font-black tracking-tighter mb-5 ${
                  isMidnight ? "text-slate-100" : "text-[#1a2e25]"
                }`}>{currentSection.name}</h3>
                <div className="flex items-center gap-6">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                    isMidnight ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-100"
                  }`}>
                    <UserCheck size={14} className={isMidnight ? "text-blue-400" : "text-emerald-600"} />
                    <span className={`text-[11px] font-black uppercase ${
                      isMidnight ? "text-slate-400" : "text-slate-600"
                    }`}>SMG: {currentSection.smg || "NOT SET"}</span>
                  </div>
                  <a 
                    href={currentSection.pdfUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className={`text-[11px] font-black flex items-center gap-1.5 hover:underline decoration-2 underline-offset-4 ${
                      isMidnight ? "text-blue-400" : "text-emerald-600"
                    }`}
                  >
                    <FileText size={14} /> VIEW PDF CHART ↗
                  </a>
                </div>
              </div>
              <p className={`leading-relaxed text-[15px] font-medium max-w-sm md:text-right ${
                isMidnight ? "text-slate-400" : "text-slate-500"
              }`}>
                {currentSection.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
            {currentSection.managers.map((manager) =>
              manager.teams.map((team) => {
                const isExpanded = expandedTeams.includes(team.id);
                return (
                  <div 
                    key={team.id}
                    onMouseLeave={() => closeTeam(team.id)}
                    // 💡 外枠のトランジションも少しゆっくりに調整
                    className={`rounded-[2.2rem] border transition-all duration-500 overflow-hidden ${
                      isExpanded
                        ? (isMidnight ? "border-blue-500 bg-slate-800 shadow-xl" : "border-emerald-500 bg-white shadow-xl")
                        : (isMidnight ? "border-slate-700 bg-slate-800/40 hover:border-blue-900" : "border-slate-100 bg-white hover:border-emerald-200")
                    }`}
                  >
                    <button onClick={() => openTeam(team.id)} className="w-full p-7 flex items-center justify-between text-left group">
                      <div className="flex items-center gap-5 min-w-0">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                          isExpanded
                            ? (isMidnight ? "bg-blue-600 text-white" : "bg-[#064e3b] text-white") 
                            : (isMidnight ? "bg-slate-700 text-slate-500" : "bg-slate-50 text-slate-400")
                        }`}>
                          <LayoutGrid size={24} />
                        </div>
                        <div className="min-w-0">
                          <h4 className={`font-black text-[17px] tracking-tight mb-1 truncate ${
                            isMidnight ? "text-slate-100" : "text-[#1a2e25]"
                          }`}>{team.name}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Leader: {team.leader}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* 💡 アイコンの色を濃く調整 */}
                      <div className={`p-2 rounded-full transition-all ${
                        isExpanded
                          ? (isMidnight ? "rotate-180 bg-blue-600 text-white" : "rotate-180 bg-[#064e3b] text-white") 
                          // 未選択時の色を濃く変更
                          : (isMidnight 
                              ? "text-slate-300 bg-slate-800 group-hover:bg-slate-700" // 深夜モード
                              : "text-slate-400 bg-slate-100 group-hover:bg-slate-200" // 通常モード
                            )
                      }`}>
                        <ChevronDown size={18} />
                      </div>
                    </button>
                    
                    {/* 💡 滑らかな折りたたみアニメーションの実装 (CSS Grid trick) */}
                    <div className={`grid transition-all duration-400 ease-in-out ${
                      isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}>
                      <div className="overflow-hidden">
                        <div className="px-10 pb-10 text-left">
                          <div className={`pt-6 border-t space-y-5 ${isMidnight ? "border-slate-700" : "border-slate-50"}`}>
                            <p className={`text-[14px] font-medium leading-relaxed ${
                              isMidnight ? "text-slate-300" : "text-slate-500"
                            }`}>{team.description}</p>
                            <div className="flex items-center gap-3">
                              <span className={`text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest ${
                                isMidnight ? "bg-blue-900/40 text-blue-400" : "bg-emerald-50 text-emerald-700"
                              }`}>
                                {team.members} Members
                              </span>
                              <span className="text-[9px] font-black text-slate-400 px-3 py-1 uppercase tracking-widest">Manager: {manager.name}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};