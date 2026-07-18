// =============================================================================
// Sincerely Slide Skill V2 - 全パターン動作テスト
// =============================================================================

var t = require("./template.js");
var pptxgen = t.pptxgen;

var pres = new pptxgen();
pres.layout = t.config.layout;
pres.author = "テスト";
pres.title = "全パターンテスト";

// パターン 1: 表紙
t.addTitleSlide(pres, "Sincerely Slide Skill V2", "全30パターン動作テスト", "テスト作成者");

// パターン 2: サマリー
t.addSummarySlide(pres, "全30パターンが正常に動作することを確認", [
  "基本パターン（1-9）の動作確認",
  "V2追加パターン（10-30）の動作確認",
  "デザインシステムの一貫性を検証"
]);

// パターン 3: セクション扉
t.addSectionSlide(pres, 1, "基本パターン");

// パターン 4: 本文
t.addBodySlide(pres, "本文スライドのテスト", "テキスト中心の説明スライド",
  "これは本文スライドのテストです。\n\nトヨマネ式メソッドに基づき、各スライドは「タイトル（問い）」「キーメッセージ（答え）」「コンテンツ（根拠）」の3点セットで構成されます。\n\n2階建て構造により、上段で結論を、下段で詳細を伝えます。",
  "テストデータ"
);

// パターン 5: 列挙型
t.addEnumerationSlide(pres, "列挙型スライドのテスト", "3つのポイントを提示", [
  { title: "ポイント1", description: "結論ファーストの原則" },
  { title: "ポイント2", description: "2階建て構造の活用" },
  { title: "ポイント3", description: "3点セットの徹底" }
], "テストデータ");

// パターン 6: 2カラム比較
t.addTwoColumnSlide(pres, "2カラム比較のテスト", "新手法が優位",
  { title: "従来手法", points: ["手作業中心", "属人化しやすい", "コスト高"] },
  { title: "新手法", points: ["自動化", "標準化・再現性", "コスト30%削減"] },
  "テストデータ"
);

// パターン 7: 統計数値
t.addStatsSlide(pres, "統計数値スライドのテスト", "主要KPIを確認", [
  { value: "150%", label: "成長率", description: "前年比" },
  { value: "98%", label: "顧客満足度", description: "アンケート結果" },
  { value: "¥5.2M", label: "売上", description: "月間平均" }
], "テストデータ");

// パターン 8: まとめ
// (最後に配置)

// パターン 3: セクション扉（V2パターン）
t.addSectionSlide(pres, 2, "V2追加パターン");

// パターン 10: グラフ
t.addChartSlide(pres, "BAR", [
  { name: "2023年", labels: ["Q1","Q2","Q3","Q4"], values: [120,150,180,210] },
  { name: "2024年", labels: ["Q1","Q2","Q3","Q4"], values: [140,170,200,250] }
], {
  title: "四半期別売上推移",
  keyMessage: "2024年は全四半期で前年を上回る",
  explanation: { title: "ポイント", text: "・Q4が最も成長\n・前年比+19%" },
  source: "社内データ"
});

// パターン 11: フローチャート（横型）
t.addFlowChartSlide(pres, "プロジェクト推進フロー", "4つのフェーズで推進", [
  { text: "企画", description: "・要件定義\n・スコープ設定" },
  { text: "設計", description: "・アーキテクチャ\n・UI/UXデザイン" },
  { text: "開発", description: "・実装\n・テスト" },
  { text: "運用", description: "・デプロイ\n・モニタリング" }
], "テストデータ");

// パターン 11b: フローチャート（縦型）
t.addVerticalFlowSlide(pres, "意思決定プロセス", "3段階の承認フロー", [
  { text: "Step 1: 起案", description: "担当者が企画書を作成" },
  { text: "Step 2: レビュー", description: "リーダーが内容を精査" },
  { text: "Step 3: 承認", description: "部門長が最終承認" }
], "テストデータ");

// パターン 12: 比較対照
t.addComparisonSlide(pres, "従来手法 vs 新手法", "新手法でコスト30%削減", {
  col1: { title: "従来手法", points: ["手作業中心", "属人化しやすい", "コスト高"] },
  col2: { title: "新手法", points: ["自動化", "標準化・再現性", "コスト30%削減"] }
}, "テストデータ");

