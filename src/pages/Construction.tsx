import React from "react";
import { MapPin, Settings, Trophy, Info } from "lucide-react";
import { locationData } from "../data/locations";

interface ConstructionProps {
  target: string;
}

export const Construction: React.FC<ConstructionProps> = ({ target }) => {
  // 指定された拠点（target）のデータを取得。なければデフォルト（工事中）
  const info = locationData[target] || { status: "construction", description: "準備中です" };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
          <MapPin className="text-[#065f46]" size={28} /> {target}拠点情報
        </h2>
        <span className="bg-slate-50 text-slate-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-slate-100">
          Location Info
        </span>
      </header>

      {info.status === "ready" ? (
        /* データが準備できている拠点（大阪など）の表示 */
        <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
          <div className="h-64 overflow-hidden relative group">
            <img src={info.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={target} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b]/80 to-transparent flex items-end p-8">
              <h3 className="text-white text-2xl font-black">{info.title}</h3>
            </div>
          </div>
          <div className="p-8 space-y-6">
            <p className="text-slate-600 font-bold leading-relaxed text-lg italic border-l-4 border-slate-200 pl-6">
              {info.description}
            </p>
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 shadow-inner">
              <div className="flex items-center gap-3 mb-3 font-black text-[#065f46] uppercase tracking-wider italic text-sm">
                <Trophy size={18} className="text-emerald-500" /> Improvement Impact
              </div>
              <p className="text-[#065f46] font-bold leading-relaxed">
                {info.impact}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* まだ準備中の拠点（晴海・東陽町など）の表示 */
        <div className="bg-white p-20 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mb-8 border border-slate-100 relative">
            <Settings size={48} className="animate-spin-slow" />
            <Info size={20} className="absolute bottom-1 right-1 text-slate-400 bg-white rounded-full" />
          </div>
          <h3 className="text-xl font-black text-slate-800 mb-4">{info.description}</h3>
          <p className="text-slate-400 text-sm font-medium max-w-xs leading-relaxed">
            現在、{target}の最新データを整理・更新しています。公開まで今しばらくお待ちください。
          </p>
          <div className="mt-10 flex gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        </div>
      )}
    </div>
  );
};