import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { MessageSquare, Map, ChevronRight, ChevronDown, Headset, FileBox, Palette, Building2, Target, PenLine, BarChart2, X, Mail, FolderOpen } from "lucide-react";
import { THEMES } from "../data/themes";
import { externalLinks } from "../data/links";
import { COMPANIES } from "../data/companies";
import { columnArchives } from "../data/columns";
import { allDocuments } from "../data/documents";
import { isWithinDays, isBeforeUntil, COLUMN_NEW_DAYS } from "../utils/newBadge";
import { useReadNews } from "../utils/useReadNews";

interface SidebarProps {
  setActiveTab: (tab: string) => void;
  setActiveSectionId: (id: string) => void;
  activeCompanyAbbr?: string;
  setActiveCompanyAbbr?: (abbr: string) => void;
  themeName?: string;
  setThemeName?: (name: string) => void;
  customColor?: string;
  setCustomColor?: (color: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ setActiveTab, setActiveSectionId, activeCompanyAbbr, setActiveCompanyAbbr, themeName, setThemeName, customColor, setCustomColor }) => {
  const [time, setTime] = useState(new Date());
  const [showSupport, setShowSupport] = useState(false);
  const [modalItem, setModalItem] = useState<{ label: string; desc?: string; contact?: string; filePath?: string } | null>(null);
  const [showCompanies, setShowCompanies] = useState(false);
  const companyRefs = React.useRef<Record<string, HTMLDivElement | null>>({});

  // 関連会社が外部から指定されたら accordion を開いてスクロール
  useEffect(() => {
    if (activeCompanyAbbr) {
      setShowCompanies(true);
      setTimeout(() => {
        companyRefs.current[activeCompanyAbbr]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 150);
    }
  }, [activeCompanyAbbr]);



  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 今週のコラム NEW判定
  const latestColumn = columnArchives[0];
  const { isRead: isColumnRead } = useReadNews();
  const isColumnNew = isWithinDays(latestColumn?.date, COLUMN_NEW_DAYS) && !isColumnRead(`col-${latestColumn?.id}`);

  // 部会資料アーカイブ NEW判定
  const bukaDoc = allDocuments.find(d => d.id === 1);
  const isBukaNew = isBeforeUntil(bukaDoc?.newUntil);

  // --- 締め切り関連の計算ロジックをコメントアウト ---
  /*
  const upcomingDeadlines = (allDeadlines || [])
    .map(d => ({ 
      ...d, 
      diffDays: Math.ceil((new Date(d.date.replace(/\./g, '/')).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) 
    }))
    .filter(d => d.diffDays >= 0 && d.diffDays <= 7)
    .sort((a, b) => a.diffDays - b.diffDays)
    .slice(0, 5);
  */

  return (
    <>
    <aside className="w-full space-y-4 animate-in fade-in duration-500 font-sans">
      
      {/* 1. CLOCK */}
      <div className="rounded-[2.5rem] p-7 text-center shadow-xl relative overflow-hidden bg-(--gs-primary)">
        <div className="relative z-10 text-(--gs-on-primary)">
          <div className="text-[20px] font-black uppercase tracking-widest mb-1 opacity-50 text-center">
            {time.toLocaleDateString('ja-JP', { month: '2-digit', day: '2-digit', weekday: 'short' })}
          </div>
          <div className="text-4xl font-black tabular-nums tracking-tighter leading-none text-center">
            {time.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
          </div>
        </div>
      </div>

      {/* --- 2. UPCOMING DEADLINES セクション（コメントアウト済み） --- */}

      {/* 3. MENU (コラム・座席表) */}
      <div className="space-y-2">

        <button 
          onClick={() => window.open(externalLinks.seatingChart, "_blank")} 
          className="w-full flex items-center justify-between p-4 bg-(--gs-card-bg) hover:bg-slate-50 rounded-2xl border border-slate-100 shadow-sm transition-all group text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-(--gs-primary) group-hover:text-(--gs-on-primary) transition-all">
              <Map size={20} />
            </div>
            <span className="text-[15px] font-black text-(--gs-text-primary)">全社座席表</span>
          </div>
          <ChevronRight size={14} className="text-slate-200" />
        </button>
      

        <button onClick={() => setActiveTab("actionplan")} className="w-full flex items-center justify-between p-4 bg-(--gs-card-bg) hover:bg-slate-50 rounded-2xl border border-slate-100 shadow-sm transition-all group text-left">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-(--gs-primary) group-hover:text-(--gs-on-primary) transition-all">
              <Target size={20} />
            </div>
            <span className="text-[15px] font-black text-(--gs-text-primary)">アクションプラン</span>
          </div>
          <ChevronRight size={14} className="text-slate-200" />
        </button>

        <button onClick={() => window.open("http://192.168.8.205/wordpress/hc70-syodan/hc70-shodan.html", "_blank")} className="w-full flex items-center justify-between p-4 bg-(--gs-card-bg) hover:bg-slate-50 rounded-2xl border border-slate-100 shadow-sm transition-all group text-left">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-(--gs-primary) group-hover:text-(--gs-on-primary) transition-all">
              <BarChart2 size={20} />
            </div>
            <span className="text-[15px] font-black text-(--gs-text-primary)">商談案件ダッシュボード</span>
          </div>
          <ChevronRight size={14} className="text-slate-200" />
        </button>

        <button onClick={() => setActiveTab("column")} className="w-full flex items-center justify-between p-4 bg-(--gs-card-bg) hover:bg-slate-50 rounded-2xl border border-slate-100 shadow-sm transition-all group text-left">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-(--gs-primary) group-hover:text-(--gs-on-primary) transition-all">
              <MessageSquare size={20} />
            </div>
            <span className="text-[15px] font-black text-(--gs-text-primary)">コラム</span>
            {isColumnNew && (
              <span className="text-[12px] font-[1000] px-2 py-0.5 rounded italic bg-orange-500 text-white shadow-sm">NEW</span>
            )}
          </div>
          <ChevronRight size={14} className="text-slate-200" />
        </button>
</div>
        
      {/* 4. 部会資料バナー */}
      <button 
        onClick={() => window.open("http://dominoap.nekonet.co.jp/tyo/tyo1304.nsf/", "_blank")}
        className="w-full group relative overflow-hidden rounded-[2rem] p-6 text-left transition-all hover:shadow-2xl hover:-translate-y-1 border-none shadow-lg bg-gradient-to-br from-(--gs-primary-dark) to-(--gs-primary) text-(--gs-on-primary)"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-(--gs-on-primary)/10">
              <FileBox size={14} className="text-(--gs-on-primary)" />
            </div>
            <span className="text-[12px] font-[1000] uppercase tracking-[0.2em] opacity-60">Strategic Docs</span>
            {isBukaNew && (
              <span className="text-[12px] font-[1000] px-2 py-0.5 rounded italic bg-orange-500 text-white shadow-sm">NEW</span>
            )}
          </div>
          <h4 className="text-[20px] font-black leading-tight mb-1">部会資料アーカイブ</h4>
          <p className="text-[12px] font-bold opacity-50 flex items-center gap-1 uppercase tracking-widest">
           
          </p>
        </div>
        <FileBox size={80} className="absolute -right-4 -bottom-4 opacity-10 rotate-12" />
      </button>

      {/* 5. 関連会社紹介 */}
      <div className="space-y-2">
        <button
          onClick={() => setShowCompanies(!showCompanies)}
          className={`w-full p-4 rounded-[2rem] transition-all font-black text-[12px] uppercase tracking-[0.2em] flex items-center justify-between gap-2 shadow-lg ${
            showCompanies ? "bg-white text-(--gs-accent) border-2 border-(--gs-accent)" : "bg-(--gs-primary) text-(--gs-on-primary)"
          }`}
        >
          <div className="flex items-center gap-2 text-left">
            <Building2 size={14} /> <span>関連会社紹介</span>
          </div>
          <ChevronDown size={14} className={`transition-transform ${showCompanies ? "rotate-180" : ""}`} />
        </button>

        {showCompanies && (
          <div className="bg-(--gs-card-bg) border border-slate-100 rounded-3xl p-3 shadow-xl animate-in slide-in-from-top-2 duration-200 space-y-2">
            {COMPANIES.map((c) => {
              const isHighlighted = activeCompanyAbbr === c.abbr;
              return (
                <div
                  key={c.abbr}
                  ref={el => { companyRefs.current[c.abbr] = el; }}
                  className={`px-3 py-3 rounded-2xl border transition-all ${
                    isHighlighted
                      ? "border-(--gs-accent) bg-(--gs-accent)/5 ring-1 ring-(--gs-accent)/30"
                      : "border-transparent bg-slate-50/50 hover:bg-(--gs-accent)/5 hover:border-(--gs-accent)/30"
                  }`}
                >
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className={`text-[13px] font-black ${ isHighlighted ? "text-(--gs-accent)" : "text-(--gs-accent)" }`}>{c.abbr}</span>
                    <span className="text-[12px] font-bold text-(--gs-text-primary)/50 leading-tight">{c.full}</span>
                  </div>
                  <p className="text-[12px] leading-relaxed text-(--gs-text-primary)/60">{c.desc}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. SUPPORT */}
      <div className="space-y-2">
        <button 
          onClick={() => setShowSupport(!showSupport)}
          className={`w-full p-4 rounded-[2rem] transition-all font-black text-[12px] uppercase tracking-[0.2em] flex items-center justify-between gap-2 shadow-lg ${
            showSupport ? "bg-white text-(--gs-accent) border-2 border-(--gs-accent)" : "bg-(--gs-primary) text-(--gs-on-primary)"
          }`}
        >
          <div className="flex items-center gap-2 text-left">
            <Headset size={14} /> <span>困ったときは</span>
          </div>
          <ChevronDown size={14} className={`transition-transform ${showSupport ? "rotate-180" : ""}`} />
        </button>
        
        {showSupport && (
          <div className="bg-(--gs-card-bg) border border-slate-100 rounded-3xl p-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
            {externalLinks.support.map((link, i) => (
              <button
                key={i}
                onClick={() =>
                  (link as any).desc
                    ? setModalItem(link as any)
                    : window.open(link.url, "_blank")
                }
                className="w-full text-left px-4 py-3 text-[12px] font-black text-(--gs-text-primary) hover:bg-slate-50 hover:text-slate-700 rounded-xl transition-all border-b border-slate-50 last:border-none flex items-center justify-between group"
              >
                {link.label}
                <ChevronRight size={12} className="text-slate-200 group-hover:text-slate-400" />
              </button>
            ))}
          </div>
        )}
      </div>
      {/* 6. テーマカラーピッカー */}
      {setThemeName && (
        <div className="rounded-2xl p-4 border bg-(--gs-card-bg) border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <Palette size={12} className="text-slate-400" />
            <span className="text-[12px] font-black text-slate-400 uppercase tracking-widest">テーマカラー</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {THEMES.map(t => (
              <button
                key={t.id}
                onClick={() => setThemeName(t.id)}
                title={t.label}
                className="w-8 h-8 rounded-full transition-all hover:scale-110 active:scale-95"
                style={{
                  backgroundColor: t.color,
                  outline: themeName === t.id ? `3px solid ${t.color}` : '3px solid transparent',
                  outlineOffset: '2px',
                  boxShadow: themeName === t.id ? `0 0 0 1px white, 0 0 0 3px ${t.color}` : 'none',
                }}
              />
            ))}
            {/* カスタムカラーピッカー */}
            {setCustomColor && (
              <label
                title="カスタムカラー"
                className="w-8 h-8 rounded-full cursor-pointer transition-all hover:scale-110 active:scale-95 relative overflow-hidden block"
                style={{
                  background: 'conic-gradient(red, yellow, lime, cyan, blue, magenta, red)',
                  outline: themeName === 'custom' ? `3px solid ${customColor}` : '3px solid transparent',
                  outlineOffset: '2px',
                  boxShadow: themeName === 'custom' ? `0 0 0 1px white, 0 0 0 3px ${customColor}` : 'none',
                }}
              >
                <input
                  type="color"
                  value={customColor || '#064e3b'}
                  onChange={(e) => { setCustomColor(e.target.value); setThemeName?.('custom'); }}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                />
              </label>
            )}
          </div>
        </div>
      )}

      {/* コンテンツ募集バナー */}
      <div className="rounded-[2rem] border-2 border-dashed border-(--gs-accent)/30 p-5 space-y-3 bg-(--gs-accent)/3">
        <div className="flex items-center gap-2 mb-1">
          <PenLine size={14} className="text-(--gs-accent)" />
          <span className="text-[12px] font-black uppercase tracking-[0.2em] text-(--gs-accent)">Contents Wanted</span>
        </div>
        <p className="text-[12px] font-bold text-(--gs-text-primary)/70 leading-relaxed">
          コンテンツ作りにご協力ください！
        </p>
        <div className="space-y-2">
          {externalLinks.contentRecruitment.teamProfile ? (
            <button
              onClick={() => window.open(externalLinks.contentRecruitment.teamProfile, "_blank")}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-(--gs-card-bg) border border-(--gs-accent)/20 hover:bg-(--gs-accent)/5 transition-all group text-left"
            >
              <span className="text-[12px] font-black text-(--gs-text-primary)">📝 チーム紹介文を書く</span>
              <ChevronRight size={12} className="text-slate-300 group-hover:text-(--gs-accent)" />
            </button>
          ) : (
            <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100 opacity-50">
              <span className="text-[12px] font-black text-slate-400">📝 チーム紹介文を書く</span>
              <span className="text-[12px] font-bold text-slate-300 uppercase tracking-widest">準備中</span>
            </div>
          )}
          {externalLinks.contentRecruitment.column ? (
            <button
              onClick={() => window.open(externalLinks.contentRecruitment.column, "_blank")}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-(--gs-card-bg) border border-(--gs-accent)/20 hover:bg-(--gs-accent)/5 transition-all group text-left"
            >
              <span className="text-[12px] font-black text-(--gs-text-primary)">✍️ コラムを寄稿する</span>
              <ChevronRight size={12} className="text-slate-300 group-hover:text-(--gs-accent)" />
            </button>
          ) : (
            <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100 opacity-50">
              <span className="text-[12px] font-black text-slate-400">✍️ コラムを寄稿する</span>
              <span className="text-[12px] font-bold text-slate-300 uppercase tracking-widest">準備中</span>
            </div>
          )}
          {externalLinks.contentRecruitment.location ? (
            <button
              onClick={() => window.open(externalLinks.contentRecruitment.location, "_blank")}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-(--gs-card-bg) border border-(--gs-accent)/20 hover:bg-(--gs-accent)/5 transition-all group text-left"
            >
              <span className="text-[12px] font-black text-(--gs-text-primary)">📍 拠点別情報を投稿する</span>
              <ChevronRight size={12} className="text-slate-300 group-hover:text-(--gs-accent)" />
            </button>
          ) : (
            <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100 opacity-50">
              <span className="text-[12px] font-black text-slate-400">📍 拠点別情報を投稿する</span>
              <span className="text-[12px] font-bold text-slate-300 uppercase tracking-widest">準備中</span>
            </div>
          )}
        </div>
      </div>
    </aside>

    {modalItem && createPortal(
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
        onClick={() => setModalItem(null)}
      >
        <div
          className="bg-white rounded-3xl w-full max-w-xl shadow-2xl animate-in zoom-in-95 fade-in duration-200 overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* ヘッダー */}
          <div className="flex items-center justify-between px-7 pt-7 pb-5">
            <h2 className="text-[20px] font-black text-(--gs-text-primary)">{modalItem.label}</h2>
            <button
              onClick={() => setModalItem(null)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-all flex-shrink-0"
            >
              <X size={16} className="text-slate-500" />
            </button>
          </div>

          <div className="px-7 pb-7 space-y-5">
            {/* 文言 */}
            {modalItem.desc && (
              <div className="p-5 bg-slate-50 rounded-2xl">
                <p className="text-[15px] text-(--gs-text-primary) leading-relaxed whitespace-pre-line">{modalItem.desc}</p>
              </div>
            )}

            {/* ファイルサーバーパス */}
            {modalItem.filePath && (
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <FolderOpen size={15} className="text-(--gs-accent)" />
                  <span className="text-[12px] font-black uppercase tracking-widest text-(--gs-accent)">申請者向けファイルサーバー</span>
                </div>
                <p className="font-mono text-[13px] text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 whitespace-nowrap overflow-x-auto leading-relaxed select-all">{modalItem.filePath}</p>
              </div>
            )}

            {/* 提出・お問い合わせ先 */}
            {modalItem.contact && (
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <Mail size={15} className="text-(--gs-accent)" />
                  <span className="text-[12px] font-black uppercase tracking-widest text-(--gs-accent)">提出・お問い合わせ先</span>
                </div>
                <p className="text-[15px] font-bold text-(--gs-text-primary) px-1">{modalItem.contact}</p>
              </div>
            )}
          </div>
        </div>
      </div>,
      document.body
    )}
  </>);
};