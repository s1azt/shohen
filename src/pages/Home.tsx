import React, { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  Activity, Calendar, ClipboardList, Zap,
  GraduationCap, ChevronRight, ChevronUp, ChevronDown,
  SlidersHorizontal, X, Plus, RotateCcw, ExternalLink,
  Briefcase, Code2, Leaf, Globe
} from "lucide-react";
import { allNews } from "../data/news";
import { linkCollection } from "../data/links";
import { isWithinDays, NEWS_NEW_DAYS } from "../utils/newBadge";
import { useReadNews } from "../utils/useReadNews";
import { useQuickAccess, QuickItem, MAX_QUICK_ITEMS } from "../utils/useQuickAccess";

// アイコン名 → コンポーネント マッピング
const ICON_MAP: Record<string, React.FC<{ size?: number; strokeWidth?: number }>> = {
  activity: Activity, calendar: Calendar, clipboard: ClipboardList,
  zap: Zap, study: GraduationCap, link: ExternalLink,
  briefcase: Briefcase, code: Code2, leaf: Leaf, globe: Globe,
};
const QuickIcon: React.FC<{ iconKey: string; size?: number; strokeWidth?: number }> = ({ iconKey, ...props }) => {
  const Icon = ICON_MAP[iconKey] ?? ExternalLink;
  return <Icon {...props} />;
};

function getIconKey(category: string): string {
  const m: Record<string, string> = { work: "briefcase", development: "code", life: "leaf", portal: "globe" };
  return m[category] ?? "link";
}
function toLinkQuickItem(link: (typeof linkCollection)[number]): QuickItem {
  return { id: link.id, label: link.title, sub: link.category.toUpperCase(), url: link.url, iconKey: getIconKey(link.category) };
}

