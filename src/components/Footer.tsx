import React from "react";
import { User, Phone, Mail, MapPin, Edit3, ChevronRight } from "lucide-react";

interface FooterProps {
  isRaining?: boolean;
  isMidnight?: boolean;
}

const RainCat = () => (
  <div className="absolute -top-[65px] left-12 z-50 pointer-events-none select-none">
    {/* 💡 カスタムアニメーションの定義 */}
    <style>
      {`
        @keyframes shake {
          0%, 90%, 100% { transform: rotate(0deg); }
          92% { transform: rotate(-5deg); }
          94% { transform: rotate(5deg); }
          96% { transform: rotate(-5deg); }
          98% { transform: rotate(5deg); }
        }
        .animate-shake {
          animation: shake 5s infinite;
        }
      `}
    </style>

    <svg width="75" height="75" viewBox="0 0 100 100" className="animate-bounce duration-[3000ms]">
      {/* 💡 揺れるネコ本体部分 */}
      <g className="animate-shake">
        {/* 傘：パステルイエロー */}
        <path d="M15 45 Q50 5 85 45" stroke="#f1c40f" strokeWidth="2.5" fill="#f1c40f" fillOpacity="0.4" />
        <line x1="50" y1="45" x2="50" y2="72" stroke="#4b5563" strokeWidth="2" />
        
        {/* しっぽ */}
        <path d="M68 85 Q80 85 78 72" stroke="#ffffff" strokeWidth="7" fill="none" strokeLinecap="round" />

        {/* 胴体 */}
        <path d="M32 92 Q50 65 68 92 Q50 96 32 92 Z" fill="#ffffff" />
        
        {/* 頭 */}
        <ellipse cx="50" cy="74" rx="18" ry="16" fill="#ffffff" />
        
        {/* 耳 */}
        <path d="M35 65 Q32 50 42 58 Z" fill="#ffffff" /> 
        <path d="M36 63 Q34 54 40 60 Z" fill="#ff7675" fillOpacity="0.3" />
        
        <path d="M65 65 Q68 50 58 58 Z" fill="#ffffff" /> 
        <path d="M64 63 Q66 54 60 60 Z" fill="#ff7675" fillOpacity="0.3" />
        
        {/* 目 */}
        <circle cx="40" cy="74" r="2.5" fill="#2f3542" />
        <circle cx="60" cy="74" r="2.5" fill="#2f3542" />
        
        {/* 鼻 */}
        <circle cx="50" cy="77" r="2" fill="#ff7675" fillOpacity="0.8" />
        
        {/* ほっぺ */}
        <circle cx="36" cy="79" r="4" fill="#ff7675" fillOpacity="0.3" />
        <circle cx="64" cy="79" r="4" fill="#ff7675" fillOpacity="0.3" />

        {/* おひげ */}
        <line x1="28" y1="76" x2="36" y2="78" stroke="#2f3542" strokeWidth="0.5" opacity="0.2" />
        <line x1="28" y1="80" x2="36" y2="80" stroke="#2f3542" strokeWidth="0.5" opacity="0.2" />
        <line x1="72" y1="76" x2="64" y2="78" stroke="#2f3542" strokeWidth="0.5" opacity="0.2" />
        <line x1="72" y1="80" x2="64" y2="80" stroke="#2f3542" strokeWidth="0.5" opacity="0.2" />
      </g>
    </svg>
  </div>
);

export const Footer: React.FC<FooterProps> = ({ isRaining, isMidnight }) => {
  return (
    <footer className={`relative w-full mt-20 text-white transition-all duration-[3000ms] ease-in-out ${
      isMidnight ? 'bg-[#0a0f1a]' : 'bg-[#064e3b]'
    }`}>
      
      {/* 💡 雨宿りネコちゃん（身震いエフェクト付き） */}
      {isRaining && <RainCat />}

      <div className="container mx-auto px-10 py-12 flex flex-col md:flex-row justify-between items-center relative z-10 gap-10">
        
        {/* Support Desk */}
        <div className="flex flex-col gap-5 text-left w-full md:w-auto">
          <div className="flex items-center gap-3">
            <div className={`w-1.5 h-5 rounded-full transition-colors duration-[3000ms] ${isRaining ? 'bg-yellow-400' : 'bg-emerald-400'}`} />
            <h3 className={`text-[11px] font-black uppercase tracking-[0.3em] transition-colors duration-[3000ms] ${isRaining ? 'text-yellow-400' : 'text-emerald-400'}`}>
              Support Desk {isRaining && " - Meow Mode"}
            </h3>
          </div>
          
          <div className="space-y-3 px-1 opacity-90">
            <div className="flex items-center gap-4">
              <User size={15} className={isRaining ? 'text-yellow-400' : 'text-emerald-400'} />
              <span className="text-xs font-bold tabular-nums tracking-wide font-sans">54期小変Cチーム(正治、原、藤田、藤野)</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone size={15} className={isRaining ? 'text-yellow-400' : 'text-emerald-400'} />
              <span className="text-xs font-bold tabular-nums tracking-wide font-sans">080-6539-3904</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail size={15} className={isRaining ? 'text-yellow-400' : 'text-emerald-400'} />
              <span className="text-xs font-bold tracking-tight font-sans">yshoji@nekonet.co.jp</span>
            </div>
          </div>
        </div>

        {/* 修正依頼ボタン */}
        <div className="w-full md:w-auto">
          <button className={`group w-full md:w-80 flex items-center justify-between p-6 border rounded-3xl transition-all active:scale-95 shadow-xl ${
            isRaining 
              ? 'bg-white/5 border-white/10 hover:bg-yellow-500/10' 
              : 'bg-white/10 border-white/20 hover:bg-emerald-500/20'
          }`}>
            <div className="flex items-center gap-4 text-white text-left">
              <div className={`p-3 rounded-2xl transition-all ${
                isRaining 
                  ? 'bg-yellow-400/20 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-[#0a0f1a]' 
                  : 'bg-emerald-400/20 text-emerald-400 group-hover:bg-emerald-400 group-hover:text-[#064e3b]'
              }`}>
                <Edit3 size={22} />
              </div>
              <div>
                <div className="text-[15px] font-black leading-none mb-1.5 tracking-tight font-sans">修正・更新を依頼する</div>
                <div className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-60 font-sans ${
                  isRaining ? 'text-yellow-400' : 'text-emerald-400'
                }`}>Update Request</div>
              </div>
            </div>
            <ChevronRight size={20} className="transition-transform group-hover:translate-x-1.5" />
          </button>
        </div>
      </div>

      <div className="w-full bg-black/20 py-5 border-t border-white/5 text-center relative group/footer cursor-default overflow-hidden">
        <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.5em] group-hover/footer:text-white/30 transition-all duration-700 font-sans">
          &copy; 2026 Group Systems Department. All Rights Reserved.
        </p>
        <div className="absolute right-12 bottom-[-25px] group-hover/footer:bottom-4 transition-all duration-[1500ms] ease-out opacity-0 group-hover/footer:opacity-40 text-2xl pointer-events-none select-none">
          🪼
        </div>
      </div>
    </footer>
  );
};