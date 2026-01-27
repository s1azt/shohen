import React, { useState } from "react";
import { getAllSections, getSectionById, organizationData } from "../data/organization";
import { Users, ChevronDown, FileText, UserCheck, LayoutGrid } from "lucide-react";

interface TeamProps {
  // 💡 App.tsx から渡される activeSectionId は「初期値」としてのみ利用するか、無視します
  activeSectionId: string;
  isMidnight?: boolean;
}

export const Team: React.FC<TeamProps> = ({ activeSectionId: initialId, isMidnight }) => {
  // 💡 ページ内部で独自のステートを持つことで、サイドバーと切り離します
  const [localActiveId, setLocalActiveId] = useState(initialId || "HC10");
  const [expandedTeams, setExpandedTeams] = useState<string[]>([]);

  const sections = getAllSections();
  const currentSection = getSectionById(localActiveId);

  const toggleTeam = (teamId: string) => {
    setExpandedTeams((prev) =>
      prev.includes(teamId) ? prev.filter((id) => id !== teamId) : [...prev, teamId]
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-1000 pb-10 px-4">
      
      {/* 1. スリムヘッダー */}
      <div className={`rounded-[2.5rem] p-5 shadow-xl flex flex-col lg:flex-row items-center gap-6 transition-colors duration-[3000ms] ${
        isMidnight ? "bg-[#112240]" : "bg-[#064e3b]"
      }`}>
        {/* 部長バッジ */}
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

        {/* セクション選択タブ：localActiveId を更新するように修正 */}
        <div className="flex bg-black/10 p-1.5 rounded-2xl flex-grow overflow-x-auto scrollbar-hide">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setLocalActiveId(sec.id)} // 💡 ページ内のステートのみ更新
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

      {/* 2. セクションインテリジェンス */}
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
                <h3 className={`text-4xl font-black tracking-tighter mb-5 italic ${
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
              <p className={`leading-relaxed text-[15px] font-medium max-w-sm md:text-right italic ${
                isMidnight ? "text-slate-400" : "text-slate-500"
              }`}>
                {currentSection.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
            {currentSection.managers.map((manager) =>
              manager.teams.map((team) => (
                <div 
                  key={team.id}
                  className={`rounded-[2.2rem] border transition-all duration-300 overflow-hidden ${
                    expandedTeams.includes(team.id) 
                      ? (isMidnight ? "border-blue-500 bg-slate-800 shadow-xl" : "border-emerald-500 bg-white shadow-xl")
                      : (isMidnight ? "border-slate-700 bg-slate-800/40 hover:border-blue-900" : "border-slate-100 bg-white hover:border-emerald-200")
                  }`}
                >
                  <button onClick={() => toggleTeam(team.id)} className="w-full p-7 flex items-center justify-between text-left">
                    <div className="flex items-center gap-5 min-w-0">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                        expandedTeams.includes(team.id) 
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
                    <div className={`p-2 rounded-full transition-all ${
                      expandedTeams.includes(team.id) 
                        ? (isMidnight ? "rotate-180 bg-blue-600 text-white" : "rotate-180 bg-[#064e3b] text-white") 
                        : (isMidnight ? "text-slate-500 bg-slate-700" : "text-slate-200 bg-slate-50")
                    }`}>
                      <ChevronDown size={18} />
                    </div>
                  </button>
                  
                  {expandedTeams.includes(team.id) && (
                    <div className="px-10 pb-10 animate-in slide-in-from-top-2 text-left">
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
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};