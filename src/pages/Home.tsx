import React from "react";
import { 
  Activity, Calendar, FileText, ClipboardList, Zap, 
  GraduationCap, Clock, ChevronRight, ReceiptText, 
  CircleDollarSign, Clipboard
} from "lucide-react";
import { allNews } from "../data/news";
import { externalLinks } from "../data/links";

interface HomeProps {
  setActiveTab: (tab: string) => void;
  isMidnight?: boolean;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab, isMidnight }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const latestNews = [...(allNews || [])]
    .sort((a, b) => {
      const dateA = new Date(a.date.replace(/\./g, '/')).getTime();
      const dateB = new Date(b.date.replace(/\./g, '/')).getTime();
      return dateB - dateA;
    })
    .slice(0, 3);

  // 社内FAQを削除した5つのリンク
  const quickAccessLinks = [
    { label: "勤怠・日報", sub: "Attendance", icon: <Activity />, url: externalLinks.homeQuickAccess.attendance },
    { label: "会議室予約", sub: "Reservation", icon: <Calendar />, url: externalLinks.homeQuickAccess.roomReservation },
    { label: "TW申請", sub: "Telework", icon: <ClipboardList />, url: externalLinks.homeQuickAccess.telework },
    { label: "GSうぃき", sub: "Wiki", icon: <Zap />, url: externalLinks.homeQuickAccess.wiki },
    { label: "E-ラン", sub: "Training", icon: <GraduationCap />, url: externalLinks.homeQuickAccess.training },
  ];

  return (
    <div className={`space-y-12 animate-in fade-in duration-700 max-w-6xl mx-auto pb-10 px-4 text-left transition-colors duration-[3000ms]`}>
      
      {/* 2. MEGA QUICK ACCESS BLOCK (5ボタン最適化版) */}
      <section className={`rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-8 border shadow-sm space-y-6 sm:space-y-8 transition-colors duration-[3000ms] ${
        isMidnight ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-100'
      }`}>
        {/* セクション見出し */}
        <div className="flex items-center gap-4 px-2">
          <div className={`w-2 h-6 sm:h-8 rounded-full transition-colors duration-[3000ms] ${isMidnight ? 'bg-blue-500' : 'bg-[#064e3b]'}`} />
          <h2 className={`text-xl sm:text-2xl font-black tracking-tighter transition-colors duration-[3000ms] ${isMidnight ? 'text-slate-100' : 'text-[#1a2e25]'}`}>
            クイックアクセス
          </h2>
        </div>

        {/* グリッド設定:
            - スマホ: 1列
            - タブレット(md): 2列
            - PC(lg): 5列 (横いっぱいに5つ並ぶ)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {quickAccessLinks.map((link, i) => (
            <button 
              key={i} 
              onClick={() => window.open(link.url, "_blank")}
              className={`group flex lg:flex-col items-center lg:justify-center p-4 sm:p-6 lg:p-5 rounded-[1.5rem] sm:rounded-[2rem] border-[2px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                isMidnight 
                  ? 'bg-slate-900/40 border-emerald-500/30 hover:border-emerald-500/80' 
                  : 'bg-slate-50/30 border-emerald-600/30 hover:bg-white hover:border-[#064e3b]'
              } ${
                // タブレット時、5番目のボタンを中央寄せで目立たせる（任意）
                i === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* アイコンボックス */}
              <div className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-14 lg:h-14 lg:mb-3 rounded-[1rem] sm:rounded-[1.4rem] flex items-center justify-center transition-all shadow-inner shrink-0 ${
                isMidnight 
                  ? 'bg-slate-700 text-blue-400 group-hover:bg-blue-600 group-hover:text-white' 
                  : 'bg-white text-[#064e3b] group-hover:bg-[#064e3b] group-hover:text-white'
              }`}>
                <div className="scale-75 sm:scale-90 lg:scale-75">
                   {React.cloneElement(link.icon as React.ReactElement, { size: 32, strokeWidth: 2.5 })}
                </div>
              </div>

              {/* テキストエリア */}
              <div className="ml-4 lg:ml-0 lg:text-center min-w-0">
                <div className={`text-[14px] sm:text-[16px] lg:text-[14px] font-[1000] leading-tight mb-0.5 transition-colors duration-[3000ms] truncate ${isMidnight ? 'text-slate-200' : 'text-[#1a2e25]'}`}>
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
      <section className={`rounded-[3rem] p-10 border shadow-sm space-y-8 transition-colors duration-[3000ms] ${isMidnight ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-100'}`}>
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <div className={`w-2 h-8 rounded-full transition-colors duration-[3000ms] ${isMidnight ? 'bg-blue-500' : 'bg-[#064e3b]'}`} />
            <h2 className={`text-2xl font-black tracking-tighter italic transition-colors duration-[3000ms] ${isMidnight ? 'text-slate-100' : 'text-[#1a2e25]'}`}>Latest News</h2>
          </div>
          <button onClick={() => setActiveTab("news")} className={`text-[10px] font-black transition-all uppercase tracking-[0.2em] ${isMidnight ? 'text-blue-400' : 'text-emerald-600 hover:underline'}`}>
            View Archives ↗
          </button>
        </div>
        
        <div className={`divide-y ${isMidnight ? 'divide-slate-700' : 'divide-slate-100'}`}>
          {latestNews.map((news, i) => {
            const newsDate = new Date(news.date.replace(/\./g, '/'));
            const diffDays = Math.floor((today.getTime() - newsDate.getTime()) / (1000 * 60 * 60 * 24));
            const isNew = diffDays >= 0 && diffDays <= 3;

            return (
              <a 
                key={i} 
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
                  <span className={`text-[9px] font-black px-3 py-1 rounded border shrink-0 uppercase tracking-widest ${isMidnight ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : news.color.replace('text-', 'border-').replace('text-', 'bg-') + '/10 ' + news.color}`}>
                    {news.category}
                  </span>
                  <div className={`text-[16px] font-black group-hover:translate-x-2 transition-all truncate tracking-tight ${isMidnight ? 'text-slate-300 group-hover:text-blue-400' : 'text-[#1a2e25] group-hover:text-[#064e3b]'}`}>
                    {news.title}
                  </div>
                </div>
                <div className={`p-2.5 rounded-full transition-all shadow-sm ${isMidnight ? 'bg-slate-700 text-slate-500 group-hover:bg-blue-600 group-hover:text-white' : 'bg-slate-50 text-slate-200 group-hover:bg-[#064e3b] group-hover:text-white'}`}>
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