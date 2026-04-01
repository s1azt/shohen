import React, { useState, useEffect } from "react";
import { getAllSections, getSectionById, organizationData } from "../data/organization";
// 💡 HardHat と Timer をインポートに追加しました
import { Users, ChevronDown, FileText, UserCheck, LayoutGrid, HardHat, Timer } from "lucide-react";

// --- 工事中フラグ (体制発表後にここを false にすれば元に戻ります) ---
const IS_UNDER_CONSTRUCTION = true;

interface TeamProps {
  activeSectionId: string;
}

export const Team: React.FC<TeamProps> = ({ activeSectionId: initialId }) => {
  const [localActiveId, setLocalActiveId] = useState(() => {
    return initialId || localStorage.getItem("team_selected_section") || "HC10";
  });
  
  const [expandedTeams, setExpandedTeams] = useState<string[]>([]);

  useEffect(() => {
    if (initialId) setLocalActiveId(initialId);
  }, [initialId]);

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
      <div className="rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-(--gs-accent)">
        <div className="flex items-center gap-4 sm:gap-5 sm:px-6 sm:border-r border-white/10 shrink-0 w-full sm:w-auto justify-center sm:justify-start">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-white/10 text-white/70">
            <Users size={22} />
          </div>
          <div className="text-left text-white">
            <div className="text-[13px] font-black uppercase tracking-widest leading-none mb-1.5 text-white/80">部長</div>
            <div className="text-xl sm:text-2xl font-black tracking-tighter leading-none">
              {IS_UNDER_CONSTRUCTION ? "???" : organizationData.director.name}
            </div>
          </div>
        </div>

        <div className="flex bg-black/10 p-1.5 rounded-2xl w-full overflow-x-auto scrollbar-hide">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setLocalActiveId(sec.id)}
              disabled={IS_UNDER_CONSTRUCTION}
              className={`flex-1 min-w-[80px] sm:min-w-[100px] py-2.5 sm:py-3 px-3 sm:px-5 rounded-xl font-black text-[12px] sm:text-[13px] tracking-widest transition-all ${
                localActiveId === sec.id
                  ? "bg-white text-(--gs-accent) shadow-lg"
                  : "text-white/60 hover:text-white"
              } ${IS_UNDER_CONSTRUCTION ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              {sec.id}
            </button>
          ))}
        </div>
      </div>

      {/* 2. 工事中 または セクションコンテンツ */}
      {IS_UNDER_CONSTRUCTION ? (
        /* --- 工事中専用ビュー --- */
        <div className="py-24 sm:py-32 flex flex-col items-center justify-center text-center space-y-8 bg-(--gs-card-bg) rounded-[2.5rem] sm:rounded-[4rem] border-2 border-dashed border-slate-100 shadow-sm px-6">
          <div className="relative">
            <div className="absolute inset-0 bg-(--gs-accent) blur-[100px] opacity-10 animate-pulse" />
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center text-(--gs-accent) border border-slate-50 relative z-10">
              <HardHat size={44} strokeWidth={1.5} />
            </div>
          </div>
          
          <div className="space-y-4 max-w-lg mx-auto">
            <div className="flex items-center justify-center gap-2.5 text-amber-500 font-black text-[12px] sm:text-[14px] tracking-[0.4em] uppercase">
              <Timer size={18} />
              <span>Updating Organization</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-(--gs-text-primary)">
              COMING SOON
            </h2>
            <p className="text-slate-400 font-medium leading-relaxed text-sm sm:text-base">
              ただいま新体制への移行作業を行っております。<br className="hidden sm:block" />
              今しばらくお待ちください。
            </p>
          </div>

          {/* PDF リンク */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "HC10", url: "https://drive.google.com/file/d/1fO_t4eYfrdPoCvcDAeFsmqBkCpDXJ2dN/view?usp=drive_link" },
              { label: "HC60", url: "https://drive.google.com/file/d/1gj0Kh1LH7WvCTX-rTjYZCcDLukqyiam0/view?usp=drive_link" },
              { label: "HC70", url: "https://drive.google.com/file/d/1ludoOsPtJpgCM-uj6WWyklh6xEnOuNpd/view?usp=drive_link" },
              { label: "HD10", url: "https://drive.google.com/file/d/1ZtjiJz7m6wigAPYfrKfWq6XHJ5-NAYMA/view?usp=drive_link" },
              { label: "HD70", url: "https://drive.google.com/file/d/1unZp6NnhcANa3X4M-vMPjkk25dj7ijy-/view?usp=drive_link" },
            ].map(({ label, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-(--gs-accent)/20 bg-(--gs-accent)/5 hover:bg-(--gs-accent)/10 transition-all text-(--gs-accent) font-black text-[13px] tracking-widest no-underline"
              >
                <FileText size={15} />
                {label} 体制図PDF
              </a>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-(--gs-accent) animate-bounce [animation-delay:-0.3s]" />
            <div className="w-1.5 h-1.5 rounded-full bg-(--gs-accent) animate-bounce [animation-delay:-0.15s]" />
            <div className="w-1.5 h-1.5 rounded-full bg-(--gs-accent) animate-bounce" />
          </div>
        </div>
      ) : (
        /* --- 本来の組織図コンテンツ --- */
        currentSection && (
          <div className="space-y-6">
            <div className="p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border shadow-sm relative overflow-hidden bg-(--gs-card-bg) border-slate-100">
              <div className="flex flex-col xl:flex-row justify-between items-start gap-6">
                <div className="flex-grow text-left">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1.5 h-6 rounded-full bg-(--gs-accent)" />
                    <span className="text-[14px] font-black uppercase tracking-[0.4em] opacity-80 text-(--gs-accent)">部署コード</span>
                  </div>
                  <h3 className="text-4xl sm:text-5xl font-black tracking-tighter mb-5 text-(--gs-text-primary)">{currentSection.name}</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-slate-50 border-slate-100">
                      <UserCheck size={14} className="text-(--gs-accent)" />
                      <span className="text-[14px] font-black text-(--gs-text-primary)/70">シニアマネージャー: {currentSection.smg || "未設定"}</span>
                    </div>
                    <a 
                      href={currentSection.pdfUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-[14px] font-black flex items-center gap-1.5 hover:underline decoration-2 underline-offset-4 text-(--gs-accent)"
                    >
                      <FileText size={16} /> 体制図はこちら ↗
                    </a>
                  </div>
                </div>
                <p className="leading-relaxed text-base sm:text-lg font-medium xl:max-w-sm xl:text-right text-(--gs-text-primary)/60">
                  {currentSection?.description}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {(() => {
                const allTeamsWithManager = currentSection.managers.flatMap((manager) =>
                  manager.teams.map((team) => ({ team, manager }))
                );
                const hasGroups = allTeamsWithManager.some(({ team }) => team.group);

                if (hasGroups) {
                  const groupOrder: string[] = [];
                  const groupedMap = new Map<string, typeof allTeamsWithManager>();
                  for (const item of allTeamsWithManager) {
                    const key = item.team.group ?? "その他";
                    if (!groupedMap.has(key)) {
                      groupOrder.push(key);
                      groupedMap.set(key, []);
                    }
                    groupedMap.get(key)!.push(item);
                  }
                  return groupOrder.map((groupName) => (
                    <div key={groupName}>
                      <div className="flex items-center gap-3 mb-3 px-1">
                        <span className="text-[13px] font-black uppercase tracking-[0.25em] text-(--gs-accent)/70 shrink-0">{groupName}</span>
                        <div className="h-px flex-grow bg-slate-100" />
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                        {groupedMap.get(groupName)!.map(({ team, manager }) => {
                          const isExpanded = expandedTeams.includes(team.id);
                          return (
                            <div
                              key={team.id}
                              className={`rounded-[2.2rem] border overflow-hidden transition-all duration-300 ${
                                isExpanded
                                  ? "border-(--gs-accent) bg-(--gs-card-bg) shadow-xl"
                                  : "border-slate-100 bg-(--gs-card-bg) hover:border-(--gs-accent)/30"
                              }`}
                            >
                              <button onClick={() => toggleTeam(team.id)} className="w-full p-7 flex items-center justify-between text-left group">
                                <div className="flex items-center gap-5 min-w-0">
                                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                                    isExpanded ? "bg-(--gs-accent) text-white" : "bg-slate-50 text-slate-400"
                                  }`}>
                                    <LayoutGrid size={24} />
                                  </div>
                                  <div className="min-w-0">
                                    <h4 className="font-black text-xl tracking-tight mb-1 truncate text-(--gs-text-primary)">{team.name}</h4>
                                    <div className="flex items-center gap-2">
                                      <span className="text-[14px] font-bold text-(--gs-text-primary)/50 uppercase tracking-widest">リーダー: {team.leader}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className={`p-2 rounded-full transition-all ${
                                  isExpanded ? "rotate-180 bg-(--gs-accent) text-white" : "text-slate-400 bg-slate-100 group-hover:bg-slate-200"
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
                                      <p className="text-base font-medium leading-relaxed text-(--gs-text-primary)/60">{team.description}</p>
                                      <div className="flex items-center gap-3">
                                        <span className="text-[14px] font-black px-3 py-1 rounded-lg uppercase tracking-widest bg-(--gs-accent)/10 text-(--gs-accent)">
                                          {team.members} Members
                                        </span>
                                        <span className="text-[14px] font-black text-(--gs-text-primary)/50 px-3 py-1 uppercase tracking-widest">マネージャー: {manager.name}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ));
                }

                return (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                    {allTeamsWithManager.map(({ team, manager }) => {
                      const isExpanded = expandedTeams.includes(team.id);
                      return (
                        <div
                          key={team.id}
                          className={`rounded-[2.2rem] border overflow-hidden transition-all duration-300 ${
                            isExpanded
                              ? "border-(--gs-accent) bg-(--gs-card-bg) shadow-xl"
                              : "border-slate-100 bg-(--gs-card-bg) hover:border-(--gs-accent)/30"
                          }`}
                        >
                          <button onClick={() => toggleTeam(team.id)} className="w-full p-7 flex items-center justify-between text-left group">
                            <div className="flex items-center gap-5 min-w-0">
                              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                                isExpanded ? "bg-(--gs-accent) text-white" : "bg-slate-50 text-slate-400"
                              }`}>
                                <LayoutGrid size={24} />
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-black text-xl tracking-tight mb-1 truncate text-(--gs-text-primary)">{team.name}</h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-[14px] font-bold text-(--gs-text-primary)/50 uppercase tracking-widest">リーダー: {team.leader}</span>
                                </div>
                              </div>
                            </div>
                            <div className={`p-2 rounded-full transition-all ${
                              isExpanded ? "rotate-180 bg-(--gs-accent) text-white" : "text-slate-400 bg-slate-100 group-hover:bg-slate-200"
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
                                  <p className="text-base font-medium leading-relaxed text-(--gs-text-primary)/60">{team.description}</p>
                                  <div className="flex items-center gap-3">
                                    <span className="text-[14px] font-black px-3 py-1 rounded-lg uppercase tracking-widest bg-(--gs-accent)/10 text-(--gs-accent)">
                                      {team.members} Members
                                    </span>
                                    <span className="text-[14px] font-black text-(--gs-text-primary)/50 px-3 py-1 uppercase tracking-widest">マネージャー: {manager.name}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </div>
        )
      )}
    </div>
  );
};