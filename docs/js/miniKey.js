//let container;
let settings = {};
const baseSettings = {
  width: 480,
  height: 160,
  // xxx: いらないかも
  margin: 'auto',

  startNote: 'A',
  keyOctave: 2,

  whiteKeyColor: '#fffff8',
  blackKeyColor: '#232323',
  // blackKeyColor: 'magenta',
  // borderColor: 'magenta',
  borderColor: 'coral',
  activeColor: 'maroon',
};

const scaleNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const scaleSharps = ['C', 'D', 'F', 'G', 'A'];

function createKeyboard(container) {
  const keyboard = {
    container: container,
    el: document.createElement('ul'),
    whiteNotes: orderNotes(scaleNotes),
    notesWithSharps: scaleSharps,
  };
  const { keys, totalWhiteLength } = createKeys(keyboard);
  // console.log(keys);
  // console.log(totalWhiteLength);
  keyboard.keys = keys;
  keyboard.totalWhiteLength = totalWhiteLength;
  // xxx: キー入力は一旦抜き
  // setKeyPressOffset(keyboard.whiteNotes);
  styleKeyboard(keyboard);
  addKeysToKeyboard(keyboard);
  keyboard.container.appendChild(keyboard.el);
  return keyboard;
}

/**
 * Order notes into order defined by starting key in settings.
 * @param {array} notesToOrder Notes to be ordered.
 * @return {array} orderedNotes Ordered notes.
 */
function orderNotes(notesToOrder) {
  const orderLength = notesToOrder.length;
  const keyOffset = notesToOrder.indexOf(settings.startNote);
  // todo: `settings.startNote` を起点に並び替え
  const orderedNotes = notesToOrder.map(
    (_, index, array) =>
      array[
        index + keyOffset < orderLength
          ? index + keyOffset
          : index + keyOffset - orderLength
      ]
  );
  return orderedNotes;
}

function createKeys(keyboard) {
  // xxx: 関数`getTotalWhiteKeys` の`7` よりも、`keyboard.whiteNotes` の長さの方が自明的？
  // xxx: `totalWhiteKeys` を配列として、`.length` で長さを取るか
  //const totalWhiteKeys = getTotalWhiteKeys();
  let octave = settings.keyOctave;
  // const totalWhiteKeys = [...new Array(octave)]
  //   .map(() => [...keyboard.whiteNotes])
  //   .flat();
  const totalWhiteLength = getTotalWhiteLength();
  const totalWhiteKeys = [...new Array(totalWhiteLength)].map(
    (_, index) => keyboard.whiteNotes[index % scaleNotes.length]
  );
  const keyWidth = getWhiteKeyWidth(totalWhiteLength);
  const keys = totalWhiteKeys.map((noteChar, noteNumber) => {
    octave += noteChar === 'C' && noteNumber ? 1 : 0;
    //   const whiteKey = `white:${noteStr}${octave} noteNumber:${index}`;
    //   // xxx: `if (noteNumber !== total_white_keys - 1)`
    //   const blackKey = keyboard.notesWithSharps.includes(noteStr)
    //     ? `black:${noteStr}#${octave} noteNumber:${index}`
    //     : null;
    //   return [whiteKey, blackKey].filter((key) => key);
    let whiteKey, blackKey;
    whiteKey = createKey({
      color: 'white',
      octave: octave,
      width: keyWidth,
      id: `${noteChar}${octave}`,
      noteNumber: noteNumber,
    });
    if (
      noteNumber !== totalWhiteLength - 1 &&
      keyboard.notesWithSharps.includes(noteChar)
    ) {
      blackKey = createKey({
        color: 'black',
        octave: octave,
        width: keyWidth / 2,
        id: `${noteChar}#${octave}`,
        noteNumber: noteNumber,
      });
    }
    return [whiteKey.el, blackKey ? blackKey.el : null].filter((el) => el);
  });

  return {
    keys: keys.flat(),
    totalWhiteLength: totalWhiteLength,
  };
}

function getTotalWhiteLength() {
  return settings.keyOctave * scaleNotes.length;
}

/**
 * Calculate width of white key.
 * @return {number} Width of a single white key in pixels.
 */
function getWhiteKeyWidth(numberOfWhiteKeys) {
  // const keyWidth = (settings.width - numberOfWhiteKeys) / numberOfWhiteKeys;
  const keyWidth = settings.width / numberOfWhiteKeys;
  // console.log(keyWidth);
  // return Math.floor((settings.width - numberOfWhiteKeys) / numberOfWhiteKeys);
  // return ((settings.width - numberOfWhiteKeys) / numberOfWhiteKeys) + ;
  return keyWidth;
}

/**
 * Create key DOM element.
 * @return {object} Key DOM element.
 */
