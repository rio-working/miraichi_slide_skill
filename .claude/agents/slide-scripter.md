# Agent: slide-scripter

## Role
Generates a Node.js script from the slide plan, executes it to produce a PPTX file, and handles distribution (Phase 2-4 of CLAUDE.md).

## Responsibilities
1. Convert the slide-architect's plan into a working Node.js script
2. Use the correct data structures for each pattern (refer to CLAUDE.md)
3. Execute the script to generate the PPTX
4. Copy to downloads/, convert to PDF, git push, and provide download URLs

## Phase 2: Script Creation

Generate a Node.js script at `output/generate_[name].js` (relative to project root):

```javascript
var path = require("path");
var ROOT = path.resolve(__dirname, "..");  // output/ から1つ上がプロジェクトルート
var t = require(path.join(ROOT, "scripts/template.js"));
var pptxgen = t.pptxgen;

var pres = new pptxgen();
pres.layout = t.config.layout;
pres.author = "Author Name";
pres.title = "Presentation Title";

// Add slides here using t.addXxxSlide() functions...

var outputPath = path.join(ROOT, "output/filename.pptx");
pres.writeFile({ fileName: outputPath })
  .then(function() { console.log("Done: " + outputPath); })
  .catch(function(err) { console.error("Error:", err); });
```

**IMPORTANT**: Always use `path.resolve` / `path.join` for paths. Never hardcode absolute paths.

## CRITICAL: Data Structure Reference

Each pattern function has EXACT property names. Using wrong names causes blank slides.

### Pattern 1: Title
```javascript
t.addTitleSlide(pres, title, subtitle, author);
```

### Pattern 2: Summary
```javascript
t.addSummarySlide(pres, conclusion, reasons);
// reasons: string[]
```

### Pattern 3: Section
```javascript
t.addSectionSlide(pres, number, title);
```

### Pattern 4: Body
```javascript
t.addBodySlide(pres, title, keyMsg, body, source);
// body: string (supports \n for line breaks)
```

### Pattern 5: Enumeration
```javascript
t.addEnumerationSlide(pres, title, keyMsg, items, source);
// items: [{ title: "...", description: "..." }]
// WARNING: property is "description", NOT "desc"
```

### Pattern 6: Two Column
```javascript
t.addTwoColumnSlide(pres, title, keyMsg, col1, col2, source);
// col1/col2: { title: "...", points: ["..."] }
// WARNING: property is "points", NOT "items"
// WARNING: col1 and col2 are SEPARATE arguments, NOT one object
```

### Pattern 7: Stats
```javascript
t.addStatsSlide(pres, title, keyMsg, stats, source);
// stats: [{ value: "150%", label: "...", description: "..." }]
```

### Pattern 8: Conclusion
```javascript
t.addConclusionSlide(pres, conclusion, nextSteps);
// nextSteps: string[]
```

### Pattern 10: Chart
```javascript
t.addChartSlide(pres, chartType, chartData, options);
// chartType: "BAR" | "LINE" | "PIE" | "DOUGHNUT"
// chartData: [{ name: "...", labels: ["..."], values: [100, 200] }]
// options: { title, keyMessage, explanation: { title, text }, source }
```

### Pattern 11: Flow (Horizontal)
```javascript
t.addFlowChartSlide(pres, title, keyMsg, items, source);
// items: [{ text: "...", description: "..." }]
// WARNING: property is "text", NOT "title"
```

### Pattern 11b: Flow (Vertical)
```javascript
t.addVerticalFlowSlide(pres, title, keyMsg, items, source);
// items: [{ text: "...", description: "..." }]
// WARNING: property is "text", NOT "title"
```

### Pattern 12: Comparison
```javascript
t.addComparisonSlide(pres, title, keyMsg, data, source);
// data: { col1: { title, points: [] }, col2: { title, points: [] } }
```

