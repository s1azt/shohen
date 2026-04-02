import React, { useState, useMemo, useEffect } from "react";
import { Target, ChevronDown, ChevronUp } from "lucide-react";
import { allActionPlans, ActionPlan } from "../data/actionPlans";

const FISCAL_YEARS = Array.from(new Set(allActionPlans.map(p => p.fiscalYear))).sort((a, b) => b - a);
const LATEST_FISCAL_YEAR = FISCAL_YEARS[0];
const STATUSES = ["すべて", "進行中", "計画中", "完了"] as const;

const STATUS_STYLE: Record<ActionPlan["status"], string> = {
  "進行中": "bg-blue-50 text-blue-700 border-blue-100",
  "完了":   "bg-green-50 text-green-700 border-green-100",
  "計画中": "bg-amber-50 text-amber-700 border-amber-100",
};

const PROGRESS_COLOR: Record<ActionPlan["status"], string> = {
  "進行中": "bg-blue-500",
  "完了":   "bg-green-500",
  "計画中": "bg-amber-400",
};

export const ActionPlanPage: React.FC = () => {
  const [fiscalYear, setFiscalYear] = useState(LATEST_FISCAL_YEAR);
  const [statusFilter, setStatusFilter] = useState("すべて");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // 選択年度のカテゴリを動的に生成
  const categories = useMemo(() => {
    const plans = allActionPlans.filter(p => p.fiscalYear === fiscalYear);
    return ["すべて", ...Array.from(new Set(plans.map(p => p.category)))];
  }, [fiscalYear]);
  const [categoryFilter, setCategoryFilter] = useState("すべて");

  // 年度切替時のみカテゴリ・ステータスをリセット
  useEffect(() => {
    setCategoryFilter("すべて");
    setStatusFilter("すべて");
    setExpandedId(null);
  }, [fiscalYear]);

  const filtered = useMemo(() =>
    allActionPlans
      .filter(p => p.fiscalYear === fiscalYear)
      .filter(p => statusFilter === "すべて" || p.status === statusFilter)
  , [fiscalYear, statusFilter]);

  const displayPlans = useMemo(() =>
    filtered.filter(p => categoryFilter === "すべて" || p.category === categoryFilter)
  , [filtered, categoryFilter]);

  return (
    <div className="page-main-container">
      {/* ヘッダー */}
      <header className="header-underline-bold mb-4 border-(--gs-accent)">
        <div className="flex items-center gap-7 text-left pb-2">
          <div className="header-icon-squircle bg-(--gs-accent)">
            <Target size={32} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="header-title-main text-(--gs-text-primary)">アクションプラン</h2>
            <div className="flex items-center gap-3 mt-4">
              <div className="h-[2px] w-6 bg-(--gs-accent)" />
              <p className="header-subtitle-sub uppercase tracking-[0.4em] opacity-40">Action Plan</p>
            </div>
          </div>
        </div>
      </header>

      {/* 年度タブ */}
      <div className="category-tab-container mb-4">
        {FISCAL_YEARS.map(fy => (
          <button
            key={fy}
            onClick={() => { setFiscalYear(fy); setStatusFilter("すべて"); setExpandedId(null); }}
            className={`category-tab-button ${fiscalYear === fy ? "tab-active-normal" : "tab-inactive"}`}
          >
            {fy}年度
          </button>
        ))}
      </div>

      {/* カテゴリタブ */}
      <div className="category-tab-container mb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`category-tab-button ${categoryFilter === cat ? "tab-active-normal" : "tab-inactive"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ステータスタブ */}
      <div className="category-tab-container mb-8">
        {STATUSES.map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`category-tab-button ${statusFilter === s ? "tab-active-normal" : "tab-inactive"}`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* 一覧 */}
      <div className="space-y-3">
        {displayPlans.length === 0 && (
          <div className="text-center py-20 text-slate-400 font-bold">該当するアクションプランがありません</div>
        )}
        {displayPlans.map(plan => {
          const isExpanded = expandedId === plan.id;
          return (
            <div
              key={plan.id}
              className={`rounded-[2rem] border overflow-hidden transition-all ${
                isExpanded
                  ? "border-(--gs-accent) shadow-xl bg-(--gs-card-bg)"
                  : "border-slate-100 bg-(--gs-card-bg) hover:border-(--gs-accent)/30"
              }`}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : plan.id)}
                className="w-full p-6 flex items-center justify-between text-left gap-4 group"
              >
                <div className="flex items-start gap-4 flex-grow min-w-0">
                  {/* プログレスサークル */}
                  <div className="relative w-12 h-12 shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="15.9" fill="none"
                        stroke={plan.status === "完了" ? "#22c55e" : plan.status === "進行中" ? "#3b82f6" : "#fbbf24"}
                        strokeWidth="3"
                        strokeDasharray={`${plan.progress} ${100 - plan.progress}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[12px] font-black text-(--gs-text-primary)">
                      {plan.progress}%
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-[12px] font-black px-2 py-0.5 rounded border ${STATUS_STYLE[plan.status]}`}>
                        {plan.status}
                      </span>
                      <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">{plan.category}</span>
                    </div>
                    <h4 className="font-black text-[16px] tracking-tight text-(--gs-text-primary) truncate">{plan.title}</h4>
                  </div>
                </div>
                <div className={`p-2 rounded-full shrink-0 ${
                  isExpanded ? "bg-(--gs-accent) text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                }`}>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>

              {/* 展開詳細 */}
              <div className={`grid transition-all duration-300 ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <div className="px-8 pb-8 space-y-4 text-left">
                    <div className="pt-4 border-t border-slate-50">
                      <p className="text-[14px] leading-relaxed text-(--gs-text-primary)/60 mb-4">{plan.description}</p>
                      {/* プログレスバー */}
                      <div className="mb-4">
                        <div className="flex justify-between text-[12px] font-black text-(--gs-text-primary)/50 mb-1">
                          <span>進捗</span><span>{plan.progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${PROGRESS_COLOR[plan.status]}`}
                            style={{ width: `${plan.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 text-[12px] font-bold text-(--gs-text-primary)/50">
                        <span>担当: <span className="text-(--gs-text-primary)/80">{plan.owner}</span></span>
                        <span>開始: <span className="text-(--gs-text-primary)/80">{plan.startDate}</span></span>
                        <span>目標: <span className="text-(--gs-text-primary)/80">{plan.targetDate}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
