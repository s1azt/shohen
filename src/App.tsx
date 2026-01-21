import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Home } from "./pages/Home";
import { News } from "./pages/News";
import { Team } from "./pages/Team";
import { Links } from "./pages/Links";
import { Deadlines } from "./pages/Deadlines";
import { Documents } from "./pages/Documents";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [activeSectionId, setActiveSectionId] = useState("HC10");

  return (
    <div className="min-h-screen flex flex-col bg-[#f7faf9]">
      <header className="bg-[#2d4032] border-b-4 border-[#8ba68c] text-white py-6 px-12 flex justify-between items-center sticky top-0 z-50">
        <h1 className="font-black text-2xl uppercase">GS Portal</h1>
        <nav className="flex gap-8">
          {[
            {id:"home", l:"ホーム"}, {id:"news", l:"お知らせ"}, 
            {id:"deadlines", l:"締め切り"}, {id:"docs", l:"文書"}, 
            {id:"links", l:"リンク集"}, {id:"team", l:"チーム紹介"}
          ].map(m => (
            <button key={m.id} onClick={() => setActiveTab(m.id)} 
              className={`text-xs font-black pb-1 transition-all border-white ${activeTab === m.id ? "border-b-4 opacity-100" : "opacity-60"}`}>
              {m.l}
            </button>
          ))}
        </nav>
      </header>

      <div className="container mx-auto flex flex-col md:flex-row gap-6 p-10 flex-grow max-w-[1500px]">
        <Sidebar setActiveTab={setActiveTab} setActiveSectionId={setActiveSectionId} />
        <main className="flex-grow">
          {activeTab === "home" && <Home setActiveTab={setActiveTab} />}
          {activeTab === "news" && <News />}
          {activeTab === "deadlines" && <Deadlines />}
          {activeTab === "docs" && <Documents />}
          {activeTab === "links" && <Links />}
          {activeTab === "team" && <Team activeSectionId={activeSectionId} setActiveSectionId={setActiveSectionId} />}
        </main>
      </div>
    </div>
  );
}