import React from "react";

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  const smallLinks = [
    { title: "在宅勤務申請", icon: "🏠", url: "https://example.com/wfh-form" },
    { title: "研修受講", icon: "🎓", url: "https://example.com/lms" },
    { title: "よくある質問", icon: "❓", url: "https://example.com/faq" },
    { title: "相談窓口", icon: "🤝", url: "https://example.com/support" },
  ];

  const newsItems = [
    { id: 1, date: "2026.01.20", category: "重要", title: "セキュリティソフトのアップデートについて", color: "text-red-500" },
    { id: 2, date: "2026.01.15", category: "社内", title: "第3会議室の予約システム変更のお知らせ", color: "text-emerald-600" },
    { id: 3, date: "2026.01.10", category: "通達", title: "新任マネージャー研修の実施について", color: "text-blue-600" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 緊急お知らせバナー */}
      <section className="bg-[#fff5f5] border border-[#feb2b2] border-l-[10px] border-l-[#e53e3e] p-5 rounded-r-xl shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="text-3xl">🚩</span>
          <div>
            <h4 className="font-black text-lg text-[#742a2a]">年末調整書類提出</h4>
            <p className="text-[11px] font-bold opacity-80 uppercase tracking-widest font-mono">DUE: 2026.12.10 / 総務部</p>
          </div>
        </div>
        <button onClick={() => setActiveTab("deadlines")} className="bg-[#e53e3e] text-white px-5 py-2 rounded-lg font-black text-xs hover:bg-red-700 transition-colors">詳細確認</button>
      </section>

      {/* メイングリッド (上段) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 bg-gradient-to-br from-[#448a76] to-[#5a7a54] rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center shadow-xl text-white">
          <span className="text-7xl mb-4">🌱</span>
          <h3 className="text-7xl font-black mb-1 italic tracking-tighter">社活サイト</h3>
          <p className="text-[12px] tracking-[0.3em] uppercase opacity-80 mb-10 font-mono">DAILY ACTIVITY LOG</p>
          <a href="http://aemlinux3.nekonet.co.jp/aem/aem.php" target="_blank" rel="noopener noreferrer" className="bg-white text-[#448a76] px-16 py-5 rounded-full text-lg font-black shadow-lg hover:scale-105 transition-all">入力を開始</a>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-4">
          <a href="#" className="flex-1 bg-white border-2 border-slate-100 rounded-[2.5rem] p-6 flex flex-col items-center justify-center hover:border-[#448a76] hover:shadow-xl transition-all group">
            <span className="text-6xl mb-2">📅</span>
            <h4 className="font-black text-slate-800 text-2xl tracking-widest uppercase">Booking</h4>
          </a>
          <a href="#" className="flex-1 bg-white border-2 border-slate-100 rounded-[2.5rem] p-6 flex flex-col items-center justify-center hover:border-[#448a76] hover:shadow-xl transition-all group">
            <span className="text-6xl mb-2">📖</span>
            <h4 className="font-black text-slate-800 text-2xl tracking-widest uppercase">Wiki</h4>
          </a>
        </div>
      </div>

      {/* 下段：小ボタン (文字を大きく調整) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {smallLinks.map((link, i) => (
          <a key={i} href={link.url} target="_blank" className="bg-white border-2 border-slate-100 rounded-[2.5rem] py-10 px-4 flex flex-col items-center justify-center hover:border-[#448a76] hover:shadow-xl transition-all group">
            <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{link.icon}</span>
            <span className="font-black text-slate-800 text-lg tracking-tighter text-center">{link.title}</span>
          </a>
        ))}
      </div>

      {/* 最新のお知らせ欄 (追加) */}
      <section className="bg-white rounded-[2rem] p-8 border border-[#e2ece9] shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3 italic">
            <span className="w-8 h-8 bg-[#448a76] text-white rounded-lg flex items-center justify-center text-sm not-italic">N</span> Latest News
          </h3>
          <button onClick={() => setActiveTab("news")} className="text-[#448a76] font-black text-xs hover:underline">すべて見る →</button>
        </div>
        <div className="space-y-2">
          {newsItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 group cursor-pointer">
              <span className="text-xs font-mono font-bold text-slate-400">{item.date}</span>
              <span className={`text-[10px] font-black px-2 py-1 rounded border ${item.color.replace('text', 'border')} ${item.color} uppercase`}>
                {item.category}
              </span>
              <span className="font-bold text-slate-700 group-hover:text-[#448a76] flex-grow">{item.title}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};