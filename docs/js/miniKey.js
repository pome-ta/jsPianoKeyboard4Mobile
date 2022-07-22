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
  borderColor: 'lightgray',
  activeColor: 'maroon',
};

const noteNumber = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];

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
    (_, index) =>
      notesToOrder[
        index + keyOffset < notesToOrder.length
          ? index + keyOffset
          : index + keyOffset - notesToOrder.length
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
  const keys = totalWhiteKeys.map((noteChar, noteIndex) => {
    octave += noteChar === 'C' && noteIndex ? 1 : 0;

    let whiteKey, blackKey;
    whiteKey = createKey({
      color: 'white',
      octave: octave,
      note: noteChar,
      width: keyWidth,
      id: `${noteChar}${octave}`,
      noteIndex: noteIndex,
    });
    if (
      noteIndex !== totalWhiteLength - 1 &&
      keyboard.notesWithSharps.includes(noteChar)
    ) {
      blackKey = createKey({
        color: 'black',
        octave: octave,
        note: `${noteChar}#`,
        width: keyWidth / 2,
        id: `${noteChar}#${octave}`,
        noteIndex: noteIndex,
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
  key.el.classList.add('pianoKeys');
  key.el.setAttribute('data-note-type', key.color);
  key.el.setAttribute(
    'data-frequency-value',
    getFrequency(key.note, key.octave)
  );
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
  const clientLeft = whiteKeyWidth * key.noteIndex + 1 + whiteKeyWidth;
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
  keyboardElement.addEventListener('touchmove', (event) => {
    event.preventDefault();
  });
  keyboardElement.querySelectorAll('.pianoKeys').forEach((key) => {
    key.addEventListener('pointerdown', (event) => {
      key.releasePointerCapture(event.pointerId);
    });

    key.addEventListener('pointerenter', (event) => {
      eventDown(event, keyDownCallback);
    });

    key.addEventListener('pointerleave', (event) => {
      eventUp(event);
    });
  });
}

/**
 * Call user's Down event.
 */
function eventDown(event, callback) {
  setActiveColor(event.target);
  callback();
  //callback(element.title, this.getFrequencyOfNote(element.title));
}

/**
 * Call user's Up event.
 */
function eventUp(event, callback) {
  revertActiveColor(event.target);
}

// res ?
function eventEnter(event, callback) {
  event.pressure ? null : eventDown(event, callback);
}

function eventLeave(event, callback) {
  event.pressure ? eventUp(event, callback) : null;
}

/**
 * Lighten up man. Change the color of a key.
 * @param  {element} el DOM element to change color of.
 */
function setActiveColor(el) {
  // xxx: `if (el !== null || typeof el === undefined)` いる？
  el.style.backgroundColor = settings.activeColor;
}

/**
 * Revert key to original colour.
 * @param  {element} el DOM element to change colour of.
 */
function revertActiveColor(el) {
  // xxx: `if (el !== null)` いる？
  el.style.backgroundColor =
    el.getAttribute('data-note-type') === 'white'
      ? settings.whiteKeyColor
      : settings.blackKeyColor;
}

function getMidiNote(note, octave) {
  const tone = noteNumber.indexOf(note);
  // C-1 = 0
  const midiOctave = octave + 1;
  return midiOctave * 12 + tone;
}

function getFrequency(note, octave) {
  const midiNote = getMidiNote(note, octave);
  // A4 = 69 = 440.0Hz
  return 440.0 * Math.pow(2.0, (midiNote - 69) / 12);
}

let keyDownCallback = function () {};

export function miniKey(element, userSettings = {}) {
  // xxx: margin やpadding 依存をどうやって処理するか
  baseSettings.width = element.offsetWidth;
  baseSettings.height = element.offsetHeight;
  settings = { ...baseSettings, ...userSettings };
  createKeyboard(element);
  addListeners(element);
  return { keyDown: keyDownCallback };
}
