export const allGuides = [
  {
    id: 101,
    title: "はじめての勤怠管理",
    description: "入社したらまず覚えたい勤怠管理システムの使い方ガイド",
    iconName: "Clock",
    color: "bg-blue-50",
    url: "#",
    steps: [
      "出社時に「出勤」ボタンを押す",
      "退社時に「退勤」ボタンを押す",
      "残業が発生した場合は理由を入力",
      "休暇申請は1週間前までに行う"
    ]
  },
  {
    id: 102,
    title: "テレワーク申請の流れ",
    description: "テレワーク申請システム（TW申請）の利用方法と注意点",
    iconName: "Clipboard",
    color: "bg-emerald-50",
    url: "http://dominoap.nekonet.co.jp/tyo/tyo0993.nsf/MainFrame?OpenFrameSet",
    steps: [
      "テレワーク希望日の3営業日前までに申請",
      "上長の承認を得る",
      "テレワーク当日も勤怠システムで出退勤の打刻が必要",
      "業務報告は当日中に提出"
    ]
  },
  {
    id: 103,
    title: "社内システムアクセスガイド",
    description: "各種社内システムのアクセス方法と必要な権限について",
    iconName: "Server",
    color: "bg-purple-50",
    url: "#",
    steps: [
      "社内ネットワークに接続（VPN経由も可）",
      "自分のユーザーIDとパスワードでログイン",
      "初回アクセス時は各システム管理者に権限申請が必要",
      "パスワードは定期的に変更（90日ごと）"
    ]
  },
  {
    id: 104,
    title: "社内コミュニケーション",
    description: "社内のコミュニケーションツールと使い分けガイド",
    iconName: "MessageSquare",
    color: "bg-amber-50",
    url: "#",
    steps: [
      "チャットは簡単な連絡や相談に",
      "メールは正式な依頼や複数人への連絡に",
      "重要な決定事項は必ず文書化",
      "緊急時は電話連絡（内線表参照）"
    ]
  }
];