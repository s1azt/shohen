import React from "react";
import { Phone, Mail, MapPin, Edit3, ChevronRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-20 bg-[#064e3b] text-white overflow-hidden border-t border-white/10">
      <div className="container mx-auto px-10 py-10 flex flex-col md:flex-row justify-between items-center gap-10">
        
        {/* 左側：お問い合わせ先（縦並び） */}
        <div className="flex flex-col gap-5 text-left w-full md:w-auto">
          <div className="flex items-center gap-3">
            <div className="w-1 h-4 bg-emerald-400 rounded-full" />
            <h3 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Support Desk</h3>
          </div>
          
          <div className="space-y-3 px-1">
            <div className="flex items-center gap-4 text-emerald-50/80 group">
              <Phone size={14} className="text-emerald-500" />
              <span className="text-xs font-bold tabular-nums">03-xxxx-xxxx <span className="text-emerald-500/40 ml-2 font-black">(内線: 8xxx)</span></span>
            </div>
            <div className="flex items-center gap-4 text-emerald-50/80">
              <Mail size={14} className="text-emerald-500" />
              <span className="text-xs font-bold tracking-tight">gs-portal-support@example.com</span>
            </div>
            <div className="flex items-center gap-3 text-emerald-50/80">
              <MapPin size={14} className="text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">グループシステム部 企画管理チーム</span>
            </div>
          </div>
        </div>

        {/* 右側：修正依頼ボタン */}
       {/* 右側：修正依頼ボタン */}
        <div className="w-full md:w-auto">
          {/* 修正ポイント：背景を白10%に上げ、境界線を白20%に強化。影を追加 */}
          <button className="group w-full md:w-80 flex items-center justify-between p-5 bg-white/10 hover:bg-emerald-500/20 border border-white/20 rounded-2xl transition-all active:scale-95 shadow-lg">
            <div className="flex items-center gap-4 text-white text-left">
              {/* アイコンの背景色を少し明るく */}
              <div className="p-3 bg-emerald-400/20 text-emerald-400 rounded-xl group-hover:bg-emerald-400 group-hover:text-[#064e3b] transition-all">
                <Edit3 size={20} />
              </div>
              <div>
                <div className="text-[14px] font-[1000] leading-none mb-1.5 tracking-tight">修正・更新を依頼する</div>
                {/* 修正ポイント：透明度を 40% -> 80% に引き上げ、視認性を確保 */}
                <div className="text-[10px] font-black text-emerald-400/80 uppercase tracking-[0.2em]">Update Request</div>
              </div>
            </div>
            <ChevronRight size={18} className="text-emerald-500 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 最下部：コピーライト ＋ 隠れクラゲ */}
      <div className="w-full bg-black/20 py-4 border-t border-white/5 text-center relative overflow-hidden group/footer">
        <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.5em]">
          &copy; 2026 Group Systems Department. All Rights Reserved.
        </p>
        
        {/* 💡 隠れクラゲ：ホバーでふわっと浮上 */}
        <div className="absolute right-10 bottom-[-20px] group-hover/footer:bottom-3 transition-all duration-1000 ease-out opacity-0 group-hover/footer:opacity-30 text-xl grayscale pointer-events-none select-none">
          🪼
        </div>
      </div>
    </footer>
  );
};