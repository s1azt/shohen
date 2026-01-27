



import React from "react";
import { Activity, Calendar, HelpCircle, FileText, Clipboard, GraduationCap, ChevronRight, Bell, Clock, ArrowRight } from "lucide-react";
import { allDeadlines } from "../data/deadlines";
import { allNews } from "../data/news";

export const Home: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  const today = new Date().toISOString().split('T')[0];
  const homeDeadlines = allDeadlines.filter(item => item.date >= today).slice(0, 2);
  const homeNews = allNews.slice(0, 3);

  const quickLinks = [
    { title: "社活サイト", desc: "日報入力・勤怠管理", icon: <Activity /> },
    { title: "会議室予約", desc: "会議室・備品予約", icon: <Calendar /> },
    { title: "社内FAQ", desc: "困った時のルールブック", icon: <HelpCircle /> },
    { title: "GSうぃき", desc: "マニュアル・知識共有", icon: <FileText /> },
    { title: "TW申請", desc: "テレワーク・残業申請", icon: <Clipboard /> },
    { title: "E-learning", desc: "スキルアップ・社内研修", icon: <GraduationCap /> },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in duration-1000">
      
      {/* 1. Priority Alerts - 【プロの技】背景に溶け込むオレンジ */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <h3 className="text-[11px] font-bold text-[#064e3b] uppercase tracking-[0.4em] opacity-80">Priority Alerts</h3>
          </div>
          <button onClick={() => setActiveTab("deadlines")} className="text-[10px] font-bold text-[#6b7a5f] hover:text-[#064e3b] transition-colors flex items-center gap-1 group">
            すべての締め切りを表示 <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {homeDeadlines.map((item) => (
            <div key={item.id} className="bg-white/80 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-all flex items-center group">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mr-8">
                <Clock size={28} strokeWidth={1.5} />
              </div>
              <div className="flex-grow">
                <h4 className="text-xl font-bold text-[#1a2e25] mb-1.5">{item.title}</h4>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-orange-600 tracking-wider">DUE: {item.date}</span>
                  <div className="w-1 h-1 rounded-full bg-slate-200" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.dept}</span>
                </div>
              </div>
              <button onClick={() => setActiveTab("deadlines")} className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-[#064e3b] group-hover:text-white group-hover:border-[#064e3b] transition-all">
                <ArrowRight size={20} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Service Links - 【プロの技】白の重なり（ホワイト・オン・ホワイト） */}
      <section className="space-y-6">
        <div className="px-6 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-slate-300" />
          <h3 className="text-[11px] font-bold text-[#064e3b] uppercase tracking-[0.4em] opacity-80">Service Links</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link, idx) => (
  <div key={idx} className="bg-white p-10 rounded-[3rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_60px_-15px_rgba(6,78,59,0.15)] transition-all group flex flex-col items-center text-center cursor-pointer border border-white hover:border-[#cbd5c0]/30">
    {/* アイコン：白すぎないよう、メインカラーの薄い緑を敷く */}
    <div className="w-20 h-20 rounded-[2rem] mb-6 flex items-center justify-center bg-[#f0f4f0] text-[#064e3b] group-hover:bg-[#064e3b] group-hover:text-white transition-all duration-500 shadow-inner">
      {React.cloneElement(link.icon as React.ReactElement, { size: 32, strokeWidth: 1.5 })}
    </div>
    <h3 className="text-xl font-bold text-[#1a2e25] mb-2 tracking-tight">{link.title}</h3>
    <p className="text-[11px] text-[#6b7a5f] font-bold uppercase tracking-wider opacity-60 leading-tight">{link.desc}</p>
  </div>
))}
        </div>
      </section>

      {/* 3. News Update - 【プロの技】余白の美学 */}
      <section className="bg-[#064e3b] text-white rounded-[4rem] p-16 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 relative z-10">
          <div className="space-y-2">
            <h3 className="text-5xl font-bold italic tracking-tighter">News Update</h3>
            <p className="text-white/30 text-[10px] font-bold tracking-[0.6em] ml-1 uppercase">Internal Intelligence Bureau</p>
          </div>
          <button onClick={() => setActiveTab("news")} className="mt-8 md:mt-0 text-[10px] font-bold tracking-[0.2em] uppercase border-b border-white/20 hover:border-white transition-all pb-1">Read All News</button>
        </div>
        <div className="space-y-0 relative z-10">
          {homeNews.map((item) => (
            <div key={item.id} onClick={() => setActiveTab("news")} className="flex items-center py-7 border-t border-white/5 first:border-0 hover:bg-white/[0.03] px-4 -mx-4 rounded-xl transition-all cursor-pointer group/item">
              <span className="text-[10px] font-mono text-white/30 mr-12 group-hover/item:text-white/60 transition-colors">{item.date}</span>
              <span className="flex-grow font-medium text-lg tracking-tight group-hover/item:translate-x-2 transition-transform">{item.title}</span>
              <ChevronRight size={18} className="text-white/20 group-hover/item:text-white transition-colors" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};