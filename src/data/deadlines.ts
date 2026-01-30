// 締め切りデータ

import { ReceiptText, CircleDollarSign, Activity, Clipboard } from "lucide-react";

export const allDeadlines = [
  {
    id: 1,
    title: "年末調整書類提出",
    date: "2026-12-10",
    dept: "総務部",
    iconName: "ReceiptText",
    accent: "border-l-[#e53e3e]",
    bg: "bg-[#fff5f5]",
    border: "border-[#feb2b2]",
    text: "text-[#742a2a]",
    btn: "bg-[#e53e3e]",
    url: "https://example.com/nencho-system" 
  },
  {
    id: 2,
    title: "【全従業者対象】54期 第2回 YSD全社メール教育 実施のご案内",
    date: "2026-01-30", // 月のフォーマットを統一しておくと安全です
    dept: "全社",
    iconName: "CircleDollarSign",
    accent: "border-l-[#d97706]",
    bg: "bg-[#fffbeb]",
    border: "border-[#fde68a]",
    text: "text-[#92400e]",
    btn: "bg-[#d97706]",
    url: "http://dominoap.nekonet.co.jp/all/all0088.nsf/($All)/630E1E1FD564992C49258D760015D41B" 
  },
  {
    id: 3,
    title: "「新GSイントラアンケート」回答お願いします。",
    date: "2026-02-04",
    dept: "小変Cチーム",
    iconName: "Activity",
    accent: "border-l-red-600",    // 真っ赤なアクセント線
    bg: "bg-red-50",               // 非常に薄い赤
    border: "border-red-200",      // 明確な赤い枠線
    text: "text-red-900",          // 濃い赤の文字
    btn: "bg-red-600",             // 真っ赤なボタン
    url: "https://forms.gle/TdjoT5nTijufFfMJA" // 👈 追加
  },
  {
    id: 4,
    title: "E-ラン受講",
    date: "2026-02-25",
    dept: "総務部",
    iconName: "Activity",
    accent: "border-l-[#059669]",
    bg: "bg-[#f0fdf4]",
    border: "border-[#bbf7d0]",
    text: "text-[#166534]",
    btn: "bg-[#059669]",
    url: "https://clipline.jp/training/#/students" // 👈 追加
  }
];