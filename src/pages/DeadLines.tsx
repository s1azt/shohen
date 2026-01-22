import React from "react";
import { allDeadlines } from "../data/deadlines";
import { 
  ReceiptText, 
  CircleDollarSign, 
  Activity, 
  Clipboard, 
  Clock, 
  ChevronRight, 
  Calendar 
} from "lucide-react";

export const Deadlines: React.FC = () => {
  // アイコン名からコンポーネントを呼び出すためのマップ
  const IconMap: { [key: string]: React.ReactNode } = {
    ReceiptText: <ReceiptText size={32} />,
    CircleDollarSign: <CircleDollarSign size={32} />,
    Activity: <Activity size={32} />,
    Clipboard: <Clipboard size={32} />
  };

  // 今日から数えて何日後かを計算する関数
  const getDaysRemaining = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(dateString);
    targetDate.setHours(0, 0, 0, 0);
    const diffTime = targetDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // すべての締め切りを日付順にソート
  const sortedDeadlines = [...allDeadlines].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-center justify-between border-b-4 border-[#065f46] pb-4">
        <h2 className="text-3xl font-black text-slate-800 flex items-center gap-4">
          <Clock className="text-[#065f46]" size={36} />
          締め切り一覧
        </h2>
        <span className="text-slate-400 font-bold">全 {sortedDeadlines.length} 件</span>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedDeadlines.map((item) => {
          const daysLeft = getDaysRemaining(item.date);
          const isOverdue = daysLeft < 0;

          return (
            <div 
              key={item.id} 
              className={`bg-white rounded-[2rem] border-2 border-slate-100 overflow-hidden shadow-sm transition-all hover:shadow-xl hover:border-[#065f46] group`}
            >
              <div className={`${item.bg} p-8 border-b border-slate-50 flex items-start justify-between`}>
                <div className="flex items-center gap-5">
                  <div className={`${item.text} p-4 bg-white rounded-2xl shadow-sm`}>
                    {IconMap[item.iconName] || <Clipboard size={32} />}
                  </div>
                  <div>
                    <h3 className={`text-2xl font-black ${item.text} leading-tight mb-1`}>
                      {item.title}
                    </h3>
                    <p className="text-sm font-bold opacity-60 uppercase tracking-widest">
                      {item.dept}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-slate-500 font-bold">
                    <Calendar size={20} />
                    <span>提出期限: {item.date.replace(/-/g, '.')}</span>
                  </div>
                  
                  {/* ステータスバッジ */}
                  <div className={`px-4 py-2 rounded-full font-black text-sm shadow-sm ${
                    isOverdue ? "bg-slate-100 text-slate-400" : 
                    daysLeft <= 7 ? "bg-red-500 text-white animate-pulse" : 
                    "bg-[#065f46] text-white"
                  }`}>
                    {isOverdue ? "終了" : `あと ${daysLeft} 日`}
                  </div>
                </div>

                <button className="w-full py-4 bg-slate-50 rounded-xl text-slate-600 font-black flex items-center justify-center gap-2 group-hover:bg-[#065f46] group-hover:text-white transition-all">
                  詳細・申請フォームを開く
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};