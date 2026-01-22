import React, { useState } from "react";
import { kaizenActivities } from "../data/misc";
import { Sparkles, Trophy, Users, Cpu } from "lucide-react";

export const Misc = () => {
  const years = Object.keys(kaizenActivities).sort((a, b) => b.localeCompare(a));
  const [activeYear, setActiveYear] = useState(years[0]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <Sparkles className="text-amber-500" size={28} /> 小変活動の記録
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">新人社員が中心となって取り組んだ業務改善プロジェクトのアーカイブ</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
          {years.map(year => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`px-5 py-2 rounded-lg font-black text-sm transition-all ${
                activeYear === year ? "bg-white text-[#065f46] shadow-sm" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {year}年度
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {kaizenActivities[activeYear].map((activity: any) => (
          <div key={activity.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm group hover:border-[#065f46] transition-all">
            <div className="bg-slate-50 p-5 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-800">{activity.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-xs font-bold text-slate-400">
                  <span className="flex items-center gap-1"><Users size={14} /> {activity.team}</span>
                  <span className="flex items-center gap-1 border-l pl-4 font-medium text-slate-500">{activity.members.join(', ')}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 h-fit">
                {activity.technologies.map((tech: string) => (
                  <span key={tech} className="bg-blue-50 text-blue-600 text-[10px] font-black px-2 py-1 rounded-full border border-blue-100 uppercase tracking-tighter">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Description</h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">{activity.description}</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                  <h4 className="text-[#065f46] text-xs font-black uppercase tracking-widest mb-1 flex items-center gap-2">
                    <Trophy size={14} /> Key Results
                  </h4>
                  <p className="text-sm text-[#065f46] font-bold">{activity.results}</p>
                </div>
              </div>
              <div className="h-48 rounded-2xl overflow-hidden border border-slate-100">
                <img src={activity.image} alt={activity.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};