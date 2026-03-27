import React, { useState, useMemo } from "react";
import { allDeadlines } from "../data/deadlines";
import { Clock, AlertTriangle, CheckCircle, Calendar, ArrowUpRight } from "lucide-react";
import { isWithinDays, DEADLINE_NEW_DAYS } from "../utils/newBadge";

const DEPARTMENTS = ["すべて", ...Array.from(new Set(allDeadlines.map(d => d.dept)))];

export const Deadlines: React.FC = () => {
  const [filter, setFilter] = useState("すべて");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 💡 共通の新着判定（1日以内）
  const isRecentlyUpdated = (dateStr?: string) => isWithinDays(dateStr, DEADLINE_NEW_DAYS);

  const getDeadlineStatus = (dateStr: string) => {
    const deadline = new Date(dateStr.replace(/\./g, '/'));
    const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { label: "完了", style: "bg-slate-100 text-slate-400 border-slate-200", icon: <CheckCircle size={20} /> };
    if (diffDays <= 3) return { label: `${diffDays}日`, style: "bg-red-50 text-red-600 border-red-100 shadow-[0_0_15px_rgba(239,68,68,0.1)]", icon: <AlertTriangle size={20} className="animate-pulse" /> };
    return { label: `${diffDays}日`, style: "bg-slate-50 text-(--gs-accent) border-slate-100", icon: <Clock size={20} /> };
  };

  const filteredDeadlines = useMemo(() =>
    (allDeadlines || [])
      .filter(item => filter === "すべて" || item.dept === filter)
      .sort((a, b) => a.date.localeCompare(b.date))
  , [filter]);

  return (
    <div className="page-main-container">
      {/* 1. ヘッダー：タイトルエリアのみに整理 */}
      <header className="header-underline-bold mb-4 border-(--gs-accent)">
        <div className="flex items-center gap-7 text-left pb-2">
          <div className="header-icon-squircle bg-(--gs-accent)">
            <Calendar size={32} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="header-title-main text-(--gs-text-primary)">
              締め切り
            </h2>
            <div className="flex items-center gap-3 mt-4">
              <div className="h-[2px] w-6 bg-(--gs-accent)"></div>
              <p className="header-subtitle-sub uppercase tracking-[0.4em] opacity-40 italic">Strategic Control</p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. カテゴリータブ：ヘッダーの下（境界線の外）に配置 */}
      <div className="category-tab-container mb-8">
        {DEPARTMENTS.map(dept => (
          <button 
            key={dept} 
            onClick={() => setFilter(dept)} 
            className={`category-tab-button ${filter === dept ? "tab-active-normal" : "tab-inactive"}`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* 3. 「島（カード）」形式のリスト：文字サイズを他ページと統一 */}
      <div className="grid grid-cols-1 gap-5">
        {filteredDeadlines.map((item) => {
          const status = getDeadlineStatus(item.date);
          const isNew = isRecentlyUpdated(item.updateDate);

          return (
            <div key={item.id} className="group relative p-6 rounded-[var(--radius-card)] border flex flex-col md:flex-row items-center gap-8 hover:shadow-2xl hover:-translate-y-1 bg-(--gs-card-bg) border-slate-100 shadow-sm">
              
              {/* NEW判定ラベル：サイズ微調整 */}
              {isNew && (
                <div className="absolute top-4 left-6 flex items-center gap-1.5">
                  <span className="text-[9px] font-black text-orange-500 italic tracking-tighter uppercase leading-none">New</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]"></span>
                </div>
              )}

              {/* 部署名：右上へさりげなく配置 */}
              <div className="absolute top-4 right-8 text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">
                {item.dept}
              </div>

              {/* ① ステータス・アイランド（左側の塊） */}
              <div className={`w-14 h-14 rounded-2xl border flex flex-col items-center justify-center shrink-0 transition-all group-hover:scale-110 ${status.style}`}>
                {status.icon}
                <span className="text-[8px] font-black mt-0.5 uppercase tracking-tighter">{status.label}</span>
              </div>

              {/* ② テキスト・コンテンツ：文字サイズをtext-[17px]へ統一 */}
              <div className="flex-grow min-w-0 text-left">
                <div className="flex items-center gap-3 mb-1 opacity-40">
                  <div className="h-[1px] w-4 bg-(--gs-accent)"></div>
                  <span className="text-[9px] font-black uppercase tracking-widest">Target Timeline</span>
                </div>
                <h4 className="text-[17px] font-black tracking-tight leading-tight text-(--gs-text-primary) group-hover:text-(--gs-accent)">
                  「{item.title}」
                </h4>
              </div>

              {/* ③ アクション・ボタン：サイズとフォントを統一 */}
              <div className="shrink-0 flex items-center gap-6">
                <div className="hidden md:block text-right">
                  <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Due Date</p>
                  <p className="text-[14px] font-black tabular-nums leading-none text-(--gs-accent)">
                    {item.date}
                  </p>
                </div>
                <button 
                  onClick={() => window.open(item.url, "_blank")} 
                  className="h-11 px-6 rounded-xl font-black text-[10px] tracking-widest uppercase flex items-center gap-3 shadow-md group-hover:pr-8 bg-(--gs-accent) text-white hover:bg-(--gs-accent)/80 shadow-black/10"
                >
                  Execute <ArrowUpRight size={16} strokeWidth={3} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em] pt-12 opacity-40">
        Strategic Control Endpoint
      </p>
    </div>
  );
};