const GRID_COLS: Record<number, string> = {
  1: "lg:grid-cols-1", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3",
  4: "lg:grid-cols-4", 5: "lg:grid-cols-5",
};

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  const { isRead, markAsRead } = useReadNews();
  const { items, addItem, removeItem, moveItem, reset } = useQuickAccess();
  const [showCustomize, setShowCustomize] = useState(false);
  const [addSearch, setAddSearch] = useState("");

  const gridColsClass = GRID_COLS[Math.min(items.length, 5)] ?? "lg:grid-cols-5";

  const availableLinks = useMemo(() => {
    const currentIds = new Set(items.map(i => i.id));
    return linkCollection
      .filter(l => !currentIds.has(l.id))
      .filter(l => {
        if (!addSearch) return true;
        const q = addSearch.toLowerCase();
        return l.title.toLowerCase().includes(q) || l.desc.toLowerCase().includes(q) || l.category.includes(q);
      });
  }, [items, addSearch]);

  const latestNews = useMemo(() =>
    [...(allNews || [])]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 3)
  , []);

  return (
    <div className={`space-y-12 animate-in fade-in duration-700 max-w-6xl mx-auto pb-10 px-4 text-left transition-colors duration-[3000ms]`}>
      
      {/* クイックアクセス */}
      <section className="rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-8 border shadow-sm space-y-6 sm:space-y-8 bg-(--gs-card-bg) border-slate-100">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <div className="w-2 h-6 sm:h-8 rounded-full bg-(--gs-accent)" />
            <h2 className="text-xl sm:text-2xl font-black tracking-tighter text-(--gs-text-primary)">
              クイックアクセス
            </h2>
          </div>
          <button
            onClick={() => { setShowCustomize(true); setAddSearch(""); }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-black text-slate-400 hover:text-(--gs-accent) hover:bg-(--gs-accent)/5 transition-all"
          >
            <SlidersHorizontal size={15} />
            <span className="hidden sm:inline">カスタマイズ</span>
          </button>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 ${gridColsClass} gap-3 sm:gap-4`}>
          {items.map((item, i) => (
            <button
              key={item.id}
              onClick={() => window.open(item.url, "_blank")}
              className={`group flex lg:flex-col items-center lg:justify-center p-4 sm:p-6 lg:p-5 rounded-[1.5rem] sm:rounded-[2rem] border-[2px] hover:shadow-lg hover:-translate-y-1 bg-slate-50/30 border-(--gs-accent)/30 hover:bg-white hover:border-(--gs-accent) ${items.length === 5 && i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-14 lg:h-14 lg:mb-3 rounded-[1rem] sm:rounded-[1.4rem] flex items-center justify-center shadow-inner shrink-0 bg-white text-(--gs-accent) group-hover:bg-(--gs-accent) group-hover:text-white">
                <div className="scale-75 sm:scale-90 lg:scale-75">
                  <QuickIcon iconKey={item.iconKey} size={32} strokeWidth={2.5} />
                </div>
              </div>
              <div className="ml-4 lg:ml-0 lg:text-center min-w-0">
                <div className="text-[14px] sm:text-[16px] lg:text-[14px] font-[1000] leading-tight mb-0.5 truncate text-(--gs-text-primary)">
                  {item.label}
                </div>
                <div className="text-[13px] font-black text-slate-500 uppercase tracking-[0.15em] truncate">
                  {item.sub}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. LATEST NEWS */}
      <section className="rounded-[3rem] p-10 border shadow-sm space-y-8 bg-(--gs-card-bg) border-slate-100">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <div className="w-2 h-8 rounded-full bg-(--gs-accent)" />
            <h2 className="text-2xl font-black tracking-tighter text-(--gs-text-primary)">最新のお知らせ</h2>
          </div>
          <button onClick={() => setActiveTab("news")} className="text-[13px] font-black uppercase tracking-[0.2em] text-(--gs-accent) hover:underline">
            一覧を見る ↗
          </button>
        </div>
        
        <div className="divide-y divide-slate-100">
          {latestNews.map((news, i) => {
            const isNew = !isRead(news.id) && isWithinDays(news.date, NEWS_NEW_DAYS);

            return (
              <a 
                key={news.id}
                href={news.url} 
                target="_blank" 
                rel="noreferrer"
                onClick={() => markAsRead(news.id)} 
                className="py-6 first:pt-0 last:pb-0 group flex items-center gap-8 transition-all"
              >
                <div className="text-[14px] font-bold text-slate-500 tabular-nums w-24 shrink-0">{news.date}</div>
                <div className="flex items-center gap-4 flex-grow min-w-0">
                  {isNew && (
                    <span className="bg-orange-500 text-white text-[12px] font-black px-2 py-0.5 rounded shadow-sm shrink-0 animate-pulse">NEW</span>
                  )}
                  <span className={`text-[13px] font-black px-3 py-1 rounded border shrink-0 uppercase tracking-widest ${news.color.replace('text-', 'border-').replace('text-', 'bg-') + '/10 ' + news.color}`}>
                    {news.category}
                  </span>
                  <div className="text-[16px] font-black group-hover:translate-x-2 transition-all truncate tracking-tight text-(--gs-text-primary) group-hover:text-(--gs-accent)">
                    {news.title}
                  </div>
                </div>
                <div className="p-2.5 rounded-full shadow-sm bg-slate-50 text-slate-200 group-hover:bg-(--gs-accent) group-hover:text-white">
                  <ChevronRight size={16} />
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* カスタマイズモーダル：Portalでdocument.body直下にレンダリングしstacking contextを脱出 */}
      {showCustomize && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setShowCustomize(false); }}
        >
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
              <div>
                <h3 className="text-[18px] font-black text-(--gs-text-primary)">クイックアクセスをカスタマイズ</h3>
                <p className="text-[13px] text-slate-400 mt-0.5">最大 {MAX_QUICK_ITEMS} 件まで設定できます。設定はこのブラウザに保存されます。</p>
              </div>
              <button onClick={() => setShowCustomize(false)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-3">
                  現在の設定 ({items.length} / {MAX_QUICK_ITEMS})
                </div>
                <div className="space-y-2">
                  {items.map((item, idx) => (
                    <div key={item.id} className="flex items-center gap-3 bg-slate-50 rounded-2xl p-3">
                      <div className="flex flex-col gap-0.5">
                        <button onClick={() => moveItem(item.id, -1)} disabled={idx === 0} className="p-1.5 rounded-lg hover:bg-slate-200 disabled:opacity-20 transition-all"><ChevronUp size={12} /></button>
                        <button onClick={() => moveItem(item.id, 1)} disabled={idx === items.length - 1} className="p-1.5 rounded-lg hover:bg-slate-200 disabled:opacity-20 transition-all"><ChevronDown size={12} /></button>
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm text-(--gs-accent) border border-slate-100">
                        <QuickIcon iconKey={item.iconKey} size={15} strokeWidth={2.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[14px] font-black leading-tight text-(--gs-text-primary) truncate">{item.label}</div>
                        <div className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">{item.sub}</div>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="p-2 rounded-xl hover:bg-red-50 hover:text-red-400 text-slate-300 transition-all shrink-0"><X size={15} /></button>
                    </div>
                  ))}
                  {items.length === 0 && (
                    <div className="text-center text-[13px] text-slate-400 py-10 border-2 border-dashed border-slate-200 rounded-2xl">アイテムがありません</div>
                  )}
                </div>
              </div>
              <div>
                <div className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-3">
                  リンク集から追加 ({availableLinks.length}件)
                </div>
                <input
                  type="text"
                  value={addSearch}
                  onChange={e => setAddSearch(e.target.value)}
                  placeholder="リンク名・詳細で検索..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] mb-3 outline-none focus:ring-2 focus:ring-(--gs-accent)/30 focus:border-(--gs-accent)/50"
                />
                <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
                  {availableLinks.map(link => (
                    <button
                      key={link.id}
                      onClick={() => addItem(toLinkQuickItem(link))}
                      disabled={items.length >= MAX_QUICK_ITEMS}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-slate-50 border border-transparent hover:border-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 text-slate-400 border border-slate-100 group-hover:bg-(--gs-accent)/5 group-hover:text-(--gs-accent) group-hover:border-(--gs-accent)/20">
                        <ExternalLink size={13} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-black leading-tight text-(--gs-text-primary) truncate">{link.title}</div>
                        <div className="text-[12px] font-bold text-slate-400 tracking-wide truncate">{link.desc || link.category}</div>
                      </div>
                      <Plus size={14} className="text-slate-300 group-hover:text-(--gs-accent) shrink-0" />
                    </button>
                  ))}
                  {availableLinks.length === 0 && (
                    <div className="text-center text-[13px] text-slate-400 py-6">
                      {addSearch ? "該当するリンクがありません" : "追加できるリンクがありません"}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between px-7 py-5 border-t border-slate-100 bg-slate-50/50">
              <button onClick={reset} className="flex items-center gap-2 text-[13px] font-black text-slate-400 hover:text-slate-600 transition-colors">
                <RotateCcw size={14} /> デフォルトに戻す
              </button>
              <button onClick={() => setShowCustomize(false)} className="px-7 py-2.5 bg-(--gs-accent) text-white rounded-2xl text-[14px] font-black hover:bg-(--gs-accent)/80 transition-all">
                完了
              </button>
            </div>
          </div>
        </div>
      , document.body)}

    </div>
  );
};
