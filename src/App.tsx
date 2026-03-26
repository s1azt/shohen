import React, { useState, useEffect } from "react";
import { THEMES } from "./data/themes";

// HSL ユーティリティ（カスタムカラー用）
function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [h * 360, s * 100, l * 100];
}
function hslToHex(h: number, s: number, l: number): string {
  h /= 360; s /= 100; l /= 100;
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  let r, g, b;
  if (s === 0) { r = g = b = l; }
  else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return '#' + [r, g, b].map(v => Math.round((v as number) * 255).toString(16).padStart(2, '0')).join('');
}
function adjustHex(hex: string, lightDelta: number): string {
  const [h, s, l] = hexToHsl(hex);
  return hslToHex(h, s, Math.max(5, Math.min(95, l + lightDelta)));
}
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Sidebar } from "./components/Sidebar";
import { NotFound } from "./components/NotFound";

// Pages
import { Home } from "./pages/Home";
import { Deadlines } from "./pages/DeadLines";
import { Links } from "./pages/Links";
import { Team } from "./pages/Team";
import { Syohen } from "./pages/Syohen";
import { SearchResults } from "./pages/SearchResults";
import { Column } from "./pages/Column";
import { News } from "./pages/News"; 
import { Construction } from "./pages/Construction";
import { Documents } from "./pages/Documents"; 

// 雨エフェクト：ランダム値をコンポーネント外で固定し再レンダリングでリセットされない
const RAIN_DROPS = [...Array(15)].map(() => ({
  left: `${Math.random() * 100}%`,
  animationDuration: `${Math.random() * 0.5 + 0.7}s`,
  animationDelay: `${Math.random() * 2}s`,
  opacity: Math.random() * 0.4 + 0.1,
}));
const RainEffect: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
    {RAIN_DROPS.map((style, i) => (
      <div key={i} className="rain-drop" style={style} />
    ))}
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchExecutionQuery, setSearchExecutionQuery] = useState("");
  const [activeSectionId, setActiveSectionId] = useState("HC10");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [constructionTarget, setConstructionTarget] = useState("");

  // テーマカラー管理
  const [themeName, setThemeName] = useState(() => localStorage.getItem('gs-theme') || 'green');
  const [customColor, setCustomColor] = useState(() => localStorage.getItem('gs-custom-color') || '#064e3b');

  // テーマカラーをCSS変数として注入
  useEffect(() => {
    let primary: string, light: string, dark: string;
    let onPrimary: string;
    let accent: string;
    if (themeName === 'custom') {
      primary = customColor;
      light = adjustHex(customColor, 10);
      dark = adjustHex(customColor, -15);
      const [, , l] = hexToHsl(customColor);
      onPrimary = l > 55 ? '#1a1a1a' : '#ffffff';
      accent = l > 55 ? customColor : adjustHex(customColor, -10);
      localStorage.setItem('gs-custom-color', customColor);
    } else {
      const t = THEMES.find(t => t.id === themeName) || THEMES[0];
      primary = t.primary; light = t.light; dark = t.dark;
      onPrimary = t.onPrimary;
      accent = t.accent;
    }
    const root = document.documentElement;
    root.style.setProperty('--gs-primary', primary);
    root.style.setProperty('--gs-primary-light', light);
    root.style.setProperty('--gs-primary-dark', dark);
    root.style.setProperty('--gs-on-primary', onPrimary);
    root.style.setProperty('--gs-accent', accent);
    root.style.setProperty('--gs-text-primary', '#1a2e25');
    root.style.setProperty('--gs-card-bg', '#ffffff');
    localStorage.setItem('gs-theme', themeName);
  }, [themeName, customColor]);

  // 遊び心・環境の状態管理
  const [isRaining, setIsRaining] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    
    // 💡 「雨」または「rain」で環境変化
    if (query === "雨" || query.toLowerCase() === "rain") {
      setIsRaining(true);
      setSearchQuery("");
      // 30秒後に自動で止む
      setTimeout(() => setIsRaining(false), 30000);
      return;
    }

    if (query === "") {
      setIsRaining(false);
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

  // 💡 プレースホルダーの動的切り替え
  const searchPlaceholder = isRaining
    ? "雨の音が心地よいですね..."
    : "社内情報を検索...";

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-[3000ms] ease-in-out ${
      themeName === 'black'
        ? 'bg-[#1a1a22] text-slate-200'
        : isRaining 
          ? 'bg-[#e2e8f0] text-[#1e293b]' 
          : 'bg-[#f1f3f5] text-[#064e3b]'
    } font-sans relative`}
    style={isRaining ? {
      backgroundImage: "radial-gradient(circle at top right, #f1f5f9, #e2e8f0)"
    } : {}}
    >
      
      {/* 軽量雨エフェクト */}
      {isRaining && <RainEffect />}

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

      <div className="container mx-auto flex flex-col md:flex-row items-start gap-12 px-6 pb-20 relative z-10">
        <div className="w-full md:w-80 flex-shrink-0 md:sticky md:top-8 h-fit">
          <Sidebar 
            setActiveTab={setActiveTab} 
            setActiveSectionId={setActiveSectionId} 
            themeName={themeName}
            setThemeName={setThemeName}
            customColor={customColor}
            setCustomColor={setCustomColor}
          />
        </div>
        
        <main className="flex-grow min-w-0">
          {/* 💡 元のPropsなしの形式に戻し、赤波線を解消 */}
          {activeTab === "home" && <Home setActiveTab={setActiveTab} />}
          {activeTab === "deadlines" && <Deadlines />}
          {activeTab === "news" && <News />}
          {activeTab === "links" && <Links />}
          {activeTab === "team" && <Team activeSectionId={activeSectionId} />}
          {/*{activeTab === "guide" && <Guide />}*/}
          {activeTab === "guide" && <Construction target="新人ガイド" />}
          {activeTab === "documents" && <Documents />}
          {activeTab === "syohen" && <Syohen />}
          {activeTab === "column" && <Column />} 
          {activeTab === "construction" && <Construction target={constructionTarget} />}
          {activeTab === "search" && <SearchResults query={searchExecutionQuery} setActiveTab={setActiveTab} />}

          {!validTabs.includes(activeTab) && <NotFound setActiveTab={setActiveTab} />}
        </main>
      </div>

      {/* 💡 フッターには状態を渡してカエルを出現させる */}
      <Footer isRaining={isRaining} />
    </div>
  );
}