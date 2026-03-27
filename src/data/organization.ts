export interface TeamMember {
  id: string;
  name: string;
  leader: string;
  members: number;
  description: string;
  group?: string;
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
        smg: "星崎 修司",
        //description: "システム設計・開発部門。システムアーキテクチャの設計からUI/UX、モバイル開発まで幅広く担当。",
        pdfUrl: "https://drive.google.com/file/d/1C_2a2B4le1Z-gmYxKRncCe4In6vBsKyd/view",
        directMembers: [],
        managers: [
          {
            id: "HC10-MG1",
            name: "倉澤 昭博",
            role: "技術マネージャー",
            description: "バックエンドとインフラを中心とした技術チームを統括。",
            teams: [
              { id: "HC10-MG1-T1", name: "収支管理組織運営チーム", leader: "高橋 仁", members: 5, description: "" },
              { id: "HC10-MG1-T2", name: "営業管理請求管理チーム", leader: "板橋 美智子", members: 6, description: "" },
              { id: "HC10-MG1-T3", name: "デジタル業務変革チーム", leader: "髙井 勇輝", members: 4, description: "" }
            ]
          },
          {
            id: "HC10-MG2",
            name: "古田 祥市",
            role: "フロントエンド開発マネージャー",
            description: "UI/UXとフロントエンド開発チームを統括。",
            teams: [
              { id: "HC10-MG2-T1", name: "資産・委託管理チーム", leader: "澤田 ひとみ", members: 4, description: "" },
              { id: "HC10-MG2-T2", name: "働き方改革チーム", leader: "堀川 沙智", members: 6, description: "" },
              { id: "HC10-MG2-T3", name: "デジタル技術推進チーム", leader: "國友 輝美", members: 5, description: "" }
            ]
          }
        ]
      },
      {
        id: "HC60",
        name: "HC60",
        smg: "",
       // description: "データ基盤とバックエンド開発部門。データベース設計、API開発、自動化基盤の構築を担当。",
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
        //description: "プロジェクト管理・品質保証・運用部門。プロジェクト全体の進行管理と品質向上を担当。",
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
              { id: "HC70-MG1-T1", name: "企画チーム", leader: "山口 康信", members: 2, description: "", group: "企画・管理" },
              { id: "HC70-MG1-T2", name: "ＰＭＯチーム", leader: "坂井 信介", members: 2, description: "", group: "企画・管理" }
            ]
          },
          {
            id: "HC70-MG2",
            name: "吾田 秀樹",
            role: "リリース管理マネージャー",
            teams: [
              { id: "HC70-MG2-T1", name: "健保、団体チーム", leader: "山岸 大介", members: 4, description: "", group: "健保・UXUI推進" },
              { id: "HC70-MG2-T2", name: "UI/UX推進チーム", leader: "堤 圭佑", members: 2, description: "", group: "健保・UXUI推進" }
            ]
          },
          {
            id: "HC70-MG3",
            name: "中野 智士",
            role: "カスタマーサクセスマネージャー",
            teams: [
              { id: "HC70-MG3-T1", name: "YAW基幹系企画開発チーム", leader: "室伏 邦博", members: 3, description: "", group: "YAW" },
              { id: "HC70-MG3-T2", name: "YAWサービス系企画開発チーム", leader: "加藤 佳紀", members: 3, description: "", group: "YAW" }
            ]
          },
          {
            id: "HC70-MG4",
            name: "今井田 悠",
            role: "データアナリティクスマネージャー",
            teams: [
              { id: "HC70-MG4-T1", name: "YAWサービス系運用チーム", leader: "山﨑 恭伯", members: 6, description: "", group: "YAW" }
            ]
          },
          {
            id: "HC70-MG5",
            name: "佐藤 総一郎",
            role: "マネージャー",
            teams: [
              { id: "HC70-MG5-T1", name: "BC企画開発チーム", leader: "須藤 亮太", members: 5, description: "", group: "BC / YBC / YCF" },
              { id: "HC70-MG5-T2", name: "YBC企画開発チーム", leader: "平山 正夫", members: 5, description: "", group: "BC / YBC / YCF" },
              { id: "HC70-MG5-T3", name: "YCF企画開発チーム", leader: "小川 博義", members: 5, description: "", group: "BC / YBC / YCF" }
            ]
          },
          {
            id: "HC70-MG6",
            name: "関 佐里奈",
            role: "マネージャー",
            teams: [
              { id: "HC70-MG6-T1", name: "BC/YBC運用チーム", leader: "高橋 理奈", members: 4, description: "", group: "BC / YBC / YCF" },
              { id: "HC70-MG6-T2", name: "YCF運用チーム", leader: "泉屋 里絵", members: 5, description: "", group: "BC / YBC / YCF" }
            ]
          },
          {
            id: "HC70-MG7",
            name: "荒井 洋輔",
            role: "マネージャー",
            teams: [
              { id: "HC70-MG7-T1", name: "ASC企画開発チーム", leader: "丸山 隼一", members: 3, description: "", group: "ASC" },
              { id: "HC70-MG7-T2", name: "ASC運用チーム", leader: "秋元 健史", members: 4, description: "", group: "ASC" }
            ]
          }
        ]
      },
      {
        id: "HD10",
        name: "HD10",
        smg: "岩井 卓也",
        //description: "サービス企画・開発部門。新規サービスの企画からリサーチ、開発までを一貫して担当。",
        pdfUrl: "https://drive.google.com/file/d/1ps8E9tpXB_jfPsepurDv3JJ-bsEn3p00/view",
        directMembers: [],
        managers: [
          {
            id: "HD10-MG1",
            name: "山田 真一",
            role: "サービス開発マネージャー",
            teams: [
              { id: "HD10-MG1-T1", name: "機販サプライチーム", leader: "湯上 恵利佳", members: 4, description: "" },
              { id: "HD10-MG1-T2", name: "情報系NWチーム", leader: "小野崎 竜也", members: 3, description: "" },
              { id: "HD10-MG1-T3", name: "保守チーム", leader: "中村 都", members: 2, description: "" }
            ]
          }
        ]
      },
      {
        id: "HD70",
        name: "HD70",
        smg: "行田 拓史",
        //description: "先端技術研究開発部門。AIやデータサイエンス、最新技術の調査研究を担当。",
        pdfUrl: "https://drive.google.com/file/d/1YRtZ6BvclHZhG3ahVyHy_N3TnzjMD-8s/view",
        directMembers: [],
        managers: [
          {
            id: "HD70-MG1",
            name: "新井 隆文",
            role: "研究開発マネージャー",
            teams: [
              { id: "HD70-MG1-T1", name: "品質・自動化チーム", leader: "石鍋 伸悟", members: 5, description: "" },
              { id: "HD70-MG1-T2", name: "監視運営チーム", leader: "横田 誠一", members: 4, description: ""},
              { id: "HD70-MG1-T3", name: "サポートデスク運営", leader: "木下 竜次", members: 6, description: "" }
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