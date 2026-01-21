// src/pages/Deadlines.tsx
import React from "react";
import { AlertCircle, Clock, CheckCircle2 } from "lucide-react";

export const Deadlines: React.FC = () => {
  // 運用時はこのリストを書き換えるだけでOKです
  const deadlineList = [
    {
      id: 1,
      title: "年末調整書類提出",
      date: "2026.12.10",
      dept: "総務部",
      priority: "high", // high, medium, low
      status: "未完了",
      desc: "原本の提出が必要です。各階の専用ポストへ投函してください。"
    },
    {
      id: 2,
      title: "e-Learningコンプライアンス研修",
      date: "2026.01.31",
      dept: "人事部",
      priority: "medium",
      status: "完了",
      desc: "全社員必須のオンライン研修です。LMSから受講してください。"
    },
    {
      id: 3,
      title: "第3四半期 予算申請",
      date: "2026.02.15",
      dept: "経理部",
      priority: "low",
      status: "未完了",
      desc: "次年度プロジェクトに関わる予算は別途承認フローが必要です。"
    }
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
      {/* ページヘッダー */}
      <div className="bg-white p-8 rounded-2xl border border-[#e2ece9] shadow-sm">
        <h2 className="text-2xl font-black text-slate-800 mb-2 flex items-center gap-3">
          <AlertCircle className="text-red-500" /> 締め切り・提出物
        </h2>
        <p className="text-sm text-slate-500 font-medium">現在対応が必要なタスクの一覧です。</p>
      </div>

      {/* リスト表示 */}
      <div className="grid grid-cols-1 gap-4">
        {deadlineList.map((item) => (
          <div 
            key={item.id} 
            className={`bg-white p-6 rounded-2xl border-l-[10px] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
              item.priority === 'high' ? 'border-red-500' : 
              item.priority === 'medium' ? 'border-amber-400' : 'border-emerald-400'
            }`}
          >
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-1">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${
                  item.status === '完了' ? 'bg-slate-100 text-slate-400' : 'bg-red-50 text-red-500'
                }`}>
                  {item.status}
                </span>
                <span className="text-xs font-bold text-slate-400">{item.dept}</span>
              </div>
              <h3 className="text-lg font-black text-slate-800">{item.title}</h3>
              <p className="text-sm text-slate-500 mt-1 font-medium">{item.desc}</p>
            </div>

            <div className="flex flex-col items-end min-w-[120px]">
              <div className="flex items-center gap-2 text-slate-400 font-black text-xs uppercase tracking-tighter mb-1">
                <Clock size={14} /> Deadline
              </div>
              <div className={`text-xl font-black ${item.priority === 'high' ? 'text-red-600' : 'text-slate-700'}`}>
                {item.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};