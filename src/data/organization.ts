export interface TeamMember {
  id: string;
  name: string;
  leader: string;
  members: string[];
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
        pdfUrl: "https://drive.google.com/file/d/11ojNFwmjj3Z95dTBJ3OFCAE5KF7hj1zY/view?usp=drive_link",
        directMembers: [],
        managers: [
          {
            id: "HC10-MG1",
            name: "倉澤 昭博",
            role: "マネージャー",
            //description: "バックエンドとインフラを中心とした技術チームを統括。",
            teams: [
              { id: "HC10-MG1-T1", name: "収支管理・運営ユニット", leader: "澤木 茜", members: ["田中 千鶴", "人見 澄"], description: "GS部の財務省。いや、会社の銀行といっても過言ではありません。大きなお金を取り扱うチームであり、会社に与える影響も大きいため間違いも許されません。会社経営の基盤であり、出発（計画）であり、結果（実算）であり。それを管理するチームです。" },
              { id: "HC10-MG1-T2", name: "請求管理ユニット", leader: "板橋 美智子", members: ["髙橋 希"], description: "" },
              { id: "HC10-MG1-T3", name: "グループDX推進ユニット", leader: "髙井 勇輝", members: ["飯田 正憲", "小林 明子", "中村 未優"], description: "" }
            ]
          },
          {
            id: "HC10-MG2",
            name: "古田 祥市",
            role: "マネージャー",
            //description: "UI/UXとフロントエンド開発チームを統括。",
            teams: [
              { id: "HC10-MG2-T1", name: "資産・委託管理ユニット", leader: "澤田 ひとみ", members: ["常光 泰吉"], description: "" },
              { id: "HC10-MG2-T2", name: "デジタル業務変革ユニット", leader: "高橋 仁", members: ["小椋 良樹", "川越 彩乃"], description: "" },
              { id: "HC10-MG2-T3", name: "働き方改革ユニット", leader: "堀川 沙智", members: ["舟根 まどか", "梅澤 久美子", "粟飯原 叶幸", "礒沼 純"], description: "" }
            ]
          }
        ]
      },
      {
        id: "HC60",
        name: "HC60",
        smg: "",
       // description: "データ基盤とバックエンド開発部門。データベース設計、API開発、自動化基盤の構築を担当。",
        pdfUrl: "https://drive.google.com/file/d/1ihaVVMDnAwrFHAyxukyntSp_nZQsl_Mf/view?usp=drive_link",
        directMembers: [],
        managers: [
          {
            id: "HC60-MG1",
            name: "四方 裕之",
           role: "マネージャー",
            description: "バックエンドシステムとデータ基盤の開発・運用チームを統括。",
            teams: [
              { id: "HC60-MG1-T1", name: "Biz①ユニット", leader: "伊藤 宗慶", members: ["福井 健人", "堀内 勇貴", "岸木 港都", "萩森 結斗", "藤野 煖馬"], description: "Biz/BOSS/DLバッチシステムなどの開発・運用・監視を担当。" },
              { id: "HC60-MG1-T2", name: "Biz②ユニット", leader: "西村 武士", members: ["川上 博幸", "伊藤 哲也", "長谷川 大策", "藤井 ひなた"], description: "Biz/BOSS/DLバッチシステムなどの開発・運用・監視を担当。" },
              { id: "HC60-MG1-T3", name: "オンラインユニット", leader: "近藤 雅人", members: ["日根野 智之", "川端 健史", "東野 舞馬"], description: "基幹オンラインシステムなどの開発・運用・監視を担当。" },
              { id: "HC60-MG1-T4", name: "沖縄BPユニット", leader: "井塚 寛章", members: ["松村 麻里", "久堀 慎也", "根来 佑樹", "山村 知諒"], description: "沖縄基幹バッチシステムなどの開発・運用・監視、OYT営業活動を担当。" },
              { id: "HC60-MG1-T5", name: "EDI/NSユニット", leader: "福村 広信", members: ["寺田 貴夫", "藤後 善幸", "梶原 輝美"], description: "EDI/NS監視などの受付・運用・監視を担当。" }
            ]
          }
        ]
      },
      {
        id: "HC70",
        name: "HC70",
        smg: "金子 弘嗣",
        //description: "プロジェクト管理・品質保証・運用部門。プロジェクト全体の進行管理と品質向上を担当。",
        pdfUrl: "https://drive.google.com/file/d/1D2-udNLmKNtoI5-x3Vt3BMZCkYvhPf63/view?usp=drive_link",
        directMembers: [
          { id: "HC70-DM1", name: "井戸 志具馬", role: "", description: "高度な技術課題の解決とアーキテクチャ設計のサポートを担当。" }
        ],
        managers: [
          {
            id: "HC70-MG1",
            name: "石上 博丈",
            role: "マネージャー",
            teams: [
              { id: "HC70-MG1-T1", name: "企画ユニット", leader: "山口 康信", members: ["鈴木 雅晴", "種田 佳奈子", "冨岡 観月"], description: "", group: "企画・管理" },
              { id: "HC70-MG1-T2", name: "ＰＭＯユニット", leader: "坂井 信介", members: ["斉藤 由太", "中村 香菜"], description: "", group: "企画・管理" }
            ]
          },
          {
            id: "HC70-MG2",
            name: "吾田 秀樹",
          role: "マネージャー",
            teams: [
              { id: "HC70-MG2-T1", name: "健保、団体ユニット", leader: "山岸 大介", members: ["田邸 茂樹", "峯岸 靖敏", "大坪 寛侑"], description: "", group: "健保・UXUI推進" },
              { id: "HC70-MG2-T2", name: "UI/UX推進ユニット", leader: "堤 圭佑", members: ["小林 萌香", "サーメル サルメ"], description: "", group: "健保・UXUI推進" }
            ]
          },
          {
            id: "HC70-MG3",
            name: "中野 智士",
           role: "マネージャー",
            teams: [
              { id: "HC70-MG3-T1", name: "YAW基幹系企画開発ユニット", leader: "室伏 邦博", members: ["小林 海都", "原 百花"], description: "", group: "YAW" },
              { id: "HC70-MG3-T2", name: "YAWサービス系企画開発ユニット", leader: "加藤 佳紀", members: ["篠田 陽介", "高橋 湧稀"], description: "", group: "YAW" }
            ]
          },
          {
            id: "HC70-MG4",
            name: "今井田 悠",
            role: "マネージャー",
            teams: [
              { id: "HC70-MG4-T1", name: "YAW基幹系運用ユニット", leader: "秋元 健史", members: ["新藤 剛", "中田 美沙", "熊谷 研哉", "坂本 宏太"], description: "", group: "YAW" },
              { id: "HC70-MG4-T2", name: "YAWサービス系運用ユニット", leader: "岩瀬 高広", members: ["山﨑 恭伯", "山田 桃子", "長井 都珠"], description: "", group: "YAW" }
            ]
          },
          {
            id: "HC70-MG5",
            name: "佐藤 総一郎",
            role: "マネージャー",
            teams: [
              { id: "HC70-MG5-T1", name: "BC企画開発ユニット", leader: "須藤 亮太", members: ["鈴木 幹浩", "淺井 航志", "杉村 篤哉", "正治 悠真", "中村 未優"], description: "", group: "BC / YBC / YCF" },
              { id: "HC70-MG5-T2", name: "YBC企画開発ユニット", leader: "平山 正夫", members: ["黒羽根 靖哲", "冨永 慎太郎"], description: "", group: "BC / YBC / YCF" },
              { id: "HC70-MG5-T3", name: "YCF企画開発ユニット", leader: "小川 博義", members: ["金子 良太", "開田 朱馬", "多田 颯真"], description: "", group: "BC / YBC / YCF" }
            ]
          },
          {
            id: "HC70-MG6",
            name: "関 佑里奈",
            role: "マネージャー",
            teams: [
              { id: "HC70-MG6-T1", name: "BC/YBC運用ユニット", leader: "高橋 理奈", members: ["志賀 瑞果", "前原 蓮", "藤田 彩花"], description: "", group: "BC / YBC / YCF" },
              { id: "HC70-MG6-T2", name: "YCF運用ユニット", leader: "泉屋 里絵", members: ["三浦 麻衣", "河辺 貴代", "阿部 史奈", "中村 文大"], description: "", group: "BC / YBC / YCF" }
            ]
          },
          {
            id: "HC70-MG7",
            name: "荒井 洋輔",
            role: "マネージャー",
            teams: [
              { id: "HC70-MG7-T1", name: "ASC企画開発・運用ユニット", leader: "丸山 隼一", members: ["斎藤 裕樹", "出来 太一", "鈴木 亜侑", "川本 京花", "工藤 巧"], description: "", group: "ASC" }
            ]
          }
        ]
      },
      {
        id: "HD10",
        name: "HD10",
        smg: "岩井 卓也",
        //description: "サービス企画・開発部門。新規サービスの企画からリサーチ、開発までを一貫して担当。",
        pdfUrl: "https://drive.google.com/file/d/1KtYv0vxwfQntZhHt8PGGECFkndvPLeSt/view?usp=drive_link",
        directMembers: [],
        managers: [
          {
            id: "HD10-MG1",
            name: "山田 真一",
            role: "マネージャー",
            teams: [
              { id: "HD10-MG1-T1", name: "機販サプライユニット", leader: "湯上 恵利佳", members: ["佐々木 優子", "多田 千聖", "松田 葵", "山口 将孝"], description: "" },
              { id: "HD10-MG1-T2", name: "情報系NWユニット", leader: "小野崎 竜也", members: ["白石 裕一朗", "原田 駿", "西 萌海", "髙橋 侑希"], description: "" },
              { id: "HD10-MG1-T3", name: "保守ユニット", leader: "中村 都", members: ["西脇 征也", "堂園 悠作", "宗木 沙織"], description: "" }
            ]
          }
        ]
      },
      {
        id: "HD70",
        name: "HD70",
        smg: "行田 拓史",
        //description: "先端技術研究開発部門。AIやデータサイエンス、最新技術の調査研究を担当。",
        pdfUrl: "https://drive.google.com/file/d/1I6x_rNEJTynDjs9DqhsH1nPSrl_PEZWK/view?usp=drive_link",
        directMembers: [],
        managers: [
          {
            id: "HD70-MG1",
            name: "新井 隆文",
            role: "マネージャー",
            teams: [
              { id: "HD70-MG1-T1", name: "可視化推進ユニット", leader: "石鍋 伸悟", members: ["森川 葉子", "谷島 直穂", "海老原 慎也", "渡邉 莉子"], description: "" },
              { id: "HD70-MG1-T2", name: "監視ユニット", leader: "横田 誠一", members: ["松永 成剛", "福家 学"], description: "" },
              { id: "HD70-MG1-T3", name: "DX推進ユニット", leader: "中吉 司", members: ["藤田 誠弥", "藤本 脩史"], description: "" },
              { id: "HD70-MG1-T4", name: "サポートデスクユニット", leader: "木下 竜次", members: ["大村 貴子", "義満 克己", "鵜川 宜久", "西村 勇紀"], description: "" }
            ]
          }
        ]
      }
    ]
  }
};

export const getAllSections = (): Section[] => organizationData.director.sections as Section[];
export const getSectionById = (id: string): Section | undefined =>
  organizationData.director.sections.find(s => s.id === id) as Section | undefined;