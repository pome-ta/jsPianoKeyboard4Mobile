# 📝 2022/07/23

class 用途に置き換えていく

`keyboard` と、`key(s)` を同時に持たせてるのも気持ち悪いか


# 📝 2022/07/22

## `callback` を追う

いまいち、js の関数の挙動を理解できてないな。。。

どうやって、関数を生やして`addEventListener` へ繋げるか

`pointerType: "mouse"`

## event 処理

スマホと、PCとで挙動が違うのが面倒なので（touch 判定）

スマホ基準として、後程処理をする

# 📝 2022/07/21

## 挙動変更

書き換える挙動が必要だから

- `build`
- `update`

的な処理が必要かな？

## frequency

わかりやすい計算方法を、、、

[MIDI ノート番号と音名、周波数の対応表](https://www.asahi-net.or.jp/~hb9t-ktd/music/Japan/Research/DTM/freq_map.html)

A3 = 440Hz
で、基準 69 かしら？

# 📝 2022/07/20

## event

[イベントハンドラー | JavaScript 逆引き | Web サイト制作支援 | ShanaBrian Website](https://shanabrian.com/web/javascript/event-handler.php)

`pointer` 関係でやってみるか

`mouse_is_down` は、まだ使わない

### 移動関係

~~うまく捕捉できてないから、個別に設定する？~~

個別でもダメぞ 😡

[javascript - JS: Touch equivalent for mouseenter - Stack Overflow](https://stackoverflow.com/questions/27908339/js-touch-equivalent-for-mouseenter?answertab=trending#tab-top)

## key size

- [ ] `margin` の挙動がキモい
- [ ] 整数サイズでいく？

## その他

[検索: getElement* と querySelector*](https://ja.javascript.info/searching-elements-dom#ref-528)

やへぇ、`id` と変数被ってるのあるかも

# 📝 2022/07/18

## リファクタリングを考える

無駄に関数が並び、行ったり来たりするので見通しのいい書き順にする

半音ずつ全て同等に扱いたい

### 現行の流れ

- `createKeyboard`
  - `id` で枠を固める
  - 白と黒鍵盤で情報を分ける

### 未処理

`this.keyDown` `this.keyUp` 何も処理してなかった

```.js
/**
 * Qwerty Hancock constructor.
 * @param {object} settings Optional user settings.
 */
var QwertyHancock = function (settings) {
  this.version = version;

  this.keyDown = function () {
    // Placeholder function.
  };

  this.keyUp = function () {
    // Placeholder function.
  };

  this.setKeyOctave = function (octave) {
    // Placeholder function.
  };

  this.getKeyOctave = function () {};
  this.keyOctaveUp = function () {};
  this.keyOctaveDown = function () {};

  this.getKeyMap = function () {};
  this.setKeyMap = function (newKeyMap) {};

  init.call(this, settings);
};
```

他にも微妙に処理終えてないのある、、、

## モジュール

[Browserify](https://browserify.org/)

もう切ってもいいのでは？

切ると、以下が解消できるのでは？

> In ＜ script ＞ context, `this` is the window.
> In node context (browserify), `this` is the node global.

もしかしたら、テストとかで使う？

## `undefined` boolean 判定

文字列として`undefined` を処理した方がいいみたいだが

```.js
if (typeof hoge === undefined) {
  // だめ
}

if (typeof hoge === 'undefined') {
  // おk
}

```

確かに、そうよな。といった感想

[JavaScript で typeof x === 'undefined'を使わないで欲しい理由](https://www.ncaq.net/2018/06/16/16/44/31/)

## `keyboardLayout` 設定

そんな読み替えるところとかあった？

# 📝 2022/07/17

[pome-ta/qwerty-hancock: A keyboard for any musical eventuality. Works best with the Web Audio API.](https://github.com/pome-ta/qwerty-hancock)

## test

テストをやっていくために、そもそもでどのような機能でやっているのか確認をする

### packages

#### Grunt

現在の version は、`v1.4.1`

[Grunt: The JavaScript Task Runner](https://gruntjs.com/)

タスクランナー

`Gruntfile.js` より書いた内容の task を実行する

例えば

```console
npx grunt uglify
```

`npx` しているのは、ローカルでインストールしているため

[npx コマンドとは？ 何ができるのか？](https://zenn.dev/ryuu/articles/what-npxcommand)

#### KARMA

現在の version は、`v6.4`

[Karma - Spectacular Test Runner for Javascript](https://karma-runner.github.io/latest/index.html)

フロントエンドの単体テストを実行するためのテストランナー

```console
npx karma start
```

これでサーバーが立ち、ローカルホスト先へアクセスするとブラウザで表示されている

`karma.conf.js` がデフォルトで読み込まれている？

今回のリポジトリだと、`karma-conf.js` が発見できた

#### Jasmine

`karma-jasmine` ってのもあるけど？

### test 内容

```qh-tests.js

it('Can create keyboard with user specified dimensions', function () {
    var qh = new QwertyHancock({width: 500, height: 300});

    expect(element.offsetWidth).toBe(500);
    expect(element.offsetHeight).toBe(300);
});

it('Keyboard without specified dimensions uses element dimensions', function () {
    var qh;

    element.style.width = '200px';
    element.style.height = '100px';

    qh = new QwertyHancock();

    expect(element.querySelector('ul').style.width).toBe(element.style.width);
    expect(element.querySelector('ul').style.height).toBe(element.style.height);
});


```

`500` で指定しているところが、`1264`

`200px` で指定しているところが、`191px`

### logs

`debug.log`

```.log
0 info it worked if it ends with ok
1 verbose cli [
1 verbose cli   '/Users/_*pometa*_/.anyenv/envs/nodenv/versions/14.18.1/bin/node',
1 verbose cli   '/Users/_*pometa*_/.anyenv/envs/nodenv/versions/14.18.1/bin/npm',
1 verbose cli   'run',
1 verbose cli   'test'
1 verbose cli ]
2 info using npm@6.14.15
3 info using node@v14.18.1
4 verbose run-script [ 'pretest', 'test', 'posttest' ]
5 info lifecycle qwerty-hancock@0.10.0~pretest: qwerty-hancock@0.10.0
6 info lifecycle qwerty-hancock@0.10.0~test: qwerty-hancock@0.10.0
7 verbose lifecycle qwerty-hancock@0.10.0~test: unsafe-perm in lifecycle true
8 verbose lifecycle qwerty-hancock@0.10.0~test: PATH: /Users/_*pometa*_/.anyenv/envs/nodenv/versions/14.18.1/lib/node_modules/npm/node_modules/npm-lifecycle/node-gyp-bin:/Users/_*pometa*_/Documents/GitHub/qwerty-hancock/node_modules/.bin:/Users/_*pometa*_/.anyenv/envs/nodenv/versions/14.18.1/bin:/Users/_*pometa*_/.anyenv/envs/nodenv/libexec:/Users/_*pometa*_/.anyenv/envs/nodenv/plugins/nodenv-vars/bin:/Users/_*pometa*_/.anyenv/envs/nodenv/plugins/node-build/bin:/Users/_*pometa*_/.anyenv/bin:/Users/_*pometa*_/.anyenv/envs/rbenv/shims:/Users/_*pometa*_/.anyenv/envs/rbenv/bin:/Users/_*pometa*_/.anyenv/envs/pyenv/shims:/Users/_*pometa*_/.anyenv/envs/pyenv/bin:/Users/_*pometa*_/.anyenv/envs/nodenv/shims:/Users/_*pometa*_/.anyenv/envs/nodenv/bin:/usr/local/bin/git:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Library/Apple/usr/bin
9 verbose lifecycle qwerty-hancock@0.10.0~test: CWD: /Users/_*pometa*_/Documents/GitHub/qwerty-hancock
10 silly lifecycle qwerty-hancock@0.10.0~test: Args: [
10 silly lifecycle   '-c',
10 silly lifecycle   './node_modules/karma/bin/karma start ./karma-conf.js --browsers Firefox --single-run'
10 silly lifecycle ]
11 silly lifecycle qwerty-hancock@0.10.0~test: Returned: code: 1  signal: null
12 info lifecycle qwerty-hancock@0.10.0~test: Failed to exec test script
13 verbose stack Error: qwerty-hancock@0.10.0 test: `./node_modules/karma/bin/karma start ./karma-conf.js --browsers Firefox --single-run`
13 verbose stack Exit status 1
13 verbose stack     at EventEmitter.<anonymous> (/Users/_*pometa*_/.anyenv/envs/nodenv/versions/14.18.1/lib/node_modules/npm/node_modules/npm-lifecycle/index.js:332:16)
13 verbose stack     at EventEmitter.emit (events.js:400:28)
13 verbose stack     at ChildProcess.<anonymous> (/Users/_*pometa*_/.anyenv/envs/nodenv/versions/14.18.1/lib/node_modules/npm/node_modules/npm-lifecycle/lib/spawn.js:55:14)
13 verbose stack     at ChildProcess.emit (events.js:400:28)
13 verbose stack     at maybeClose (internal/child_process.js:1058:16)
13 verbose stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:293:5)
14 verbose pkgid qwerty-hancock@0.10.0
15 verbose cwd /Users/_*pometa*_/Documents/GitHub/qwerty-hancock
16 verbose Darwin 21.5.0
17 verbose argv "/Users/_*pometa*_/.anyenv/envs/nodenv/versions/14.18.1/bin/node" "/Users/_*pometa*_/.anyenv/envs/nodenv/versions/14.18.1/bin/npm" "run" "test"
18 verbose node v14.18.1
19 verbose npm  v6.14.15
20 error code ELIFECYCLE
21 error errno 1
22 error qwerty-hancock@0.10.0 test: `./node_modules/karma/bin/karma start ./karma-conf.js --browsers Firefox --single-run`
22 error Exit status 1
23 error Failed at the qwerty-hancock@0.10.0 test script.
23 error This is probably not a problem with npm. There is likely additional logging output above.
24 verbose exit [ 1, true ]
```

terminal log

```console
% >npm run test

> qwerty-hancock@0.10.0 test /Users/_*pometa*_/Documents/GitHub/qwerty-hancock
> ./node_modules/karma/bin/karma start ./karma-conf.js --browsers Firefox --single-run

17 07 2022 18:20:23.798:INFO [karma-server]: Karma v5.2.3 server started at http://localhost:9876/
17 07 2022 18:20:23.801:INFO [launcher]: Launching browsers Firefox with concurrency unlimited
(node:53364) [log4js-node-DEP0004] DeprecationWarning: Pattern %d{DATE} is deprecated due to the confusion it causes when used. Please use %d{DATETIME} instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:53364) [log4js-node-DEP0004] DeprecationWarning: Pattern %d{DATE} is deprecated due to the confusion it causes when used. Please use %d{DATETIME} instead.
17 07 2022 18:20:23.806:INFO [launcher]: Starting browser Firefox
(node:53364) [log4js-node-DEP0004] DeprecationWarning: Pattern %d{DATE} is deprecated due to the confusion it causes when used. Please use %d{DATETIME} instead.
17 07 2022 18:20:25.817:INFO [Firefox 102.0 (Mac OS 10.15)]: Connected on socket ~~~
(node:53364) [log4js-node-DEP0004] DeprecationWarning: Pattern %d{DATE} is deprecated due to the confusion it causes when used. Please use %d{DATETIME} instead.
Firefox 102.0 (Mac OS 10.15) Qwerty Hancock tests Can create keyboard with user specified dimensions FAILED
 Expected 1264 to be 500.
 <Jasmine>
 @tests/qh-tests.js:22:37
 <Jasmine>
Firefox 102.0 (Mac OS 10.15) Qwerty Hancock tests Keyboard without specified dimensions uses element dimensions FAILED
 Expected '191px' to be '200px'.
 <Jasmine>
 @tests/qh-tests.js:34:57
 <Jasmine>
Firefox 102.0 (Mac OS 10.15): Executed 10 of 10 (2 FAILED) (0.004 secs / 0.024 secs)
TOTAL: 2 FAILED, 8 SUCCESS
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! qwerty-hancock@0.10.0 test: `./node_modules/karma/bin/karma start ./karma-conf.js --browsers Firefox --single-run`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the qwerty-hancock@0.10.0 test script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/_*pometa*_/.npm/_logs/2022-07-17T09_20_26_049Z-debug.log
```

やばそうな情報貼り付けてないよね？

```.terminal
% >npx grunt karma
```

これでも走ってるか？(基本色々怒られてるけど)

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

node での test 用か？

## テスト

できるのであれば、書き換えたものをテストに通したい

## `keyboardUp` とか関係

全然できてない

# 📝 2022/07/15

## キーボードレイアウト

鍵盤の必要ないか？

class 化して、UI 　と機能を分ける？ - キーボードのレイアウトと、Pad とできたらいいな

## [stuartmemo/qwerty-hancock: A keyboard for any musical eventuality. Works best with the Web Audio API.](https://github.com/stuartmemo/qwerty-hancock) を改造（？）

fork すりゃいいのだけど、一旦砂場としてここに吐き出し`dev.js`

### `dev.js` を参照

`esmQwertyHancock.js` にて、構築

### `window` からの呼び出し

`this` を`window` としてみる？

### `settings` を class 化？

個別に関数で管理をする？

### メモ

> 「color」はアメリカで、「colour」はイギリスで使われています。

[「色」は英語でどのように表現する？| Kimini 英会話](https://kimini.online/blog/archives/3050)

# 📝 2022/07/13

[【CSS】background-color と background の違い | 開発備忘録＆ふと思ったこと](https://memo.itsysgroup.com/?p=925&amp=1)

# 📝 2022/07/12

## 参照

[Web Audio API でピアノを作ってみる | q-Az](https://q-az.net/web-audio-api-piano/)

[OscillatorNode | サウンドの生成 | Web Audio API の基本処理 | WEB SOUNDER - Web Audio API 解説 -](https://weblike-curtaincall.ssl-lolipop.jp/portfolio-web-sounder/webaudioapi-basic/demos/demo-12)

[stuartmemo/qwerty-hancock: A keyboard for any musical eventuality. Works best with the Web Audio API.](https://github.com/stuartmemo/qwerty-hancock)
