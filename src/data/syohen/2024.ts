import { SyohenActivity } from "./index"; // 型を利用する場合

export const syohen2024: SyohenActivity[] = [
  {
    id: 202501,
    team: "Aチーム",
    category: "インフラ高度化班",
    members: ["中村 未優", "多田 颯真", "西村 勇紀"],
    title: "CI/CDパイプラインの自動化刷新",
    description: "テストからデプロイまでのプロセスを完全に自動化し、人的作業によるリリースミスを排除。",
    results: "デプロイ時間が30分から3分へ。リリース頻度が週1回からオンデマンド（毎日）へ向上。",
    technologies: ["GitHub Actions", "Docker", "Terraform"],
    pdfUrl: "/pdfs/report_202501.pdf"
  },
  {
    id: 202503,
    team: "Bチーム",
    category: "モバイル推進班",
    members: ["石田 雄大", "加藤 優子"],
    title: "勤怠管理システムのモバイル最適化対応",
    description: "外出先やリモート環境からワンタップで打刻・確認が可能なモバイル専用インターフェースの開発。",
    results: "打刻忘れが前年比90%減。管理工数が月間約5時間削減され、正確な勤怠管理を支援。",
    technologies: ["React Native", "Firebase"],
    pdfUrl: "/pdfs/report_202501.pdf"
  },
];