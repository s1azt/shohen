import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Home } from "./pages/Home";
import { Deadlines } from "./pages/Deadlines";
import { Links } from "./pages/Links";
import { Team } from "./pages/Team";
import { Guide } from "./pages/Guide";
import { Misc } from "./pages/Misc";
import { SearchResults } from "./pages/SearchResults";
import { Column } from "./pages/Column";
import { News } from "./pages/News"; 
import { Construction } from "./pages/Construction";

import { 
  Search, Home as IconHome, Clock, Link as IconLink, 
  Users, GraduationCap, MoreHorizontal, MapPin, 
  ChevronDown, ChevronRight, Info
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchExecutionQuery, setSearchExecutionQuery] = useState("");
  const [activeSectionId, setActiveSectionId] = useState("HC10");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [constructionTarget, setConstructionTarget] = useState("");

  const menuItems = [
    { id: "home", label: "ホーム", icon: <IconHome size={18} /> },
    { id: "deadlines", label: "締め切り", icon: <Clock size={18} /> },
    { id: "news", label: "お知らせ", icon: <Info size={18} /> },
    { id: "links", label: "リンク集", icon: <IconLink size={18} /> },
    { id: "team", label: "チーム紹介", icon: <Users size={18} /> },
    { id: "guide", label: "新人ガイド", icon: <GraduationCap size={18} /> },
    { id: "misc", label: "その他", icon: <MoreHorizontal size={18} /> },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchExecutionQuery(searchQuery);
      setActiveTab("search");
    }
  };

  return (
    /* 背景色を写真と同じベージュ系 (#e0e7d7) に変更 */
    <div className="min-h-screen flex flex-col bg-[#e0e7d7] text-[#3e4a36] font-sans">
      
      {/* 1. ヘッダー：写真のような濃い深緑 (#064e3b) */}
      <header className="bg-[#064e3b] text-[#f4f7f0] shadow-lg relative z-[100]">
        <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setActiveTab("home")}>
            <h1 className="text-2xl font-bold tracking-tight">グループシステム部 イントラサイト</h1>
            <p className="text-[#cbd5c0] text-[10px] font-bold uppercase tracking-widest opacity-70">Internal Information Hub</p>
          </div>
          
          <form onSubmit={handleSearch} className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="情報を検索..."
              /* 入力欄は常に白、文字は濃い色 */
              className="w-full py-2.5 px-5 rounded-xl text-sm bg-white text-[#3e4a36] border border-[#cbd5c0] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6b7a5f]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#064e3b]">
              <Search size={18} strokeWidth={3} />
            </button>
          </form>
        </div>

        {/* 2. ナビゲーションバー：少しだけ明るい深緑 (#14532d) */}
        <nav className="bg-[#14532d] border-t border-white/10 flex relative shadow-inner">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-3.5 transition-all relative ${
                activeTab === item.id 
                  ? "bg-[#e0e7d7] text-[#14532d]" /* 選択時は背景と同じ色、文字は濃い緑 */
                  : "text-[#f4f7f0] hover:bg-[#064e3b]"
              }`}
            >
              {item.icon}
              <span className="text-[12px] mt-1.5 font-bold">{item.label}</span>
              {activeTab === item.id && (
                <div className="absolute top-0 left-0 w-full h-1 bg-[#064e3b]" />
              )}
            </button>
          ))}
          
          <div 
            className="relative flex-1"
            onMouseEnter={() => setShowLocationDropdown(true)}
            onMouseLeave={() => setShowLocationDropdown(false)}
          >
            <button className={`w-full h-full flex flex-col items-center justify-center py-3.5 transition-all ${
              showLocationDropdown || activeTab === "construction" ? "bg-[#e0e7d7] text-[#14532d]" : "text-[#f4f7f0]"
            }`}>
              <MapPin size={18} />
              <span className="text-[12px] mt-1.5 font-bold">拠点別情報</span>
            </button>

            {showLocationDropdown && (
              <div className="absolute top-full left-0 w-48 bg-[#f4f7f0] shadow-xl border border-[#cbd5c0] rounded-b-xl z-[1000] overflow-hidden">
                {["晴海", "東陽町", "大阪"].map((loc) => (
                  <button 
                    key={loc}
                    onClick={() => {
                      setConstructionTarget(loc);
                      setActiveTab("construction");
                      setShowLocationDropdown(false);
                    }}
                    className="w-full px-5 py-4 text-left text-xs font-bold text-[#3e4a36] hover:bg-[#e0e7d7] border-b border-[#cbd5c0]/30 last:border-0 transition-colors"
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* 3. メインレイアウト */}
      <div className="container mx-auto flex flex-col md:flex-row gap-8 p-8 flex-grow">
        <Sidebar setActiveTab={setActiveTab} setActiveSectionId={setActiveSectionId} />
        
        <main className="flex-grow min-w-0">
          {activeTab === "home" && <Home setActiveTab={setActiveTab} />}
          {activeTab === "deadlines" && <Deadlines />}
          {activeTab === "news" && <News />}
          {activeTab === "links" && <Links />}
          {activeTab === "team" && <Team />}
          {activeTab === "guide" && <Guide />}
          {activeTab === "misc" && <Misc />}
          {activeTab === "column" && <Column />} 
          {activeTab === "construction" && <Construction target={constructionTarget} />}
          {activeTab === "search" && <SearchResults query={searchExecutionQuery} setActiveTab={setActiveTab} />}
        </main>
      </div>

      {/* 4. フッター：ナビバーと同じ深緑 */}
      <footer className="bg-[#14532d] py-8 mt-auto border-t border-white/10">
        <div className="container mx-auto px-6 text-center text-[#cbd5c0] font-bold text-[10px] tracking-[0.4em] uppercase">
          © 2026 Group Systems Department.
        </div>
      </footer>
    </div>
  );
}