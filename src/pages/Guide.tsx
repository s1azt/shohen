import React from "react";
import { BookOpen, ShieldCheck, Clock, Clipboard, Server, MessageSquare } from "lucide-react";
import { allGuides } from "../data/guides";

export const Guide: React.FC<{ isMidnight?: boolean }> = ({ isMidnight }) => {
  // アイコン名（文字列）を実際のコンポーネントに変換するマップ
  const IconMap: { [key: string]: React.ReactNode } = {
    Clock: <Clock size={24} />,
    Clipboard: <Clipboard size={24} />,
    Server: <Server size={24} />,
    MessageSquare: <MessageSquare size={24} />,
  };

  return (
    <div className="page-main-container">
      {/* 💡 ヘッダー：共通規格 */}
      <header className={`header-underline-bold ${isMidnight ? 'border-blue-600' : 'border-[#064e3b]'}`}>
        <div className="flex flex-col md:flex-row justify-between items-end">
          <div className="flex items-center gap-7">
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
          <div className="pb-1 hidden md:block">
            <div className={`flex items-center gap-3 px-6 py-2.5 rounded-xl border transition-all ${
              isMidnight ? 'bg-slate-900 border-slate-700 text-blue-400' : 'bg-emerald-50 border-emerald-100 text-[#064e3b]'
            }`}>
              <ShieldCheck size={18} strokeWidth={2.5} />
              <span className="text-[10px] font-[1000] uppercase tracking-widest">Mentor Support Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* 💡 ガイドリスト */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {allGuides.map((guide) => (
          <div key={guide.id} className="standard-card shadow-lg border-none flex flex-col group">
            {/* カードヘッダー */}
            <div className={`relative ${guide.color} p-10 flex items-center gap-6 overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20" />
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md z-10 border border-white/30 text-white shadow-inner">
                {IconMap[guide.iconName]}
              </div>
              <h3 className="text-2xl font-[1000] tracking-tight z-10 text-white drop-shadow-md">
                {guide.title}
              </h3>
            </div>

            <div className="p-8 flex-grow">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 leading-relaxed border-l-4 border-slate-200 pl-4">
                {guide.description}
              </p>
              
              {/* 💡 箇条書きリスト */}
              <div className="space-y-4">
                {guide.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    {/* ドット（箇条書き記号） */}
                    <div className="pt-2 shrink-0">
                      <div className={`w-2 h-2 rounded-full ${
                        isMidnight ? 'bg-blue-500' : 'bg-[#064e3b]'
                      } opacity-60 shadow-sm`} />
                    </div>
                    <span className={`text-sm font-bold tracking-tight leading-relaxed ${
                      isMidnight ? 'text-slate-300' : 'text-[#1a2e25]'
                    }`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};