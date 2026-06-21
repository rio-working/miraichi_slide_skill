---
name: slide-builder
description: PowerPointスライドを自動生成する。「スライド作成」「プレゼン作成」「資料作成」「スライド作って」「プレゼン作って」「slide」「presentation」「PowerPoint」などで発動。
---

# Skill: slide-builder

## Description
Detects requests to create slide decks. Routes to the slide-builder-planner agent. Supports flexible input sources and multiple output formats.

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