function createKey(key) {
  key.el = document.createElement('li');
  key.el.id = key.id;
  key.el.title = key.id;
  key.el.setAttribute('data-note-type', key.color);
  styleKey(key);

  return key;
}

/**
 * Add styling to individual key on keyboard.
 * @param  {object} key Element of key.
 */
function styleKey(key) {
  key.el.style.display = 'inline-block';
  key.el.style['-webkit-user-select'] = 'none';
  // key.el.style.boxSizing = 'content-box';
  key.el.style.boxSizing = 'border-box';

  key.color === 'white' ? styleWhiteKey(key) : styleBlackKey(key);
}

/**
 * Add styling to individual white key.
 * @param  {element} el White key DOM element.
 */
function styleWhiteKey(key) {
  key.el.style.backgroundColor = settings.whiteKeyColor;
  key.el.style.border = '1px solid ' + settings.borderColor;
  // key.el.style.borderRight = 0;
  key.el.style.height = settings.height + 'px';
  key.el.style.width = key.width + 'px';
  key.el.style.borderRadius = '0 0 0.5rem 0.5rem';
  key.el.style.position = 'relative';
  key.el.style.zIndex = '1';
  // key.el.style.boxSizing = 'content-box';
  // xxx: なぜ最後は捕捉されていないのか
  // if (key.noteNumber === getTotalWhiteLength() - 1) {
  // key.el.style.border = '1px solid ' + settings.borderColor;
  // }
}

/**
 * Add styling to individual black key.
 * @param  {element} el Black key DOM element.
 */
function styleBlackKey(key) {
  const whiteKeyWidth = getWhiteKeyWidth(getTotalWhiteLength());
  // const blackKeyWidth = Math.floor(whiteKeyWidth / 2);
  const blackKeyWidth = whiteKeyWidth / 2;

  key.el.style.backgroundColor = settings.blackKeyColor;
  key.el.style.border = '1px solid ' + settings.borderColor;

  // console.log('---');
  // console.log(key.el.style.left);
  // console.log(key.el.getBoundingClientRect());
  // console.log(key);
  // console.log(key.noteNumber);
  key.el.style.position = 'absolute';

  // console.log(whiteKeyWidth);
  const clientLeft = whiteKeyWidth * key.noteNumber + 1 + whiteKeyWidth;
  const offsetLeft = blackKeyWidth / 2;
  // console.log('c', clientLeft);
  // console.log('o', offsetLeft);
  key.el.style.left = clientLeft - offsetLeft + 'px';
  // key.el.style.position = 'relative';
  // key.el.style.top = 0 + 'px';
  // key.el.style.right = 0;

  // key.el.style.left =
  //   Math.floor((whiteKeyWidth + 1) * (key.noteNumber + 1) - blackKeyWidth / 2) +
  //   'px';

  // key.el.style.left -= blackKeyWidth / 2 + 'px';
  // key.el.style.left = Math.floor((whiteKeyWidth + 1) * (key.noteNumber + 1) - blackKeyWidth / 2) + 'px';

  key.el.style.width = blackKeyWidth + 'px';
  key.el.style.height = settings.height / 1.5 + 'px';
  key.el.style.borderRadius = '0 0 0.5rem 0.5rem';
  key.el.style.zIndex = '2';
  // key.el.style.boxSizing = 'content-box';
}

/**
 * Reset styles on keyboard container and list element.
 * @param {element} keyboard Keyboard container DOM element.
 */
function styleKeyboard(keyboard) {
  const styleElement = (el) => {
    el.style.cursor = 'default';
    // el.style.fontSize = '0px';
    el.style.height = settings.height + 'px';
    el.style.padding = 0;
    el.style.position = 'relative';
    el.style.listStyle = 'none';
    el.style.margin = settings.margin;
    el.style['-webkit-user-select'] = 'none';
    // el.style.boxSizing = 'content-box';
    el.style.boxSizing = 'border-box';
  };

  styleElement(keyboard.container);
  styleElement(keyboard.el);
  let w =
    keyboard.totalWhiteLength * getWhiteKeyWidth(keyboard.totalWhiteLength);
  // console.log(w);

  //   keyboard.el.style.width =
  //     keyboard.totalWhiteLength *
  //       (getWhiteKeyWidth(keyboard.totalWhiteLength) + 1) +
  //     2 +
  //     'px';
  keyboard.el.style.width = w + 'px';
}

function addKeysToKeyboard(keyboard) {
  keyboard.keys.forEach((key) => keyboard.el.appendChild(key));
}

export function miniKey(element, userSettings = {}) {
  // xxx: margin やpadding 依存をどうやって処理するか
  baseSettings.width = element.offsetWidth;
  baseSettings.height = element.offsetHeight;
  settings = { ...baseSettings, ...userSettings };
  createKeyboard(element);
}
