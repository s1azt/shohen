import React, { useState } from "react";
import { organizationData } from "../data/organization";
import { Users, User, ChevronDown, FileText, UserCheck, LayoutGrid } from "lucide-react";

export const Team: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState("HC10");
  const [expandedTeams, setExpandedTeams] = useState<string[]>([]);

  const sections = organizationData.director.sections;
  const currentSection = sections.find((s) => s.id === activeSectionId);

  const pdfLinks: { [key: string]: string } = {
    HC10: "https://drive.google.com/file/d/1C_2a2B4le1Z-gmYxKRncCe4In6vBsKyd/view",
    HC60: "https://drive.google.com/file/d/18kjEhWoa0aQD1G2kGvvZoxi4tLzlba1T/view",
    HC70: "https://drive.google.com/file/d/194tY_gPIeW-GIK-8DMi4uuusaU6Gg4QU/view",
    HD10: "https://drive.google.com/file/d/1ps8E9tpXB_jfPsepurDv3JJ-bsEn3p00/view",
    HD70: "https://drive.google.com/file/d/1YRtZ6BvclHZhG3ahVyHy_N3TnzjMD-8s/view",
  };

  const toggleTeam = (teamId: string) => {
    setExpandedTeams((prev) =>
      prev.includes(teamId) ? prev.filter((id) => id !== teamId) : [...prev, teamId]
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 1. 部長カード：標準サイズに変更 */}
      <div className="bg-[#064e3b] rounded-2xl p-6 text-white shadow-lg flex items-center gap-6 relative overflow-hidden">
        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/20">
          <Users size={32} />
        </div>
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300 opacity-80">Group Systems Dept. Director</h2>
          <p className="text-2xl font-black">
            {organizationData.director.name} 
            <span className="text-sm not-italic font-medium ml-2 opacity-80">部長</span>
          </p>
        </div>
      </div>

      {/* 2. セクション選択タブ */}
      <div className="flex bg-[#065f46] p-1 rounded-xl shadow-inner overflow-x-auto no-scrollbar">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveSectionId(sec.id)}
            className={`flex-1 min-w-[100px] py-2 px-4 rounded-lg font-bold transition-all text-sm ${
              activeSectionId === sec.id
                ? "bg-white text-[#065f46] shadow-sm"
                : "text-emerald-100 hover:bg-emerald-700/50"
            }`}
          >
            {sec.name}
          </button>
        ))}
      </div>

      {/* 3. セクション詳細エリア */}
      {currentSection && (
        <div className="space-y-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2">
                    <span className="bg-emerald-50 text-[#065f46] text-[10px] font-black px-2 py-0.5 rounded border border-emerald-100 uppercase">Section Info</span>
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">{currentSection.name}</h3>
                </div>
                <p className="text-[#065f46] text-sm font-bold mt-1 flex items-center gap-1.5">
                    <UserCheck size={16} /> SMG: {currentSection.smg || "（未設定）"}
                </p>
              </div>
              <a 
                href={pdfLinks[currentSection.id]} 
                target="_blank" 
                className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-xl font-bold hover:bg-[#065f46] transition-all text-xs"
              >
                <FileText size={14} /> 体制図(PDF)
              </a>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm border-l-3 border-slate-200 pl-4">
              {currentSection.description}
            </p>
          </div>

          {/* 4. ユニット一覧：文字を1列に収めるレイアウトを維持 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentSection.managers.map((manager) =>
              manager.teams.map((team) => (
                <div 
                  key={team.id}
                  className={`rounded-2xl border transition-all duration-300 ${
                    expandedTeams.includes(team.id) 
                    ? "border-[#065f46] bg-emerald-50/20 shadow-md" 
                    : "border-slate-200 bg-white shadow-sm hover:border-emerald-200"
                  } overflow-hidden`}
                >
                  <button 
                    onClick={() => toggleTeam(team.id)}
                    className="w-full p-4 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className={`p-3 rounded-xl flex-shrink-0 ${expandedTeams.includes(team.id) ? "bg-[#065f46] text-white" : "bg-emerald-50 text-[#065f46]"}`}>
                        <LayoutGrid size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-slate-800 text-base tracking-tight whitespace-nowrap truncate">{team.name}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 whitespace-nowrap truncate">
                          Leader: {team.leader} / MG: {manager.name}
                        </p>
                      </div>
                    </div>
                    <ChevronDown size={18} className={`text-slate-300 flex-shrink-0 ml-2 transition-transform ${expandedTeams.includes(team.id) ? "rotate-180" : ""}`} />
                  </button>
                  
                  {expandedTeams.includes(team.id) && (
                    <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                      <div className="pt-4 border-t border-slate-100">
                        <p className="text-slate-600 text-sm leading-relaxed mb-3">
                          {team.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black bg-slate-800 text-white px-2 py-0.5 rounded uppercase">{team.members}名</span>
                          <span className="text-[9px] font-black bg-white border border-slate-200 text-slate-400 px-2 py-0.5 rounded uppercase">ID: {team.id}</span>
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