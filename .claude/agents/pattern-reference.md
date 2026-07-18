# Agent: pattern-reference

各スライドパターンの引数・プロパティ名リファレンス。
プロパティ名を間違えるとスライドが空欄になるため、必ずここで確認する。

## パターン 5: 列挙型

```javascript
t.addEnumerationSlide(pres, "タイトル", "キーメッセージ", [
  { title: "項目名", description: "説明文" },  // ※ desc ではなく description
  { title: "項目名", description: "説明文" }
], "出所");
```

## パターン 6: 2カラム比較

```javascript
// col1, col2 は別引数。1つのオブジェクトにまとめない
t.addTwoColumnSlide(pres, "タイトル", "キーメッセージ",
  { title: "左タイトル", points: ["項目1", "項目2"] },  // ※ items ではなく points
  { title: "右タイトル", points: ["項目1", "項目2"] },  // ※ items ではなく points
  "出所"
);
```

## パターン 7: 統計数値

```javascript
t.addStatsSlide(pres, "タイトル", "キーメッセージ", [
  { value: "150%", label: "ラベル", description: "補足説明" }
], "出所");
```

## パターン 10: グラフ

```javascript
t.addChartSlide(pres, "BAR", [  // "BAR", "LINE", "PIE", "DOUGHNUT"
  { name: "系列名", labels: ["Q1","Q2"], values: [100, 200] }
], {
  title: "タイトル",
  keyMessage: "キーメッセージ",
  explanation: { title: "説明タイトル", text: "説明文" },
  source: "出所"
});
```

## パターン 11: フロー（横型）

```javascript
t.addFlowChartSlide(pres, "タイトル", "キーメッセージ", [
  { text: "ステップ名", description: "説明文" }  // ※ title ではなく text
], "出所");
```

## パターン 11b: フロー（縦型）

```javascript
t.addVerticalFlowSlide(pres, "タイトル", "キーメッセージ", [
  { text: "ステップ名", description: "説明文" }  // ※ title ではなく text
], "出所");
```

## パターン 12: 比較対照

```javascript
t.addComparisonSlide(pres, "タイトル", "キーメッセージ", {
  col1: { title: "左タイトル", points: ["項目1", "項目2"] },
  col2: { title: "右タイトル", points: ["項目1", "項目2"] }
}, "出所");
```

## パターン 13: 4象限マトリックス

```javascript
t.addMatrix4QuadrantSlide(pres, "タイトル", "キーメッセージ", {
  axisLabels: { xHigh: "右", xLow: "左", yHigh: "上", yLow: "下" },
  quadrants: [
    { label: "左上", description: "説明" },
    { label: "右上", description: "説明" },
    { label: "左下", description: "説明" },
    { label: "右下", description: "説明" }
  ],
  points: [{ label: "点名", x: 60, y: 70 }]
}, "出所");
```

## パターン 14: サイクル図

```javascript
t.addCycleDiagramSlide(pres, "タイトル", "キーメッセージ", [
  { text: "ステップ1" }, { text: "ステップ2" }
], "出所");
```

## パターン 15: ガントチャート

```javascript
t.addGanttChartSlide(pres, "タイトル", "キーメッセージ", {
  headers: ["タスク", "1月", "2月", "3月"],
  rows: [{ task: "タスク名", start: 1, end: 2 }]
}, "出所");
```

## パターン 16: テーブル

```javascript
t.addTableSlide(pres, "タイトル", "キーメッセージ", {
  headers: ["列1", "列2", "列3"],
  rows: [["値1", "値2", "値3"]]
}, "出所");
```

## パターン 17: 背景型

```javascript
t.addBackgroundSlide(pres, "タイトル", "キーメッセージ", {
  category: "カテゴリ名",
  items: [{ label: "項目名", description: "説明" }]
}, "出所");
```

## パターン 18: 拡散型

```javascript
t.addDivergenceSlide(pres, "タイトル", "キーメッセージ", {
  source: "中心ラベル",
  targets: [{ label: "展開先", description: "説明" }]
}, "出所");
```

