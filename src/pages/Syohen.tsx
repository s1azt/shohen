import React, { useState, useMemo } from "react";
import { History, FileText, TrendingUp, Users, Code, ArrowUpRight, Award } from "lucide-react";
import { syohenActivities } from "../data/syohen";

export const Syohen: React.FC<{ isMidnight?: boolean }> = ({ isMidnight }) => {
  const [activeYear, setActiveYear] = useState("2025");
  
  // 💡 年度をソートして取得
  const years = useMemo(() => 
    Object.keys(syohenActivities).sort((a, b) => b.localeCompare(a)), 
  []);

  // 💡 年度を切り替えた際、確実にその年度のデータ「だけ」を参照する
  const currentActivities = useMemo(() => 
    syohenActivities[activeYear] || [], 
  [activeYear]);

  const colorSchemes: Record<string, { light: string, dark: string, icon: string, line: string, btn: string }> = {
    "DX推進": { light: "text-blue-600", dark: "text-blue-400", icon: "bg-blue-50/50 border-blue-100", line: "bg-blue-500/20", btn: "bg-blue-600 hover:bg-blue-700" },
    "デザイン最適化": { light: "text-rose-600", dark: "text-rose-400", icon: "bg-rose-50/50 border-rose-100", line: "bg-rose-500/20", btn: "bg-rose-600 hover:bg-rose-700" },
    "技術探究": { light: "text-emerald-700", dark: "text-emerald-400", icon: "bg-emerald-50/50 border-emerald-100", line: "bg-emerald-500/20", btn: "bg-emerald-700 hover:bg-emerald-800" },
    "事務改善": { light: "text-indigo-600", dark: "text-indigo-400", icon: "bg-indigo-50/50 border-indigo-100", line: "bg-indigo-500/20", btn: "bg-indigo-600 hover:bg-indigo-700" },
  };

  return (
    <div className="page-main-container">
      <header className={`header-underline-bold ${isMidnight ? 'border-blue-600' : 'border-[#064e3b]'}`}>
        <div className="flex flex-col md:flex-row justify-between items-end">
          <div className="flex items-center gap-7">
            <div className={`header-icon-squircle ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}>
              <Award size={32} strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <h2 className={`header-title-main ${isMidnight ? 'text-white' : 'text-[#1a2e25]'}`}>小変活動</h2>
              <div className="flex items-center gap-3 mt-4">
                <div className={`h-[2px] w-6 ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}></div>
                <p className="header-subtitle-sub opacity-40 uppercase tracking-[0.4em]">Kaizen Innovation Reports</p>
              </div>
            </div>
          </div>

          {/* 💡 年度切り替え：セグメントコントロール風デザイン */}
          <div className={`flex p-1 rounded-2xl border ${isMidnight ? 'bg-slate-900 border-slate-700' : 'bg-slate-100/50 border-slate-200'}`}>
            {years.map(year => (
              <button 
                key={year} 
                onClick={() => setActiveYear(year)} 
                className={`px-6 py-2 rounded-xl text-[11px] font-black transition-all duration-300 ${
                  activeYear === year 
                    ? (isMidnight ? "bg-blue-600 text-white shadow-lg" : "bg-[#064e3b] text-white shadow-lg") 
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 💡 カードが増え続けるバグを防ぐため、グリッド全体にkeyを設定してリセットを促す */}
      <div key={activeYear} className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {currentActivities.map((activity: any) => {
          const scheme = colorSchemes[activity.category] || colorSchemes["事務改善"];
          return (
            <div 
              key={activity.id} 
              className={`group relative rounded-[2.5rem] border-none flex flex-col transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-2 overflow-hidden ${
                isMidnight ? 'bg-slate-800/40' : 'bg-white'
              }`}
            >
              {/* カード上部の装飾的なアクセント */}
              <div className={`h-2 w-full ${isMidnight ? 'bg-blue-600/20' : 'bg-slate-50'}`} />

              <div className="p-10 pt-8 flex-grow">
                <div className="flex justify-between items-start mb-8">
                  <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border ${
                    isMidnight ? 'bg-blue-900/20 text-blue-400 border-blue-800/50' : 'bg-slate-50 text-slate-500 border-slate-100'
                  }`}>
                    {activity.category}
                  </div>
                  <TrendingUp size={20} className="text-slate-200 group-hover:text-[#064e3b] transition-colors duration-500" />
                </div>

                <div className="text-left">
                  <h3 className={`text-[26px] font-[1000] tracking-tight leading-[1.1] mb-6 ${isMidnight ? 'text-white' : 'text-[#1a2e25]'}`}>
                    {activity.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${isMidnight ? 'bg-slate-900 border-slate-700 text-slate-500' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                      <Users size={18} />
                    </div>
                    <div>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${isMidnight ? 'text-slate-500' : 'text-slate-400'}`}>{activity.team}</p>
                      <p className={`text-[9px] font-bold ${isMidnight ? 'text-slate-600' : 'text-slate-400'}`}>{activity.members?.join(' · ')}</p>
                    </div>
                  </div>

                  <p className={`text-[14px] font-medium leading-relaxed mb-10 opacity-70 ${isMidnight ? 'text-slate-400' : 'text-slate-600'}`}>
                    {activity.description}
                  </p>

                  {/* 💡 成果セクションを「高級な引用風」に */}
                  <div className={`relative p-7 rounded-3xl border-l-[6px] ${
                    isMidnight ? 'bg-slate-900/50 border-blue-600' : 'bg-[#f8faf9] border-[#064e3b]'
                  }`}>
                    <p className={`text-[14.5px] font-bold leading-relaxed ${isMidnight ? 'text-blue-400' : 'text-[#064e3b]'}`}>
                      <span className="text-2xl mr-2 opacity-30">“</span>
                      {activity.results}
                    </p>
                  </div>
                </div>
              </div>

              {/* 💡 ボタンを透過ガラス風に */}
              {activity.pdfUrl && (
                <div className="px-10 pb-10">
                  <button 
                    onClick={() => window.open(activity.pdfUrl, "_blank")}
                    className={`w-full py-5 rounded-2xl flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 group/btn
                      ${isMidnight 
                        ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20' 
                        : 'bg-[#1a2e25] text-white hover:bg-[#064e3b] shadow-lg shadow-emerald-900/10'
                      }`}
                  >
                    View Report <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};