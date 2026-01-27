import React from "react";
import { BookOpen, ShieldCheck, Clock, Clipboard, Server, MessageSquare, ChevronRight } from "lucide-react";
import { allGuides } from "../data/guides";

export const Guide: React.FC<{ isMidnight?: boolean }> = ({ isMidnight }) => {
  const IconMap: { [key: string]: React.ReactNode } = {
    Clock: <Clock size={24} />,
    Clipboard: <Clipboard size={24} />,
    Server: <Server size={24} />,
    MessageSquare: <MessageSquare size={24} />,
  };

  return (
    <div className="page-main-container">
      {/* 💡 極太アンダーラインヘッダー：全ページ共通規格 */}
      <header className={`header-underline-bold ${isMidnight ? 'border-blue-600' : 'border-[#064e3b]'}`}>
        <div className="flex flex-col md:flex-row justify-between items-end">
          <div className="flex items-center gap-7">
            {/* Squircle アイコン */}
            <div className={`header-icon-squircle ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}>
              <BookOpen size={32} strokeWidth={1.5} />
            </div>
            
            <div className="text-left">
              <h2 className={`header-title-main ${isMidnight ? 'text-white' : 'text-[#1a2e25]'}`}>
                Guide
              </h2>
              <div className="flex items-center gap-3 mt-4">
                <div className={`h-[2px] w-6 ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}></div>
                <p className="header-subtitle-sub">Onboarding Resources</p>
              </div>
            </div>
          </div>

          {/* 右側のステータス表示：タイポグラフィを他ページと統一 */}
          <div className="pb-1 hidden md:block">
            <div className={`flex items-center gap-3 px-6 py-2.5 rounded-xl border transition-all ${
              isMidnight 
                ? 'bg-slate-900 border-slate-700 text-blue-400' 
                : 'bg-emerald-50 border-emerald-100 text-[#064e3b]'
            }`}>
              <ShieldCheck size={18} strokeWidth={2.5} />
              <span className="text-[10px] font-[1000] uppercase tracking-widest">Mentor Support Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* 💡 浮かび上がる「島」のグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {allGuides.map((guide) => (
          <div 
            key={guide.id} 
            className={`standard-card shadow-md hover:shadow-2xl border-none transition-all duration-500 overflow-hidden group ${
              isMidnight ? 'bg-slate-800/60' : 'bg-white'
            }`}
          >
            {/* カード上部：アクセントカラーエリア */}
            <div className={`${guide.color} p-8 flex items-center gap-6 text-white relative overflow-hidden`}>
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md z-10">
                {IconMap[guide.iconName]}
              </div>
              <h3 className="text-2xl font-[1000] tracking-tight z-10">{guide.title}</h3>
              {/* 背景の装飾アイコン */}
              <div className="absolute right-[-10%] bottom-[-20%] opacity-10 group-hover:scale-110 transition-transform duration-700">
                {IconMap[guide.iconName]}
              </div>
            </div>

            <div className="p-8">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-8 leading-relaxed">
                {guide.description}
              </p>
              
              <div className="space-y-3">
                {guide.steps.map((step, idx) => (
                  <div 
                    key={idx} 
                    className={`p-5 rounded-2xl flex items-center justify-between border transition-all duration-300 ${
                      isMidnight 
                        ? 'bg-slate-900/50 border-slate-800 text-slate-300' 
                        : 'bg-slate-50/50 border-slate-100 text-[#1a2e25] hover:bg-white hover:shadow-md hover:border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <span className="w-7 h-7 rounded-full bg-current opacity-10 flex items-center justify-center text-[11px] font-[1000]">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-bold tracking-tight">{step}</span>
                    </div>
                    <ChevronRight size={16} strokeWidth={3} className="text-slate-300 group-hover:text-current" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em] pt-8 opacity-40">
        System Access & Support Guide
      </p>
    </div>
  );
};