## パターン 19: 上昇型

```javascript
t.addAscendingSlide(pres, "タイトル", "キーメッセージ", [
  { label: "ステップ名", description: "説明" }
], "出所");
```

## パターン 20: フロー表型

```javascript
t.addFlowTableSlide(pres, "タイトル", "キーメッセージ", {
  phases: ["フェーズ1", "フェーズ2"],
  categories: [{ label: "行ラベル", cells: ["値1", "値2"] }]
}, "出所");
```

## パターン 21: フローマトリックス型

```javascript
t.addFlowMatrixSlide(pres, "タイトル", "キーメッセージ", {
  columns: ["列1", "列2"],
  rows: [{ label: "行ラベル", cells: ["値1", "値2"] }]
}, "出所");
```

## パターン 22: マトリックス型

```javascript
t.addMatrixTableSlide(pres, "タイトル", "キーメッセージ", {
  colLabels: ["列1", "列2"],
  rows: [{ label: "行ラベル", cells: ["値1", "値2"] }]
}, "出所");
```

## パターン 23: ハブ＆スポーク

```javascript
t.addHubSpokeSlide(pres, "タイトル", "キーメッセージ", {
  hub: "中心テキスト",
  spokes: [{ label: "要素名", description: "説明" }]  // 3〜6個推奨
}, "出所");
```

## パターン 24: ベン図

```javascript
t.addVennSlide(pres, "タイトル", "キーメッセージ", {
  left:    { label: "左タイトル", items: ["項目1", "項目2"] },
  right:   { label: "右タイトル", items: ["項目1", "項目2"] },
  overlap: { label: "共通タイトル", items: ["項目1"] }  // 共通エリア
}, "出所");
```

## パターン 25: ピラミッド

```javascript
t.addPyramidSlide(pres, "タイトル", "キーメッセージ", [
  { label: "階層名", description: "説明" }
  // index 0 が頂点（最重要）→ 下に行くほど幅が広がる。3〜5段推奨
], "出所");
```

## パターン 26: スイムレーン

```javascript
t.addSwimlaneSlide(pres, "タイトル", "キーメッセージ", {
  phases: ["フェーズ1", "フェーズ2"],  // 列ヘッダー（2〜4個）
  lanes:  [{ label: "担当者名", nodes: ["ノード1", "ノード2"] }]
  // lanes の nodes は phases と同数。空欄は "" で渡す
}, "出所");
```

## パターン 27: 同心円

```javascript
t.addConcentricSlide(pres, "タイトル", "キーメッセージ", [
  { label: "円の名前", description: "説明" }
  // index 0 が最外円 → index が大きいほど内側。3〜5段推奨
], "出所");
```

## パターン 28: 組織図

```javascript
t.addOrgChartSlide(pres, "タイトル", "キーメッセージ", {
  root: { label: "トップ", sublabel: "補足" },
  children: [
    { label: "部門", sublabel: "補足", children: [{ label: "課", sublabel: "補足" }] }
  ]
  // 最大3階層。孫ノードは children[i].children に配列で渡す
}, "出所");
```

## パターン 29: PDCA

```javascript
t.addPdcaSlide(pres, "タイトル", "キーメッセージ", {
  plan:   { title: "計画名", description: "説明" },  // ※ label ではなく title
  do:     { title: "実行名", description: "説明" },
  check:  { title: "評価名", description: "説明" },
  action: { title: "改善名", description: "説明" }
}, "出所");
```

## パターン 30: エージェントフロー

```javascript
t.addAgentFlowSlide(pres, "タイトル", "キーメッセージ", {
  inputs:  ["入力1", "入力2"],                       // 上段ノード（2〜4個）
  center:  { label: "エージェント名", sublabel: "補足" }, // 中心
  outputs: ["出力1", "出力2"]                        // 下段ノード（2〜4個）
}, "出所");
```
