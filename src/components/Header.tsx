import React from "react";
import { Search, Home, Clock, Link as IconLink, Users, GraduationCap, MoreHorizontal, MapPin, Info, FileText } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  showLocationDropdown: boolean;
  setShowLocationDropdown: (show: boolean) => void;
  setConstructionTarget: (target: string) => void;
  placeholder?: string; // 💡 App.tsx から夜間メッセージを受け取る
}

export const Header: React.FC<HeaderProps> = ({
  activeTab, setActiveTab, searchQuery, setSearchQuery, handleSearch,
  showLocationDropdown, setShowLocationDropdown, setConstructionTarget, placeholder
}) => {
  
  // 💡 深夜判定（夜間モードの色のために使用）
  const hour = new Date().getHours();
  const isMidnight = hour >= 22 || hour < 5;

  const menuItems = [
    { id: "home", label: "ホーム", icon: <Home size={18} /> },
    { id: "deadlines", label: "締め切り", icon: <Clock size={18} /> },
    { id: "news", label: "お知らせ", icon: <Info size={18} /> },
    { id: "links", label: "リンク集", icon: <IconLink size={18} /> },
    { id: "team", label: "チーム紹介", icon: <Users size={18} /> },
    { id: "guide", label: "新人ガイド", icon: <GraduationCap size={18} /> },
    { id: "documents", label: "ドキュメント", icon: <FileText size={18} /> },
    { id: "syohen", label: "小変活動", icon: <MoreHorizontal size={18} /> },
  ];

  // 💡 遊び心のトリガー：検索窓で特定のキーワードをフック
  const onLocalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery === "クラゲ" || searchQuery === "404" || searchQuery === "lost") {
      setActiveTab("lost-in-ocean");
      setSearchQuery("");
      return;
    }
    handleSearch(e); 
  };

  return (
    // 💡 transition-colors を追加。深夜は深い紺色のグラデーションへ
    <header className={`relative w-full shadow-2xl mb-10 overflow-visible transition-all duration-[3000ms] border-b border-white/5 ${
      isMidnight 
        ? "bg-gradient-to-b from-[#0a0f1a] to-[#112240]" 
        : "bg-gradient-to-b from-[#064e3b] to-[#065f46]"
    }`}>
      {/* 右上の環境装飾 */}
      <div className={`absolute top-0 right-0 w-96 h-full blur-[100px] rounded-full pointer-events-none transition-colors duration-[3000ms] ${
        isMidnight ? "bg-blue-400/10" : "bg-emerald-400/10"
      }`} />

      {/* 1. ヘッダー上部 */}
      <div className="container mx-auto px-10 pt-12 pb-10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        
        {/* ロゴ：遊び心「水面の波紋」エフェクト */}
        <div 
          className="flex flex-col cursor-pointer group/logo relative" 
          onClick={() => setActiveTab("home")}
        >
          {/* 波紋エフェクト */}
          <div className={`absolute inset-x-0 inset-y-0 -m-8 rounded-full transition-all duration-1000 scale-50 group-hover/logo:scale-125 opacity-0 group-hover/logo:opacity-100 blur-[40px] pointer-events-none ${
            isMidnight ? "bg-blue-400/20" : "bg-emerald-400/15"
          }`} />

          <h1 className="text-4xl font-black text-white tracking-tighter  relative z-10">
            グループシステム部イントラサイト <span className={`transition-colors duration-[3000ms] ${isMidnight ? "text-blue-400" : "text-emerald-300"}`}></span>
          </h1>
          <p className="text-emerald-100/50 text-[10px] font-bold uppercase tracking-[0.5em] mt-1 ml-1 relative z-10">
            Group Systems Department
          </p>
        </div>
        
        {/* 検索窓：隠しコマンド受付中 */}
        <form onSubmit={onLocalSearch} className="relative w-full md:w-80 group/search">
          <input
            type="text"
            // 💡 動的なプレースホルダーを適用
            placeholder={placeholder || "情報を検索..."}
            className={`w-full py-3.5 px-6 rounded-xl text-sm border border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all outline-none font-bold ${
              isMidnight 
                ? "bg-slate-800/90 text-slate-200 placeholder:text-slate-500 focus:ring-blue-400/50" 
                : "bg-white/95 text-[#064e3b] placeholder:text-slate-400 focus:ring-emerald-400/50"
            }`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className={`absolute right-5 top-1/2 -translate-y-1/2 transition-colors ${
            isMidnight ? "text-blue-400" : "text-emerald-600 hover:text-emerald-400"
          }`}>
            <Search size={20} strokeWidth={3} />
          </button>
        </form>
      </div>

      {/* 2. ナビゲーションバー：完全直角 */}
      <nav className="bg-black/15 border-t border-white/10 flex relative overflow-visible z-20">
        <div className="container mx-auto flex flex-wrap w-full">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 min-w-[100px] flex flex-col items-center justify-center py-5 transition-all relative border-r border-white/5 last:border-r-0 ${
                activeTab === item.id 
                ? (isMidnight ? "bg-[#0a0f1a] text-slate-200" : "bg-[#f1f3f5] text-[#064e3b]")
                : "text-emerald-50/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className={activeTab === item.id ? "scale-110 transition-transform duration-300" : ""}>
                {item.icon}
              </div>
              <span className="text-[14px] mt-2 font-black uppercase tracking-widest">{item.label}</span>
              {activeTab === item.id && (
                <div className={`absolute top-0 left-0 w-full h-1 shadow-[0_2px_10px_rgba(16,185,129,0.5)] transition-colors duration-[3000ms] ${
                  isMidnight ? "bg-blue-500" : "bg-emerald-500"
                }`} />
              )}
            </button>
          ))}
          
          {/* 拠点別情報ドロップダウン */}
          <div 
            className="relative flex-1 min-w-[100px]"
            onMouseEnter={() => setShowLocationDropdown(true)}
            onMouseLeave={() => setShowLocationDropdown(false)}
          >
            <button className={`w-full h-full flex flex-col items-center justify-center py-5 transition-all relative ${
              activeTab === "construction" 
              ? (isMidnight ? "bg-[#0a0f1a] text-slate-200" : "bg-[#f1f3f5] text-[#064e3b]")
              : "text-emerald-50/70 hover:text-white hover:bg-white/5"
            }`}>
              <MapPin size={18} />
              <span className="text-[14px] mt-2 font-black uppercase tracking-widest">拠点情報</span>
              {(showLocationDropdown || activeTab === "construction") && (
                <div className={`absolute top-0 left-0 w-full h-1 shadow-[0_2px_10px_rgba(16,185,129,0.5)] transition-colors duration-[3000ms] ${
                  isMidnight ? "bg-blue-500" : "bg-emerald-500"
                }`} />
              )}
            </button>

            {/* ドロップダウン */}
            {showLocationDropdown && (
              <div className={`absolute top-full left-0 w-52 shadow-[0_20px_60px_rgba(0,0,0,0.4)] border-t-2 animate-in fade-in slide-in-from-top-2 duration-200 ${
                isMidnight ? "bg-slate-800 border-blue-500 text-slate-200" : "bg-white border-emerald-500 text-[#064e3b]"
              }`}>
                {["晴海", "東陽町", "大阪"].map((loc) => (
                  <button 
                    key={loc}
                    onClick={() => { 
                      setConstructionTarget(loc); 
                      setActiveTab("construction"); 
                      setShowLocationDropdown(false); 
                    }}
                    className={`w-full px-7 py-5 text-left text-[11px] font-black border-b last:border-0 transition-all uppercase tracking-[0.2em] ${
                      isMidnight 
                        ? "border-slate-700 hover:bg-slate-700 text-slate-200" 
                        : "border-slate-50 hover:bg-emerald-50 text-[#064e3b]"
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};