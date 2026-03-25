import React, { useState, useEffect } from "react";
import { MessageSquare, Map, Clock, AlertCircle, ChevronRight, ChevronDown, Headset, FileBox, ExternalLink } from "lucide-react";
// import { allDeadlines } from "../data/deadlines"; // 不要なインポートをコメントアウト
import { externalLinks } from "../data/links";

interface SidebarProps {
  setActiveTab: (tab: string) => void;
  setActiveSectionId: (id: string) => void;
  isMidnight?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ setActiveTab, setActiveSectionId, isMidnight }) => {
  const [time, setTime] = useState(new Date());
  const [showSupport, setShowSupport] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // --- 締め切り関連の計算ロジックをコメントアウト ---
  /*
  const upcomingDeadlines = (allDeadlines || [])
    .map(d => ({ 
      ...d, 
      diffDays: Math.ceil((new Date(d.date.replace(/\./g, '/')).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) 
    }))
    .filter(d => d.diffDays >= 0 && d.diffDays <= 7)
    .sort((a, b) => a.diffDays - b.diffDays)
    .slice(0, 5);
  */

  return (
    <aside className="w-full space-y-4 animate-in fade-in duration-500 font-sans">
      
      {/* 1. CLOCK */}
      <div className={`rounded-[2.5rem] p-7 text-center shadow-xl relative overflow-hidden transition-colors duration-[3000ms] ${isMidnight ? 'bg-[#112240]' : 'bg-[#064e3b]'}`}>
        <div className="relative z-10 text-white">
          <div className="text-[20px] font-black text-emerald-400 uppercase tracking-widest mb-1 opacity-80 text-center">
            {time.toLocaleDateString('ja-JP', { month: '2-digit', day: '2-digit', weekday: 'short' })}
          </div>
          <div className="text-4xl font-black tabular-nums tracking-tighter leading-none text-center">
            {time.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
          </div>
        </div>
      </div>

      {/* --- 2. UPCOMING DEADLINES セクション全体をコメントアウト --- */}
      {/* <div className={`rounded-[2rem] p-5 border shadow-sm text-left ${isMidnight ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
        <div className="flex items-center gap-2 mb-4 px-1">
          <AlertCircle size={14} className="text-orange-500" />
          <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Upcoming Deadlines</h3>
        </div>
        <div className="space-y-2">
          {upcomingDeadlines.length > 0 ? (
            upcomingDeadlines.map((d, i) => (
              <div key={i} onClick={() => setActiveTab("deadlines")} className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${d.diffDays <= 1 ? "bg-red-50 border-red-100 text-red-700 shadow-sm" : "bg-slate-50 border-transparent text-slate-600 hover:border-slate-200"}`}>
                <div className="text-[11px] font-black truncate pr-2">{d.title}</div>
                <div className={`shrink-0 text-[8px] font-black px-2 py-0.5 rounded-full ${d.diffDays <= 1 ? "bg-red-500 text-white" : "bg-slate-200 text-slate-500"}`}>
                  {d.diffDays === 0 ? "TODAY" : `あと${d.diffDays}日`}
                </div>
              </div>
            ))
          ) : (
            <div className="py-4 text-center text-slate-300 text-[10px] font-black tracking-widest uppercase italic">No Urgent Tasks</div>
          )}
        </div>
      </div>
      */}

      {/* 3. MENU (コラム・座席表) */}
      <div className="space-y-2">

        <button 
          onClick={() => window.open(externalLinks.seatingChart, "_blank")} 
          className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 rounded-2xl border border-slate-100 shadow-sm transition-all group text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-[#064e3b] group-hover:text-white transition-all">
              <Map size={20} />
            </div>
            <span className="text-[15px] font-black text-[#1a2e25]">全社座席表</span>
          </div>
          <ChevronRight size={14} className="text-slate-200" />
        </button>
      

        <button onClick={() => setActiveTab("column")} className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 rounded-2xl border border-slate-100 shadow-sm transition-all group text-left">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-[#064e3b] group-hover:text-white transition-all">
              <MessageSquare size={20} />
            </div>
            <span className="text-[15px] font-black text-[#1a2e25]">今週のコラム</span>
          </div>
          <ChevronRight size={14} className="text-slate-200" />
        </button>
</div>
        
      {/* 4. 部会資料バナー */}
      <button 
        onClick={() => window.open("http://dominoap.nekonet.co.jp/tyo/tyo1304.nsf/", "_blank")}
        className={`w-full group relative overflow-hidden rounded-[2rem] p-6 text-left transition-all hover:shadow-2xl hover:-translate-y-1 border-none shadow-lg ${
          isMidnight ? 'bg-slate-800' : 'bg-gradient-to-br from-[#1a2e25] to-[#064e3b] text-white'
        }`}
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-1.5 rounded-lg ${isMidnight ? 'bg-blue-600' : 'bg-white/10'}`}>
              <FileBox size={14} className="text-white" />
            </div>
            <span className="text-[9px] font-[1000] uppercase tracking-[0.2em] opacity-60">Strategic Docs</span>
          </div>
          <h4 className="text-[20px] font-black leading-tight mb-1">部会資料アーカイブ</h4>
          <p className="text-[9px] font-bold opacity-50 flex items-center gap-1 uppercase tracking-widest">
           
          </p>
        </div>
        <FileBox size={80} className="absolute -right-4 -bottom-4 opacity-10 rotate-12" />
      </button>

      {/* 5. SUPPORT */}
      <div className="space-y-2">
        <button 
          onClick={() => setShowSupport(!showSupport)}
          className={`w-full p-4 rounded-[2rem] transition-all font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-between gap-2 shadow-lg ${
            showSupport ? "bg-white text-[#064e3b] border-2 border-[#064e3b]" : "bg-[#064e3b] text-white"
          }`}
        >
          <div className="flex items-center gap-2 text-left">
            <Headset size={14} /> <span>お問い合わせ先一覧</span>
          </div>
          <ChevronDown size={14} className={`transition-transform ${showSupport ? "rotate-180" : ""}`} />
        </button>
        
        {showSupport && (
          <div className="bg-white border border-slate-100 rounded-3xl p-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
            {externalLinks.support.map((link, i) => (
              <button
                key={i}
                onClick={() => window.open(link.url, "_blank")}
                className="w-full text-left px-4 py-3 text-[11px] font-black text-[#1a2e25] hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-all border-b border-slate-50 last:border-none flex items-center justify-between group"
              >
                {link.label}
                <ChevronRight size={12} className="text-slate-200 group-hover:text-emerald-400" />
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};