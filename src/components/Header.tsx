import React from "react";
import { Search, Home, Link as IconLink, Users, GraduationCap, MoreHorizontal, MapPin, Info, FileText } from "lucide-react";

const MENU_ITEMS: { id: string; label: string; Icon: React.FC<{ size?: number }> }[] = [
  { id: "home",      label: "ホーム",       Icon: Home },
  { id: "news",      label: "お知らせ",     Icon: Info },
  { id: "links",     label: "リンク集",     Icon: IconLink },
  { id: "team",      label: "チーム紹介",   Icon: Users },
  { id: "guide",     label: "新人ガイド",   Icon: GraduationCap },
  { id: "documents", label: "ドキュメント", Icon: FileText },
  { id: "syohen",    label: "小変活動",     Icon: MoreHorizontal },
];

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
    <header className="relative w-full shadow-2xl mb-10 overflow-visible transition-all border-b border-white/5 bg-gradient-to-b from-(--gs-primary) to-(--gs-primary-light)">
      {/* 右上の環境装飾 */}
      <div className="absolute top-0 right-0 w-96 h-full blur-[100px] rounded-full pointer-events-none bg-(--gs-primary)/10" />

      {/* 1. ヘッダー上部 */}
      <div className="container mx-auto px-10 pt-12 pb-10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        
        {/* ロゴ：遊び心「水面の波紋」エフェクト */}
        <div 
          className="flex flex-col cursor-pointer group/logo relative" 
          onClick={() => setActiveTab("home")}
        >
          {/* 波紋エフェクト */}
          <div className="absolute inset-x-0 inset-y-0 -m-8 rounded-full transition-all duration-1000 scale-50 group-hover/logo:scale-125 opacity-0 group-hover/logo:opacity-100 blur-[40px] pointer-events-none bg-(--gs-primary)/15" />

          <h1 className="text-4xl font-black text-(--gs-on-primary) tracking-tighter  relative z-10">
            グループシステム部イントラサイト <span className="text-(--gs-on-primary)/50"></span>
          </h1>
          <p className="text-(--gs-on-primary)/50 text-[10px] font-bold uppercase tracking-[0.5em] mt-1 ml-1 relative z-10">
            Group Systems Department
          </p>
        </div>
        
        {/* 検索窓：隠しコマンド受付中 */}
        <form onSubmit={onLocalSearch} className="relative w-full md:w-80 group/search">
          <input
            type="text"
            // 💡 動的なプレースホルダーを適用
            placeholder={placeholder || "情報を検索..."}
            className="w-full py-3.5 px-6 rounded-xl text-sm border border-(--gs-on-primary)/30 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all outline-none font-bold bg-white/95 text-(--gs-primary) placeholder:text-slate-400 focus:ring-emerald-400/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="absolute right-5 top-1/2 -translate-y-1/2 transition-colors text-(--gs-accent) hover:text-(--gs-primary-light)">
            <Search size={20} strokeWidth={3} />
          </button>
        </form>
      </div>

      {/* 2. ナビゲーションバー：完全直角 */}
      <nav className="bg-black/15 border-t border-white/10 flex relative overflow-visible z-20">
        <div className="container mx-auto flex flex-wrap w-full">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 min-w-[100px] flex flex-col items-center justify-center py-5 transition-all relative border-r border-white/5 last:border-r-0 ${
                activeTab === item.id 
                ? "bg-[#f1f3f5] text-(--gs-accent)"
                : "text-(--gs-on-primary)/70 hover:text-(--gs-on-primary) hover:bg-(--gs-on-primary)/10"
              }`}
            >
              <div className={activeTab === item.id ? "scale-110 transition-transform duration-300" : ""}>
                <item.Icon size={18} />
              </div>
              <span className="text-[14px] mt-2 font-black uppercase tracking-widest">{item.label}</span>
              {activeTab === item.id && (
                <div className="absolute top-0 left-0 w-full h-1 bg-(--gs-accent) shadow-[0_2px_10px_rgba(16,185,129,0.5)]" />
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
              ? "bg-[#f1f3f5] text-(--gs-accent)"
              : "text-(--gs-on-primary)/70 hover:text-(--gs-on-primary) hover:bg-(--gs-on-primary)/10"
            }`}>
              <MapPin size={18} />
              <span className="text-[14px] mt-2 font-black uppercase tracking-widest">拠点情報</span>
              {(showLocationDropdown || activeTab === "construction") && (
                <div className="absolute top-0 left-0 w-full h-1 bg-(--gs-accent) shadow-[0_2px_10px_rgba(16,185,129,0.5)]" />
              )}
            </button>

            {/* ドロップダウン */}
            {showLocationDropdown && (
              <div className="absolute top-full left-0 w-52 shadow-[0_20px_60px_rgba(0,0,0,0.4)] border-t-2 animate-in fade-in slide-in-from-top-2 duration-200 bg-white border-(--gs-accent) text-(--gs-accent)">
                {["晴海", "東陽町", "大阪"].map((loc) => (
                  <button 
                    key={loc}
                    onClick={() => { 
                      setConstructionTarget(loc); 
                      setActiveTab("construction"); 
                      setShowLocationDropdown(false); 
                    }}
                    className="w-full px-7 py-5 text-left text-[11px] font-black border-b last:border-0 transition-all uppercase tracking-[0.2em] border-slate-50 hover:bg-slate-50 text-(--gs-accent)"
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