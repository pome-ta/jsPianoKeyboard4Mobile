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
  const keyOffset = notesToOrder.indexOf(settings.startNote);

  const orderedNotes = notesToOrder.map(
    (_, index, array) =>
      array[
        index + keyOffset < array.length
          ? index + keyOffset
          : index + keyOffset - array.length
      ]
  );
  return orderedNotes;
}

function createKeys(keyboard) {
  const totalWhiteLength = getTotalWhiteLength();
  const totalWhiteKeys = [...new Array(totalWhiteLength)].map(
    (_, index) => keyboard.whiteNotes[index % scaleNotes.length]
  );
  const keyWidth = getWhiteKeyWidth(totalWhiteLength);

  let octave = settings.keyOctave;
  const keys = totalWhiteKeys.map((noteChar, noteNumber) => {
    octave += noteChar === 'C' && noteNumber ? 1 : 0;

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
  return settings.width / numberOfWhiteKeys;
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
  key.el.style.boxSizing = 'border-box';
  key.el.style.border = `1px solid ${settings.borderColor}`;

  key.color === 'white' ? styleWhiteKey(key) : styleBlackKey(key);
}

/**
 * Add styling to individual white key.
 * @param  {element} el White key DOM element.
 */
function styleWhiteKey(key) {
  key.el.style.backgroundColor = settings.whiteKeyColor;
  key.el.style.height = `${settings.height}px`;
  key.el.style.width = `${key.width}px`;
  key.el.style.borderRadius = '0 0 0.5rem 0.5rem';
  key.el.style.position = 'relative';
  key.el.style.zIndex = '1';
}

/**
 * Add styling to individual black key.
 * @param  {element} el Black key DOM element.
 */
function styleBlackKey(key) {
  const whiteKeyWidth = getWhiteKeyWidth(getTotalWhiteLength());
  const clientLeft = whiteKeyWidth * key.noteNumber + 1 + whiteKeyWidth;
  const offsetLeft = key.width / 2 + 1;

  key.el.style.backgroundColor = settings.blackKeyColor;
  key.el.style.position = 'absolute';

  key.el.style.left = `${clientLeft - offsetLeft}px`;

  key.el.style.width = `${key.width}px`;
  key.el.style.height = `${settings.height / 1.5}px`;
  key.el.style.borderRadius = '0 0 0.5rem 0.5rem';
  key.el.style.zIndex = '2';
}

/**
 * Reset styles on keyboard container and list element.
 * @param {element} keyboard Keyboard container DOM element.
 */
function styleKeyboard(keyboard) {
  const styleElement = (el) => {
    el.style.cursor = 'default';
    // el.style.fontSize = '0px';
    el.style.height = `${settings.height}px`;
    el.style.padding = 0;
    el.style.position = 'relative';
    el.style.listStyle = 'none';
    el.style.margin = settings.margin;
    el.style['-webkit-user-select'] = 'none';
    el.style.boxSizing = 'border-box';
  };

  styleElement(keyboard.container);
  styleElement(keyboard.el);
  const elWidth =
    keyboard.totalWhiteLength * getWhiteKeyWidth(keyboard.totalWhiteLength);
  keyboard.el.style.width = `${elWidth}px`;
}

function addKeysToKeyboard(keyboard) {
  keyboard.keys.forEach((key) => keyboard.el.appendChild(key));
}

/**
 * Add event listeners to keyboard.
 * @param {element} keyboardElement
 */
function addListeners(keyboardElement) {
  keyboardElement.addEventListener('pointerdown', (event) => {
    eventDown(event.target, this.keyDown);
  });

  keyboardElement.addEventListener('pointerup', (event) => {
    eventUp(event.target, this.keyUp);
  });
}

export function miniKey(element, userSettings = {}) {
  // xxx: margin やpadding 依存をどうやって処理するか
  baseSettings.width = element.offsetWidth;
  baseSettings.height = element.offsetHeight;
  settings = { ...baseSettings, ...userSettings };
  createKeyboard(element);
  //addListeners(element);
}
