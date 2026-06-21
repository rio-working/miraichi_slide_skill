# Color Palettes

miraichi_slide_skillのデフォルトカラーと、ブランドカラー未指定時の代替パレット定義。

## デフォルト: miraichi グリーン×アンバー

`scripts/template.js` の `COLORS` オブジェクトで定義。変更はブランドリサーチ経由で行う。

| 変数名 | HEX | 用途 |
|---|---|---|
| DARK_GREEN | `#00A495` | ヘッダー背景・強調ノード・キーメッセージバー |
| CREAM_YELLOW | `#FABF00` | アクセント・番号バッジ・矢印・左アクセントライン |
| LIGHT_GRAY | `#F5F8F7` | カード背景・通常ノード背景 |
| TEXT_DARK | `#2C3E3B` | 見出し・主要テキスト |
| TEXT_MEDIUM | `#4A5B58` | 本文テキスト |
| TEXT_LIGHT | `#7A8C89` | 補足テキスト・出所 |
| WHITE | `#FFFFFF` | ダークグリーン上のテキスト・白背景 |

## ブランドカラー未指定時の代替パレット（モノトーン）

企業カラーがなく、miraichi グリーンを使いたくない場合のみ。

| 変数名 | HEX |
|---|---|
| DARK_GREEN（実質Primary） | `#1A1A1A` |
| CREAM_YELLOW（実質Accent） | `#000000` |
| LIGHT_GRAY | `#F5F5F5` |
| TEXT_DARK | `#1A1A1A` |
| TEXT_MEDIUM | `#4A4A4A` |
| TEXT_LIGHT | `#6B6B6B` |
| WHITE | `#FFFFFF` |

## 適用ルール

1. **ブランドカラーあり**: Phase 0 でリサーチ → `COLORS` オブジェクトのHEX値を更新
2. **ブランドカラーなし（デフォルト）**: miraichi グリーン×アンバーをそのまま使用
3. **モノトーン指定**: 上記モノトーンパレットに差し替え

## コントラスト原則

- DARK_GREEN背景 → WHITE テキスト + CREAM_YELLOW アクセント
- LIGHT_GRAY背景 → TEXT_DARK テキスト + DARK_GREEN 強調
- WHITE背景 → TEXT_DARK テキスト + DARK_GREEN 見出し

## 禁止事項

- 純黒 `#000000` を背景に使わない
- 白テキスト on 白背景（コントラスト不足）
- ダーク背景を3枚以上連続させない
