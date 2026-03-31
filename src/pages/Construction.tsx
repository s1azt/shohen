import React from "react";
import { MapPin, Settings, Trophy } from "lucide-react";
import { locationData } from "../data/locations";

export const Construction: React.FC<{ target: string }> = ({ target }) => {
  const info = locationData[target] || { status: "construction", description: "準備中です" };

  return (
    <div className="page-main-container">
      {/* 拠点ラベル */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-(--gs-accent)" />
          <span className="text-[13px] font-black text-(--gs-text-primary) tracking-widest">{target}</span>
        </div>
        {info.publishedAt && (
          <span className="text-[12px] font-bold text-(--gs-text-primary)/40 tracking-widest">
            掲載日: {info.publishedAt.replace(/-/g, "/")}
          </span>
        )}
      </div>

      {/* 💡 浮かび上がる「島」 */}
      {info.status === "ready" ? (
        <div className="standard-card p-12 shadow-xl border-none bg-(--gs-card-bg)">
          <div className="max-w-4xl">
            {info.title && (
              <h3 className="text-2xl font-black mb-8 tracking-tight text-(--gs-text-primary)">
                {info.title}
              </h3>
            )}
            <p className="text-xl leading-relaxed mb-12 font-medium text-slate-600">
              {info.description}
            </p>
            <div className="p-10 rounded-[3rem] border shadow-inner bg-slate-50 border-slate-100 text-(--gs-accent)">
              <div className="flex items-center gap-4 mb-6 text-[12px] font-[1000] uppercase tracking-[0.3em] opacity-60">
                <Trophy size={24} strokeWidth={1.5} /> Improvement Impact
              </div>
              <p className="text-2xl font-black italic leading-tight">
                "{info.impact}"
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="standard-card py-40 flex flex-col items-center text-center shadow-lg border-none bg-(--gs-card-bg)">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-10 border border-slate-100 animate-spin-slow">
            <Settings size={44} strokeWidth={1} className="text-slate-300" />
          </div>
          <h3 className="text-3xl font-[1000] mb-4 tracking-tighter uppercase text-(--gs-text-primary)">
            工事中👷...
          </h3>
          <p className="text-slate-400 text-sm max-w-sm leading-relaxed font-bold tracking-tight uppercase opacity-60">
            Fetching latest deployment data for {target} facility.
          </p>
        </div>
      )}
    </div>
  );
};