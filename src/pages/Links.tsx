import React, { useState } from "react";
import { linkCollection } from "../data/links";
import { ExternalLink, List as ListIcon, LayoutGrid, Search } from "lucide-react";

type LinkItem = typeof linkCollection[number];

export const Links = () => {
  // 初期状態を "list" (全一覧) に設定
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  
  // カテゴリーの重複を除去してリスト化
  const categories = Array.from(new Set(linkCollection.map(l => l.category)));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* ページヘッダー */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-50 p-2 rounded-lg">
            <ListIcon size={24} className="text-[#065f46]" />
          </div>
          <h2 className="text-xl font-black text-slate-800">リンク集</h2>
        </div>
        
        {/* 表示モード切り替えスイッチ */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button 
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-black transition-all ${viewMode === "list" ? "bg-white text-[#065f46] shadow-md" : "text-slate-400 hover:text-slate-600"}`}
          >
            <ListIcon size={16} /> 全一覧
          </button>
          <button 
            onClick={() => setViewMode("card")}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-black transition-all ${viewMode === "card" ? "bg-white text-[#065f46] shadow-md" : "text-slate-400 hover:text-slate-600"}`}
          >
            <LayoutGrid size={16} /> カテゴリー別
          </button>
        </div>
      </div>

      {/* 表示メインコンテンツ */}
      {viewMode === "list" ? (
        /* --- デフォルト：全一覧（リスト形式） --- */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-[#065f46] text-white">
                <th className="px-6 py-4 font-black text-[11px] uppercase tracking-[0.2em] w-1/4 border-r border-emerald-700/50">カテゴリー</th>
                <th className="px-6 py-4 font-black text-[11px] uppercase tracking-[0.2em]">名称 / サイト概要</th>
                <th className="px-6 py-4 w-12 text-center">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(linkCollection as LinkItem[]).map((link) => (
                <tr key={link.id} className="hover:bg-emerald-50/30 transition-colors group cursor-pointer" onClick={() => window.open(link.url, '_blank')}>
                  <td className="px-6 py-4">
                    <span className="bg-emerald-50 text-[#065f46] text-[10px] font-black px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-wider">
                      {link.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800 group-hover:text-[#065f46] transition-colors">{link.title}</div>
                    <div className="text-[11px] text-slate-400 mt-1 font-medium">{link.desc}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <ExternalLink size={16} className="text-slate-300 group-hover:text-[#065f46] transition-colors mx-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* --- 切り替え用：カテゴリー別（カード形式） --- */
        <div className="space-y-8">
          {categories.map(cat => (
            <section key={cat} className="space-y-4">
              <div className="flex items-center gap-3 ml-2">
                <div className="w-1.5 h-5 bg-[#065f46] rounded-full"></div>
                <h3 className="font-black text-slate-800 text-base">{cat}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {linkCollection.filter(l => l.category === cat).map((link) => (
                  <a 
                    key={link.id} 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#065f46] hover:shadow-xl transition-all group relative overflow-hidden"
                  >
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-black text-slate-800 group-hover:text-[#065f46] transition-colors">{link.title}</span>
                        <ExternalLink size={16} className="text-slate-200 group-hover:text-[#065f46] transition-colors" />
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-medium">{link.desc}</p>
                    </div>
                    {/* ホバー時の背景装飾 */}
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#065f46] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};