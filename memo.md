# ๐ 2022/07/23

class ็จ้ใซ็ฝฎใๆใใฆใใ

`keyboard` ใจใ`key(s)` ใๅๆใซๆใใใฆใใฎใๆฐๆใกๆชใใ

## `keyboard` ใงๆใใใใใฎ

`key.el` ใๆ ผ็ดใใฆใใใใ`key` ใๆใใใใใจใซใใฆใใ

ๆใใใ่ฆ็ด ใจใใฆใใใกใใใกใๅคงใใใใใใกใขใช็ใซใฏใใฃใใใชใ๏ผ

## `settings` ใฎใญใผใใผใ่จญๅฎ

ใฉใฎใใใใฎใชใฏใฟใผใใๆใใใใ๏ผใจใใฉใฎ้ณใใในใฟใผใใใใฎใ๏ผใจใฎ้ขไฟใๅฐใ้ขๅใใ

# ๐ 2022/07/22

## `callback` ใ่ฟฝใ

ใใพใใกใjs ใฎ้ขๆฐใฎๆๅใ็่งฃใงใใฆใชใใชใใใ

ใฉใใใฃใฆใ้ขๆฐใ็ใใใฆ`addEventListener` ใธ็นใใใ

`pointerType: "mouse"`

## event ๅฆ็

ในใใใจใPCใจใงๆๅใ้ใใฎใ้ขๅใชใฎใง๏ผtouch ๅคๅฎ๏ผ

ในใใๅบๆบใจใใฆใๅพ็จๅฆ็ใใใ

# ๐ 2022/07/21

## ๆๅๅคๆด

ๆธใๆใใๆๅใๅฟ่ฆใ ใใ

- `build`
- `update`

็ใชๅฆ็ใๅฟ่ฆใใช๏ผ

## frequency

ใใใใใใ่จ็ฎๆนๆณใใใใ

