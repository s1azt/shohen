import React from "react";
import { Home, ArrowLeft } from "lucide-react";

interface NotFoundProps {
  setActiveTab: (tab: string) => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ setActiveTab }) => {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center text-center px-4 animate-in fade-in zoom-in duration-1000">
      
      {/* 💡 演出：浮遊する迷子クラゲ */}
      <div className="relative mb-12">
        {/* 背後のぼんやりとした深海の光 */}
        <div className="absolute inset-0 bg-emerald-500/20 blur-[80px] rounded-full -z-10 animate-pulse duration-[4000ms]" />
        
        {/* クラゲ本体：ゆったりとした上下運動 */}
        <div className="text-[120px] leading-none select-none grayscale opacity-40 animate-bounce duration-[5000ms] transition-all">
          🪼
        </div>
        
        {/* 泡のパーティクル（さりげない装飾） */}
        <div className="absolute -top-4 -right-4 w-3 h-3 bg-white/10 rounded-full animate-ping duration-[3000ms]" />
        <div className="absolute top-10 -left-10 w-2 h-2 bg-white/10 rounded-full animate-ping duration-[4000ms]" />
      </div>

      {/* テキストエリア */}
      <div className="max-w-md space-y-6 relative z-10">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-[#064e3b] tracking-[0.2em] italic uppercase">
            404 <span className="text-slate-300 font-light">|</span> Lost
          </h2>
          <div className="w-12 h-1 bg-emerald-500 mx-auto rounded-full" />
        </div>

        <div className="space-y-1">
          <p className="text-lg font-black text-[#1a2e25] tracking-tight">
            ここは光の届かない場所のようです。
          </p>
          <p className="text-xs font-medium text-slate-400 italic leading-relaxed">
            お探しのページは、深海へ消えてしまったか、<br />
            最初から存在しなかったのかもしれません。
          </p>
        </div>

        {/* アクションボタン */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <button
            onClick={() => setActiveTab("home")}
            className="group flex items-center gap-3 px-10 py-4 bg-[#064e3b] text-white rounded-2xl font-black text-[11px] tracking-[0.2em] hover:bg-[#065f46] transition-all shadow-2xl shadow-emerald-900/20 active:scale-95"
          >
            <Home size={16} />
            BACK TO SURFACE
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-4 text-slate-400 hover:text-[#064e3b] font-black text-[10px] tracking-widest transition-colors"
          >
            <ArrowLeft size={14} />
            PREVIOUS PAGE
          </button>
        </div>
      </div>

      {/* 背景の薄いグリッド（ツール感の維持） */}
      <div className="fixed inset-0 bg-[radial-gradient(#064e3b_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03] pointer-events-none -z-20" />
    </div>
  );
};