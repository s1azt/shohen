import React from "react";
import { Clock, Clipboard, Server, MessageSquare, ChevronRight, Info } from "lucide-react";
import { allGuides } from "../data/guides";

type GuideItem = typeof allGuides[number];

export const Guide = () => {
  const IconMap: { [key: string]: React.ReactNode } = {
    Clock: <Clock size={24} />,
    Clipboard: <Clipboard size={24} />,
    Server: <Server size={24} />,
    MessageSquare: <MessageSquare size={24} />,
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
          <span className="bg-[#065f46] text-white p-1.5 rounded-lg">
            <Info size={20} />
          </span>
          新入社員ガイド
        </h2>
        <p className="text-slate-500 text-sm mt-3 leading-relaxed">
          新入社員の皆さん、ようこそ！部内で使用する主要なシステムの基本的な使い方を紹介します。
          配属後3ヶ月間はメンターがサポートしますので、遠慮なく相談してください。
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(allGuides as GuideItem[]).map((guide) => (
          <div key={guide.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className={`${guide.color} px-5 py-4 flex items-center gap-4 border-b border-slate-100`}>
              <div className="bg-white p-2 rounded-xl shadow-sm text-slate-700">
                {IconMap[guide.iconName] || <Info size={24} />}
              </div>
              <h3 className="font-black text-slate-800">{guide.title}</h3>
            </div>
            <div className="p-5 flex-grow">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{guide.description}</p>
              <div className="bg-slate-50 p-4 rounded-xl space-y-3">
                {guide.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-3 text-sm font-medium text-slate-700">
                    <span className="text-[#065f46] font-black">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};