[MIDI ใใผใ็ชๅทใจ้ณๅใๅจๆณขๆฐใฎๅฏพๅฟ่กจ](https://www.asahi-net.or.jp/~hb9t-ktd/music/Japan/Research/DTM/freq_map.html)

A3 = 440Hz
ใงใๅบๆบ 69 ใใใ๏ผ

# ๐ 2022/07/20

## event

[ใคใใณใใใณใใฉใผ | JavaScript ้ๅผใ | Web ใตใคใๅถไฝๆฏๆด | ShanaBrian Website](https://shanabrian.com/web/javascript/event-handler.php)

`pointer` ้ขไฟใงใใฃใฆใฟใใ

`mouse_is_down` ใฏใใพใ ไฝฟใใชใ

### ็งปๅ้ขไฟ

~~ใใพใๆๆใงใใฆใชใใใใๅๅฅใซ่จญๅฎใใ๏ผ~~

ๅๅฅใงใใใกใ ๐ก

[javascript - JS: Touch equivalent for mouseenter - Stack Overflow](https://stackoverflow.com/questions/27908339/js-touch-equivalent-for-mouseenter?answertab=trending#tab-top)

## key size

- [ ] `margin` ใฎๆๅใใญใขใ
- [ ] ๆดๆฐใตใคใบใงใใ๏ผ

## ใใฎไป

[ๆค็ดข: getElement* ใจ querySelector*](https://ja.javascript.info/searching-elements-dom#ref-528)

ใใธใใ`id` ใจๅคๆฐ่ขซใฃใฆใใฎใใใใ

# ๐ 2022/07/18

## ใชใใกใฏใฟใชใณใฐใ่ใใ

็ก้งใซ้ขๆฐใไธฆใณใ่กใฃใใๆฅใใใใใฎใง่ฆ้ใใฎใใๆธใ้ ใซใใ

ๅ้ณใใคๅจใฆๅ็ญใซๆฑใใใ

### ็พ่กใฎๆตใ

- `createKeyboard`
  - `id` ใงๆ ใๅบใใ
  - ็ฝใจ้ป้ต็คใงๆๅ ฑใๅใใ

### ๆชๅฆ็

`this.keyDown` `this.keyUp` ไฝใๅฆ็ใใฆใชใใฃใ

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

ไปใซใๅพฎๅฆใซๅฆ็็ตใใฆใชใใฎใใใใใ

## ใขใธใฅใผใซ

[Browserify](https://browserify.org/)

ใใๅใฃใฆใใใใฎใงใฏ๏ผ

ๅใใจใไปฅไธใ่งฃๆถใงใใใฎใงใฏ๏ผ

> In ๏ผ script ๏ผ context, `this` is the window.
> In node context (browserify), `this` is the node global.

ใใใใใใใใในใใจใใงไฝฟใ๏ผ

## `undefined` boolean ๅคๅฎ

ๆๅญๅใจใใฆ`undefined` ใๅฆ็ใใๆนใใใใฟใใใ ใ

```.js
if (typeof hoge === undefined) {
  // ใ ใ
}

if (typeof hoge === 'undefined') {
  // ใk
}

```

็ขบใใซใใใใใชใใจใใฃใๆๆณ

[JavaScript ใง typeof x === 'undefined'ใไฝฟใใชใใงๆฌฒใใ็็ฑ](https://www.ncaq.net/2018/06/16/16/44/31/)

## `keyboardLayout` ่จญๅฎ

ใใใช่ชญใฟๆฟใใใจใใใจใใใฃใ๏ผ

# ๐ 2022/07/17

[pome-ta/qwerty-hancock: A keyboard for any musical eventuality. Works best with the Web Audio API.](https://github.com/pome-ta/qwerty-hancock)

## test

ใในใใใใฃใฆใใใใใซใใใใใใงใฉใฎใใใชๆฉ่ฝใงใใฃใฆใใใฎใ็ขบ่ชใใใ

### packages

#### Grunt

็พๅจใฎ version ใฏใ`v1.4.1`

[Grunt: The JavaScript Task Runner](https://gruntjs.com/)

ใฟในใฏใฉใณใใผ

`Gruntfile.js` ใใๆธใใๅๅฎนใฎ task ใๅฎ่กใใ

ไพใใฐ

```console
npx grunt uglify
```

`npx` ใใฆใใใฎใฏใใญใผใซใซใงใคใณในใใผใซใใฆใใใใ

[npx ใณใใณใใจใฏ๏ผ ไฝใใงใใใฎใ๏ผ](https://zenn.dev/ryuu/articles/what-npxcommand)

#### KARMA

็พๅจใฎ version ใฏใ`v6.4`

[Karma - Spectacular Test Runner for Javascript](https://karma-runner.github.io/latest/index.html)

ใใญใณใใจใณใใฎๅไฝใในใใๅฎ่กใใใใใฎใในใใฉใณใใผ

```console
npx karma start
```

ใใใงใตใผใใผใ็ซใกใใญใผใซใซใในใๅใธใขใฏใปในใใใจใใฉใฆใถใง่กจ็คบใใใฆใใ

`karma.conf.js` ใใใใฉใซใใง่ชญใฟ่พผใพใใฆใใ๏ผ

ไปๅใฎใชใใธใใชใ ใจใ`karma-conf.js` ใ็บ่ฆใงใใ

#### Jasmine

`karma-jasmine` ใฃใฆใฎใใใใใฉ๏ผ

### test ๅๅฎน

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

`500` ใงๆๅฎใใฆใใใจใใใใ`1264`

`200px` ใงๆๅฎใใฆใใใจใใใใ`191px`

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

ใใฐใใใชๆๅ ฑ่ฒผใไปใใฆใชใใใญ๏ผ

```.terminal
% >npx grunt karma
```

ใใใงใ่ตฐใฃใฆใใ๏ผ(ๅบๆฌ่ฒใๆใใใฆใใใฉ)

# ๐ 2022/07/16

## `createKeys` ้ขๆฐ

[Function.prototype.call() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

`call` ๅผใณๅบใใใใใ

`this` ใจใ`that` ใงๅใใๅฟ่ฆใใ๏ผ

## event ้ขไฟ

`this` ใใ`that` ใใใใใ

ไธใคไธใคๆค่จผใใฆใใใใใใ`callback` ใจใใฟใฆใใใใใใ

## `this` ใฎ`window` ใ็คบใๅ ดๅใซใคใใฆ

้ขๆฐๅใงๅฎ่กใใใใจใ`window` ใๅๅพใใฆใใฆใ็ดไธใ ใจ`undefined`

ใใใใใ`globalWindow` ใจใใฆๅคๆฐใ็จๆใใฆใใใฎใฏ

node ใงใฎ test ็จใ๏ผ

## ใในใ

ใงใใใฎใงใใใฐใๆธใๆใใใใฎใใในใใซ้ใใใ

## `keyboardUp` ใจใ้ขไฟ

ๅจ็ถใงใใฆใชใ

# ๐ 2022/07/15

## ใญใผใใผใใฌใคใขใฆใ

้ต็คใฎๅฟ่ฆใชใใ๏ผ

class ๅใใฆใUI ใใจๆฉ่ฝใๅใใ๏ผ - ใญใผใใผใใฎใฌใคใขใฆใใจใPad ใจใงใใใใใใช

## [stuartmemo/qwerty-hancock: A keyboard for any musical eventuality. Works best with the Web Audio API.](https://github.com/stuartmemo/qwerty-hancock) ใๆน้ ๏ผ๏ผ๏ผ

fork ใใใใใใฎใ ใใฉใไธๆฆ็ ๅ ดใจใใฆใใใซๅใๅบใ`dev.js`

### `dev.js` ใๅ็ง

`esmQwertyHancock.js` ใซใฆใๆง็ฏ

### `window` ใใใฎๅผใณๅบใ

`this` ใ`window` ใจใใฆใฟใ๏ผ

### `settings` ใ class ๅ๏ผ

ๅๅฅใซ้ขๆฐใง็ฎก็ใใใ๏ผ

### ใกใข

> ใcolorใใฏใขใกใชใซใงใใcolourใใฏใคใฎใชในใงไฝฟใใใฆใใพใใ

[ใ่ฒใใฏ่ฑ่ชใงใฉใฎใใใซ่กจ็พใใ๏ผ| Kimini ่ฑไผ่ฉฑ](https://kimini.online/blog/archives/3050)

# ๐ 2022/07/13

[ใCSSใbackground-color ใจ background ใฎ้ใ | ้็บๅๅฟ้ฒ๏ผใตใจๆใฃใใใจ](https://memo.itsysgroup.com/?p=925&amp=1)

# ๐ 2022/07/12

## ๅ็ง

[Web Audio API ใงใใขใใไฝใฃใฆใฟใ | q-Az](https://q-az.net/web-audio-api-piano/)

[OscillatorNode | ใตใฆใณใใฎ็ๆ | Web Audio API ใฎๅบๆฌๅฆ็ | WEB SOUNDER - Web Audio API ่งฃ่ชฌ -](https://weblike-curtaincall.ssl-lolipop.jp/portfolio-web-sounder/webaudioapi-basic/demos/demo-12)

[stuartmemo/qwerty-hancock: A keyboard for any musical eventuality. Works best with the Web Audio API.](https://github.com/stuartmemo/qwerty-hancock)
