import { useState } from "react";
// 共通パーツ
import { Sidebar } from "./components/Sidebar";
// 各ページ
import { Home } from "./pages/Home";
import { Deadlines } from "./pages/Deadlines";
import { News } from "./pages/News";
import { Links } from "./pages/Links";
import { Team } from "./pages/Team";
import { Guide } from "./pages/Guide";
import { Misc } from "./pages/Misc";
import { Construction } from "./pages/Construction";
import { SearchResults } from "./pages/SearchResults";

// アイコン
import { 
  Search, Home as IconHome, Info, Link as IconLink, Users, 
  GraduationCap, MoreHorizontal, MapPin, Clock, ChevronDown, ChevronRight 
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchExecutionQuery, setSearchExecutionQuery] = useState("");
  const [activeSectionId, setActiveSectionId] = useState("HC10");
  const [constructionTarget, setConstructionTarget] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const menuItems = [
    { id: "home", label: "ホーム", icon: <IconHome size={18} /> },
    { id: "deadlines", label: "締め切り", icon: <Clock size={18} /> },
    { id: "news", label: "お知らせ", icon: <Info size={18} /> },
    { id: "links", label: "リンク集", icon: <IconLink size={18} /> },
    { id: "team", label: "チーム紹介", icon: <Users size={18} /> },
    { id: "guide", label: "新人ガイド", icon: <GraduationCap size={18} /> },
    { id: "misc", label: "その他", icon: <MoreHorizontal size={18} /> },
  ];

  const openLocation = (name: string) => {
    setConstructionTarget(name);
    setActiveTab("construction");
    setShowLocationDropdown(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchExecutionQuery(searchQuery);
      setActiveTab("search");
    }
  };

  return (
    // 全体背景：画像のような深みのある落ち着いたベージュ・グレー系
    <div className="min-h-screen flex flex-col bg-[#ced4bc] text-[#3e4a36] font-sans selection:bg-[#6b7a5f]/30">
      
      {/* --- ヘッダー：抹茶色（モスグリーン） --- */}
      <header className="bg-[#6b7a5f] text-[#f4f7f0] shadow-md relative z-[100]">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div 
            className="flex flex-col cursor-pointer hover:opacity-90 transition-opacity" 
            onClick={() => setActiveTab("home")}
          >
            <h1 className="text-2xl font-bold tracking-tight">
              グループシステム部 イントラサイト
            </h1>
            <p className="text-[#cbd5c0] text-[10px] font-bold tracking-[0.2em] uppercase">
              Internal Information Hub / GS Dept.
            </p>
          </div>
          
          {/* 検索バー：背景に馴染む抹茶色の濃淡 */}
          <form onSubmit={handleSearch} className="relative w-full md:w-80 group">
            <input
              type="text"
              placeholder="情報を検索..."
              className="w-full py-2 px-5 pr-10 rounded-xl text-sm bg-black/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:bg-[#f4f7f0] focus:text-[#3e4a36] focus:ring-4 focus:ring-black/5 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-[#6b7a5f]">
              <Search size={16} />
            </button>
          </form>
        </div>

        {/* ナビゲーション：一段明るい抹茶色 --- */}
        <nav className="bg-[#7c8c72] border-t border-white/5 flex relative">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 min-w-[90px] flex flex-col items-center justify-center py-3 transition-all relative ${
                activeTab === item.id 
                  ? "bg-[#ced4bc] text-[#3e4a36]" 
                  : "text-[#f4f7f0] hover:bg-[#6b7a5f]"
              }`}
            >
              {item.icon}
              <span className={`text-[12px] mt-1.5 font-bold ${activeTab === item.id ? "text-[#3e4a36]" : ""}`}>
                {item.label}
              </span>
              {activeTab === item.id && (
                <div className="absolute top-0 left-0 w-full h-1 bg-[#3e4a36]" />
              )}
            </button>
          ))}
          
          <div 
            className="relative flex-1 min-w-[110px]"
            onMouseEnter={() => setShowLocationDropdown(true)}
            onMouseLeave={() => setShowLocationDropdown(false)}
          >
            <button className={`w-full h-full flex flex-col items-center justify-center py-3 transition-all ${
              showLocationDropdown || activeTab === "construction" ? "bg-black/5" : "text-[#f4f7f0]"
            }`}>
              <div className="flex items-center gap-1">
                <MapPin size={18} />
                <ChevronDown size={12} className={showLocationDropdown ? "rotate-180" : ""} />
              </div>
              <span className="text-[12px] mt-1.5 font-bold">拠点別情報</span>
            </button>

            {showLocationDropdown && (
              <div className="absolute top-full left-0 w-48 bg-[#f4f7f0] shadow-xl border border-[#cbd5c0] rounded-b-xl overflow-hidden animate-in fade-in slide-in-from-top-1 z-[1000]">
                {["晴海", "東陽町", "大阪"].map((loc) => (
                  <button 
                    key={loc}
                    onClick={() => openLocation(loc)}
                    className="w-full px-5 py-4 text-left text-xs font-bold text-[#6b7a5f] hover:bg-[#ced4bc] hover:text-[#3e4a36] border-b border-[#cbd5c0]/30 last:border-0 transition-colors flex justify-between items-center"
                  >
                    {loc}
                    <ChevronRight size={14} className="opacity-40" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* --- メインコンテンツ --- */}
      <div className="container mx-auto flex flex-col md:flex-row gap-8 p-8 flex-grow">
        <Sidebar 
          setActiveTab={setActiveTab} 
          setActiveSectionId={setActiveSectionId}
          openLocation={openLocation}
        />
        
        <main className="flex-grow min-w-0">
          <div className="bg-transparent">
            {activeTab === "home" && <Home setActiveTab={setActiveTab} />}
            {activeTab === "deadlines" && <Deadlines />}
            {activeTab === "news" && <News />}
            {activeTab === "links" && <Links />}
            {activeTab === "team" && <Team />}
            {activeTab === "guide" && <Guide />}
            {activeTab === "misc" && <Misc />}
            {activeTab === "construction" && <Construction target={constructionTarget} />}
            {activeTab === "search" && (
              <SearchResults query={searchExecutionQuery} setActiveTab={setActiveTab} />
            )}
          </div>
        </main>
      </div>

      <footer className="bg-[#b8c0a4] py-10 mt-auto border-t border-[#aeb69a]">
        <div className="container mx-auto px-6 text-center text-[#5c664d] font-bold text-[10px] tracking-[0.4em] uppercase">
          © 2026 Group Systems Department. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}