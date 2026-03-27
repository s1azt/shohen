import React, { useMemo } from "react";
import { 
  Activity, Calendar, ClipboardList, Zap, 
  GraduationCap, ChevronRight
} from "lucide-react";
import { allNews } from "../data/news";
import { externalLinks } from "../data/links";
import { isWithinDays, NEWS_NEW_DAYS } from "../utils/newBadge";

const QUICK_ACCESS_LINKS: { label: string; sub: string; Icon: React.FC<{ size?: number; strokeWidth?: number }>; url: string }[] = [
  { label: "勤怠・日報",  sub: "Attendance",  Icon: Activity,     url: externalLinks.homeQuickAccess.attendance },
  { label: "会議室予約", sub: "Reservation", Icon: Calendar,     url: externalLinks.homeQuickAccess.roomReservation },
  { label: "TW申請",     sub: "Telework",   Icon: ClipboardList, url: externalLinks.homeQuickAccess.telework },
  { label: "GSうぃき",    sub: "Wiki",        Icon: Zap,          url: externalLinks.homeQuickAccess.wiki },
  { label: "E-ラン",     sub: "Training",   Icon: GraduationCap, url: externalLinks.homeQuickAccess.training },
];

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  const latestNews = useMemo(() =>
    [...(allNews || [])]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 3)
  , []);

  return (
    <div className={`space-y-12 animate-in fade-in duration-700 max-w-6xl mx-auto pb-10 px-4 text-left transition-colors duration-[3000ms]`}>
      
      {/* 2. MEGA QUICK ACCESS BLOCK (5ボタン最適化版) */}
      <section className="rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-8 border shadow-sm space-y-6 sm:space-y-8 bg-(--gs-card-bg) border-slate-100">
        {/* セクション見出し */}
        <div className="flex items-center gap-4 px-2">
          <div className="w-2 h-6 sm:h-8 rounded-full bg-(--gs-accent)" />
          <h2 className="text-xl sm:text-2xl font-black tracking-tighter text-(--gs-text-primary)">
            クイックアクセス
          </h2>
        </div>

        {/* グリッド設定:
            - スマホ: 1列
            - タブレット(md): 2列
            - PC(lg): 5列 (横いっぱいに5つ並ぶ)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {QUICK_ACCESS_LINKS.map((link, i) => (
            <button 
              key={link.label}
              onClick={() => window.open(link.url, "_blank")}
              className={`group flex lg:flex-col items-center lg:justify-center p-4 sm:p-6 lg:p-5 rounded-[1.5rem] sm:rounded-[2rem] border-[2px] hover:shadow-lg hover:-translate-y-1 bg-slate-50/30 border-(--gs-accent)/30 hover:bg-white hover:border-(--gs-accent) ${i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              {/* アイコンボックス */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-14 lg:h-14 lg:mb-3 rounded-[1rem] sm:rounded-[1.4rem] flex items-center justify-center shadow-inner shrink-0 bg-white text-(--gs-accent) group-hover:bg-(--gs-accent) group-hover:text-white">
                <div className="scale-75 sm:scale-90 lg:scale-75">
                   <link.Icon size={32} strokeWidth={2.5} />
                </div>
              </div>

              {/* テキストエリア */}
              <div className="ml-4 lg:ml-0 lg:text-center min-w-0">
                <div className="text-[14px] sm:text-[16px] lg:text-[14px] font-[1000] leading-tight mb-0.5 truncate text-(--gs-text-primary)">
                  {link.label}
                </div>
                <div className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] truncate">
                  {link.sub}
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
            <h2 className="text-2xl font-black tracking-tighter italic text-(--gs-text-primary)">Latest News</h2>
          </div>
          <button onClick={() => setActiveTab("news")} className="text-[10px] font-black uppercase tracking-[0.2em] text-(--gs-accent) hover:underline">
            View Archives ↗
          </button>
        </div>
        
        <div className="divide-y divide-slate-100">
          {latestNews.map((news, i) => {
            const isNew = isWithinDays(news.date, NEWS_NEW_DAYS);

            return (
              <a 
                key={news.id}
                href={news.url} 
                target="_blank" 
                rel="noreferrer" 
                className="py-6 first:pt-0 last:pb-0 group flex items-center gap-8 transition-all"
              >
                <div className="text-[12px] font-bold text-slate-400 tabular-nums w-24 shrink-0">{news.date}</div>
                <div className="flex items-center gap-4 flex-grow min-w-0">
                  {isNew && (
                    <span className="bg-orange-500 text-white text-[8px] font-black px-2 py-0.5 rounded shadow-sm shrink-0 animate-pulse">NEW</span>
                  )}
                  <span className={`text-[9px] font-black px-3 py-1 rounded border shrink-0 uppercase tracking-widest ${news.color.replace('text-', 'border-').replace('text-', 'bg-') + '/10 ' + news.color}`}>
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
    </div>
  );
};