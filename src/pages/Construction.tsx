import React from "react";
import { MapPin, Settings, Trophy, ShieldCheck } from "lucide-react";
import { locationData } from "../data/locations";

export const Construction: React.FC<{ target: string, isMidnight?: boolean }> = ({ target, isMidnight }) => {
  const info = locationData[target] || { status: "construction", description: "準備中です" };

  return (
    <div className="page-main-container">
      {/* 💡 極太アンダーラインヘッダー：拠点名をそのままタイトル規格に */}
      <header className={`header-underline-bold ${isMidnight ? 'border-blue-600' : 'border-[#064e3b]'}`}>
        <div className="flex flex-col md:flex-row justify-between items-end">
          <div className="flex items-center gap-7">
            <div className={`header-icon-squircle ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}>
              <MapPin size={32} strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <h2 className={`header-title-main ${isMidnight ? 'text-white' : 'text-[#1a2e25]'}`}>
                {target}
              </h2>
              <div className="flex items-center gap-3 mt-4">
                <div className={`h-[2px] w-6 ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}></div>
                <p className="header-subtitle-sub">Location Intelligence</p>
              </div>
            </div>
          </div>
          <div className="pb-1">
            <div className={`flex items-center gap-3 px-6 py-2.5 rounded-xl border transition-all ${
              isMidnight 
                ? 'bg-slate-900 border-slate-700 text-blue-400' 
                : 'bg-emerald-50 border-emerald-100 text-[#064e3b]'
            }`}>
              <ShieldCheck size={18} strokeWidth={2.5} />
              <span className="text-[10px] font-[1000] uppercase tracking-widest">
                {info.status === "ready" ? "Active Status" : "Under Construction"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 💡 浮かび上がる「島」 */}
      {info.status === "ready" ? (
        <div className={`standard-card p-12 shadow-xl border-none ${isMidnight ? 'bg-slate-800/60' : 'bg-white'}`}>
          <div className="max-w-4xl">
            <h3 className={`text-2xl font-black mb-8 tracking-tight ${isMidnight ? 'text-white' : 'text-[#1a2e25]'}`}>
              拠点概要
            </h3>
            <p className={`text-xl leading-relaxed mb-12 font-medium ${isMidnight ? 'text-slate-400' : 'text-slate-600'}`}>
              {info.description}
            </p>
            <div className={`p-10 rounded-[3rem] border shadow-inner ${
              isMidnight ? 'bg-blue-600/10 border-blue-500/20 text-blue-300' : 'bg-slate-50 border-slate-100 text-[#064e3b]'
            }`}>
              <div className="flex items-center gap-4 mb-6 text-[11px] font-[1000] uppercase tracking-[0.3em] opacity-60">
                <Trophy size={24} strokeWidth={1.5} /> Improvement Impact
              </div>
              <p className="text-2xl font-black italic leading-tight">
                "{info.impact}"
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className={`standard-card py-40 flex flex-col items-center text-center shadow-lg border-none ${isMidnight ? 'bg-slate-800/60' : 'bg-white'}`}>
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-10 border border-slate-100 animate-spin-slow">
            <Settings size={44} strokeWidth={1} className="text-slate-300" />
          </div>
          <h3 className={`text-3xl font-[1000] mb-4 tracking-tighter uppercase ${isMidnight ? 'text-white' : 'text-slate-800'}`}>
            Synchronizing...
          </h3>
          <p className="text-slate-400 text-sm max-w-sm leading-relaxed font-bold tracking-tight uppercase opacity-60">
            Fetching latest deployment data for {target} facility.
          </p>
        </div>
      )}
    </div>
  );
};