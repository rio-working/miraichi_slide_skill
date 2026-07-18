# Revision Log

## 2026-07-11: presets/index.js の apply() バグ

企業プリセット適用時、`CHART_COLORS`・`FACE` が生成物に反映されない不具合があった。原因は `template.CHART_COLORS = preset.chartColors`（参照差し替え）や `template.FACE = preset.font`（exports側の代入）が、`template.js` 内部のモジュールスコープ変数を書き換えないため。`COLORS` はオブジェクトのプロパティ書き換えなので正常だったが、配列・プリミティブ値の差し替えは exports 経由では反映されない、という Node.js の CommonJS モジュールスコープの落とし穴。修正: `CHART_COLORS` は `length = 0` → `push` で in-place 置換、`FACE` は `template.js` に `setFace()` を追加してモジュール内部から差し替える方式に変更（2026-07-18に偽プリセットで再検証済み、チャートXML・スライドXML両方で新色・新フォント反映を確認）。
