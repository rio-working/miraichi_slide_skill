---
name: slide-builder
description: クライアント向け提案書・プレゼンスライドを高品質30パターンで自動生成する（Miraichiスライド）。HTML→Vercel公開でURL共有可。Use when user mentions: スライド作って, スライド作成, 提案書, プレゼン作成, クライアント提案, 資料作って（スライド形式）. Do NOT load for: TechWorker社内・TW営業資料（→tw-docs）, セミナー投影・オフライン配布の単一HTML（→slide-html-builder）, PPTXテンプレート指定の汎用生成（→slide-generator）, 草案MDからのデザインシステム適用（→slide-design-guide）.
---

# Skill: slide-builder

## Description
Detects requests to create slide decks. Routes to the slide-builder-planner agent. Supports flexible input sources and multiple output formats.

## Step 0: モード判定（最初に必ず実行）

リクエストに「提案書」「クライアント提案」「提案資料」「提案したい」が含まれる場合 → **提案書モード**
それ以外 → **汎用スライドモード**（Step 1 へ進む）

### 提案書モード — ヒアリングゲート（スキップ禁止）

スライドを作る前にヒアリングが完了しているか確認する。未完了なら `clarify-client-request` スキルへ誘導。

**0-1. 案件タイプの確認**
> 「新規案件ですか？それとも既存クライアントからの相談（改善・効率化依頼）ですか？」

| タイプ | スライド構成 |
|---|---|
| 新規案件 | 3プラン縦展開（スタート→スタンダード★→フルサポート） |
| 既存クライアント相談 | 横並び比較表（案A/B/Cを選ばせる形） |

**0-2. 提案内容の6ステップ確認**

| ステップ | 確認内容 |
|---|---|
| ①お悩みへの共感 | 相手の困りごとを言語化できているか |
| ②今の状況の整理 | 現状を「そうそう」と思えるレベルで整理できているか |
| ③理想のゴール | ヒアリングで確認したゴールを「こう理解しました」の形で書けるか（AIで補完しない） |
| ④プランと料金と安心材料 | 料金・不安フォローがセットで準備できているか |
| ⑤進め方 | スケジュール・役割分担があるか |
| ⑥次のアクション | クライアントが明日取る1アクションが決まっているか |

**0-3. アクセントカラーの確認**（デフォルト: Miraichiグリーン×アンバー）
> 「クライアントのブランドカラーに合わせますか？（会社名またはURLを教えてください）」

**0-4. プラン名の確認（新規案件のみ）**
> 「3つのプランの名前を教えてください。（例：スタートプラン／スタンダードプラン／フルサポートプラン）」

**プラン名ルール（違反したら指摘する）:**
- 最初に決めた名前をスライド全体で統一する
- 番号（①②③）・アルファベット（A/B/C）・松竹梅での表記禁止
- 推奨プランには「★」または「（推奨）」を付ける

0-1〜0-4 が揃ったら slide-architect の **提案書テンプレート** を使って構成し、Step 3 へ進む。

---

## Step 1: 入力ソースを確認する

ユーザーの指示に入力ソースが明示されていない場合は確認する:

| 入力タイプ | 取り込み方法 |
|---|---|
| チャット直接テキスト | そのまま使用 |
| `.docx` | python-docx または Read ツールで本文抽出 |
| `.md` | Read ツールでそのまま読む |
| `.pdf` | Read ツール（PDF対応）で読み込む |
| URL | WebFetch ツールで本文取得 |

複数ソースが渡された場合はすべて読み込んでから planner に渡す。

## Step 2: 不明な項目をまとめて1回で確認する（AskUserQuestion）

ユーザーが既に明示している項目はスキップ。不明な項目だけ1回でまとめて聞く。

| 項目 | 選択肢（推奨を先頭に） |
|---|---|
| 出力形式 | ① PPTX（推奨） ② HTML ③ Google Slides ④ 全部 |
| 対象読者 | ① 経営層 ② 現場担当 ③ 一般社員 ④ 不問 |
| スライド枚数 | ① 自動判断（推奨） ② 5枚以内 ③ 10枚前後 ④ 20枚前後 |

**迷ったら止まって聞く。勝手に決めて進めない。**

## Step 3: slide-builder-planner へ引き渡す

収集した全コンテキストを planner に渡す:
- topic, audience, purpose, slide_count
- input_source（入力タイプとパス/テキスト）
- output_format（PPTX / HTML / Google Slides）
- company_name / company_url（ブランドカラー適用時）
- style_preference

## Routing
```
User Request → [入力ソース取り込み] → [AskUserQuestion] → slide-builder-planner agent
```

## Important
- This skill contains NO slide design logic.
- This skill contains NO research logic.
- The トヨマネ式 methodology lives in the slide-architect agent.
- All planning and execution happen in agents.
- HTML出力の詳細: `.claude/references/html-export.md`
- Google Slides出力の詳細: `.claude/references/gslides-export.md`

## 提案書モード — 完了後フロー

### URL発行（クライアントへ共有する場合）

HTML形式で出力した場合、`html-pages` リポジトリ経由でVercel公開する：

```bash
cp <生成したHTMLファイル> ~/html-pages/
cd ~/html-pages
git add <ファイル名>.html
git commit -m "feat: add slide <案件名>"
git push
```

公開URL形式: `https://html-pages-rosy.vercel.app/<ファイル名>.html`（約30秒で公開）

### ペルソナ評価（クライアントへ送る前に推奨）

```
/persona-review
[提案書の概要をここに記述]
※ CTOペルソナは「費用を判断する経営者（依頼主と同一の場合もある）」として読み替えること
```

---

## 企画書作成の標準フロー（クライアント向け提案）

1. **商談当日** → Miraichiスライド（PPTX or HTML slide形式）でプレゼン
2. **商談後即日** → 縦長HTML（スクロール形式）を送付（稟議回し・後日確認用）

**セクション扉（Pattern 3）は各テーマ間に必須**：クライアントが頭を切り替えるための余白スライド。省略不可。
