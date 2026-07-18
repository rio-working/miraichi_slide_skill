# HTML Export

miraichi_slide_skillのデザインに合わせたHTMLスライド出力手順。
1ファイルで完結する自己完結型HTMLを生成する。

## カラー定義（template.js と動的に同期させる）

> **重要**: HTML出力前に必ず `scripts/template.js` の `COLORS` オブジェクトの現在値を読み取り、
> 以下のCSS変数に反映すること（`--primary` ← `COLORS.DARK_GREEN`、`--accent` ← `COLORS.CREAM_YELLOW`）。
> Phase 0 のブランドリサーチやプリセットで template.js が更新されている場合、
> ここに固定値を使うとPPTXとHTMLで色が食い違う。以下のHEX値はMiraichi標準時の**例**にすぎない。

```css
:root {
  --primary:      #00A495;  /* ← COLORS.DARK_GREEN の現在値を反映 */
  --accent:       #FABF00;  /* ← COLORS.CREAM_YELLOW の現在値を反映 */
  --bg:           #FFFFFF;
  --bg-light:     #F5F8F7;  /* LIGHT_GRAY */
  --text-dark:    #2C3E3B;
  --text-medium:  #4A5B58;
  --text-light:   #7A8C89;
}
```

## HTMLテンプレート骨格

```html
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>{{TITLE}}</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap" rel="stylesheet">
<style>
  :root {
    --primary: #00A495; /* ← template.js COLORS.DARK_GREEN の現在値に置換 */
    --accent:  #FABF00; /* ← template.js COLORS.CREAM_YELLOW の現在値に置換 */
    --bg:      #FFFFFF;
    --bg-light:#F5F8F7;
    --text:    #2C3E3B;
    --text-sub:#4A5B58;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #E8EDEC;
    font-family: 'Noto Sans JP', sans-serif;
    color: var(--text);
    overflow: hidden;
  }
  .slide {
    position: absolute; inset: 0;
    width: 100vw; height: 100vh;
    display: none;
    padding: 5vh 7vw;
    flex-direction: column;
    justify-content: flex-start;
    background: var(--bg);
  }
  .slide.active { display: flex; }
  .slide--dark { background: var(--primary); color: #fff; }
  /* タイトルバー */
  .key-message {
    background: var(--primary);
    color: #fff;
    font-size: 1.1vw;
    font-weight: 700;
    padding: 0.5vh 1vw;
    margin: 1.5vh 0 2vh;
    border-left: 0.4vw solid var(--accent);
    border-radius: 0 4px 4px 0;
  }
  .slide-title {
    font-size: 1.8vw; font-weight: 900;
    color: var(--text); margin-bottom: 0.3vh;
  }
  .title-accent {
    width: 6vw; height: 3px;
    background: var(--accent); margin-bottom: 1vh;
  }
  h1 { font-size: 4vw; font-weight: 900; }
  h2 { font-size: 2.2vw; font-weight: 700; margin-bottom: 2vh; }
  p  { font-size: 1.2vw; line-height: 1.6; margin-bottom: 1vh; }
  ul { margin-left: 2vw; }
  li { font-size: 1.1vw; line-height: 1.8; }
  .kpi-number { font-size: 12vw; font-weight: 900; color: var(--primary); }
  .nav { position: fixed; bottom: 2vh; right: 2vw; font-size: 0.8vw; color: var(--text-sub); }
  .two-col { display: flex; gap: 3vw; margin-top: 2vh; }
  .two-col > div { flex: 1; }
  .card-grid { display: flex; gap: 2vw; margin-top: 2vh; }
  .card { flex: 1; padding: 2vh 1.5vw; background: var(--bg-light); border-radius: 8px; border-left: 4px solid var(--primary); }
  .card-title { font-size: 1.1vw; font-weight: 700; color: var(--primary); margin-bottom: 1vh; }
</style>
</head>
<body>

{{SLIDES}}

<div class="nav"><span id="curr">1</span> / <span id="total">N</span></div>

<script>
  const slides = document.querySelectorAll('.slide');
  let cur = 0;
  const total = slides.length;
  document.getElementById('total').textContent = total;
  function show(i) {
    slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
    document.getElementById('curr').textContent = i + 1;
  }
  show(0);
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === ' ') { cur = Math.min(cur+1, total-1); show(cur); }
    if (e.key === 'ArrowLeft') { cur = Math.max(cur-1, 0); show(cur); }
    if (e.key === 'f' || e.key === 'F') document.documentElement.requestFullscreen();
  });
</script>
</body>
</html>
```

## スライドタイプ別HTML変換ルール

| パターン | HTML出力 |
|---|---|
| 表紙 | `<div class="slide slide--dark">` + `<h1>タイトル</h1>` + アクセントライン + サブタイトル |
| セクション扉 | `<div class="slide slide--dark">` + 番号（大） + タイトル |
| サマリー/まとめ | `<div class="slide">` + key-message + 番号バッジ付きリスト |
| 本文 | `<div class="slide">` + slide-title + title-accent + key-message + `<p>` |
| 2カラム | `<div class="slide">` + key-message + `<div class="two-col">` |
| 3カード | `<div class="slide">` + key-message + `<div class="card-grid">` |
| KPI | `<div class="slide">` + key-message + `<div class="kpi-number">` |

## 生成手順

1. slide-architect のスライドプランを受け取る
2. 各スライドを上記ルールでHTMLに変換
3. `{{SLIDES}}` を生成したHTML文字列で置換
4. `output/<タイトル>_YYYYMMDD.html` に保存
5. `open output/<タイトル>_YYYYMMDD.html` で即座に開く

## 注意事項
- 背景は白・ライト系固定（黒・ダーク背景のスライドは `.slide--dark` のみ）
- フォントは Noto Sans JP 統一
- ナビゲーションJS（←→ / f キー）は必ず含める
