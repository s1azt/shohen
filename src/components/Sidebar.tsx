import React, { useState, useEffect } from "react";
import { MessageSquare, Map, Users, Phone, Clock, AlertCircle, CheckCircle2, ChevronRight, FileText, ChevronDown, Headset } from "lucide-react";
import { getAllSections } from "../data/organization";
import { allDeadlines } from "../data/deadlines";
import { externalLinks } from "../data/links"; // 💡 追加

export const Sidebar: React.FC<{ setActiveTab: any, setActiveSectionId: any, isMidnight?: boolean }> = ({ setActiveTab, setActiveSectionId, isMidnight }) => {
  const [time, setTime] = useState(new Date());
  const [showSupport, setShowSupport] = useState(false); // 💡 お問い合わせ先表示用

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const sections = getAllSections();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingDeadlines = (allDeadlines || [])
    .map(d => ({ 
      ...d, 
      diffDays: Math.ceil((new Date(d.date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) 
    }))
    .filter(d => d.diffDays >= 0 && d.diffDays <= 7)
    .sort((a, b) => a.diffDays - b.diffDays)
    .slice(0, 5);

  return (
    <aside className="w-full space-y-4 animate-in fade-in duration-500">
      
      {/* 1. CLOCK */}
      <div className={`rounded-[2.5rem] p-7 text-center shadow-xl relative overflow-hidden transition-colors duration-[3000ms] ${isMidnight ? 'bg-[#112240]' : 'bg-[#064e3b]'}`}>
        <div className="relative z-10 text-white">
          <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">
            {time.toLocaleDateString('ja-JP', { month: '2-digit', day: '2-digit', weekday: 'short' })}
          </div>
          {/* 💡 second: '2-digit' を追加 */}
          <div className="text-4xl font-black tabular-nums tracking-tighter leading-none">
            {time.toLocaleTimeString('ja-JP', { 
              hour: '2-digit', 
              minute: '2-digit', 
              second: '2-digit', 
              hour12: false 
            })}
          </div>
        </div>
      </div>

      {/* 2. UPCOMING DEADLINES */}
      <div className="bg-white rounded-[2rem] p-4 border border-slate-100 shadow-sm text-left">
        <div className="flex items-center gap-2 mb-3 px-1">
          <AlertCircle size={14} className="text-orange-500" />
          <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Upcoming Deadlines</h3>
        </div>
        <div className="space-y-1.5">
          {upcomingDeadlines.length > 0 ? (
            upcomingDeadlines.map((d, i) => (
              <div key={i} onClick={() => setActiveTab("deadlines")} className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${d.diffDays <= 1 ? "bg-orange-50 border-orange-100 text-orange-700 shadow-sm" : "bg-slate-50 border-transparent text-slate-600 hover:border-slate-200"}`}>
                <div className="text-[11px] font-black truncate leading-tight pr-2">{d.title}</div>
                <div className={`shrink-0 text-[9px] font-black px-2 py-0.5 rounded-full ${d.diffDays <= 1 ? "bg-orange-500 text-white" : "bg-slate-200 text-slate-500"}`}>
                  {d.diffDays === 0 ? "TODAY" : `あと${d.diffDays}日`}
                </div>
              </div>
            ))
          ) : (
            <div className="py-4 text-center text-slate-300 text-[10px] font-black tracking-widest uppercase">No Urgent Tasks</div>
          )}
        </div>
      </div>

      {/* 3. MENU */}
      <div className="space-y-2">
        <button onClick={() => setActiveTab("column")} className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 rounded-2xl border border-slate-100 shadow-sm transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-[#064e3b] group-hover:text-white transition-all">
              <MessageSquare size={18} />
            </div>
            <span className="text-[12px] font-black text-[#1a2e25]">今週のコラム</span>
          </div>
          <ChevronRight size={14} className="text-slate-200" />
        </button>

        <button 
          onClick={() => window.open(externalLinks.seatingChart, "_blank")} 
          className="w-full flex items-center gap-4 p-4 bg-white hover:bg-slate-50 rounded-2xl border border-slate-100 shadow-sm transition-all group"
        >
          <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-[#064e3b] group-hover:text-white transition-all">
            <Map size={18} />
          </div>
          <span className="text-[12px] font-black text-[#1a2e25] text-left">全社座席表</span>
        </button>
      </div>

      {/* 4. ORGANIZATION */}
      <div className="bg-white rounded-[2.5rem] p-5 border border-slate-100 shadow-sm text-left">
        <div className="flex items-center gap-2 mb-3 px-2">
          <Users size={14} className="text-slate-300" />
          <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Org Charts</h3>
        </div>
        <div className="space-y-2">
          {sections.map((section) => (
            <div key={section.id} className="flex gap-1 group/item">
              <button 
                onClick={() => { setActiveSectionId(section.id); setActiveTab("team"); }}
                className="flex-grow flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-[#064e3b] text-[#1a2e25] hover:text-white rounded-l-xl rounded-r-sm text-[12px] font-black transition-all"
              >
                <span>{section.id}</span>
              </button>
              <button onClick={(e) => { e.stopPropagation(); window.open(section.pdfUrl, "_blank"); }} className="px-3 bg-slate-50 hover:bg-emerald-600 text-slate-300 hover:text-white rounded-r-xl rounded-l-sm transition-all">
                <FileText size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. SUPPORT (お問い合わせ先一覧) */}
      <div className="space-y-2">
        <button 
          onClick={() => setShowSupport(!showSupport)}
          className={`w-full p-4 rounded-[2rem] transition-all font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-between gap-2 shadow-lg ${
            showSupport ? "bg-white text-[#064e3b] border-2 border-[#064e3b]" : "bg-[#064e3b] text-white"
          }`}
        >
          <div className="flex items-center gap-2">
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