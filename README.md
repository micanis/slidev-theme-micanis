# slidev-theme-micanis

余白重視の `default` と、東京工科大学（TUT）ブランドの `tut` を設定1行で切り替えられる 16:9 の [Slidev](https://sli.dev) テーマ。

- **2つのバリアント** — `default`（白地＋アクセントライン）／`tut`（ロゴ・上下ライン入り背景）
- **8つのレイアウト** — cover / title / tut / toc / section / default / n-columns / n-rows
- **はみ出さない** — 全レイアウトで描画領域と各セルを `overflow: hidden` にし、ブランド要素へ内容が重ならない
- **要約バンド** — `::conc::` スロットで、ページ下部に結論を1行表示

## 目次

- [クイックスタート](#クイックスタート)
- [バリアント](#バリアント)
- [レイアウト一覧](#レイアウト一覧)
- [レイアウト詳細](#レイアウト詳細)
- [共通仕様](#共通仕様)
- [開発](#開発)
- [フォルダ構成](#フォルダ構成)
- [参考にした資料](#参考にした資料)
- [ライセンス](#ライセンス)

## クイックスタート

必要なもの: Node.js、pnpm、Slidev `>=52`（52.20 と 53.0 で動作確認）。利用側のプロジェクトに `@slidev/cli` を入れてください（テーマは Slidev 本体と Vue を同梱しません）。

### 標準: GitHub リポジトリからインストール

npm レジストリには公開していません。自分の Slidev プロジェクトでは、GitHub リポジトリから直接インストールするのを標準とします。

```sh
pnpm add github:micanis/slidev-theme-micanis
# npm の場合
npm install github:micanis/slidev-theme-micanis
```

タグ・ブランチ・コミットを固定する場合は `#` で指定します。

```sh
pnpm add github:micanis/slidev-theme-micanis#v1.0.1
```

インストール後、`slides.md` の先頭でテーマ名（`slidev-theme-` を除いた部分）を指定します。

```yaml
---
theme: micanis
themeConfig:
  variant: default # default | tut（省略時は default）
---
```

- 更新するときは `pnpm update slidev-theme-micanis`（npm は `npm update slidev-theme-micanis`）を実行します。固定していない場合は、デフォルトブランチの最新を取り込みます。
- プライベートリポジトリの場合は、GitHub への認証（SSH 鍵など）が必要です。その場合は `git+ssh://git@github.com/micanis/slidev-theme-micanis.git` の形式を使ってください。
- 未公開のため、インストールせずに `theme: micanis` と書いて Slidev の自動インストールに任せると、レジストリから取得しようとして失敗します。先に上記のコマンドでインストールしてください。

### ローカルパスで使う（開発時）

テーマを手元で編集しながら試す場合は、パスを直接指定します。

```yaml
---
theme: ../slidev-theme-micanis
---
```

このリポジトリ自体のプレビュー:

```sh
pnpm install
pnpm dev        # example/slides.md を開く（tut 版は pnpm dev:tut）
```

`example/slides.md` が全レイアウトのサンプルです。`example/tut.md` は同じスライドを `variant: tut` で読み込みます。

## バリアント

| バリアント | 見た目 | ページ番号 |
|---|---|---|
| `default` | 白地に左上のアクセントライン（`--micanis-accent`）のみ | 右下に小さく表示 |
| `tut` | TUT のロゴと上下ラインを含む背景画像 | ロゴの左に表示 |

切り替えの仕組み: レイアウトとコンポーネントは `utils/variant.ts` の `isTut` で Tailwind のクラスを切り替えます。`--micanis-accent` は `MicanisFrame` が variant に合わせて設定します。

## レイアウト一覧

| `layout` | 用途 | 主なスロット / 引数 | ページ番号 |
|---|---|---|---|
| `cover` | 表紙 | `::title::` `::date::` `::default::` | なし |
| `title` | 左寄せのタイトルページ | 本文のみ | なし |
| `tut` | TUT 向け表紙（`cover` と同じ構成） | `::title::` `::date::` `::default::` | なし |
| `toc` | 左に見出し、右に目次 | `label`、`::title::` `::default::` | あり |
| `section` | 章扉 | `section`（章番号） | あり |
| `default` | 通常ページ | `title`、`::title::` `::default::` `::conc::` | あり |
| `n-columns` | N 列 | `columns` `gap` `title`、`::column-N::` `::conc::` | あり |
| `n-rows` | N 段 | `rows` `gap` `title`、`::row-N::` `::conc::` | あり |

## レイアウト詳細

<details>
<summary><b>cover / tut</b> — 表紙</summary>

`tut` は同じスロット構成の TUT 向け表紙です。

```md
---
layout: cover   # または tut
---

::title::

# プレゼンテーションタイトル

::date::

2026.09.28

::default::

所属・発表者名
```

</details>

<details>
<summary><b>title</b> — 左寄せのタイトルページ</summary>

```md
---
layout: title
---

# プレゼンテーションタイトル

サブタイトルや発表者名
```

</details>

<details>
<summary><b>toc</b> — 目次</summary>

`label` は省略可能です（既定: `Contents`）。`label: ''` にすると表示しません。

```md
---
layout: toc
label: Overview
---

::title::

# 本日の内容

::default::

<Toc minDepth="1" maxDepth="2" />
```

</details>

<details>
<summary><b>section</b> — 章扉</summary>

```md
---
layout: section
section: '01'
---

# セクションタイトル

セクションの短い説明
```

</details>

<details>
<summary><b>default</b> — 通常ページ</summary>

`title` スロットが上部のタイトル領域、通常スロットが本文です。`conc` を書いたときだけ、本文下部に要約バンドが出ます。

```md
---
layout: default
---

::title::

# スライドタイトル

::default::

- 箇条書き
- 表、引用、コードなど

::conc::

このページで伝えたい結論
```

要約バンドは default・n-columns・n-rows で共通です（高さ `4.4rem`、文字 `1.5rem`、上端に細い区切り線）。

</details>

<details>
<summary><b>n-columns</b> — N 列</summary>

`columns` は 1 以上の整数。先頭列は通常の本文、2 列目以降は `::column-N::` スロットです。`gap` は数値（px）または CSS の長さ。`conc` は任意です。

```md
---
layout: n-columns
columns: 3
gap: 24
title: 3カラムの例
---

### 1列目

先頭カラムの内容

::column-2::

### 2列目

2番目の内容

::column-3::

### 3列目

3番目の内容

::conc::

このページの要約
```

見出しは frontmatter の `title` か `::title::` スロットで指定します（両方あればスロットが優先）。`title` は `<Toc>` の項目名にも使われるので、目次と見出しが一致します。以前の `heading` も引き続き使え、`title` より優先されます。

</details>

<details>
<summary><b>n-rows</b> — N 段</summary>

`rows` は 1 以上の整数。先頭段は通常の本文、2 段目以降は `::row-N::` スロットです。それ以外は n-columns と同じです。

```md
---
layout: n-rows
rows: 3
gap: 16
title: 3ロウの例
---

### 1段目

先頭ロウの内容

::row-2::

### 2段目

2番目の内容

::row-3::

### 3段目

3番目の内容

::conc::

このページの要約
```

</details>

## 共通仕様

| 項目 | 値 |
|---|---|
| アスペクト比 / 基準幅 | `16/9` / `1280px` |
| 配色 | Tailwind CSS の `neutral` パレットに準拠 |
| アクセント色 | `var(--micanis-accent)`（`default` は `#4f46e5`、`tut` は `#302c7d`）。`var(--tut-navy)` も利用可 |
| フォント | [LINE Seed JP](https://github.com/line/seed)（SIL Open Font License 1.1）。Google Fonts から読み込み |
| 文字サイズ | 段落・リスト `1.5rem`（行間 1.625）、h3 `1.75rem`、h2 `1.875rem`、ページタイトル `2.25rem`（太字） |
| キャプション・出典 | `<figcaption>` / `<small>` は `1rem`・薄い灰色。画像だけの段落の下には `1rem` の余白 |
| 文字組み | 禁則は strict、改行は文節単位（`word-break: auto-phrase`）、最終行が短くならないよう調整。文節改行には `lang="ja"` が必要なため、テーマの既定値で `htmlAttrs.lang: ja` を設定（headmatter の `htmlAttrs` で変更可） |

### 可用領域

枠の外側はクリップされます。

| バリアント | 対象 | 余白（左 / 右 / 上 / 下） |
|---|---|---|
| `default` | 全レイアウト | 7% / 7% / 8% / 9% |
| `tut` | cover・section・toc など | 7.5% / 6.5% / 8.5% / 7.5% |
| `tut` | default・n-columns・n-rows | 本文は左右 3%。タイトルのみロゴと上ラインに合わせて内側に寄せる |

> 本文領域（default・n-columns・n-rows の本文と要約バンド）には、左右に 2% の内側余白があります。

> **注意:** 1 枚に収まらない内容は縮小されず、末尾が非表示になります。複数のスライドに分けてください。
> 切れたページは、ブラウザのコンソールと `slidev export` のログに `[micanis] overflow on slide N` と出ます。開発サーバーでは、そのページの枠が赤く囲まれます（書き出しには出ません）。

## 開発

```sh
pnpm install     # 依存関係をインストール
pnpm dev         # example/slides.md のプレビューを開始（tut 版は pnpm dev:tut）
pnpm build       # 本番ビルドを確認
pnpm export      # PDF を生成
```

- 2つのバリアントは `example/slides.md`（default）と `example/tut.md`（同じスライドを tut で読み込む）で確認します。
- `pnpm export` に使う `playwright-chromium` は `@slidev/cli` の依存として入ります。pnpm 11 はビルドスクリプトを許可制にしているため、`pnpm-workspace.yaml` でその1件だけを許可しています。

## スタイルの書き方（拡張する人向け）

レイアウトとコンポーネントは Tailwind 互換のクラス（UnoCSS）で書かれています。次の 3 つを入れてあります。

| 道具 | 用途 |
|---|---|
| `cn()`（`utils/cn.ts`、clsx + tailwind-merge） | クラスを結合し、競合は後ろが勝つ。例: `cn("p-2", "p-4")` は `p-4` |
| `cva`（class-variance-authority） | variant ごとのクラスを宣言する。例: `MicanisFrame.vue`、`MicanisTitle.vue` |
| `isTut`（`utils/variant.ts`） | `default` / `tut` の判定 |

`MicanisSummary` と `MicanisTitle` は、親から渡した `class` が既定のクラスに勝ちます（例: `<MicanisSummary class="h-20 text-xl" />`）。`components/` の中身は利用側のデッキにも自動で登録されるため、名前の衝突を避けて `Micanis` で始めています。

> **注意:** UnoCSS は `.vue` ファイルの文字列からクラスを拾います。`.ts` に書いたクラス名は拾われないので、クラスは `.vue` の中に書いてください。

## フォルダ構成

```
├── layouts/          レイアウト（cover, default, n-columns, n-rows, section, title, toc, tut）
├── components/       MicanisFrame（枠・背景・ページ番号・はみ出し検知）、MicanisTitle（ページタイトル）、MicanisSummary（要約領域）
├── utils/            variant.ts（variant の判定）、cn.ts（クラスの結合）、grid.ts（列数・gap）、slideTitle.ts（見出しの決定）
├── styles/           theme.css（本文の文字組みを @apply で記述）
├── assets/tut/       tut バリアントの背景画像
└── example/          プレビュー兼サンプル（slides.md: default、tut.md: tut、sample.svg: 例の画像）
```

`layouts/` `components/` `styles/` は Slidev の規約で決まった名前と場所です。移動・改名しないでください。`utils/` は規約ではなく、テーマ内部で使う関数の置き場です。ページ番号は `MicanisFrame` が描くので、テーマのレイアウトを使ったページにだけ付きます（Slidev 標準の `center` などには付きません）。

## 参考にした資料

この README とテーマ構成は、次の資料を参考にしています（2026-10-20 に参照）。

| 資料 | 参考にした点 |
|---|---|
| [Slidev — Write a Theme](https://sli.dev/guide/write-theme) | テーマの構成（layouts / components / styles）、`package.json` の `slidev.defaults` と `keywords`、`theme: ./` でのプレビュー方法 |
| [Make a README](https://www.makeareadme.com/) | 名前・説明・インストール・使い方・ライセンスといった節の選び方、「使用例を多く載せる」方針 |
| [Standard Readme](https://github.com/RichardLitt/standard-readme/blob/main/spec.md) | 節の並び順（短い説明 → 目次 → 使い方 → 参考／謝辞 → ライセンス）、短い説明を1行にする方針 |
| [LINE Seed](https://github.com/line/seed) | 使用フォントとそのライセンス |

## ライセンス

コードは [MIT License](LICENSE) です。ただし、同梱している TUT のロゴを含む背景画像（`assets/tut/background.png`）は MIT License の対象外で、利用条件は東京工科大学の規定に従ってください。変更内容は git のタグとコミット履歴を参照してください。
