import React from "react";
// 名前を合わせる
import { allDeadlines } from "../data/deadlines";
import { linkCollection } from "../data/links";
import { allGuides } from "../data/guides";
import { Search, Clock, Calendar, ChevronRight } from "lucide-react";

interface SearchResultsProps {
  query: string;
  setActiveTab: (tab: string) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ query, setActiveTab }) => {
  const q = (query || "").toLowerCase();

  // allDeadlines から検索
  const foundDeadlines = (allDeadlines || []).filter(item => 
    item.title.toLowerCase().includes(q)
  );
  
  // (以下、リンク集やガイドの検索ロジックは同様)
  const totalCount = foundDeadlines.length + (linkCollection?.length || 0) + (allGuides?.length || 0);

  return (
    <div className="space-y-6">
      {/* ヘッダー部分 */}
      <div className="bg-[#f4f7f0] p-6 rounded-2xl border border-[#cbd5c0] flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#3e4a36]">「{query}」の検索結果</h2>
        <span className="bg-[#6b7a5f] text-white px-4 py-1 rounded-full text-xs font-bold">{totalCount}件</span>
      </div>

      {/* 締め切り結果の表示エリア */}
      {foundDeadlines.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-[10px] font-black text-[#6b7a5f] uppercase tracking-widest ml-1">締め切り項目</h3>
          {foundDeadlines.map(d => (
            <div key={d.id} className="bg-white p-4 rounded-2xl border border-[#cbd5c0] flex justify-between items-center hover:bg-[#f4f7f0] transition-colors">
              <div className="flex items-center gap-4">
                <div className="bg-[#f4f7f0] p-2 rounded-lg text-[#6b7a5f]"><Clock size={18}/></div>
                <div>
                  <div className="font-bold text-[#3e4a36] text-sm">{d.title}</div>
                  <div className="text-[10px] text-[#6b7a5f]">期限: {d.date} ({d.dept})</div>
                </div>
              </div>
              <button onClick={() => setActiveTab("deadlines")} className="text-[#6b7a5f] p-2 hover:bg-[#ced4bc] rounded-full transition-colors">
                <ChevronRight size={20}/>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};