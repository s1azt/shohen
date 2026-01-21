// src/App.tsx
import { useState } from "react";
import { Sidebar } from "./components/Sidebar"; // 1. インポートする

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Headerなどはそのまま */}
      <header className="...">...</header>

      <div className="container mx-auto flex flex-col md:flex-row gap-6 p-8 flex-grow max-w-[1500px]">
        {/* 2. サイドバーを呼び出す（App.tsx内の古いサイドバーコードは削除） */}
        <Sidebar />

        <main className="flex-grow">
          {/* コンテンツの出し分けロジック */}
          {activeTab === "home" && <RenderHome />}
          {/* ...他のタブ... */}
        </main>
      </div>
      {/* Footer... */}
    </div>
  );
}