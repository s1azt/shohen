import React from "react";
import { 
  Activity, 
  Calendar, 
  HelpCircle, 
  FileText, 
  Clipboard, 
  GraduationCap, 
  ExternalLink, 
  ChevronRight, 
  ReceiptText, 
  CircleDollarSign 
} from "lucide-react";

// 1. データファイルをインポート
import { allDeadlines } from "../data/deadlines";
import { allNews } from "../data/news";

// 2. データファイルを書き換えずに、ここで型を抽出する（エラー回避の呪文）
type Deadline = typeof allDeadlines[number];
type NewsItem = typeof allNews[number];

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  // アイコン名と実際のコンポーネントを紐付け
  const IconMap: { [key: string]: React.ReactNode } = {
    ReceiptText: <ReceiptText size={28} />,
    CircleDollarSign: <CircleDollarSign size={28} />,
    Activity: <Activity size={28} />,
    Clipboard: <Clipboard size={28} />
  };

  // 【締め切り自動取得】今日以降のデータを近い順に2つ抽出
  const today = new Date().toISOString().split('T')[0];
  const homeDeadlines = (allDeadlines as Deadline[])
    .filter(item => item.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  // 【お知らせ自動取得】最新の3つを抽出
  const homeNews = (allNews as NewsItem[]).slice(0, 3);

  // クイックリンクの定義
  const quickLinks = [
    { id: 1, title: "社活サイト", desc: "日報入力はこちら", icon: <Activity />, border: "border-[#448a76]", bg: "bg-emerald-50", iconCol: "text-[#448a76]", url: "http://aemlinux3.nekonet.co.jp/aem/aem.php" },
    { id: 2, title: "会議室予約", desc: "施設の予約・状況確認", icon: <Calendar />, border: "border-[#448a76]", bg: "bg-emerald-50", iconCol: "text-[#448a76]", url: "#" },
    { id: 3, title: "社内FAQ", desc: "よくある質問とルール", icon: <HelpCircle />, border: "border-[#448a76]", bg: "bg-emerald-50", iconCol: "text-[#448a76]", url: "#" },
    { id: 4, title: "GSうぃき", desc: "ナレッジ・マニュアル", icon: <FileText />, border: "border-blue-500", bg: "bg-blue-50", iconCol: "text-blue-600", url: "http://gs.nekonet.co.jp/GS_wiki/" },
    { id: 5, title: "TW申請", desc: "テレワークの申請・報告", icon: <Clipboard />, border: "border-blue-500", bg: "bg-blue-50", iconCol: "text-blue-600", url: "http://dominoap.nekonet.co.jp/tyo/tyo0993.nsf/MainFrame?OpenFrameSet" },
    { id: 6, title: "E-learning", desc: "スキルアップ・社内研修", icon: <GraduationCap />, border: "border-blue-500", bg: "bg-blue-50", iconCol: "text-blue-600", url: "https://clipline.jp/training/#/" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* --- 1. 重要な締め切り（縦に2つ・自動取得） --- */}
      <div className="flex flex-col gap-3">
        {homeDeadlines.map((item) => (
          <section 
            key={item.id} 
            className={`${item.bg} border ${item.border} border-l-[10px] ${item.accent} p-5 rounded-r-2xl shadow-sm flex justify-between items-center transition-all hover:shadow-md`}
          >
            <div className="flex items-center gap-6">
              <div className={`${item.text} opacity-80`}>
                {IconMap[item.iconName as string] || <Clipboard size={28} />}
              </div>
              <div>
                <h4 className={`font-black text-lg ${item.text}`}>{item.title}</h4>
                <p className="text-[11px] font-bold opacity-70 uppercase tracking-widest mt-0.5">
                  DUE: {item.date.replace(/-/g, '.')} / {item.dept}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab("deadlines")} 
              className={`${item.btn} text-white px-5 py-2 rounded-lg font-black text-xs hover:opacity-90 transition-all`}
            >
              詳細確認
            </button>
          </section>
        ))}
        {homeDeadlines.length === 0 && (
          <div className="p-4 text-center text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-2xl">
            現在、予定されている重要な締め切りはありません
          </div>
        )}
      </div>

      {/* --- 2. クイックアクセスリンク（文字1列・アイコン40px） --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {quickLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`h-36 rounded-2xl border-2 ${link.border} bg-white p-5 shadow-sm cursor-pointer group relative flex items-center transition-all hover:shadow-xl hover:-translate-y-1`}
          >
            <div className={`${link.bg} p-4 rounded-xl mr-5 ${link.iconCol} flex-shrink-0 transition-transform group-hover:scale-105`}>
              {React.cloneElement(link.icon as React.ReactElement, { size: 40 })}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-black text-lg mb-0.5 text-gray-800 tracking-tighter whitespace-nowrap truncate">
                {link.title}
              </h3>
              <p className="text-gray-500 text-[13px] whitespace-nowrap truncate opacity-80">
                {link.desc}
              </p>
            </div>
            <div className={`absolute bottom-3 right-3 ${link.iconCol} opacity-0 group-hover:opacity-100 transition-opacity`}>
              <ExternalLink size={18} />
            </div>
          </a>
        ))}
      </div>

      {/* --- 3. 最新のお知らせ欄（自動取得） --- */}
      <section className="bg-white rounded-[2rem] p-8 border border-[#e2ece9] shadow-sm mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3 italic">
            <span className="w-10 h-10 bg-[#065f46] text-white rounded-lg flex items-center justify-center text-lg not-italic shadow-md">N</span> 
            Latest News
          </h3>
          <button onClick={() => setActiveTab("news")} className="text-[#065f46] font-black text-xs hover:underline">すべて見る →</button>
        </div>
        <div className="space-y-2">
          {homeNews.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setActiveTab("news")} 
              className="flex items-center gap-6 p-4 rounded-xl hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 group cursor-pointer"
            >
              <span className="text-sm font-bold text-slate-400 font-mono">{item.date}</span>
              <span className={`text-[10px] font-black px-2 py-1 rounded-full border ${item.color.replace('text', 'border')} ${item.color} uppercase tracking-widest`}>
                {item.category}
              </span>
              <span className="font-bold text-slate-700 text-base group-hover:text-[#065f46] flex-grow truncate">{item.title}</span>
              <ChevronRight className="text-slate-300 group-hover:text-[#065f46]" size={18} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};