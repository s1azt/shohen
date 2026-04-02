import { ReceiptText, CircleDollarSign, Activity, Clipboard } from "lucide-react";

export interface DeadlineItem {
  id: number;
  title: string;
  date: string;
  updateDate: string;
  dept: string;
  iconName: string;
  url: string;
  // 💡 カラープロパティを追加
  bg: string;
  border: string;
  text: string;
  btn: string;
  accent: string;
}

/*
    bg: "bg-[#fffbeb]",         // 薄い黄
    border: "border-[#fde68a]", // 黄の枠線
    text: "text-[#92400e]",     // 茶色文字
    btn: "bg-[#d97706]",        // 実行ボタンオレンジ
    accent: "border-l-[#d97706]"



    bg: "bg-[#fff5f5]",         // 薄い赤
    border: "border-[#feb2b2]", // 赤の枠線
    text: "text-[#742a2a]",     // 濃い赤文字
    btn: "bg-[#e53e3e]",        // 実行ボタン赤
    accent: "border-l-[#e53e3e]"


    bg: "bg-[#f0fdf4]",         // 薄い緑
    border: "border-[#bbf7d0]", // 緑の枠線
    text: "text-[#166534]",     // 濃い緑文字
    btn: "bg-[#059669]",        // 緑ボタン
    accent: "border-l-[#059669]"


    bg: "bg-[#f0f9ff]",         // 薄い青
    border: "border-[#bae6fd]", // 青の枠線
    text: "text-[#075985]",     // 濃い青文字
    btn: "bg-[#0284c7]",        // 青ボタン
    accent: "border-l-[#0284c7]"


    bg: "bg-[#f5f3ff]",         // 薄い紫
    border: "border-[#ddd6fe]", // 紫の枠線
    text: "text-[#5b21b6]",     // 濃い紫文字
    btn: "bg-[#7c3aed]",        // 紫ボタン
    accent: "border-l-[#7c3aed]"
    */

export const allDeadlines: DeadlineItem[] = [
  /*{
    id: 1,
    title: "年始年末休暇申請テスト",
    date: "2026.12.10",
    updateDate: "2026.01.15",
    dept: "総務部",
    iconName: "ReceiptText",
    url: "https://example.com/nencho-system",
    bg: "bg-[#fff5f5]",         // 薄い赤
    border: "border-[#feb2b2]", // 赤の枠線
    text: "text-[#742a2a]",     // 濃い赤文字
    btn: "bg-[#e53e3e]",        // 実行ボタン赤
    accent: "border-l-[#e53e3e]"
  },
  */
];