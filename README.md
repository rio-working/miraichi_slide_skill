# miraichi_slide_skill

Claude Codeに指示するだけで、全**30パターン**の高品質ビジネススライドを自動生成するスキルです。
トヨマネ式メソッド（問い→答え→理由→2階建て構造）＋ 図解パターン完全網羅。

---

## クイックスタート

### 前提条件

- [Node.js](https://nodejs.org/) v16以上
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) がインストール済み

### セットアップ

```bash
git clone https://github.com/rio-working/miraichi_slide_skill.git
cd miraichi_slide_skill
npm install
mkdir -p output
claude
```

### 使い方（Claude Codeで指示するだけ）

```
「AI市場の最新動向について10枚のプレゼン資料を作って」
「このPDFをもとにスライドを作成して」
「トヨタのブランドカラーで提案書を作って」
「HTML形式でスライドを出力して」
```

---

## デザイン指定

**スライドごと・資料ごとに色味・雰囲気を自由に指定できます。**

### デフォルト：miraichi グリーン×アンバー

| カラー | HEX | 用途 |
|---|---|---|
| DARK_GREEN | `#00A495` | ヘッダー・キーメッセージバー・強調 |
| CREAM_YELLOW | `#FABF00` | アクセント・番号バッジ・矢印 |
| LIGHT_GRAY | `#F5F8F7` | カード背景 |
| TEXT_DARK | `#2C3E3B` | 見出し・主要テキスト |
| TEXT_MEDIUM | `#4A5B58` | 本文テキスト |
| TEXT_LIGHT | `#7A8C89` | 補足・出所 |

### 都度指定できる3パターン

#### 1. ブランドカラー指定（企業名・URLで自動リサーチ）

```
「トヨタの公式サイトのカラーでスライドを作って」
「https://www.example.co.jp のブランドカラーを使って」
```

Claude が公式サイトからカラーを自動抽出し、カラーパレットを更新してからスライドを生成します。

#### 2. カラー直接指定

```
「プライマリカラー #0057A8、アクセント #FF6B35 で作って」
```

#### 3. モノトーン

```
「モノトーンでシンプルに作って」
```

白×黒×グレーでクリーンな仕上がりになります。

> **ポイント**: カラー変更は1資料ごとに完結します。次の資料を作るときは改めて指定してください。

---

## 出力形式

3つの形式から選べます（1つの指示で複数同時出力も可）。

| 形式 | 指定方法 | 特徴 |
|---|---|---|
| **PPTX**（デフォルト） | 指定なし or「PPTXで」 | 編集可能なPowerPointファイル |
| **HTML** | 「HTMLで」「ブラウザで見たい」 | 単一ファイル・フルスクリーン対応・←→キーナビ |
| **Google Slides** | 「Google Slidesで」 | PPTX生成後にDriveアップロード案内 |

---

## 入力形式

テキスト指示のほか、既存ドキュメントを渡してスライド化できます。

```
「この議事録（meeting.md）をスライドにして」
「添付のPDF資料をもとにプレゼンを作って」
「https://example.com/report の内容を資料にして」
```

| 入力タイプ | 対応形式 |
|---|---|
| テキスト | 直接入力 |
| ドキュメント | .docx / .md / .pdf |
| URL | Webページ自動取得 |

---

## 全30パターン

