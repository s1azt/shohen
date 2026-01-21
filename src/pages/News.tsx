import React from "react";

export const News: React.FC = () => {
  // 実際にはここを増やしていくだけで、お知らせ一覧が更新されます
  const allNews = [
    { 
      id: 1, 
      date: "2026.01.21", 
      title: "経営戦略共有会議のアジェンダを公開しました", 
      cat: "会議",
      content: "2月開催の共有会議に関する資料を文書ページにアップロードしました。各自事前に確認をお願いします。"
    },
    { 
      id: 2, 
      date: "2026.01.15", 
      title: "システム臨時メンテナンスのお知らせ(1/24)", 
      cat: "重要",
      content: "1月24日(土) 10:00〜15:00の間、ネットワーク工事のため一部システムが停止します。"
    },
    {
      id: 3,
      date: "2026.01.10",
      title: "新任マネージャー挨拶を掲載しました",
      cat: "人事",
      content: "1月付で着任されたマネージャー陣のコメントをWikiに掲載しました。"
    }
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
      <div className="bg-white p-8 rounded-2xl border border-[#e2ece9] shadow-sm">
        <h2 className="text-2xl font-black text-slate-800 mb-2">お知らせ一覧</h2>
        <p className="text-sm text-slate-500 font-medium">部内の最新情報およびアーカイブを確認できます。</p>
      </div>

      <div className="space-y-4">
        {allNews.map((news) => (
          <div key={news.id} className="bg-white p-6 rounded-xl border border-[#e2ece9] hover:border-[#448a76] transition-all group shadow-sm">
            <div className="flex items-center gap-4 mb-3">
              <span className="text-[11px] font-mono font-bold text-slate-400">{news.date}</span>
              <span className="text-[10px] px-2 py-1 bg-emerald-50 text-[#448a76] rounded font-black uppercase">
                {news.cat}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-[#448a76] transition-colors">
              {news.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {news.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};