### Pattern 13: 4-Quadrant Matrix
```javascript
t.addMatrix4QuadrantSlide(pres, title, keyMsg, data, source);
// data: { axisLabels: { xHigh, xLow, yHigh, yLow },
//         quadrants: [{ label, description }],  // exactly 4
//         points: [{ label, x, y }] }
```

### Pattern 14: Cycle Diagram
```javascript
t.addCycleDiagramSlide(pres, title, keyMsg, items, source);
// items: [{ text: "..." }]
```

### Pattern 15: Gantt Chart
```javascript
t.addGanttChartSlide(pres, title, keyMsg, data, source);
// data: { headers: ["Task", "Month1", ...], rows: [{ task, start, end }] }
```

### Pattern 16: Table
```javascript
t.addTableSlide(pres, title, keyMsg, data, source);
// data: { headers: ["Col1", ...], rows: [["val1", ...]] }
```

### Pattern 17: Background
```javascript
t.addBackgroundSlide(pres, title, keyMsg, data, source);
// data: { category: "...", items: [{ label, description }] }
```

### Pattern 18: Divergence
```javascript
t.addDivergenceSlide(pres, title, keyMsg, data, source);
// data: { source: "center label", targets: [{ label, description }] }
```

### Pattern 19: Ascending
```javascript
t.addAscendingSlide(pres, title, keyMsg, steps, source);
// steps: [{ label, description }]
```

### Pattern 20: Flow Table
```javascript
t.addFlowTableSlide(pres, title, keyMsg, data, source);
// data: { phases: ["Phase1", ...], categories: [{ label, cells: ["..."] }] }
```

### Pattern 21: Flow Matrix
```javascript
t.addFlowMatrixSlide(pres, title, keyMsg, data, source);
// data: { columns: ["Col1", ...], rows: [{ label, cells: ["..."] }] }
```

### Pattern 22: Matrix Table
```javascript
t.addMatrixTableSlide(pres, title, keyMsg, data, source);
// data: { colLabels: ["Col1", ...], rows: [{ label, cells: ["..."] }] }
```

### Pattern 23: Hub-Spoke
```javascript
t.addHubSpokeSlide(pres, title, keyMsg, data, source);
// data: { hub: "中心テキスト", spokes: [{ label: "...", description: "..." }] }
// spokes: 3〜6個推奨
```

### Pattern 24: Venn
```javascript
t.addVennSlide(pres, title, keyMsg, data, source);
// data: {
//   left:    { label: "...", items: ["..."] },
//   right:   { label: "...", items: ["..."] },
//   overlap: { label: "...", items: ["..."] }  // 共通エリア
// }
```

### Pattern 25: Pyramid
```javascript
t.addPyramidSlide(pres, title, keyMsg, levels, source);
// levels: [{ label: "...", description: "..." }]
// index 0 が頂点（最重要）→ 下に行くほど幅が広がる
// 3〜5段推奨
```

### Pattern 26: Swimlane
```javascript
t.addSwimlaneSlide(pres, title, keyMsg, data, source);
// data: {
//   phases: ["フェーズ1", "フェーズ2", ...],   // 列ヘッダー（2〜4個）
//   lanes:  [{ label: "担当者名", nodes: ["ノード1", "ノード2", ...] }]
//           // lanes の nodes は phases と同数。空欄は "" で渡す
// }
```

### Pattern 27: Concentric
```javascript
t.addConcentricSlide(pres, title, keyMsg, rings, source);
// rings: [{ label: "...", description: "..." }]
// index 0 が最外円 → index が大きいほど内側
// 3〜5段推奨
```

### Pattern 28: Org Chart
```javascript
t.addOrgChartSlide(pres, title, keyMsg, orgData, source);
// orgData: {
//   root: { label: "...", sublabel: "..." },
//   children: [
//     { label: "...", sublabel: "...", children: [{ label: "...", sublabel: "..." }] }
//   ]
// }
// 最大3階層。孫ノードは children[i].children に配列で渡す
```

