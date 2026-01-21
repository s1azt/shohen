import React, { useState, useEffect } from "react";
import { Clock, MessageCircle, Map, ChevronRight } from "lucide-react";

interface SidebarProps {
  setActiveTab: (tab: string) => void;
  setActiveSectionId: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ setActiveTab, setActiveSectionId }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <aside className="w-full md:w-80 space-y-6 flex-shrink-0 animate-in fade-in">
      {/* 時刻表示 */}
      <div className="bg-white rounded-2xl border border-[#e2ece9] p-6 text-center shadow-lg">
        <p className="text-[11px] font-black text-slate-400 mb-2 uppercase tracking-widest text-left flex items-center gap-1">
          <Clock size={12}/> STATUS
        </p>
        <div className="text-base font-bold text-slate-600 mb-1">
          {time.toLocaleDateString('ja-JP', {month:'long', day:'numeric', weekday:'long'})}
        </div>
        <div className="text-5xl text-[#065f46] font-black tracking-tight leading-none">
          {time.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', second:'2-digit'})}
        </div>
      </div>

      {/* 今週のコラム & 全社座席表 */}
      <div className="grid grid-cols-1 gap-3">
        <a href="#" className="bg-white rounded-2xl border border-[#e2ece9] p-4 flex items-center justify-between hover:border-[#448a76] hover:shadow-md transition-all group">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-50 p-2.5 rounded-xl text-[#448a76]">
              <MessageCircle size={20} />
            </div>
            <span className="font-black text-slate-700 text-sm">今週のコラム</span>
          </div>
          <ChevronRight size={16} className="text-slate-300 group-hover:text-[#448a76]" />
        </a>
        <a href="#" className="bg-white rounded-2xl border border-[#e2ece9] p-4 flex items-center justify-between hover:border-[#448a76] hover:shadow-md transition-all group">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2.5 rounded-xl text-blue-500">
              <Map size={20} />
            </div>
            <span className="font-black text-slate-700 text-sm">全社座席表</span>
          </div>
          <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500" />
        </a>
      </div>

      {/* 重要締め切り */}
      <div className="bg-white rounded-2xl border border-[#e2ece9] p-6 border-l-8 border-red-400">
        <p className="text-[10px] font-black text-red-500 mb-3 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span> UPCOMING
        </p>
        <div className="cursor-pointer" onClick={() => setActiveTab("deadlines")}>
          <h4 className="font-black text-slate-800 text-[13px] leading-tight mb-1">年末調整書類提出</h4>
          <p className="text-[10px] text-slate-500 font-bold italic">2026.12.10</p>
        </div>
      </div>

      {/* 組織図 */}
      <div className="bg-white rounded-2xl border border-[#e2ece9] p-6 bg-emerald-50/30">
        <p className="text-[11px] font-black text-slate-400 mb-4 uppercase tracking-widest text-center border-b border-emerald-100 pb-2">ORG CHARTS</p>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          {["HC10", "HC60", "HC70", "HD10", "HD70"].map(sec => (
            <button key={sec} onClick={() => {setActiveTab("team"); setActiveSectionId(sec);}} 
              className="p-3 bg-white text-slate-800 font-black rounded-lg border border-slate-100 hover:bg-[#448a76] hover:text-white transition-all shadow-sm">
              {sec}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};