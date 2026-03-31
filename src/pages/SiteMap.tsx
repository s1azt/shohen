import React from "react";
import {
  Home, Bell, Globe, Users, BookOpen, Folder, Award,
  Newspaper, Target, MapPin, Clock, Map, BarChart2, FileBox,
  LayoutGrid, ChevronRight
} from "lucide-react";

interface SiteMapProps {
  setActiveTab: (tab: string) => void;
}

const SECTIONS = [
  {
    label: "メインメニュー",
    items: [
      { id: "home",       label: "ホーム",           Icon: Home,        desc: "クイックアクセスと最新のお知らせ" },
      { id: "news",       label: "お知らせ",           Icon: Bell,        desc: "全社向けのお知らせ・通達" },
      { id: "links",      label: "リンク集",           Icon: Globe,       desc: "業務で使う社内外のリンクを集約" },
      { id: "team",       label: "チーム紹介",         Icon: Users,       desc: "部署・チーム・担当者の組織情報" },
      { id: "guide",      label: "新人ガイド",         Icon: BookOpen,    desc: "入社・異動後に必要な手続きや情報" },
      { id: "documents",  label: "ドキュメント",       Icon: Folder,      desc: "部会資料・マニュアル・共有文書" },
      { id: "syohen",     label: "小変活動",           Icon: Award,       desc: "小規模変更活動の実績・提案一覧" },
    ],
  },
  {
    label: "サイドメニュー",
    items: [
      { id: "column",     label: "コラム",             Icon: Newspaper,   desc: "部内メンバーによる技術・ノウハウ記事" },
      { id: "actionplan", label: "アクションプラン",   Icon: Target,      desc: "年度ごとの部門目標と進捗管理" },
      { id: "deadlines",  label: "締め切り管理",       Icon: Clock,       desc: "期限が迫っている申請・提出物の一覧" },
    ],
  },
  {
    label: "拠点情報",
    items: [
      { id: "construction", label: "晴海",   Icon: MapPin, desc: "晴海Z棟オフィスの設備・運用情報", target: "晴海" },
      { id: "construction", label: "東陽町", Icon: MapPin, desc: "東陽町オフィスの設備・運用情報",   target: "東陽町" },
      { id: "construction", label: "守口",   Icon: MapPin, desc: "守口オフィスの設備・運用情報",     target: "守口" },
    ],
  },
  {
    label: "外部リンク（直通）",
    items: [
      { id: "_ext_seat",    label: "全社座席表",           Icon: Map,      desc: "全社共通の座席表（外部）", url: "http://shachoushitsu.nekonet.co.jp/k_kikaku/zaseki/zaseki_gws.html" },
      { id: "_ext_shodan",  label: "商談案件ダッシュボード", Icon: BarChart2, desc: "HC70 PMO 商談案件ビューアー（外部）", url: "http://192.168.8.205/wordpress/hc70-syodan/hc70-shodan.html" },
      { id: "_ext_buka",    label: "部会資料アーカイブ",    Icon: FileBox,   desc: "部会・議事録アーカイブ（外部）", url: "http://dominoap.nekonet.co.jp/tyo/tyo1304.nsf/" },
    ],
  },
];

export const SiteMap: React.FC<SiteMapProps> = ({ setActiveTab }) => {
  return (
    <div className="page-main-container font-sans">
      {/* セクション一覧 */}
      <div className="space-y-10">
        {SECTIONS.map((section) => (
          <div key={section.label}>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-5 rounded-full bg-(--gs-accent)" />
              <span className="text-[13px] font-black uppercase tracking-[0.3em] text-(--gs-accent)">{section.label}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {section.items.map((item, i) => {
                const isExternal = item.id.startsWith("_ext_");

                if (isExternal) {
                  return (
                    <a
                      key={i}
                      href={(item as { url?: string }).url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-4 p-5 rounded-2xl border bg-(--gs-card-bg) border-slate-100 hover:border-(--gs-accent)/30 hover:shadow-md transition-all no-underline"
                    >
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-slate-50 text-slate-400 group-hover:bg-(--gs-accent) group-hover:text-white transition-colors">
                        <item.Icon size={20} strokeWidth={1.8} />
                      </div>
                      <div className="min-w-0 flex-grow text-left">
                        <div className="text-[15px] font-black tracking-tight text-(--gs-text-primary) truncate">{item.label}</div>
                        <div className="text-[12px] font-medium text-(--gs-text-primary)/60 mt-0.5 truncate">{item.desc}</div>
                      </div>
                      <ChevronRight size={14} className="text-slate-200 shrink-0 group-hover:text-(--gs-accent)" />
                    </a>
                  );
                }

                return (
                  <button
                    key={i}
                    onClick={() => setActiveTab(item.id)}
                    className="group flex items-center gap-4 p-5 rounded-2xl border bg-(--gs-card-bg) border-slate-100 hover:border-(--gs-accent)/30 hover:shadow-md transition-all text-left"
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-slate-50 text-slate-400 group-hover:bg-(--gs-accent) group-hover:text-white transition-colors">
                      <item.Icon size={20} strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0 flex-grow">
                      <div className="text-[15px] font-black tracking-tight text-(--gs-text-primary) truncate">{item.label}</div>
                      <div className="text-[12px] font-medium text-(--gs-text-primary)/60 mt-0.5 truncate">{item.desc}</div>
                    </div>
                    <ChevronRight size={14} className="text-slate-200 shrink-0 group-hover:text-(--gs-accent)" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