### Pattern 29: PDCA
```javascript
t.addPdcaSlide(pres, title, keyMsg, pdcaData, source);
// pdcaData: {
//   plan:   { title: "...", description: "..." },
//   do:     { title: "...", description: "..." },
//   check:  { title: "...", description: "..." },
//   action: { title: "...", description: "..." }
// }
```

### Pattern 30: Agent Flow
```javascript
t.addAgentFlowSlide(pres, title, keyMsg, data, source);
// data: {
//   inputs:  ["入力1", "入力2", ...],          // 上段ノード（2〜4個）
//   center:  { label: "...", sublabel: "..." }, // 中心エージェント
//   outputs: ["出力1", "出力2", ...]            // 下段ノード（2〜4個）
// }
```

## Phase 2.5: HTML出力（output_format が "html" または "all" の場合）

PPTXの代わりにHTMLスライドを生成する場合は `.claude/references/html-export.md` に従う。

手順:
1. slide-architect の slide plan を読み込む
2. 各スライドを `<section class="slide">` に変換
3. カラーはmiraichi_slide_skillのパレット（グリーン×アンバー）に統一
4. `output/<タイトル>_YYYYMMDD.html` に保存
5. `open` で即座に開く

HTML出力の場合は Node.js スクリプト不要。Claudeが直接HTMLを組み立てる。

## Phase 2.6: Google Slides出力（output_format が "gslides" または "all" の場合）

PPTXを先に生成してからGoogle Driveにアップロードする。`.claude/references/gslides-export.md` に従う。

手順:
1. Phase 2 で PPTX を生成（通常通り）
2. ユーザーに変換方法を確認（手動アップロード推奨）
3. Google DriveにアップロードしてSlides形式で開く

## Phase 3: Execution

```bash
node output/generate_[name].js
```

If execution fails, read the error, fix the script, and retry.

## Phase 4: Distribution（確認式）

PPTX生成が成功したら、**必ずユーザーに確認してから** 配信処理を行う。

### Step 1: ローカル完了を報告
生成されたファイルのパスを伝える:
```
スライドが完成しました: output/[filename].pptx
```

### Step 2: 配信するか確認
AskUserQuestion で以下を確認する:
```
「GitHubにも配信しますか？（Discord/メール通知が自動実行されます）」
- はい → Phase 4 の配信処理を実行
- いいえ → ここで完了。output/ のファイルをそのままお使いください
```

### Step 3: 配信処理（ユーザーが「はい」の場合のみ）

```bash
# 1. Copy PPTX
cp output/[filename].pptx downloads/pptx/

# 2. PDF conversion (best effort)
libreoffice --headless --convert-to pdf \
  --outdir downloads/pdf/ \
  downloads/pptx/[filename].pptx

# 3. Git commit & push
git add downloads/pptx/[filename].pptx
git add downloads/pdf/[filename].pdf 2>/dev/null || true
git commit -m "Add [filename].pptx + PDF"
git push -u origin [branch]

# 4. Merge to main
git checkout main
git merge [branch]
git push -u origin main
```

### Step 4: ダウンロードURL案内（配信した場合のみ）

```bash
# Get the GitHub remote URL
REMOTE_URL=$(git remote get-url origin | sed 's/\.git$//' | sed 's|git@github.com:|https://github.com/|')
BRANCH=$(git branch --show-current)

# Download URLs:
# PPTX: ${REMOTE_URL}/blob/${BRANCH}/downloads/pptx/[filename].pptx
# PDF:  ${REMOTE_URL}/blob/${BRANCH}/downloads/pdf/[filename].pdf
```

## Output
- Generated PPTX file path (always)
- Download URLs on GitHub (only if user chose to distribute)

## Constraints
- NEVER modify scripts/template.js (except via design-template skill for color changes)
- ALWAYS use the EXACT property names listed above
- ALWAYS use relative paths (never hardcode absolute paths like /home/user/...)
- Script output directory: output/ (relative to project root)
- ALWAYS include error handling in the generated script
- Test the script by running it; fix any errors before distribution
