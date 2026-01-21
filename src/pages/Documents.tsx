// src/pages/Documents.tsx
import React from "react";

// 名前を「Documents」で統一します
export const Documents: React.FC = () => {
  const docs = [
    { title: "部会資料", desc: "定例部会および共有会議の資料アーカイブです。", icon: "📁" },
    { title: "2025年度社内公募", desc: "キャリアチャレンジ制度の詳細と応募要領です。", icon: "📄" },
    { title: "GS運用マニュアル", desc: "システムの運用手順および基準ドキュメントです。", icon: "📚" }
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
      <div className="bg-white p-8 rounded-2xl border border-[#e2ece9] shadow-sm">
        <h2 className="text-2xl font-black text-slate-800 mb-2">共有文書・マニュアル</h2>
        <p className="text-sm text-slate-500 font-medium">業務に必要な最新のドキュメントにアクセスできます。</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {docs.map((doc, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-[#e2ece9] hover:border-[#448a76] transition-all group shadow-sm cursor-pointer">
            <div className="text-4xl mb-4">{doc.icon}</div>
            <h3 className="text-xl font-black text-slate-800 group-hover:text-[#448a76]">{doc.title}</h3>
            <p className="text-sm text-gray-500 mt-2 font-medium leading-relaxed">{doc.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};