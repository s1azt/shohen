import { 
  Home, 
  Clock, 
  Info, 
  Link as IconLink, 
  GraduationCap, 
  ChevronRight, 
  Map, 
  MessageSquare,
  LayoutDashboard
} from "lucide-react";
import { useState, useEffect } from "react";
// データ名は allDeadlines を使用
import { allDeadlines } from "../data/deadlines"; 

interface SidebarProps {
  setActiveTab: (tab: string) => void;
  setActiveSectionId: (id: string) => void;
}

export const Sidebar = ({ setActiveTab, setActiveSectionId }: SidebarProps) => {
  const [time, setTime] = useState(new Date());

  // 時計をリアルタイムで更新するタイマー
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 締め切りデータの計算ロジック（今日から31日以内のものだけを抽出）
  const upcomingDeadlines = (allDeadlines || []).filter((d) => {
    const today = new Date();
    const targetDate = new Date(d.date);
    
    // 時間をリセットして日付のみで比較
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // 今日以降（0日）かつ31日以内のものを表示
    return diffDays >= 0 && diffDays <= 31;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <aside className="w-full md:w-72 space-y-5 animate-in fade-in slide-in-from-left duration-700">
      
      {/* 1. 時計・ステータス表示（Status Card） */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-[#cbd5c0] text-center">
        <div className="flex items-center justify-center gap-2 text-[#6b7a5f] text-[10px] font-black uppercase tracking-[0.2em] mb-2">
          <Clock size={12} strokeWidth={3} /> Status
        </div>
        <div className="text-[#3e4a36] text-sm font-bold mb-1">
          {time.getMonth() + 1}月{time.getDate()}日 {['日','月','火','水','木','金','土'][time.getDay()]}曜日
        </div>
        <div className="text-4xl font-black text-[#6b7a5f] tracking-tighter tabular-nums">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
        </div>
      </div>

      {/* 2. クイックアクション：今週のコラム・全社座席表 */}
      <div className="space-y-3">
        {/* 今週のコラム：setActiveTabを "column" に設定して、Newsと差別化 */}
        <button 
          onClick={() => setActiveTab("column")}
          className="w-full bg-white p-4 rounded-2xl border border-[#cbd5c0] flex items-center gap-4 hover:bg-[#f4f7f0] transition-all group shadow-sm"
        >
          <div className="bg-[#f0fdf4] p-2 rounded-xl text-[#059669] group-hover:scale-110 transition-transform">
            <MessageSquare size={20} />
          </div>
          <div className="text-left">
            <span className="block font-bold text-[#3e4a36] text-sm leading-none">今週のコラム</span>
            <span className="text-[10px] text-[#6b7a5f] font-bold opacity-60">毎週水曜更新</span>
          </div>
          <ChevronRight size={16} className="ml-auto opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </button>

        {/* 全社座席表：外部リンクへの誘導 */}
        <button 
          onClick={() => window.open("http://shachoushitsu.nekonet.co.jp/k_kikaku/zaseki/zaseki_gws.html", "_blank")}
          className="w-full bg-white p-4 rounded-2xl border border-[#cbd5c0] flex items-center gap-4 hover:bg-[#f4f7f0] transition-all group shadow-sm"
        >
          <div className="bg-[#eff6ff] p-2 rounded-xl text-[#2563eb] group-hover:scale-110 transition-transform">
            <Map size={20} />
          </div>
          <span className="font-bold text-[#3e4a36] text-sm">全社座席表</span>
          <ChevronRight size={16} className="ml-auto opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </button>
      </div>

      {/* 3. 直近の締め切り：31日以内の allDeadlines を表示 */}
      <div className="bg-white p-5 rounded-3xl border border-[#cbd5c0] relative overflow-hidden shadow-sm">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#6b7a5f] opacity-20"></div>
        <h3 className="text-[#6b7a5f] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mb-4 ml-2">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span> Upcoming Deadlines
        </h3>
        <div className="space-y-3 ml-2">
          {upcomingDeadlines.length > 0 ? (
            upcomingDeadlines.slice(0, 3).map((d) => (
              <div 
                key={d.id} 
                className="group cursor-pointer border-b border-[#cbd5c0]/30 pb-2 last:border-0" 
                onClick={() => setActiveTab("deadlines")}
              >
                <div className="text-[11px] font-bold text-[#3e4a36] group-hover:text-[#6b7a5f] transition-colors truncate">
                  {d.title}
                </div>
                <div className="text-[9px] text-[#6b7a5f] font-black italic mt-0.5">
                  {d.date} まで
                </div>
              </div>
            ))
          ) : (
            <div className="text-[10px] text-[#6b7a5f] italic py-2">直近の締め切りはありません</div>
          )}
        </div>
      </div>

      {/* 4. 体制図：セクションを直接切り替えるためのグリッド */}
      <div className="bg-[#f4f7f0]/60 p-5 rounded-3xl border border-dashed border-[#cbd5c0]">
        <h3 className="text-[#6b7a5f] text-[10px] font-black uppercase tracking-[0.2em] text-center mb-4 flex items-center justify-center gap-2">
          <LayoutDashboard size={12} /> Org Charts
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {["HC10", "HC60", "HC70", "HD10"].map((id) => (
            <button
              key={id}
              onClick={() => {
                setActiveSectionId(id);
                setActiveTab("home"); // ホームの体制図セクションへ
              }}
              className="py-2.5 bg-white border border-[#cbd5c0] rounded-xl text-[10px] font-black text-[#3e4a36] hover:bg-[#6b7a5f] hover:text-white hover:border-[#6b7a5f] transition-all shadow-sm active:scale-95"
            >
              {id}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};