import { SyohenActivity } from "./index"; // 型を利用する場合

export const syohen2024: SyohenActivity[] = [
  {
    id: 202401,
    team: "Aチーム",
    category: "コミュニケーション",
    members: ["小林 萌香", "杉村 篤哉", "髙田 悠斗", "長谷川 大策"],
    title: "若手社員による先輩向け座談会制度構築",
    description: "若手社員（新卒入社で1～4年目の正社員）による先輩向け座談会の制度構築。",
    results: "若手の発信する文化の浸透や学習の場となり、アイディアの創造に貢献。",
    technologies: ["GitHub Actions", "Docker", "Terraform"],
    pdfUrl: "https://drive.google.com/file/d/1jNfOVBYm2poaCsE_oAJ33KTCgKclOEBJ/view"
  },
  {
    id: 202402,
    team: "Bチーム",
    category: "モバイル推進班",
    members: ["開田", "川本", "藤田", "藤井"],
    title: "AIを活用したメール管理",
    description: "グループシステム部のメール管理の課題を解決するアプリを開発。",
    results: "期日をAIで読み取り、Todoリスト化。メールの要約やメール自動作成で業務改善。",
    technologies: ["AI", "メール"],
    pdfUrl: "https://drive.google.com/file/d/1-2NH970l2hyZ-CtCULU1OxcJJINk6JNt/view"
  },
  {
    id: 202403,
    team: "Cチーム",
    category: "モバイル推進班",
    members: ["坂本 宏太", "前原 蓮", "渡邉 莉子", "山村 知諒", "髙橋 湧稀"],
    title: "社員健康を守る VRウェアラブルソリューション",
    description: "VR機器とウェアラブル端末を用いた運動促進ソリューションを提案。",
    results: "アンケート調査における「普段から運動している人」の割合を、3年後に現在の50%から80%へ増加させることを目指す。",
    technologies: ["運動", "VR"],
    pdfUrl: "https://drive.google.com/file/d/1UZ4B_6yXYwjUa3yljfkPwo2CMYe_q-Bd/view"
  },
];