import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Sidebar } from "./components/Sidebar";
import { NotFound } from "./components/NotFound";

// Pages
import { Home } from "./pages/Home";
import { Deadlines } from "./pages/DeadLines";
import { Links } from "./pages/Links";
import { Team } from "./pages/Team";
import { Guide } from "./pages/Guide";
import { Syohen } from "./pages/Syohen";
import { SearchResults } from "./pages/SearchResults";
import { Column } from "./pages/Column";
import { News } from "./pages/News"; 
import { Construction } from "./pages/Construction";
import { Documents } from "./pages/Documents"; 

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchExecutionQuery, setSearchExecutionQuery] = useState("");
  const [activeSectionId, setActiveSectionId] = useState("HC10");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [constructionTarget, setConstructionTarget] = useState("");

  // 遊び心・環境の状態管理
  const [isRaining, setIsRaining] = useState(false);
  const [isMidnight, setIsMidnight] = useState(false);

  // 💡 深夜モード判定ロジック
  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      setIsMidnight(hour >= 22 || hour < 5);
    };
    checkTime();
    const timer = setInterval(checkTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    
    // 軽量版「雨」
    if (query === "雨" || query === "rain") {
      setIsRaining(true);
      setSearchQuery("");
      setTimeout(() => setIsRaining(false), 30000);
      return;
    }

    if (query === "クラゲ" || query === "404") {
      setActiveTab("lost-in-ocean");
      setSearchQuery("");
      return;
    }

    if (query) {
      setSearchExecutionQuery(query);
      setActiveTab("search");
    }
  };

  const validTabs = [
    "home", "deadlines", "news", "links", "team", "guide", 
    "documents", "syohen", "column", "construction", "search"
  ];

  // 💡 3. 夜間専用の検索プレースホルダー
  const searchPlaceholder = isMidnight 
    ? "静かな夜ですね。何をお探しですか？" 
    : "社内情報を検索...";

  return (
    /* 💡 1. text色の動的変更を追加 (深夜は slate-300 = 薄いグレー) */
    <div className={`min-h-screen flex flex-col transition-colors duration-[3000ms] ${
      isMidnight 
        ? 'bg-[#0a0f1a] text-slate-300' 
        : 'bg-[#f1f3f5] text-[#064e3b]'
    } font-sans relative`}>
      
      {/* 軽量雨エフェクト */}
      {isRaining && (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="rain-drop"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 0.5 + 0.7}s`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: Math.random() * 0.4 + 0.1
              }}
            />
          ))}
        </div>
      )}

      {/* 💡 placeholder プロパティを Header に渡す */}
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        showLocationDropdown={showLocationDropdown}
        setShowLocationDropdown={setShowLocationDropdown}
        setConstructionTarget={setConstructionTarget}
        placeholder={searchPlaceholder}
      />

      <div className="container mx-auto flex flex-col md:flex-row items-start gap-12 px-6 pb-20">
        <div className="w-full md:w-80 flex-shrink-0 md:sticky md:top-8 h-fit">
          <Sidebar 
            setActiveTab={setActiveTab} 
            setActiveSectionId={setActiveSectionId} 
            isMidnight={isMidnight} 
          />
        </div>
        
        <main className="flex-grow min-w-0">
          {activeTab === "home" && <Home setActiveTab={setActiveTab} />}
          {activeTab === "deadlines" && <Deadlines />}
          {activeTab === "news" && <News />}
          {activeTab === "links" && <Links />}
          {activeTab === "team" && <Team activeSectionId={activeSectionId} />}
          {activeTab === "guide" && <Guide />}
          {activeTab === "documents" && <Documents />}
          {activeTab === "syohen" && <Syohen />}
          {activeTab === "column" && <Column />} 
          {activeTab === "construction" && <Construction target={constructionTarget} />}
          {activeTab === "search" && <SearchResults query={searchExecutionQuery} setActiveTab={setActiveTab} />}

          {!validTabs.includes(activeTab) && <NotFound setActiveTab={setActiveTab} />}
        </main>
      </div>

      <Footer />
    </div>
  );
}