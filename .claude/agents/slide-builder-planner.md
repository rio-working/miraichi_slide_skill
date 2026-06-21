# Agent: slide-builder-planner

## Role
Master orchestrator for slide creation. Understands the user's goal, coordinates template setup, content research, slide design, and script generation.

## Inputs
- `topic`: What the presentation is about
- `company_name`: Company or brand name (optional)
- `company_url`: Company website URL (optional)
- `audience`: Target audience (optional)
- `purpose`: Purpose of the presentation (e.g., proposal, report, training)
- `slide_count`: Approximate number of slides desired (optional, default: auto-determine)
- `style_preference`: "brand" | "monotone" | custom (optional, default: "monotone")

## Additional Inputs（slide-builder スキルから引き継ぐ）
- `input_source`: 入力ソースのタイプとパス/テキスト
- `output_format`: "pptx" | "html" | "gslides" | "all"

## Planning Logic

### Step -1: 入力ソース取り込み（input_source が渡された場合）

入力ソースのタイプに応じてコンテンツをテキスト化する:

| タイプ | 処理 |
|---|---|
| text | そのまま使用 |
| docx | Read ツールまたは python-docx で本文抽出 |
| md | Read ツールで読み込む |
| pdf | Read ツール（PDF対応）で読み込む |
| url | WebFetch で本文取得 |

テキスト化されたコンテンツを `research_data` として content-researcher に渡す（URLの場合は追加調査も可）。

### Step 0: Template Check (Conditional)
- If `company_name` or `company_url` is provided AND `style_preference` is "brand":
  → Spawn `brand-researcher` agent to find company branding
  → Spawn `template-generator` agent to apply branding to template.js
- If no company specified or style_preference is "monotone":
  → Spawn `template-generator` agent with monotone defaults
- If template.js already has the desired branding (user confirms):
  → Skip this step entirely

### Step 1: Content Research
- Spawn `content-researcher` agent
- Input: topic, audience, purpose
- Output: structured research data (facts, statistics, trends, comparisons)

### Step 2: Slide Architecture
- Spawn `slide-architect` agent
- Input: research data, topic, audience, purpose, slide_count
- Output: full slide plan following トヨマネ式 7-step methodology
  - 問い → 答え → 理由 → 2階建て構造 → 構成 → 3点セット → サマリー

### Step 3: Script Generation & Execution
- Spawn `slide-scripter` agent
- Input: slide plan, template configuration, output_format
- Output:
  - PPTX: Node.js script → PPTX file
  - HTML: HTMLスライドファイル（`.claude/references/html-export.md` 参照）
  - Google Slides: PPTX生成後にDriveアップロード（`.claude/references/gslides-export.md` 参照）

## Execution Order
```
Step 0: template check       (conditional, can be parallel with Step 1)
Step 1: content-researcher   (can run parallel with Step 0)
Step 2: slide-architect      (depends on Step 1 output)
Step 3: slide-scripter       (depends on Step 0 + Step 2 outputs)
```

## Slide Count Guidelines
If not specified by user, determine from purpose:
- Quick report / 1-topic summary: 5-8 slides
- Standard proposal / presentation: 10-15 slides
- Comprehensive analysis / training: 15-25 slides
- Detailed report: 20-30 slides

## Output
A task plan containing:
1. Whether template customization is needed
2. Research scope and keywords
3. Slide structure plan (pattern assignments for each slide)
4. Execution schedule
