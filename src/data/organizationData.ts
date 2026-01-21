export interface Unit { name: string; leader: string; members: number; manager: string; desc: string; }
export interface Section { id: string; smg: string; desc: string; units: Unit[]; }

export const organizationData = {
  director: { name: "田中 誠一", title: "部長" },
  sections: [
    {
      id: "HC10", smg: "佐藤 健太", desc: "システム設計・開発部門。",
      units: [{ name: "システム設計チーム", leader: "鈴木 拓也", members: 5, manager: "山田 哲也", desc: "設計担当。" }]
    },
    { id: "HC60", smg: "小林 達也", desc: "データ基盤部門。", units: [] },
    { id: "HC70", smg: "斎藤 秀樹", desc: "運用部門。", units: [] },
    { id: "HD10", smg: "伊藤 健", desc: "企画部門。", units: [] },
    { id: "HD70", smg: "渡辺 篤史", desc: "研究部門。", units: [] }
  ] as Section[]
};