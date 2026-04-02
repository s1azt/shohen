import React from "react";
import { Clock, Clipboard, Server, MessageSquare, ShieldCheck } from "lucide-react";
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
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-1000 pb-10 px-4">
      
      {/* 1. ステータスバー（ヘッダーの代わり） */}
      <div className="flex justify-center sm:justify-end">
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-[1.4rem] border bg-white/80 border-slate-200 text-slate-400 shadow-sm backdrop-blur-sm">
          <ShieldCheck size={16} strokeWidth={2.5} className="text-(--gs-accent)" />
          <span className="text-[12px] font-[1000] uppercase tracking-[0.2em] leading-none">
            Internal Operational Standards
          </span>
        </div>
      </div>

      {/* 2. ガイドカードグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {allGuides.map((guide) => {
          const scheme = COLOR_SCHEMES[guide.id] || COLOR_SCHEMES[101];
          const Icon = ICON_MAP[guide.iconName];
          
          return (
            <div 
              key={guide.id} 
              className="group relative rounded-[2.5rem] border-none flex flex-col shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-(--gs-card-bg) overflow-hidden"
            >
              {/* 装飾アクセントライン */}
              <div className={`h-2 w-full ${scheme.line} opacity-50`} />

              {/* カードヘッダー */}
              <div className="p-10 pb-6 flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-transform duration-500 group-hover:rotate-12 ${scheme.icon} ${scheme.light}`}>
                  {Icon && <Icon size={24} />}
                </div>
                <div className="text-left">
                  <h3 className="text-[24px] font-[1000] tracking-tight leading-tight text-(--gs-text-primary)">
                    {guide.title}
                  </h3>
                  <p className={`text-[12px] font-black uppercase tracking-[0.3em] mt-2.5 opacity-70 ${scheme.light}`}>
                    Category Intelligence
                  </p>
                </div>
              </div>

              {/* カードコンテンツ */}
              <div className="px-10 pb-12 flex-grow">
                <p className="text-[14px] font-medium leading-relaxed mb-10 text-slate-500/80 italic">
                  {guide.description}
                </p>
                
                {/* タイムライン構造 */}
                <div className="relative ml-1 space-y-7">
                  {/* 縦のガイド線 */}
                  <div className={`absolute left-3 top-2 bottom-2 w-px ${scheme.line}`} />
                  
                  {guide.steps.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-7 group/item">
                      {/* インデックス番号 */}
                      <div className={`relative z-10 w-6 h-6 rounded-lg flex items-center justify-center text-[12px] font-[1000] border transition-all duration-300 bg-white border-slate-100 ${scheme.light} group-hover/item:scale-125 group-hover/item:border-(--gs-accent) shadow-sm`}>
                        {idx + 1}
                      </div>
                      
                      {/* ステップ内容 */}
                      <div className="pt-0.5 flex-grow text-left">
                        <span className="text-[15px] font-bold tracking-tight leading-relaxed text-(--gs-text-primary)/80 group-hover/item:text-(--gs-text-primary) transition-colors">
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