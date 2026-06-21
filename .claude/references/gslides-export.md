# Google Slides Export

PPTXを先に生成 → Google Driveにアップロード → Slides形式に自動変換する流れ。
Google Slides APIでゼロから組み立てない（PPTX経由の方がシンプルで確実）。

## 推奨フロー

### オプション1: 手動アップロード（推奨・最もシンプル）

1. Phase 2 で PPTX を生成（通常通り）
2. ユーザーに案内:

```
PPTXファイルを生成しました:
  output/[filename].pptx

Google Slidesで使う場合:
  1. このPPTXをGoogle Driveにアップロード
  2. Drive上で右クリック → 「アプリで開く」→「Google スライド」
  3. 編集可能なGoogle Slidesとして開きます
```

### オプション2: GAS経由（自動化が必要な場合）

```javascript
function uploadPptxToSlides(blob) {
  const resource = {
    name: 'presentation_name',
    mimeType: MimeType.GOOGLE_SLIDES
  };
  const file = Drive.Files.insert(resource, blob, { convert: true });
  return file.alternateLink;
}
```

### オプション3: ブラウザMCP（最終手段）

`mcp__plugin_chrome-devtools-mcp_chrome-devtools__*` ツールが使える場合のみ。
操作が複雑で失敗率が高いため、手動アップロードを先に提案する。

## 確認フロー

「Google Slidesで出して」と言われたら AskUserQuestion で確認:

```
① PPTXを生成して手動でDriveアップロード（推奨・最速）
② GASスクリプトでDriveに直接保存
③ ブラウザ操作で自動アップロード
```

特に指定がなければ ① を推奨。

## 変換時の注意

- フォント: Noto Sans JP はGoogle Slidesでも表示される
- シェイプ: pptxgenjsで生成した矩形・線は概ね保持される
- グラデーション・複雑なシェイプは色のみ保持される場合がある
