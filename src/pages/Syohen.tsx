import React, { useState } from "react";
import { History, FileText, TrendingUp, ArrowUpRight } from "lucide-react";
import { syohenActivities } from "../data/syohen";

export const Syohen: React.FC<{ isMidnight?: boolean }> = ({ isMidnight }) => {
  const [activeYear, setActiveYear] = useState("2025");
  const years = Object.keys(syohenActivities).sort((a, b) => b.localeCompare(a));
  const currentActivities = syohenActivities[activeYear] || [];

  return (
    <div className="page-main-container">
      {/* 💡 極太アンダーラインヘッダー：全ページ共通規格 */}
      <header className={`header-underline-bold ${isMidnight ? 'border-blue-600' : 'border-[#064e3b]'}`}>
        <div className="flex flex-col md:flex-row justify-between items-end">
          <div className="flex items-center gap-7">
            <div className={`header-icon-squircle ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}>
              <History size={32} strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <h2 className={`header-title-main ${isMidnight ? 'text-white' : 'text-[#1a2e25]'}`}>
                小変活動
              </h2>
              <div className="flex items-center gap-3 mt-4">
                <div className={`h-[2px] w-6 ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}></div>
                <p className="header-subtitle-sub">Continuous Improvement</p>
              </div>
            </div>
          </div>

          {/* 年度切り替えタブ */}
          <div className="flex gap-2 mt-8 md:mt-0 pb-1">
            {years.map(year => (
              <button 
                key={year} 
                onClick={() => setActiveYear(year)} 
                className={`px-6 py-2.5 rounded-xl text-[10px] font-[1000] uppercase tracking-widest transition-all ${
                  activeYear === year 
                    ? (isMidnight ? "bg-blue-600 text-white shadow-lg" : "bg-[#1a2e25] text-white shadow-lg") 
                    : "text-slate-400 hover:text-[#1a2e25]"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 💡 浮かび上がる「島」のグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {currentActivities.map((activity: any, idx) => (
          <div 
            key={idx} 
            className={`standard-card shadow-md hover:shadow-2xl border-none transition-all duration-500 flex flex-col group ${
              isMidnight ? 'bg-slate-800/60' : 'bg-white'
            }`}
          >
            <div className="p-8 pb-4 flex justify-between items-start">
              <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                isMidnight ? 'bg-blue-900/30 text-blue-400 border-blue-800' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
              }`}>
                {activity.category}
              </span>
              <TrendingUp size={20} className="text-slate-200 group-hover:text-emerald-500 transition-colors" />
            </div>
            <div className="p-8 pt-0 flex-grow">
              <h3 className={`text-2xl font-black mb-4 tracking-tight leading-tight ${isMidnight ? 'text-white' : 'text-[#1a2e25]'}`}>
                {activity.title}
              </h3>
              <p className={`text-sm font-medium leading-relaxed mb-8 ${isMidnight ? 'text-slate-400' : 'text-slate-500'}`}>
                {activity.description}
              </p>
              <div className={`p-6 rounded-[2rem] italic text-sm font-bold border-l-4 ${
                isMidnight ? 'bg-slate-900/50 text-slate-300 border-blue-600' : 'bg-slate-50 text-[#1a2e25] border-[#064e3b]'
              }`}>
                "{activity.results}"
              </div>
            </div>
            {activity.reportUrl && (
              <button 
                onClick={() => window.open(activity.reportUrl, "_blank")} 
                className={`w-full p-6 flex items-center justify-center gap-3 transition-all font-black text-[10px] uppercase tracking-[0.3em] ${
                  isMidnight ? 'bg-slate-700 hover:bg-blue-600 text-white' : 'bg-slate-50 hover:bg-[#1a2e25] text-slate-400 hover:text-white'
                }`}
              >
                <FileText size={18} strokeWidth={2.5} />
                View Report <ArrowUpRight size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};