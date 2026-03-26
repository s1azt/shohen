import React, { useState, useEffect } from "react";
import { getAllSections, getSectionById, organizationData } from "../data/organization";
import { Users, ChevronDown, FileText, UserCheck, LayoutGrid } from "lucide-react";

interface TeamProps {
  activeSectionId: string;
}

export const Team: React.FC<TeamProps> = ({ activeSectionId: initialId }) => {
  const [localActiveId, setLocalActiveId] = useState(() => {
    return localStorage.getItem("team_selected_section") || initialId || "HC10";
  });
  
  const [expandedTeams, setExpandedTeams] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem("team_selected_section", localActiveId);
  }, [localActiveId]);

  const sections = getAllSections();
  const currentSection = getSectionById(localActiveId);

  const toggleTeam = (teamId: string) => {
    setExpandedTeams((prev) => 
      prev.includes(teamId) ? [] : [teamId]
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-1000 pb-10 px-4">
      
      {/* 1. スリムヘッダー */}
      <div className="rounded-[2.5rem] p-5 shadow-xl flex flex-col lg:flex-row items-center gap-6 bg-(--gs-accent)">
        <div className="flex items-center gap-5 px-6 border-r border-white/10 shrink-0">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 text-white/70">
            <Users size={24} />
          </div>
          <div className="text-left text-white">
            {/* 💡 text-[14px] font size */}
            <div className="text-[14px] font-black uppercase tracking-widest leading-none mb-1.5 text-white/80">部長</div>
            {/* 💡 text-2xl font size */}
            <div className="text-2xl font-black tracking-tighter leading-none">{organizationData.director.name}</div>
          </div>
        </div>

        <div className="flex bg-black/10 p-1.5 rounded-2xl flex-grow overflow-x-auto scrollbar-hide">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setLocalActiveId(sec.id)}
              /* 💡 text-[13px] font size */
              className={`flex-1 min-w-[110px] py-3 px-6 rounded-xl font-black text-[13px] tracking-widest ${
                localActiveId === sec.id
                  ? "bg-white text-(--gs-accent) shadow-lg"
                  : "text-white/60 hover:text-white"
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
          <div className="p-10 rounded-[3rem] border shadow-sm relative overflow-hidden bg-white border-slate-100">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div className="flex-grow text-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1.5 h-6 rounded-full bg-(--gs-accent)" />
                  {/* 💡 text-[12px] font size */}
                  <span className="text-[14px] font-black uppercase tracking-[0.4em] opacity-80 text-(--gs-accent)">部署コード</span>
                </div>
                {/* 💡 text-5xl font size */}
                <h3 className="text-5xl font-black tracking-tighter mb-5 text-[#1a2e25]">{currentSection.name}</h3>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-slate-50 border-slate-100">
                    <UserCheck size={14} className="text-(--gs-accent)" />
                    {/* 💡 text-[14px] font size */}
                    <span className="text-[14px] font-black uppercase text-slate-600">SMG: {currentSection.smg || "NOT SET"}</span>
                  </div>
                  {/* 💡 text-[14px] font size */}
                  <a 
                    href={currentSection.pdfUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[14px] font-black flex items-center gap-1.5 hover:underline decoration-2 underline-offset-4 text-(--gs-accent)"
                  >
                    <FileText size={16} /> PDF版はこちら ↗
                  </a>
                </div>
              </div>
              {/* 💡 text-lg font size */}
              <p className="leading-relaxed text-lg font-medium max-w-sm md:text-right text-slate-500">
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
                    className={`rounded-[2.2rem] border overflow-hidden ${
                      isExpanded
                        ? "border-(--gs-accent) bg-white shadow-xl"
                        : "border-slate-100 bg-white hover:border-(--gs-accent)/30"
                    }`}
                  >
                    <button onClick={() => toggleTeam(team.id)} className="w-full p-7 flex items-center justify-between text-left group">
                      <div className="flex items-center gap-5 min-w-0">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                          isExpanded
                            ? "bg-(--gs-accent) text-white" 
                            : "bg-slate-50 text-slate-400"
                        }`}>
                          <LayoutGrid size={24} />
                        </div>
                        <div className="min-w-0">
                          {/* 💡 text-xl font size */}
                          <h4 className="font-black text-xl tracking-tight mb-1 truncate text-[#1a2e25]">{team.name}</h4>
                          <div className="flex items-center gap-2">
                            {/* 💡 text-[11px] font size */}
                            <span className="text-[14px] font-bold text-slate-400 uppercase tracking-widest">Leader: {team.leader}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`p-2 rounded-full ${
                        isExpanded
                          ? "rotate-180 bg-(--gs-accent) text-white" 
                          : "text-slate-400 bg-slate-100 group-hover:bg-slate-200"
                      }`}>
                        <ChevronDown size={18} />
                      </div>
                    </button>
                    
                    <div className={`grid transition-all duration-400 ease-in-out ${
                      isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}>
                      <div className="overflow-hidden">
                        <div className="px-10 pb-10 text-left">
                            <div className="pt-6 border-t space-y-5 border-slate-50">
                            {/* 💡 text-base font size */}
                              <p className="text-base font-medium leading-relaxed text-slate-500">{team.description}</p>
                            <div className="flex items-center gap-3">
                              {/* 💡 text-[11px] font size */}
                              <span className="text-[14px] font-black px-3 py-1 rounded-lg uppercase tracking-widest bg-(--gs-accent)/10 text-(--gs-accent)">
                                {team.members} Members
                              </span>
                              {/* 💡 text-[11px] font size */}
                              <span className="text-[14px] font-black text-slate-400 px-3 py-1 uppercase tracking-widest">Manager: {manager.name}</span>
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