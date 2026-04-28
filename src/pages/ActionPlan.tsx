import React, { useState, useMemo } from "react";
import { Target, ArrowUpRight, Activity } from "lucide-react";
import { allActionPlans } from "../data/actionPlans";

// 固定カテゴリの定義
const CATEGORIES = [
  "一覧",
  "事業方針",
  "AI駆動開発",
  "UIUX",
  "運用最適",
  "[運用]リリース手順の標準化",
  "Iac"
] as const;

export const ActionPlanPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("一覧");

  // フィルタリングロジック（カテゴリのみで判定）
  const displayPlans = useMemo(() => {
    return allActionPlans
      .filter(p => activeCategory === "一覧" || p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-1000 pb-10 px-4">
      
      {/* ページタイトルセクション */}
      <header className="header-underline-bold mb-4 border-(--gs-accent)">
        <div className="flex items-center gap-7 text-left pb-2">
          <div className="header-icon-squircle bg-(--gs-accent)">
            <Target size={32} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="header-title-main text-(--gs-text-primary)">アクションプラン</h2>
          </div>
        </div>
      </header>

      {/* 1. カテゴリーナビゲーション */}
      {/* w-full と flex-1 を組み合わせることで、右端の余白を消し、下のグリッド幅と一致させます */}
      <div className="flex justify-center">
        <div className="flex bg-slate-100/80 p-1.5 rounded-[2rem] border border-slate-200 w-full overflow-x-auto scrollbar-hide backdrop-blur-sm shadow-sm gap-1">
          {CATEGORIES.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)} 
              className={`flex-1 shrink-0 min-w-max py-3.5 px-6 rounded-[1.6rem] font-black text-[13px] tracking-widest transition-all duration-300 whitespace-nowrap ${
                activeCategory === cat 
                  ? "bg-white text-(--gs-accent) shadow-md transform scale-[1.02] z-10" 
                  : "text-slate-400 hover:text-slate-600 hover:bg-white/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2. アクションプラン・グリッド（カード形式） */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayPlans.length > 0 ? (
          displayPlans.map((plan) => (
            <div 
              key={plan.id}
              onClick={() => plan.url && window.open(plan.url, '_blank')}
              className="group flex flex-col rounded-[2.5rem] border border-slate-100 bg-(--gs-card-bg) hover:border-(--gs-accent)/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer relative overflow-hidden text-left"
            >
              {/* カード上部のアクセントライン */}
              <div className="h-1.5 w-full bg-(--gs-accent) opacity-20 group-hover:opacity-100 transition-opacity" />
              
              <div className="p-7 flex flex-col h-full">
                {/* ステータス & 進捗バッジ */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest leading-none px-2.5 py-1 rounded-md border border-(--gs-accent)/10 bg-(--gs-accent)/5 text-(--gs-accent)">
                      {plan.status}
                    </span>
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">
                      {plan.category}
                    </span>
                  </div>
                </div>

                {/* タイトル & 説明 */}
                <div className="flex-grow">
                  <h4 className="text-[19px] font-black tracking-tight leading-tight mb-3 text-(--gs-text-primary) group-hover:text-(--gs-accent) transition-colors">
                    {plan.title}
                  </h4>
                  <p className="text-[14px] font-medium leading-relaxed text-slate-500 line-clamp-3 mb-6">
                    {plan.description}
                  </p>
                </div>


                {/* カードフッター */}
                <div className="mt-auto pt-5 border-t border-dashed border-slate-100 flex justify-between items-end">
                  <div className="space-y-1">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">Owner</span>
                      <span className="text-[13px] font-bold text-slate-600">{plan.owner}</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-(--gs-accent) group-hover:text-white transition-all duration-300 group-hover:rotate-12 shadow-sm">
                    <ArrowUpRight size={20} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-32 text-center">
            <div className="inline-flex p-6 rounded-full bg-slate-50 mb-4">
              <Activity size={32} className="text-slate-200" />
            </div>
            <p className="text-slate-400 italic text-[13px] font-black uppercase tracking-widest">
              順次追加予定です。もうしばらくお待ちください。
            </p>
          </div>
        )}
      </div>

      {/* 3. フッター装飾 */}
      <div className="pt-16 pb-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-8" />
        <p className="text-center text-[12px] font-black text-slate-500 uppercase tracking-[0.5em]">
          Strategic Action Assets End
        </p>
      </div>
    </div>
  );
};