| # | パターン | 用途 |
|---|---------|------|
| 1 | 表紙 | プレゼンの冒頭 |
| 2 | サマリー | 結論と理由の提示 |
| 3 | セクション扉 | 章の区切り |
| 4 | 本文 | テキスト中心の説明 |
| 5 | 列挙型 | 番号付きリスト |
| 6 | 2カラム比較 | 左右2列の比較 |
| 7 | 統計数値 | KPI・数値の強調 |
| 8 | まとめ | 結論とNext Steps |
| 9 | 画像 | 画像の表示 |
| 10 | グラフ | 棒・円・折れ線グラフ |
| 11 | フロー（横型） | 横方向のプロセスフロー |
| 11b | フロー（縦型） | 縦方向のプロセスフロー |
| 12 | 比較対照 | 2要素の詳細比較 |
| 13 | 4象限マトリックス | 2軸4領域の分類 |
| 14 | サイクル図 | 循環プロセス |
| 15 | ガントチャート | スケジュール・工程表 |
| 16 | テーブル | データ一覧・比較表 |
| 17 | 背景型 | カテゴリ＋項目リスト |
| 18 | 拡散型 | 1→多の分岐構造 |
| 19 | 上昇型 | 段階的な成長・ステップ |
| 20 | フロー表型 | フロー矢印＋マトリックス表 |
| 21 | フローマトリックス型 | フロー矢印＋行列マトリックス |
| 22 | マトリックス型 | 行ラベル×列ラベルの表 |
| 23 | ハブ＆スポーク | 中心概念→複数要素の放射状接続 |
| 24 | ベン図 | 2要素の重複・共通点の可視化 |
| 25 | ピラミッド | 優先度・成熟度の階層構造 |
| 26 | スイムレーン | 複数担当者の役割分担フロー |
| 27 | 同心円 | ネスト構造・市場スコープの階層 |
| 28 | 組織図 | チーム・会社の階層構造 |
| 29 | PDCA | 改善サイクルの可視化 |
| 30 | エージェントフロー | AI/システムアーキテクチャ図 |

---

## スキル構成

```
ユーザー指示
  └── slide-builder スキル
        ├── [Step -1] 入力ソース取り込み（docx/pdf/url → テキスト化）
        ├── [Step 0]  デザインリサーチ（ブランドカラー指定時のみ）
        ├── [Step 1]  content-researcher（トピックリサーチ）
        ├── [Step 2]  slide-architect（トヨマネ式7ステップ設計）
        └── [Step 3]  slide-scripter（PPTX/HTML/GSlides 生成・配信）
```

---

## テスト

```bash
npm test
```

全30パターンのテストスライドが `output/test_all_patterns.pptx` に生成されます。

---

## ディレクトリ構成

```
miraichi_slide_skill/
├── .claude/
│   ├── skills/              ← Claude Codeスキル（エントリーポイント）
│   │   ├── slide-builder/SKILL.md
│   │   └── design-template/SKILL.md
│   ├── agents/              ← エージェント定義
│   │   ├── brand-researcher.md
│   │   ├── content-researcher.md
│   │   ├── design-template-planner.md
│   │   ├── slide-architect.md       ← 30パターン選択ロジック
│   │   ├── slide-builder-planner.md ← 入力ソース・出力形式の振り分け
│   │   ├── slide-scripter.md        ← PPTX/HTML/GSlides生成
│   │   └── template-generator.md
│   ├── references/          ← 実装リファレンス
│   │   ├── html-export.md   ← HTMLスライドテンプレート・変換ルール
│   │   ├── gslides-export.md← Google Slides出力フロー
│   │   └── color-palettes.md← カラーパレット定義
│   └── workflows/
│       ├── design-template_workflow.md
│       └── slide-builder_workflow.md
├── scripts/
│   ├── template.js          ← コアライブラリ（全30パターン）
│   ├── test.js              ← 全パターンテスト
│   └── presets/             ← 企業カラープリセット
├── downloads/               ← 配信用（PPTX/PDF）
├── output/                  ← 生成ファイル（gitignored）
├── CLAUDE.md                ← Claude Code用ルール・詳細仕様
└── package.json
```

---

## 通知設定（任意）

`downloads/` にプッシュすると GitHub Actions でDiscord/メール通知が自動実行されます。
未設定はスキップされるので、不要なら設定不要。

| 変数名 | 説明 |
|---|---|
| `DISCORD_WEBHOOK_URL` | DiscordチャンネルのWebhook URL |
| `MAIL_USERNAME` | Gmail（SMTP認証用） |
| `MAIL_PASSWORD` | Googleアプリパスワード（16文字） |
| `MAIL_TO` | 送信先 |
| `MAIL_FROM` | 送信元 |

設定場所: GitHub **Settings > Secrets and variables > Actions**

---

## ライセンス

MIT
