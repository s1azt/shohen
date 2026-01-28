import React from "react";
import { 
  Activity, Calendar, FileText, ClipboardList, Zap, 
  GraduationCap, Clock, ChevronRight, ReceiptText, 
  CircleDollarSign, Clipboard
} from "lucide-react";
import { allDeadlines } from "../data/deadlines";
import { allNews } from "../data/news";
import { externalLinks } from "../data/links"; // 💡 links.ts からインポート

interface HomeProps {
  setActiveTab: (tab: string) => void;
  isMidnight?: boolean;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab, isMidnight }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const oneMonthLater = new Date();
  oneMonthLater.setMonth(today.getMonth() + 1);

  // 1. 締め切りデータの加工とソート
  const displayDeadlines = (allDeadlines || [])
    .map(d => ({ 
      ...d, 
      dateObj: new Date(d.date),
      diffDays: Math.ceil((new Date(d.date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    }))
    .filter(d => d.dateObj >= today && d.dateObj <= oneMonthLater)
    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
    .slice(0, 3);

  // 2. お知らせを更新日の新しい順にソート（最新3件）
  const latestNews = [...(allNews || [])]
    .sort((a, b) => {
      const dateA = new Date(a.date.replace(/\./g, '/')).getTime();
      const dateB = new Date(b.date.replace(/\./g, '/')).getTime();
      return dateB - dateA;
    })
    .slice(0, 3);

  // 3. クイックアクセスボタンの定義（links.ts の定数を使用）
  const quickAccessLinks = [
    { label: "勤怠・日報", sub: "Attendance", icon: <Activity size={24} />, url: externalLinks.homeQuickAccess.attendance },
    { label: "会議室可視化アプリ", sub: "Reservation", icon: <Calendar size={24} />, url: externalLinks.homeQuickAccess.roomReservation },
    { label: "社内FAQ", sub: "Knowledge", icon: <FileText size={24} />, url: externalLinks.homeQuickAccess.faq },
    { label: "TW申請", sub: "Telework", icon: <ClipboardList size={24} />, url: externalLinks.homeQuickAccess.telework },
    { label: "GSうぃき", sub: "Wiki", icon: <Zap size={24} />, url: externalLinks.homeQuickAccess.wiki },
    { label: "E-ラン", sub: "Training", icon: <GraduationCap size={24} />, url: externalLinks.homeQuickAccess.training },
  ];

  return (
    <div className={`space-y-10 animate-in fade-in duration-700 max-w-6xl mx-auto pb-10 px-4 text-left transition-colors duration-[3000ms]`}>
      
      {/* 1. CRITICAL DEADLINES */}
      <section className="space-y-5">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg text-white shadow-md transition-colors duration-[3000ms] ${isMidnight ? 'bg-blue-600' : 'bg-[#064e3b]'}`}>
              <Clock size={18} />
            </div>
            <div>
              <h3 className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-[3000ms] ${isMidnight ? 'text-blue-400' : 'text-[#064e3b]'}`}>Critical Deadlines</h3>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Next 30 Days</p>
            </div>
          </div>
          <button onClick={() => setActiveTab("deadlines")} className="text-[10px] font-black text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest">
            View All ↗
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayDeadlines.length > 0 ? (
            displayDeadlines.map((item) => {
              const IconMap: any = { ReceiptText, CircleDollarSign, Activity, Clipboard };
              const Icon = IconMap[item.iconName] || Clipboard;
              const isUrgent = item.diffDays <= 3;

              return (
                <a 
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`group relative flex flex-col p-6 rounded-[2.5rem] border-2 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl border-l-[6px] shadow-sm 
                    ${isMidnight ? 'bg-slate-800/40 border-slate-700/50' : item.bg + ' ' + item.border} 
                    ${isUrgent && !isMidnight ? 'ring-4 ring-orange-500/10' : ''}`}
                >
                  {isUrgent && (
                    <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-[8px] font-black px-3 py-1 rounded-full shadow-lg animate-pulse z-10">URGENT</div>
                  )}

                  <div className="flex justify-between items-start mb-5">
                    <div className={`p-3 rounded-2xl shadow-inner transition-colors duration-[3000ms] ${isMidnight ? 'bg-slate-700 text-blue-400' : 'bg-white/80 ' + item.text}`}>
                      <Icon size={24} strokeWidth={2.5} />
                    </div>
                    <div className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border transition-colors duration-[3000ms] ${isMidnight ? 'bg-slate-800/50 border-slate-600 text-slate-400' : 'bg-white/50 border-white ' + item.text}`}>
                      {item.dept}
                    </div>
                  </div>

                  <h3 className={`text-[15px] font-black leading-tight mb-6 group-hover:underline decoration-2 underline-offset-4 transition-colors duration-[3000ms] ${isMidnight ? 'text-slate-200' : item.text}`}>
                    {item.title}
                  </h3>
                  
                  <div className="flex items-end justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className={`text-[8px] font-black uppercase opacity-40 tracking-tighter transition-colors duration-[3000ms] ${isMidnight ? 'text-slate-500' : item.text}`}>Due Date</span>
                      <span className={`text-sm font-black tabular-nums transition-colors duration-[3000ms] ${isMidnight ? 'text-slate-300' : item.text}`}>{item.date}</span>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white font-black text-[10px] transition-all group-hover:brightness-110 shadow-md ${isMidnight ? 'bg-blue-600' : item.btn}`}>
                      手続きへ <ChevronRight size={12} strokeWidth={3} />
                    </div>
                  </div>
                </a>
              );
            })
          ) : (
            <div className={`col-span-full py-12 text-center rounded-[2.5rem] border border-dashed transition-colors duration-[3000ms] ${isMidnight ? 'bg-slate-800/20 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em]">直近1ヶ月以内の締め切りはありません</p>
            </div>
          )}
        </div>
      </section>

 {/* 2. QUICK ACCESS */}
<section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
  {quickAccessLinks.map((link, i) => (
    <button 
      key={i} 
      onClick={() => window.open(link.url, "_blank")}
      className={`group flex flex-col items-center py-10 px-6 rounded-[2.5rem] border-[1.5px] shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 ${
        isMidnight 
          ? 'bg-slate-800/40 border-slate-500' // 深夜：枠線を500に強化
          : 'bg-white border-slate-300'       // 通常：枠線を300に強化
      }`}
    >
      {/* アイコンボックスを w-16 → w-20 (80px) に拡大 */}
      <div className={`w-20 h-20 rounded-[1.8rem] flex items-center justify-center mb-6 transition-all shadow-inner ${
        isMidnight 
          ? 'bg-slate-700 text-blue-400 group-hover:bg-blue-600 group-hover:text-white' 
          : 'bg-slate-50 text-[#064e3b] group-hover:bg-[#064e3b] group-hover:text-white'
      }`}>
        {/* アイコンのサイズを調整（親要素に合わせたスケールアップ） */}
        {React.cloneElement(link.icon as React.ReactElement, { size: 32, strokeWidth: 2.5 })}
      </div>

      {/* メインラベルを 13.5px → 15px へ拡大 */}
      <div className={`text-[15px] font-[1000] leading-none mb-2 text-center whitespace-nowrap transition-colors duration-[3000ms] ${
        isMidnight ? 'text-slate-200' : 'text-[#1a2e25]'
      }`}>
        {link.label}
      </div>

      {/* サブラベルを 9px → 10px へ拡大 */}
      <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
        {link.sub}
      </div>
    </button>
  ))}
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