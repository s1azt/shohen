import React from "react";
import { allDeadlines } from "../data/deadlines";
import { allNews } from "../data/news";
import { linkCollection } from "../data/links";
import { allGuides } from "../data/guides";
import { Search, ExternalLink, ChevronRight, FileText } from "lucide-react";

interface SearchResultsProps {
  query: string;
  setActiveTab: (tab: string) => void;
  openLocation: (name: string) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ query, setActiveTab, openLocation }) => {
  if (!query) return <div className="p-8 text-center text-slate-400 font-bold">検索キーワードを入力してください</div>;

  const q = query.toLowerCase();

  // 1. リンク集からの検索
  const foundLinks = linkCollection.filter(l => 
    l.title.toLowerCase().includes(q) || l.desc.toLowerCase().includes(q)
  );

  // 2. お知らせからの検索
  const foundNews = allNews.filter(n => 
    n.title.toLowerCase().includes(q)
  );

  // 3. 締め切りからの検索
  const foundDeadlines = allDeadlines.filter(d => 
    d.title.toLowerCase().includes(q) || d.dept.toLowerCase().includes(q)
  );

  // 4. 新人ガイドからの検索
  const foundGuides = allGuides.filter(g => 
    g.title.toLowerCase().includes(q) || g.steps.some(s => s.toLowerCase().includes(q))
  );

  const totalCount = foundLinks.length + foundNews.length + foundDeadlines.length + foundGuides.length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
          <Search className="text-[#065f46]" />
          「{query}」の検索結果
          <span className="text-sm font-bold text-slate-400 ml-2">{totalCount} 件見つかりました</span>
        </h2>
      </header>

      {totalCount === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-slate-200">
          <p className="text-slate-400 font-bold text-lg">一致する情報は見つかりませんでした。</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* リンク集の結果 */}
          {foundLinks.length > 0 && (
            <section className="space-y-3">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">リンク集 ({foundLinks.length})</h3>
              <div className="grid gap-2">
                {foundLinks.map(l => (
                  <a key={l.id} href={l.url} target="_blank" className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between items-center hover:border-[#065f46] transition-all group">
                    <div>
                      <div className="font-bold text-slate-800 group-hover:text-[#065f46]">{l.title}</div>
                      <div className="text-[11px] text-slate-400">{l.desc}</div>
                    </div>
                    <ExternalLink size={14} className="text-slate-300 group-hover:text-[#065f46]" />
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* 新人ガイドの結果 */}
          {foundGuides.length > 0 && (
            <section className="space-y-3">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">新人ガイド ({foundGuides.length})</h3>
              <div className="grid gap-2">
                {foundGuides.map(g => (
                  <button key={g.id} onClick={() => setActiveTab("guide")} className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between items-center hover:border-[#065f46] transition-all group w-full text-left">
                    <div>
                      <div className="font-bold text-slate-800 group-hover:text-[#065f46]">{g.title}</div>
                      <div className="text-[11px] text-slate-400">新人ガイドのステップを確認</div>
                    </div>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-[#065f46]" />
                  </button>
                ))}
              </div>
            </section>
          )}
          
          {/* 同様にお知らせ、締め切りも表示... */}
        </div>
      )}
    </div>
  );
};