import React, { useState } from "react";
import { allDeadlines } from "../data/deadlines";
import { Clock, AlertTriangle, CheckCircle, Calendar, ArrowUpRight } from "lucide-react";

export const Deadlines: React.FC<{ isMidnight?: boolean }> = ({ isMidnight }) => {
  const [filter, setFilter] = useState("すべて");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 💡 共通の新着判定（3日以内）
  const isRecentlyUpdated = (dateStr?: string) => {
    if (!dateStr) return false;
    const updatedDate = new Date(dateStr.replace(/\./g, '/'));
    const diffTime = today.getTime() - updatedDate.getTime();
    return Math.floor(diffTime / 86400000) <= 3;
  };

  const getDeadlineStatus = (dateStr: string) => {
    const deadline = new Date(dateStr.replace(/\./g, '/'));
    const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { label: "完了", style: "bg-slate-100 text-slate-400 border-slate-200", icon: <CheckCircle size={22} /> };
    if (diffDays <= 3) return { label: `${diffDays}日`, style: "bg-red-50 text-red-600 border-red-100 shadow-[0_0_20px_rgba(239,68,68,0.1)]", icon: <AlertTriangle size={22} className="animate-pulse" /> };
    return { label: `${diffDays}日`, style: "bg-emerald-50 text-[#064e3b] border-emerald-100", icon: <Clock size={22} /> };
  };

  const filteredDeadlines = (allDeadlines || [])
    .filter(item => filter === "すべて" || item.dept === filter)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const departments = ["すべて", ...Array.from(new Set(allDeadlines.map(d => d.dept)))];

  return (
    <div className="page-main-container">
      {/* 1. 極太ヘッダー規格 */}
      <header className={`header-underline-bold ${isMidnight ? 'border-blue-600' : 'border-[#064e3b]'}`}>
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-1">
          <div className="flex items-center gap-7 text-left">
            <div className={`header-icon-squircle ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}>
              <Calendar size={32} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className={`header-title-main ${isMidnight ? 'text-white' : 'text-[#1a2e25]'}`}>
                締め切り
              </h2>
              <div className="flex items-center gap-3 mt-4 text-[11px] font-black uppercase tracking-[0.4em] opacity-30 italic">
                <div className={`h-[2px] w-6 ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}></div>
                Strategic Control
              </div>
            </div>
          </div>
          
          <div className="flex gap-1 overflow-x-auto pb-1 max-w-full no-scrollbar">
            {departments.map(dept => (
              <button key={dept} onClick={() => setFilter(dept)} 
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-none cursor-pointer ${
                  filter === dept 
                    ? (isMidnight ? "bg-blue-600 text-white shadow-lg" : "bg-[#064e3b] text-white shadow-lg") 
                    : "text-slate-400 hover:text-slate-600"
                }`}>
                {dept}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 2. 「島（カード）」形式のリスト */}
      <div className="grid grid-cols-1 gap-5 mt-10">
        {filteredDeadlines.map((item) => {
          const status = getDeadlineStatus(item.date);
          const isNew = isRecentlyUpdated(item.updateDate);

          return (
            <div key={item.id} className={`group relative p-8 rounded-[var(--radius-card)] border flex flex-col md:flex-row items-center gap-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${
              isMidnight ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-100 shadow-sm'
            }`}>
              
              {/* NEW判定：左上のドット付きラベル */}
              {isNew && (
                <div className="absolute top-6 left-10 flex items-center gap-2">
                  <span className="text-[10px] font-black text-orange-500 italic tracking-tighter uppercase">New</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]"></span>
                </div>
              )}

              {/* 右上の部署名（さりげなく配置） */}
              <div className="absolute top-6 right-12 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                {item.dept}
              </div>

              {/* ① ステータス・アイランド（左側の塊） */}
              <div className={`w-20 h-20 rounded-[1.8rem] border flex flex-col items-center justify-center shrink-0 transition-all group-hover:scale-110 group-hover:rotate-3 ${status.style}`}>
                {status.icon}
                <span className="text-[11px] font-[1000] mt-1.5 uppercase tracking-tighter">{status.label}</span>
              </div>

              {/* ② テキスト・コンテンツ（中央） */}
              <div className="flex-grow min-w-0 text-left">
                <div className="flex items-center gap-3 mb-2 opacity-40">
                  <div className={`h-[1px] w-4 ${isMidnight ? 'bg-blue-400' : 'bg-[#064e3b]'}`}></div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Target Timeline</span>
                </div>
                <h4 className={`text-[24px] font-black tracking-tight leading-tight transition-colors ${
                  isMidnight ? 'text-slate-100 group-hover:text-blue-400' : 'text-[#1a2e25] group-hover:text-[#064e3b]'
                }`}>
                  「{item.title}」
                </h4>
              </div>

              {/* ③ アクション・ボタン（右端） */}
              <div className="shrink-0">
                <button 
                  onClick={() => window.open(item.url, "_blank")} 
                  className={`h-14 px-10 rounded-2xl font-black text-[11px] tracking-[0.2em] uppercase flex items-center gap-4 shadow-xl transition-all group-hover:pr-12 group-hover:shadow-2xl ${
                    isMidnight 
                      ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-900/20' 
                      : 'bg-[#064e3b] text-white hover:bg-[#1a2e25] shadow-emerald-900/10'
                  }`}
                >
                  Execute <ArrowUpRight size={18} strokeWidth={3} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};