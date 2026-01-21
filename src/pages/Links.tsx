import React, { useState } from "react";
import { ExternalLink, Hash, List as ListIcon, LayoutGrid } from "lucide-react";

export const Links: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const categories = ["ALL", "業務ツール", "勤怠・経費", "社内規定", "福利厚生"];
  
  const links = [
    { title: "社活サイト", cat: "業務ツール", url: "#", desc: "日々の活動記録・工数入力" },
    { title: "楽楽精算", cat: "勤怠・経費", url: "#", desc: "経費精算・交通費精算" },
    { title: "コンプライアンス規程", cat: "社内規定", url: "#", desc: "社内ルール・コンプラ指針" },
    { title: "ベネフィットステーション", cat: "福利厚生", url: "#", desc: "各種優待サービス・割引" },
    { title: "会議室予約(Booking)", cat: "業務ツール", url: "#", desc: "会議室および備品予約" },
  ];

  const filteredLinks = activeCategory === "ALL" ? links : links.filter(l => l.cat === activeCategory);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* ヘッダー & フィルター */}
      <div className="bg-white p-8 rounded-2xl border border-[#e2ece9] shadow-sm">
        <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
          <ExternalLink className="text-[#448a76]" /> リンク集
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-black transition-all ${
                activeCategory === cat ? "bg-[#448a76] text-white shadow-lg" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {cat === "ALL" ? <span className="flex items-center gap-1"><Hash size={12}/> ALL</span> : cat}
            </button>
          ))}
        </div>
      </div>

      {/* コンテンツ表示：ALLならリスト、それ以外ならカード */}
      {activeCategory === "ALL" ? (
        /* リスト形式 (ALL表示時) */
        <div className="bg-white rounded-2xl border border-[#e2ece9] overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-[#e2ece9] text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-4">カテゴリ</th>
                <th className="px-6 py-4">リンク名</th>
                <th className="px-6 py-4">概要</th>
                <th className="px-6 py-4 text-right px-10">OPEN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLinks.map((link, i) => (
                <tr key={i} className="hover:bg-emerald-50/30 transition-colors group">
                  <td className="px-6 py-4"><span className="text-[10px] font-black bg-slate-100 px-2 py-1 rounded text-slate-500">{link.cat}</span></td>
                  <td className="px-6 py-4 font-black text-slate-700">{link.title}</td>
                  <td className="px-6 py-4 text-xs text-slate-400">{link.desc}</td>
                  <td className="px-6 py-4 text-right px-10">
                    <a href={link.url} target="_blank" className="text-[#448a76] opacity-0 group-hover:opacity-100 transition-opacity"><ExternalLink size={18}/></a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* カード形式 (カテゴリー選択時) */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLinks.map((link, i) => (
            <a key={i} href={link.url} target="_blank" className="bg-white p-6 rounded-2xl border border-[#e2ece9] hover:border-[#448a76] hover:shadow-xl transition-all group">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-black text-slate-800 text-lg group-hover:text-[#448a76]">{link.title}</h3>
                <ExternalLink size={16} className="text-slate-300" />
              </div>
              <p className="text-sm text-slate-500">{link.desc}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};