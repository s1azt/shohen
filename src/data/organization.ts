export interface TeamMember {
  id: string;
  name: string;
  leader: string;
  members: number;
  description: string;
}

export interface Manager {
  id: string;
  name: string;
  role: string;
  description?: string;
  teams: TeamMember[];
}

export interface DirectMember {
  id: string;
  name: string;
  role: string;
  description: string;
}

export interface Section {
  id: string;
  name: string;
  smg: string;
  description: string;
  pdfUrl: string; // 💡 追加：PDFのリンクを一括管理
  directMembers: DirectMember[];
  managers: Manager[];
}

export const organizationData = {
  director: {
    name: "鯨井 利毅",
    title: "部長",
    sections: [
      {
        id: "HC10",
        name: "HC10",
        smg: "星崎",
        description: "システム設計・開発部門。システムアーキテクチャの設計からUI/UX、モバイル開発まで幅広く担当。",
        pdfUrl: "https://drive.google.com/file/d/1C_2a2B4le1Z-gmYxKRncCe4In6vBsKyd/view",
        directMembers: [],
        managers: [
          {
            id: "HC10-MG1",
            name: "倉澤",
            role: "技術マネージャー",
            description: "バックエンドとインフラを中心とした技術チームを統括。",
            teams: [
              { id: "HC10-MG1-T1", name: "システム設計チーム", leader: "高橋(仁)", members: 5, description: "全社システムの設計・構成管理を担当。" },
              { id: "HC10-MG1-T2", name: "インフラ構築チーム", leader: "板橋", members: 6, description: "クラウドインフラとオンプレミスの構築・運用を担当。" },
              { id: "HC10-MG1-T3", name: "セキュリティチーム", leader: "髙井", members: 4, description: "情報セキュリティ対策の実装と監査を担当。" }
            ]
          },
          {
            id: "HC10-MG2",
            name: "古田",
            role: "フロントエンド開発マネージャー",
            description: "UI/UXとフロントエンド開発チームを統括。",
            teams: [
              { id: "HC10-MG2-T1", name: "UI/UX設計チーム", leader: "澤田", members: 4, description: "ユーザーインターフェースとユーザーエクスペリエンスの設計を担当。" },
              { id: "HC10-MG2-T2", name: "フロントエンド開発チーム", leader: "堀川", members: 6, description: "最新のフロントエンド技術を活用したウェブアプリケーション開発を担当。" },
              { id: "HC10-MG2-T3", name: "モバイル開発チーム", leader: "國友", members: 5, description: "iOS/Android向けのネイティブ・ハイブリッドアプリ開発を担当。" }
            ]
          }
        ]
      },
      {
        id: "HC60",
        name: "HC60",
        smg: "",
        description: "データ基盤とバックエンド開発部門。データベース設計、API開発、自動化基盤の構築を担当。",
        pdfUrl: "https://drive.google.com/file/d/18kjEhWoa0aQD1G2kGvvZoxi4tLzlba1T/view",
        directMembers: [],
        managers: [
          {
            id: "HC60-MG1",
            name: "四方 裕之",
            role: "バックエンド開発マネージャー",
            description: "バックエンドシステムとデータ基盤の開発・運用チームを統括。",
            teams: [
              { id: "HC60-MG1-T1", name: "オンラインチーム", leader: "近藤 雅人", members: 5, description: "基幹オンラインシステムなどの開発・運用・監視を担当。" },
              { id: "HC60-MG1-T2", name: "沖縄BPチーム", leader: "井塚 寛章", members: 6, description: "沖縄基幹バッチシステムなどの開発・運用・監視、OYT営業活動を担当。" },
              { id: "HC60-MG1-T3", name: "Bizチーム", leader: "伊藤 宗慶・西村 武士", members: 12, description: "Biz/BOSS/DLバッチシステムなどの開発・運用・監視を担当。" },
              { id: "HC60-MG1-T4", name: "EDI/NSチーム", leader: "福村 広信", members: 4, description: "EDI/NS監視などの受付・運用・監視を担当。" },
              { id: "HC60-MG1-T5", name: "管理・事務チーム", leader: "山口 光一郎", members: 3, description: "各種管理・事務を担当。" }
            ]
          }
        ]
      },
      {
        id: "HC70",
        name: "HC70",
        smg: "金子 弘嗣",
        description: "プロジェクト管理・品質保証・運用部門。プロジェクト全体の進行管理と品質向上を担当。",
        pdfUrl: "https://drive.google.com/file/d/194tY_gPIeW-GIK-8DMi4uuusaU6Gg4QU/view",
        directMembers: [
          { id: "HC70-DM1", name: "井戸 志具馬", role: "テクニカルスペシャリスト", description: "高度な技術課題の解決とアーキテクチャ設計のサポートを担当。" }
        ],
        managers: [
          {
            id: "HC70-MG1",
            name: "石上 博丈",
            role: "管理マネージャー",
            teams: [
              { id: "HC70-MG1-T1", name: "企画チーム", leader: "山口 康信", members: 2, description: "プロジェクト計画立案・進捗管理を担当。" },
              { id: "HC70-MG1-T2", name: "ＰＭＯチーム", leader: "坂井 信介", members: 2, description: "品質基準の策定とテスト計画・実行を担当。" }
            ]
          },
          {
            id: "HC70-MG2",
            name: "吾田 秀樹",
            role: "リリース管理マネージャー",
            teams: [
              { id: "HC70-MG2-T1", name: "健保、団体チーム", leader: "山岸 大介", members: 4, description: "リリーススケジュール管理と実行を担当。" },
              { id: "HC70-MG2-T2", name: "UI/UX推進チーム", leader: "堤 圭佑", members: 2, description: "ドキュメントの構成管理とUX推進を担当。" }
            ]
          },
          {
            id: "HC70-MG3",
            name: "中野 智士",
            role: "カスタマーサクセスマネージャー",
            teams: [
              { id: "HC70-MG3-T1", name: "YAW基幹系企画開発チーム", leader: "室伏 邦博", members: 3, description: "ユーザーからの問い合わせ対応と技術サポートを担当。" },
              { id: "HC70-MG3-T2", name: "YAWサービス系企画開発チーム", leader: "加藤 佳紀", members: 3, description: "プロダクトのマーケティング戦略立案と実行を担当。" }
            ]
          },
          {
            id: "HC70-MG4",
            name: "今井田 悠",
            role: "データアナリティクスマネージャー",
            teams: [
              { id: "HC70-MG4-T1", name: "YAWサービス系運用チーム", leader: "山﨑 恭伯", members: 6, description: "経営データの収集・分析・可視化を担当。" }
            ]
          }
        ]
      },
      {
        id: "HD10",
        name: "HD10",
        smg: "岩井",
        description: "サービス企画・開発部門。新規サービスの企画からリサーチ、開発までを一貫して担当。",
        pdfUrl: "https://drive.google.com/file/d/1ps8E9tpXB_jfPsepurDv3JJ-bsEn3p00/view",
        directMembers: [],
        managers: [
          {
            id: "HD10-MG1",
            name: "山田",
            role: "サービス開発マネージャー",
            teams: [
              { id: "HD10-MG1-T1", name: "機販サプライチーム", leader: "湯上", members: 4, description: "新規サービスの企画・立案・市場調査を担当。" },
              { id: "HD10-MG1-T2", name: "情報系NWチーム", leader: "小野崎", members: 3, description: "ユーザー行動分析とニーズ調査を担当。" },
              { id: "HD10-MG1-T3", name: "保守チーム", leader: "中村", members: 2, description: "企画されたサービスの実装と保守を担当。" }
            ]
          }
        ]
      },
      {
        id: "HD70",
        name: "HD70",
        smg: "行田 拓史",
        description: "先端技術研究開発部門。AIやデータサイエンス、最新技術の調査研究を担当。",
        pdfUrl: "https://drive.google.com/file/d/1YRtZ6BvclHZhG3ahVyHy_N3TnzjMD-8s/view",
        directMembers: [],
        managers: [
          {
            id: "HD70-MG1",
            name: "新井 隆文",
            role: "研究開発マネージャー",
            teams: [
              { id: "HD70-MG1-T1", name: "品質・自動化チーム", leader: "石鍋 伸悟", members: 5, description: "人工知能技術の研究と実装を担当。" },
              { id: "HD70-MG1-T2", name: "監視運営チーム", leader: "横田 誠一", members: 4, description: "高度なデータ分析と予測モデルの開発を担当。" },
              { id: "HD70-MG1-T3", name: "サポートデスク運営", leader: "木下 竜次", members: 6, description: "最新技術のリサーチとソリューションの開発。" }
            ]
          }
        ]
      }
    ]
  }
};

export const getAllSections = () => organizationData.director.sections;
export const getSectionById = (id: string) => 
  organizationData.director.sections.find(s => s.id === id);