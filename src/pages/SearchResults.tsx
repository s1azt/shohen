import React from "react";
// データファイルのインポート
import { allDeadlines } from "../data/deadlines";
import { linkCollection } from "../data/links"; 
import { columnArchives } from "../data/columns";
import { allNews } from "../data/news"; // お知らせデータを追加
import { Search, Clock, ExternalLink, Newspaper, ChevronRight, AlertCircle, Bell } from "lucide-react";

interface SearchResultsProps {
  query: string;
  setActiveTab: (tab: string) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ query, setActiveTab }) => {
  const q = (query || "").toLowerCase();

  // 1. 締め切りデータから検索
  const foundDeadlines = (allDeadlines || []).filter(item => 
    item.title.toLowerCase().includes(q) || 
    item.dept.toLowerCase().includes(q)
  );

  // 2. お知らせ（News）から検索
  const foundNews = (allNews || []).filter(item => 
    item.title.toLowerCase().includes(q) || 
    item.category.toLowerCase().includes(q)
  );

  // 3. リンク集から検索 (プロパティ名を desc に修正)
  const foundLinks = (linkCollection || []).filter(item => 
    item.title.toLowerCase().includes(q) || 
    (item.desc && item.desc.toLowerCase().includes(q))
  );

  // 4. コラムから検索
  const foundColumns = (columnArchives || []).filter(item => 
    item.title.toLowerCase().includes(q) || 
    item.content.toLowerCase().includes(q)
  );

  const totalCount = foundDeadlines.length + foundNews.length + foundLinks.length + foundColumns.length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 検索ヘッダー */}
      <header className="bg-white p-8 rounded-[2rem] border border-[#cbd5c0] shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-[#064e3b] p-3 rounded-2xl text-white shadow-lg shadow-[#064e3b]/20">
            <Search size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#1a2e25]">「{query}」の検索結果</h2>
            <p className="text-sm text-[#6b7a5f] font-bold">全 4 カテゴリーから一致する情報を抽出しました</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-4xl font-black text-[#064e3b] tracking-tighter">{totalCount}</span>
          <span className="text-xs font-black text-[#6b7a5f] ml-1 uppercase">Hits</span>
        </div>
      </header>

      {totalCount === 0 ? (
        <div className="py-20 text-center bg-white/50 rounded-[2.5rem] border-2 border-dashed border-[#cbd5c0]">
          <AlertCircle size={48} className="mx-auto text-[#cbd5c0] mb-4" />
          <p className="text-[#6b7a5f] font-bold text-lg">一致する情報が見つかりませんでした</p>
        </div>
      ) : (
        <div className="space-y-12">
          {/* --- お知らせセクション --- */}
          {foundNews.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-[#064e3b] uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <Bell size={14} /> Latest News ({foundNews.length})
              </h3>
              <div className="grid gap-3">
                {foundNews.map((item, idx) => (
                  <div key={`news-${idx}`} onClick={() => setActiveTab("news")} className="bg-white p-5 rounded-2xl border border-[#cbd5c0] cursor-pointer flex justify-between items-center group hover:bg-[#f4f7f0] transition-all">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#f4f7f0] p-2 rounded-xl text-[#064e3b]"><Bell size={20} /></div>
                      <div>
                        <div className="font-bold text-[#1a2e25]">{item.title}</div>
                        <div className="text-[10px] text-[#6b7a5f] font-bold uppercase tracking-wider">{item.date} / {item.category}</div>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-[#cbd5c0] group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* --- 締め切りセクション --- */}
          {foundDeadlines.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-[#064e3b] uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <Clock size={14} /> Deadlines ({foundDeadlines.length})
              </h3>
              <div className="grid gap-3">
                {foundDeadlines.map((item, idx) => (
                  <div key={`dl-${idx}`} className="bg-white p-5 rounded-2xl border border-[#cbd5c0] flex justify-between items-center group hover:border-[#6b7a5f] transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-1.5 h-10 rounded-full bg-orange-400"></div>
                      <div>
                        <div className="font-bold text-[#1a2e25] text-lg">{item.title}</div>
                        <div className="text-xs text-[#6b7a5f] font-bold uppercase tracking-widest">DUE: {item.date} / {item.dept}</div>
                      </div>
                    </div>
                    <button onClick={() => setActiveTab("deadlines")} className="bg-[#f4f7f0] p-2 rounded-full text-[#6b7a5f] hover:bg-[#064e3b] hover:text-white transition-all shadow-sm">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* --- リンク集セクション --- */}
          {foundLinks.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-[#064e3b] uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <ExternalLink size={14} /> Quick Links ({foundLinks.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {foundLinks.map((link, idx) => (
                  <a key={`link-${idx}`} href={link.url} target="_blank" rel="noreferrer" className="bg-white p-6 rounded-2xl border border-[#cbd5c0] flex items-center justify-between group hover:shadow-xl transition-all">
                    <div className="min-w-0">
                      <div className="font-bold text-[#1a2e25] text-lg truncate group-hover:text-[#064e3b]">{link.title}</div>
                      <div className="text-[11px] text-[#6b7a5f] font-medium truncate opacity-60">{link.desc}</div>
                    </div>
                    <ExternalLink size={20} className="text-[#cbd5c0] group-hover:text-[#064e3b]" />
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* --- コラムセクション --- */}
          {foundColumns.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-[#064e3b] uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                <Newspaper size={14} /> Columns ({foundColumns.length})
              </h3>
              <div className="grid gap-3">
                {foundColumns.map((col, idx) => (
                  <div key={`col-${idx}`} onClick={() => setActiveTab("column")} className="bg-white p-5 rounded-2xl border border-[#cbd5c0] cursor-pointer flex justify-between items-center group hover:bg-[#f4f7f0] transition-all">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#f4f7f0] p-3 rounded-xl text-[#064e3b]"><Newspaper size={20} /></div>
                      <div>
                        <div className="font-bold text-[#1a2e25] text-lg">{col.title}</div>
                        <div className="text-xs text-[#6b7a5f] font-bold uppercase">{col.date} 更新</div>
                      </div>
                    </div>
                    <ChevronRight size={22} className="text-[#cbd5c0] group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};