// パターン 13: 4象限マトリックス
t.addMatrix4QuadrantSlide(pres, "事業ポートフォリオ分析", "成長率と市場シェアで分類", {
  axisLabels: { xHigh: "市場シェア 高", xLow: "市場シェア 低", yHigh: "成長率 高", yLow: "成長率 低" },
  quadrants: [
    { label: "問題児", description: "高成長・低シェア" },
    { label: "花形", description: "高成長・高シェア" },
    { label: "負け犬", description: "低成長・低シェア" },
    { label: "金のなる木", description: "低成長・高シェア" }
  ],
  points: [
    { label: "事業A", x: 60, y: 70 },
    { label: "事業B", x: -40, y: 50 }
  ]
}, "テストデータ");

// パターン 14: サイクル図
t.addCycleDiagramSlide(pres, "PDCAサイクル", "継続的改善の4ステップ", [
  { text: "Plan" }, { text: "Do" }, { text: "Check" }, { text: "Act" }
], "テストデータ");

// パターン 15: ガントチャート
t.addGanttChartSlide(pres, "プロジェクトスケジュール", "6ヶ月間のロードマップ", {
  headers: ["タスク", "1月", "2月", "3月", "4月", "5月", "6月"],
  rows: [
    { task: "要件定義", start: 1, end: 2 },
    { task: "設計", start: 2, end: 3 },
    { task: "開発", start: 3, end: 5 },
    { task: "テスト", start: 5, end: 6 }
  ]
}, "テストデータ");

// パターン 16: テーブル
t.addTableSlide(pres, "プラン比較表", "3つのプランから選択", {
  headers: ["機能", "Basic", "Standard", "Premium"],
  rows: [
    ["ユーザー数", "5名", "50名", "無制限"],
    ["ストレージ", "10GB", "100GB", "1TB"],
    ["月額料金", "¥980", "¥4,980", "¥19,800"]
  ]
}, "テストデータ");

// パターン 17: 背景型
t.addBackgroundSlide(pres, "市場環境の変化", "3つの外部要因が影響", {
  category: "外部環境",
  items: [
    { label: "技術革新", description: "AI技術の急速な進展" },
    { label: "規制変更", description: "データ保護規制の強化" },
    { label: "競合動向", description: "新規参入者の増加" }
  ]
}, "テストデータ");

// パターン 18: 拡散型
t.addDivergenceSlide(pres, "サービス展開戦略", "コアから3領域に展開", {
  source: "コア\nプラットフォーム",
  targets: [
    { label: "B2B SaaS", description: "企業向けクラウドサービス" },
    { label: "B2C アプリ", description: "個人向けモバイルアプリ" },
    { label: "API連携", description: "サードパーティ連携基盤" }
  ]
}, "テストデータ");

// パターン 19: 上昇型
t.addAscendingSlide(pres, "成長ロードマップ", "4段階で事業を拡大", [
  { label: "Phase 1", description: "MVP開発" },
  { label: "Phase 2", description: "PMF達成" },
  { label: "Phase 3", description: "スケール" },
  { label: "Phase 4", description: "グローバル展開" }
], "テストデータ");

// パターン 20: フロー表型
t.addFlowTableSlide(pres, "導入プロセスと各部門の役割", "3フェーズ×3部門で推進", {
  phases: ["準備", "導入", "定着"],
  categories: [
    { label: "経営", cells: ["方針決定", "進捗確認", "効果測定"] },
    { label: "IT", cells: ["環境構築", "システム導入", "運用保守"] },
    { label: "人事", cells: ["研修企画", "研修実施", "フォローアップ"] }
  ]
}, "テストデータ");

// パターン 21: フローマトリックス型
t.addFlowMatrixSlide(pres, "プロジェクト管理マトリックス", "4フェーズ×2観点で管理", {
  columns: ["企画", "設計", "開発", "運用"],
  rows: [
    { label: "品質", cells: ["要件レビュー", "設計レビュー", "コードレビュー", "モニタリング"] },
    { label: "コスト", cells: ["予算策定", "見積精査", "進捗管理", "コスト最適化"] }
  ]
}, "テストデータ");

// パターン 22: マトリックス型
t.addMatrixTableSlide(pres, "スキルマトリックス", "チームのスキルを可視化", {
  colLabels: ["フロントエンド", "バックエンド", "インフラ", "デザイン"],
  rows: [
    { label: "田中", cells: ["★★★", "★★", "★", "★★"] },
    { label: "鈴木", cells: ["★★", "★★★", "★★★", "★"] },
    { label: "佐藤", cells: ["★", "★★", "★★", "★★★"] }
  ]
}, "テストデータ");

// パターン 3: セクション扉（図解パターン）
t.addSectionSlide(pres, 3, "図解パターン（23-30）");

