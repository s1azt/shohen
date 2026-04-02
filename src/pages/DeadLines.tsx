import React, { useState, useMemo } from "react";
import { allDeadlines } from "../data/deadlines";
import { autoDeadlines } from "../data/deadlines-auto";
import { Clock, AlertTriangle, CheckCircle, ArrowUpRight } from "lucide-react";
import { isWithinDays, DEADLINE_NEW_DAYS } from "../utils/newBadge";
import { useReadNews } from "../utils/useReadNews";

const today0 = new Date();
today0.setHours(0, 0, 0, 0);

const mergedDeadlines = [
  ...allDeadlines,
  ...autoDeadlines.filter(a =>
    !allDeadlines.some(m => m.id === a.id) &&
    new Date(a.date.replace(/\./g, '/')) >= today0
  ),
];

const DEPARTMENTS = ["一覧", ...Array.from(new Set(mergedDeadlines.map(d => d.dept)))];

export const Deadlines: React.FC = () => {
  const [filter, setFilter] = useState("一覧");
  const { isRead, markAsRead } = useReadNews();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 新着判定：未読 かつ DEADLINE_NEW_DAYS日以内
  const isNewItem = (dateStr: string | undefined, id: string | number) =>
    !isRead(`dl-${id}`) && isWithinDays(dateStr, DEADLINE_NEW_DAYS);

  const getDeadlineStatus = (dateStr: string) => {
    const deadline = new Date(dateStr.replace(/\./g, '/'));
    const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { label: "完了", style: "bg-slate-100 text-slate-400 border-slate-200", icon: <CheckCircle size={20} /> };
    if (diffDays <= 3) return { label: `${diffDays}日`, style: "bg-red-50 text-red-600 border-red-100 shadow-[0_0_15px_rgba(239,68,68,0.1)]", icon: <AlertTriangle size={20} className="animate-pulse" /> };
    return { label: `${diffDays}日`, style: "bg-slate-50 text-(--gs-accent) border-slate-100", icon: <Clock size={20} /> };
  };

  const filteredDeadlines = useMemo(() =>
    mergedDeadlines
      .filter(item => filter === "一覧" || item.dept === filter)
      .sort((a, b) => a.date.localeCompare(b.date))
  , [filter]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-1000 pb-10 px-4">
      {/* カテゴリータブ */}
      <div className="flex justify-center">
        <div className="flex bg-slate-100/80 p-1.5 rounded-[2rem] border border-slate-200 w-full overflow-x-auto scrollbar-hide backdrop-blur-sm shadow-sm">
          {DEPARTMENTS.map(dept => (
            <button
              key={dept}
              onClick={() => setFilter(dept)}
              className={`flex-1 min-w-[120px] py-3 px-6 rounded-[1.6rem] font-black text-[13px] tracking-widest transition-all duration-300 ${
                filter === dept
                  ? "bg-white text-(--gs-accent) shadow-md transform scale-[1.02]"
                  : "text-slate-400 hover:text-slate-600 hover:bg-white/40"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* カードリスト */}
      <div className="rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-50 divide-y bg-(--gs-card-bg) divide-slate-100/50">
        {filteredDeadlines.map((item) => {
          const status = getDeadlineStatus(item.date);
          const isNew = isNewItem(item.updateDate, item.id);

          return (
            <div
              key={item.id}
              onClick={() => { markAsRead(`dl-${item.id}`); window.open(item.url, "_blank"); }}
              className="group relative p-6 flex flex-col md:flex-row items-center gap-6 hover:bg-slate-50/80 transition-all duration-300 cursor-pointer"
            >
              
              {/* NEW判定ラベル */}
              {isNew && (
                <div className="absolute top-4 left-6 flex items-center gap-1.5">
                  <span className="text-[12px] font-black text-orange-500 italic tracking-tighter uppercase leading-none">New</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]"></span>
                </div>
              )}

              {/* ① ステータス・アイランド（左側の塊） */}
              <div className={`w-14 h-14 rounded-2xl border flex flex-col items-center justify-center shrink-0 transition-all group-hover:scale-110 ${status.style}`}>
                {status.icon}
                <span className="text-[12px] font-black mt-0.5 uppercase tracking-tighter">{status.label}</span>
              </div>

              {/* ② テキスト・コンテンツ */}
              <div className="flex-grow min-w-0 text-left">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[12px] font-black text-slate-500 uppercase tracking-widest">{item.dept}</span>
                </div>
                <h4 className="text-[17px] font-black tracking-tight leading-tight text-(--gs-text-primary) group-hover:text-(--gs-accent)">
                  {item.title}
                </h4>
              </div>

              {/* ③ アクション・ボタン */}
              <div className="shrink-0 flex items-center gap-6">
                <div className="hidden md:block text-right">
                  <p className="text-[12px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">期限</p>
                  <p className="text-[14px] font-black tabular-nums leading-none text-(--gs-accent)">
                    {item.date}
                  </p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); markAsRead(`dl-${item.id}`); window.open(item.url, "_blank"); }} 
                  className="h-11 px-6 rounded-xl font-black text-[12px] tracking-widest uppercase flex items-center gap-3 shadow-md bg-(--gs-accent) text-white hover:bg-(--gs-accent)/80 shadow-black/10 shrink-0"
                >
                  詳細を見る <ArrowUpRight size={16} strokeWidth={3} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-[12px] font-bold text-slate-400 uppercase tracking-[0.5em] pt-12 opacity-40">
        Strategic Control Endpoint
      </p>
    </div>
  );
};