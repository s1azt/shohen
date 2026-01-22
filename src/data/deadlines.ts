import { ReceiptText, CircleDollarSign, Activity, Clipboard } from "lucide-react";
import React from "react";

export const allDeadlines: Deadline[] = [ // Deadline[] と指定
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
    btn: "bg-[#e53e3e]"
  },
  {
    id: 2,
    title: "第3四半期予算申請",
    date: "2026-11-30",
    dept: "経理部",
    iconName: "CircleDollarSign",
    accent: "border-l-[#d97706]",
    bg: "bg-[#fffbeb]",
    border: "border-[#fde68a]",
    text: "text-[#92400e]",
    btn: "bg-[#d97706]"
  },
  {
    id: 3,
    title: "健康診断予約",
    date: "2026-03-01",
    dept: "総務部",
    iconName: "Activity",
    accent: "border-l-[#059669]",
    bg: "bg-[#f0fdf4]",
    border: "border-[#bbf7d0]",
    text: "text-[#166534]",
    btn: "bg-[#059669]"
  }
];