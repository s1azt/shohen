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

type Deadline = typeof allDeadlines[number];
type NewsItem = typeof allNews[number];

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  const IconMap: { [key: string]: React.ReactNode } = {
    ReceiptText: <ReceiptText size={28} />,
    CircleDollarSign: <CircleDollarSign size={28} />,
    Activity: <Activity size={28} />,
    Clipboard: <Clipboard size={28} />
  };

  const today = new Date().toISOString().split('T')[0];
  const homeDeadlines = (allDeadlines as Deadline[])
    .filter(item => item.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const homeNews = (allNews as NewsItem[]).slice(0, 3);

  // 写真の配色に基づいたクイックリンク設定
  const quickLinks = [
    { id: 1, title: "社活サイト", desc: "日報入力はこちら", icon: <Activity />, border: "border-[#cbd5c0]", bg: "bg-[#f4f7f0]", iconCol: "text-[#6b7a5f]", url: "http://aemlinux3.nekonet.co.jp/aem/aem.php" },
    { id: 2, title: "会議室予約", desc: "施設の予約・状況確認", icon: <Calendar />, border: "border-[#cbd5c0]", bg: "bg-[#f4f7f0]", iconCol: "text-[#6b7a5f]", url: "#" },
    { id: 3, title: "社内FAQ", desc: "よくある質問とルール", icon: <HelpCircle />, border: "border-[#cbd5c0]", bg: "bg-[#f4f7f0]", iconCol: "text-[#6b7a5f]", url: "#" },
    { id: 4, title: "GSうぃき", desc: "ナレッジ・マニュアル", icon: <FileText />, border: "border-[#cbd5c0]", bg: "bg-[#f4f7f0]", iconCol: "text-[#6b7a5f]", url: "http://gs.nekonet.co.jp/GS_wiki/" },
    { id: 5, title: "TW申請", desc: "テレワークの申請・報告", icon: <Clipboard />, border: "border-[#cbd5c0]", bg: "bg-[#f4f7f0]", iconCol: "text-[#6b7a5f]", url: "http://dominoap.nekonet.co.jp/tyo/tyo0993.nsf/MainFrame?OpenFrameSet" },
    { id: 6, title: "E-learning", desc: "スキルアップ・社内研修", icon: <GraduationCap />, border: "border-[#cbd5c0]", bg: "bg-[#f4f7f0]", iconCol: "text-[#6b7a5f]", url: "https://clipline.jp/training/#/" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* --- 1. 重要な締め切り（写真のカード風デザイン） --- */}
      <div className="flex flex-col gap-3">
        {homeDeadlines.map((item) => (
          <section 
            key={item.id} 
            className={`bg-white border border-[#cbd5c0] border-l-[10px] ${item.accent} p-5 rounded-r-2xl shadow-sm flex justify-between items-center transition-all hover:shadow-md`}
          >
            <div className="flex items-center gap-6">
              <div className="text-[#6b7a5f] opacity-80">
                {IconMap[item.iconName as string] || <Clipboard size={28} />}
              </div>
              <div>
                <h4 className="font-black text-lg text-[#3e4a36]">{item.title}</h4>
                <p className="text-[11px] font-bold text-[#6b7a5f] uppercase tracking-widest mt-0.5">
                  DUE: {item.date.replace(/-/g, '.')} / {item.dept}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab("deadlines")} 
              className="bg-[#6b7a5f] text-white px-5 py-2 rounded-lg font-black text-xs hover:bg-[#3e4a36] transition-all"
            >
              詳細確認
            </button>
          </section>
        ))}
      </div>

      {/* --- 2. クイックアクセスリンク（写真のグリッドを再現） --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {quickLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`h-36 rounded-2xl border border-transparent bg-white p-5 shadow-sm cursor-pointer group relative flex items-center transition-all hover:border-[#cbd5c0] hover:shadow-md hover:-translate-y-1`}
          >
            <div className={`${link.bg} p-4 rounded-xl mr-5 ${link.iconCol} flex-shrink-0 transition-transform group-hover:scale-105 shadow-inner`}>
              {React.cloneElement(link.icon as React.ReactElement, { size: 40 })}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-black text-lg mb-0.5 text-[#3e4a36] tracking-tighter whitespace-nowrap truncate">
                {link.title}
              </h3>
              <p className="text-[#6b7a5f] text-[13px] whitespace-nowrap truncate opacity-80 font-medium">
                {link.desc}
              </p>
            </div>
            <div className={`absolute bottom-3 right-3 text-[#6b7a5f] opacity-0 group-hover:opacity-100 transition-opacity`}>
              <ExternalLink size={18} />
            </div>
          </a>
        ))}
      </div>

      {/* --- 3. 最新のお知らせ欄（抹茶色のアクセント） --- */}
      <section className="bg-white rounded-[2.5rem] p-8 border border-[#cbd5c0] shadow-sm mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black text-[#3e4a36] flex items-center gap-3 italic">
            <span className="w-10 h-10 bg-[#6b7a5f] text-white rounded-lg flex items-center justify-center text-lg not-italic shadow-md">N</span> 
            Latest News
          </h3>
          <button onClick={() => setActiveTab("news")} className="text-[#6b7a5f] font-black text-xs hover:text-[#3e4a36] transition-colors">すべて見る →</button>
        </div>
        <div className="space-y-1">
          {homeNews.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setActiveTab("news")} 
              className="flex items-center gap-6 p-4 rounded-xl hover:bg-[#f4f7f0] transition-colors border-b border-[#cbd5c0]/30 last:border-0 group cursor-pointer"
            >
              <span className="text-sm font-bold text-[#6b7a5f] font-mono opacity-60">{item.date}</span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border border-[#cbd5c0] text-[#6b7a5f] uppercase tracking-widest`}>
                {item.category}
              </span>
              <span className="font-bold text-[#3e4a36] text-base group-hover:text-[#6b7a5f] flex-grow truncate">{item.title}</span>
              <ChevronRight className="text-[#cbd5c0] group-hover:text-[#6b7a5f]" size={18} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};