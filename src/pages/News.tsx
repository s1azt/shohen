import React from "react";
import { allNews } from "../data/news";
import { ChevronRight } from "lucide-react";

export const News: React.FC = () => {
  return (
    <div className="bg-white rounded-[2.5rem] p-10 border border-[#e2ece9] shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-black text-slate-800 mb-8 border-l-8 border-[#065f46] pl-6">お知らせ一覧</h2>
      <div className="space-y-4">
        {allNews.map((item) => (
          <div key={item.id} className="flex items-center gap-8 p-6 rounded-2xl hover:bg-[#f0fdfa] transition-all border border-transparent hover:border-emerald-100 group cursor-pointer">
            <span className="text-lg font-bold text-slate-400 font-mono">{item.date}</span>
            <span className={`text-xs font-black px-4 py-1.5 rounded-full border ${item.color.replace('text', 'border')} ${item.color} tracking-widest`}>{item.category}</span>
            <p className="font-bold text-slate-700 text-xl flex-grow">{item.title}</p>
            <ChevronRight className="text-slate-300 group-hover:text-[#065f46]" size={24} />
          </div>
        ))}
      </div>
    </div>
  );
};