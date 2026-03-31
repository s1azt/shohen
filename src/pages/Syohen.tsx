import React, { useState, useMemo } from "react";
import { Users, TrendingUp, ArrowUpRight } from "lucide-react";
import { syohenActivities } from "../data/syohen";

const COLOR_SCHEMES: Record<string, { light: string; icon: string; line: string; btn: string }> = {
  "DX推進":         { light: "text-blue-600",     icon: "bg-blue-50/50 border-blue-100",    line: "bg-blue-500/20",    btn: "bg-blue-600 hover:bg-blue-700" },
  "デザイン最適化":   { light: "text-rose-600",     icon: "bg-rose-50/50 border-rose-100",    line: "bg-rose-500/20",    btn: "bg-rose-600 hover:bg-rose-700" },
  "技術探究":        { light: "text-emerald-700", icon: "bg-emerald-50/50 border-emerald-100", line: "bg-emerald-500/20", btn: "bg-emerald-700 hover:bg-emerald-800" },
  "事務改善":        { light: "text-indigo-600",  icon: "bg-indigo-50/50 border-indigo-100", line: "bg-indigo-500/20",  btn: "bg-indigo-600 hover:bg-indigo-700" },
};

export const Syohen: React.FC = () => {
  const [activeYear, setActiveYear] = useState("2025");
  
  // 💡 年度をソートして取得
  const years = useMemo(() => 
    Object.keys(syohenActivities).sort((a, b) => b.localeCompare(a)), 
  []);

  // 💡 年度を切り替えた際、確実にその年度のデータ「だけ」を参照する
  const currentActivities = useMemo(() => 
    syohenActivities[activeYear] || [], 
  [activeYear]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-1000 pb-10 px-4">
      
      {/* 1. 年度切り替えナビゲーション（検索バー風） */}
      <div className="flex justify-center sm:justify-end">
        <div className="inline-flex p-1.5 rounded-[1.6rem] border shadow-sm bg-slate-100/80 border-slate-200 backdrop-blur-sm">
          {years.map(year => (
            <button 
              key={year} 
              onClick={() => setActiveYear(year)} 
              className={`px-8 py-2.5 rounded-[1.2rem] text-[12px] font-[1000] tracking-widest transition-all duration-300 ${
                activeYear === year 
                  ? "bg-(--gs-accent) text-white shadow-md transform scale-105" 
                  : "text-slate-400 hover:text-slate-600 hover:bg-black/5"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* 2. 活動カードグリッド */}
      <div key={activeYear} className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {currentActivities.map((activity: any) => {
          return (
            <div 
              key={activity.id} 
              className="group relative rounded-[2.5rem] border-none flex flex-col shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden bg-(--gs-card-bg)"
            >
              {/* カード上部の装飾的なアクセント */}
              <div className="h-2 w-full bg-slate-50/50" />

              <div className="p-10 pt-8 flex-grow">
                <div className="flex justify-between items-start mb-8">
                  <div className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border bg-(--gs-primary)/5 text-(--gs-text-primary)/60 border-(--gs-primary)/10">
                    {activity.category}
                  </div>
                  <TrendingUp size={20} className="text-slate-200 group-hover:text-(--gs-accent) transition-colors duration-500" />
                </div>

                <div className="text-left">
                  <h3 className="text-[26px] font-[1000] tracking-tight leading-[1.1] mb-6 text-(--gs-text-primary)">
                    {activity.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center border bg-(--gs-primary)/5 border-(--gs-primary)/10 text-(--gs-text-primary)/50">
                      <Users size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-(--gs-text-primary)/50">{activity.team}</p>
                      <p className="text-[9px] font-bold text-(--gs-text-primary)/50">{activity.members?.join(' · ')}</p>
                    </div>
                  </div>

                  <p className="text-[14px] font-medium leading-relaxed mb-10 text-(--gs-text-primary)/70">
                    {activity.description}
                  </p>

                  {/* 💡 成果セクションを「高級な引用風」に */}
                  <div className="relative p-7 rounded-3xl border-l-[6px] bg-(--gs-primary)/5 border-(--gs-accent)">
                    <p className="text-[14.5px] font-bold leading-relaxed text-(--gs-accent)">
                      <span className="text-2xl mr-2 opacity-30">“</span>
                      {activity.results}
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. レポート閲覧ボタン */}
              {activity.pdfUrl && (
                <div className="px-10 pb-10">
                  <button 
                    onClick={() => window.open(activity.pdfUrl, "_blank")}
                    className="w-full py-5 rounded-2xl flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] group/btn bg-(--gs-accent) text-white hover:bg-(--gs-accent)/80 shadow-lg shadow-black/10 transition-all duration-300"
                  >
                    View Report 
                    <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
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