// パターン 23: ハブ＆スポーク
t.addHubSpokeSlide(pres, "サービス展開の全体像", "コアから5領域へ展開", {
  hub: "コア\nサービス",
  spokes: [
    { label: "B2B SaaS", description: "企業向けクラウド" },
    { label: "B2C アプリ", description: "個人向けモバイル" },
    { label: "API連携", description: "サードパーティ基盤" },
    { label: "コンサル", description: "導入支援" },
    { label: "教育", description: "研修・認定" }
  ]
}, "テストデータ");

// パターン 24: ベン図
t.addVennSlide(pres, "AIと人間の役割分担", "AIと人間の強みを組み合わせる", {
  left: {
    label: "AI の強み",
    items: ["高速処理", "大量データ解析", "24時間稼働"]
  },
  overlap: {
    label: "協働",
    items: ["意思決定支援", "品質管理"]
  },
  right: {
    label: "人間の強み",
    items: ["文脈理解", "創造性", "倫理判断"]
  }
}, "テストデータ");

// パターン 25: ピラミッド
t.addPyramidSlide(pres, "優先度の階層構造", "重要度の高いものから着手する", [
  { label: "最重要", description: "コア機能の安定稼働" },
  { label: "重要", description: "顧客満足度の向上" },
  { label: "通常", description: "新機能の追加開発" },
  { label: "低優先", description: "UIの細かな改善" }
], "テストデータ");

// パターン 26: スイムレーン
t.addSwimlaneSlide(pres, "導入プロセスの役割分担", "3部門が連携して推進", {
  phases: ["準備", "導入", "定着"],
  lanes: [
    { label: "経営", nodes: ["方針決定", "進捗確認", "効果測定"] },
    { label: "IT", nodes: ["環境構築", "システム導入", "運用保守"] },
    { label: "人事", nodes: ["研修企画", "研修実施", "フォローアップ"] }
  ]
}, "テストデータ");

// パターン 27: 同心円
t.addConcentricSlide(pres, "市場規模の構造", "TAM→SAM→SOMの順に絞り込む", [
  { label: "TAM", description: "全体市場規模 1兆円" },
  { label: "SAM", description: "参入可能市場 2,000億円" },
  { label: "SOM", description: "獲得目標市場 200億円" }
], "テストデータ");

// パターン 28: 組織図
t.addOrgChartSlide(pres, "組織構成", "3本部体制で運営", {
  root: { label: "代表取締役", sublabel: "CEO" },
  children: [
    {
      label: "事業本部", sublabel: "営業・マーケ",
      children: [
        { label: "営業部", sublabel: "" },
        { label: "マーケ部", sublabel: "" }
      ]
    },
    {
      label: "開発本部", sublabel: "プロダクト",
      children: [
        { label: "フロント", sublabel: "" },
        { label: "バックエンド", sublabel: "" }
      ]
    },
    {
      label: "管理本部", sublabel: "コーポレート",
      children: [
        { label: "人事", sublabel: "" },
        { label: "財務", sublabel: "" }
      ]
    }
  ]
}, "テストデータ");

// パターン 29: PDCA
t.addPdcaSlide(pres, "改善サイクルの運用", "月次PDCAで継続的に改善", {
  plan: { title: "目標設定", description: "KPI定義\n施策立案\nリソース配分" },
  do: { title: "施策実行", description: "チーム展開\nスケジュール管理\n進捗記録" },
  check: { title: "効果測定", description: "KPI実績確認\n課題の特定\n原因分析" },
  action: { title: "改善実施", description: "施策見直し\nベストプラクティス化\n次サイクルへ反映" }
}, "テストデータ");

// パターン 30: エージェントフロー
t.addAgentFlowSlide(pres, "AIエージェント構成", "3入力→オーケストレーター→3出力", {
  inputs: ["ユーザー入力", "ナレッジDB", "外部API"],
  center: { label: "オーケストレーター", sublabel: "Claude Sonnet" },
  outputs: ["レポート生成", "Slack通知", "DB保存"]
}, "テストデータ");

// パターン 8: まとめ
t.addConclusionSlide(pres, "全30パターンの動作確認が完了", [
  "基本パターン9種の動作を確認",
  "V2追加パターン13種の動作を確認",
  "図解追加パターン8種の動作を確認"
]);

// 出力
var path = require("path");
var outputPath = path.resolve(__dirname, "..", "output", "test_all_patterns.pptx");
pres.writeFile({ fileName: outputPath })
  .then(function() {
    console.log("テスト完了: 全30パターンのスライドを生成しました");
    console.log("出力先: " + outputPath);
  })
  .catch(function(err) {
    console.error("エラー:", err);
    process.exit(1);
  });
