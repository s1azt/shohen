import React from "react";
import { BookOpen, Clock, Clipboard, Server, MessageSquare, ShieldCheck } from "lucide-react";
import { allGuides } from "../data/guides";

const COLOR_SCHEMES: Record<number, { light: string; icon: string; line: string }> = {
  101: { light: "text-blue-600",    icon: "bg-blue-50 border-blue-100",     line: "bg-blue-500/20" },
  102: { light: "text-emerald-700", icon: "bg-emerald-50 border-emerald-100", line: "bg-emerald-500/20" },
  103: { light: "text-indigo-600",  icon: "bg-indigo-50 border-indigo-100",  line: "bg-indigo-500/20" },
  104: { light: "text-amber-700",   icon: "bg-amber-50 border-amber-100",    line: "bg-amber-500/20" },
};

const ICON_MAP: Record<string, React.FC<{ size?: number }>> = {
  Clock, Clipboard, Server, MessageSquare,
};

export const Guide: React.FC = () => {

  return (
    <div className="page-main-container">
      {/* 共通ヘッダー規格 */}
      <header className="header-underline-bold border-[#064e3b]">
        <div className="flex flex-col md:flex-row justify-between items-end">
          <div className="flex items-center gap-7">
            <div className="header-icon-squircle bg-[#064e3b]">
              <BookOpen size={32} strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <h2 className="header-title-main text-[#1a2e25]">
                新人ガイド
              </h2>
              <div className="flex items-center gap-3 mt-4">
                <div className="h-[2px] w-6 bg-[#064e3b]"></div>
                <p className="header-subtitle-sub opacity-50">Operational Standards</p>
              </div>
            </div>
          </div>
          <div className="pb-1 hidden md:block">
            <div className="flex items-center gap-3 px-5 py-2 rounded-xl border bg-white border-slate-200 text-slate-400">
              <ShieldCheck size={16} strokeWidth={2.5} />
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">Internal Use Only</span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {allGuides.map((guide) => {
          const scheme = COLOR_SCHEMES[guide.id] || COLOR_SCHEMES[101];
          return (
            <div 
              key={guide.id} 
              className={`standard-card shadow-xl border-none flex flex-col hover:shadow-2xl hover:-translate-y-1 bg-white`}
            >
              {/* カードヘッダー */}
              <div className="p-8 pb-4 flex items-center gap-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${scheme.icon} ${scheme.light}`}>
                  {(() => { const Icon = ICON_MAP[guide.iconName]; return Icon ? <Icon size={20} /> : null; })()}
                </div>
                <div className="text-left">
                  <h3 className="text-[22px] font-[1000] tracking-tight leading-none text-[#1a2e25]">
                    {guide.title}
                  </h3>
                  <p className={`text-[9px] font-black uppercase tracking-[0.25em] mt-2.5 ${scheme.light}`}>
                    Category Intelligence
                  </p>
                </div>
              </div>

              {/* カードコンテンツ */}
              <div className="px-8 pb-12 flex-grow">
                <p className="text-[12.5px] font-medium leading-relaxed mb-10 opacity-60 italic text-slate-500">
                  {guide.description}
                </p>
                
                {/* 繊細なタイムライン構造 */}
                <div className="relative ml-1 space-y-7">
                  {/* 縦のガイド線 */}
                  <div className={`absolute left-3 top-2 bottom-2 w-px ${scheme.line}`} />
                  
                  {guide.steps.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-6 group/item">
                      {/* インデックス番号 */}
                      <div className={`relative z-10 w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-[1000] border bg-white border-slate-100 ${scheme.light} group-hover/item:border-slate-300`}>
                        {idx + 1}
                      </div>
                      
                      {/* ステップ内容 */}
                      <div className="pt-0.5 flex-grow">
                        <span className="text-[15px] font-semibold tracking-tight leading-relaxed text-[#1a2e25] opacity-90 group-hover/item:opacity-100 group-hover/item:text-black">
                          {step}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};