# 📝 2022/07/16

## `createKeys` 関数

[Function.prototype.call() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

`call` 呼び出しをやめた

`this` と、`that` で分ける必要ある？

## event 関係

`this` やら`that` やら。。。

一つ一つ検証していくか。。。`callback` とかみていくか。。。

## `this` の`window` を示す場合について

関数内で実行をすると、`window` を取得していて、直下だと`undefined`

わざわざ、`globalWindow` として変数を用意しているのは

node でのtest 用か？

## テスト

できるのであれば、書き換えたものをテストに通したい

# 📝 2022/07/15

## キーボードレイアウト

鍵盤の必要ないか？

class 化して、UI　と機能を分ける？
    - キーボードのレイアウトと、Pad とできたらいいな

## [stuartmemo/qwerty-hancock: A keyboard for any musical eventuality. Works best with the Web Audio API.](https://github.com/stuartmemo/qwerty-hancock) を改造（？）

fork すりゃいいのだけど、一旦砂場としてここに吐き出し`dev.js`

### `dev.js` を参照

`esmQwertyHancock.js` にて、構築

### `window` からの呼び出し

`this` を`window` としてみる？

### `settings` をclass 化？

個別に関数で管理をする？

### メモ

> 「color」はアメリカで、「colour」はイギリスで使われています。

[「色」は英語でどのように表現する？| Kimini英会話](https://kimini.online/blog/archives/3050)

# 📝 2022/07/13

[【CSS】background-color と background の違い | 開発備忘録＆ふと思ったこと](https://memo.itsysgroup.com/?p=925&amp=1)

# 📝 2022/07/12

## 参照

[Web Audio API でピアノを作ってみる | q-Az](https://q-az.net/web-audio-api-piano/)

[OscillatorNode | サウンドの生成 | Web Audio API の基本処理 | WEB SOUNDER - Web Audio API 解説 -](https://weblike-curtaincall.ssl-lolipop.jp/portfolio-web-sounder/webaudioapi-basic/demos/demo-12)

[stuartmemo/qwerty-hancock: A keyboard for any musical eventuality. Works best with the Web Audio API.](https://github.com/stuartmemo/qwerty-hancock)
