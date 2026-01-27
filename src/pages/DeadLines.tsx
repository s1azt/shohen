import React, { useState } from "react";
import { allDeadlines } from "../data/deadlines";
import { Clock, AlertTriangle, CheckCircle, Calendar, ChevronRight } from "lucide-react";

export const Deadlines: React.FC<{ isMidnight?: boolean }> = ({ isMidnight }) => {
  const [filter, setFilter] = useState("すべて");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDeadlineStatus = (dateStr: string) => {
    const deadline = new Date(dateStr);
    const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return { label: "完了", style: "bg-slate-100 text-slate-400 border-slate-200", icon: <CheckCircle size={20} /> };
    if (diffDays <= 3) return { label: `あと ${diffDays} 日`, style: "bg-red-50 text-red-600 border-red-100", icon: <AlertTriangle size={20} className="animate-pulse" /> };
    return { label: `あと ${diffDays} 日`, style: "bg-emerald-50 text-[#064e3b] border-emerald-100", icon: <Clock size={20} /> };
  };

  const filteredDeadlines = allDeadlines
    .filter(item => filter === "すべて" || item.dept === filter)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const departments = ["すべて", ...Array.from(new Set(allDeadlines.map(d => d.dept)))];

  return (
    <div className="page-main-container">
      <header className={`header-underline-bold ${isMidnight ? 'border-blue-600' : 'border-[#064e3b]'}`}>
        <div className="flex flex-col md:flex-row justify-between items-end">
          <div className="flex items-center gap-7">
            <div className={`header-icon-squircle ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}>
              <Calendar size={32} strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <h2 className={`header-title-main ${isMidnight ? 'text-white' : 'text-[#1a2e25]'}`}>
                締め切り
              </h2>
              <div className="flex items-center gap-3 mt-4">
                <div className={`h-[2px] w-6 ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}></div>
                <p className="header-subtitle-sub">Strategic Control</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-8 md:mt-0 pb-1">
            {departments.map(dept => (
              <button key={dept} onClick={() => setFilter(dept)} 
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === dept ? (isMidnight ? "bg-blue-600 text-white shadow-lg" : "bg-[#064e3b] text-white shadow-lg") : "text-slate-400 hover:text-slate-600"
                }`}>
                {dept}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="space-y-4">
        {filteredDeadlines.map((item) => {
          const status = getDeadlineStatus(item.date);
          return (
            <div key={item.id} className={`p-6 standard-card border-none shadow-md hover:shadow-xl flex flex-col md:flex-row items-center group transition-all duration-300 ${isMidnight ? 'bg-slate-800/60' : 'bg-white'}`}>
              <div className={`w-16 h-16 rounded-[1.5rem] border flex flex-col items-center justify-center mb-4 md:mb-0 md:mr-8 flex-shrink-0 transition-transform group-hover:scale-105 ${status.style}`}>
                {status.icon}
                <span className="text-[9px] font-[1000] mt-1 uppercase tracking-tighter">{status.label.replace("あと ", "")}</span>
              </div>
              <div className="flex-grow min-w-0 text-center md:text-left">
                <span className="text-[10px] font-black text-[#064e3b] opacity-40 uppercase tracking-[0.2em]">{item.dept}</span>
                <h4 className={`text-xl font-black truncate tracking-tight ${isMidnight ? 'text-slate-200 group-hover:text-blue-400' : 'text-[#1a2e25] group-hover:text-[#064e3b]'}`}>{item.title}</h4>
              </div>
              <div className="flex items-center gap-10 mt-6 md:mt-0 md:ml-10 shrink-0">
                <div className="text-right hidden sm:block">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Target</p>
                  <p className={`text-lg font-black tabular-nums ${isMidnight ? 'text-slate-300' : 'text-[#1a2e25]'}`}>{item.date}</p>
                </div>
                <button onClick={() => window.open(item.url, "_blank")} className={`h-14 px-8 rounded-full font-black text-[10px] tracking-[0.2em] uppercase flex items-center gap-3 transition-all ${isMidnight ? 'bg-slate-900/50 text-blue-400 hover:bg-blue-600 hover:text-white' : 'bg-slate-50 text-slate-400 hover:bg-[#064e3b] hover:text-white'}`}>
                  Execute <ChevronRight size={14} strokeWidth={3} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};