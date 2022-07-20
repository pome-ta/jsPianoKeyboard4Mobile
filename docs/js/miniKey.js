//let container;
let settings = {};
const baseSettings = {
  width: 480,
  height: 160,
  margin: 0,

  startNote: 'A',
  keyOctave: 3,

  whiteKeyColor: '#fff',
  blackKeyColor: '#000',
  activeColor: 'maroon',
};

function createKeyboard(container) {
  const whiteNotes = orderNotes(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
  const notesWithSharps = orderNotes(['C', 'D', 'F', 'G', 'A']);
  const keyboard = {
    container: container,
    el: document.createElement('ul'),
    whiteNotes: whiteNotes,
    notesWithSharps: notesWithSharps,
  };
  //const keysObj = createKeys(keyboard);
  createKeys(keyboard);
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
  //let key;
  //let keys = [];
  let noteCounter = 0;
  //let octave_counter = this.settings.keyOctave;

  // 3
  // xxx: 関数`getTotalWhiteKeys` の`7` よりも、`keyboard.whiteNotes` の長さの方が自明的？
  // xxx: `totalWhiteKeys` を配列として、`.length` で長さを取るか
  //const totalWhiteKeys = getTotalWhiteKeys();
  let octave = settings.keyOctave;
  const totalWhiteKeys = [...new Array(octave)]
    .map(() => [...keyboard.whiteNotes])
    .flat();
  const totalWhiteLength = totalWhiteKeys.length;
  const keyWidth = getWhiteKeyWidth(totalWhiteLength);

  const keys = totalWhiteKeys
    .map((noteStr, index) => {
      octave += noteStr === 'C' && index ? 1 : 0;
      const whiteKey = `white:${noteStr}${octave} noteNumber:${index}`;
      // xxx: `if (noteNumber !== total_white_keys - 1)`
      const blackKey = keyboard.notesWithSharps.includes(noteStr)
        ? `black:${noteStr}#${octave} noteNumber:${index}`
        : null;
      return [whiteKey, blackKey].filter((key) => key);
    })
    .flat();
  console.log(keys);

  /*
  const totalKays = [...new Array(settings.keyOctave)].map(() => [
    ...keyboard.whiteNotes,
    ...keyboard.notesWithSharps,
  ]);
  */
  /*
  for (let noteNumber = 0; noteNumber < totalWhiteKeys; noteNumber++) {
    if (noteNumber % keyboard.whiteNotes.length === 0) {
      note_counter = 0;
    }

    let bizarre_note_counter = keyboard.whiteNotes[note_counter];

    if (bizarre_note_counter === 'C' && noteNumber !== 0) {
      octave_counter++;
    }

    key = this.createKey({
      colour: 'white',
      octave: octave_counter,
      width: this.getWhiteKeyWidth(total_white_keys),
      id: keyboard.whiteNotes[note_counter] + octave_counter,
      noteNumber: noteNumber,
    });

    keys.push(key.el);
    if (noteNumber !== total_white_keys - 1) {
      for (const note of keyboard.notesWithSharps) {
        if (note === keyboard.whiteNotes[note_counter]) {
          key = this.createKey({
            colour: 'black',
            octave: octave_counter,
            width: this.getWhiteKeyWidth(total_white_keys) / 2,
            id: keyboard.whiteNotes[note_counter] + '#' + octave_counter,
            noteNumber: noteNumber,
          });
        }
        keys.push(key.el);
      }
    }
    note_counter++;
  }

  return {
    keys: keys,
    totalWhiteKeys: totalWhiteKeys,
  };
  */
}

function getTotalWhiteKeys() {
  return settings.octaves * 7;
}

/**
 * Calculate width of white key.
 * @return {number} Width of a single white key in pixels.
 */
function getWhiteKeyWidth(numberOfWhiteKeys) {
  return Math.floor((settings.width - numberOfWhiteKeys) / numberOfWhiteKeys);
}

/**
 * Create key DOM element.
 * @return {object} Key DOM element.
 */
function createKey(key) {
  key.el = document.createElement('li');
  key.el.id = key.id;
  key.el.title = key.id;
  key.el.setAttribute('data-note-type', key.colour);
  console.log(key.noteNumber);
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

  key.colour === 'white' ? this.styleWhiteKey(key) : this.styleBlackKey(key);
}

/**
 * Add styling to individual white key.
 * @param  {element} el White key DOM element.
 */
function styleWhiteKey(key) {
  key.el.style.backgroundColor = this.settings.whiteKeyColour;
  key.el.style.border = '1px solid ' + this.settings.borderColour;
  key.el.style.borderRight = 0;
  key.el.style.height = this.settings.height + 'px';
  key.el.style.width = key.width + 'px';
  key.el.style.borderRadius = '0 0 5px 5px';
  key.el.style.position = 'relative';
  key.el.style.zIndex = '1';
  key.el.style.boxSizing = 'content-box';

  if (key.noteNumber === this.getTotalWhiteKeys() - 1) {
    key.el.style.border = '1px solid ' + this.settings.borderColour;
  }
}

/**
 * Add styling to individual black key.
 * @param  {element} el Black key DOM element.
 */
function styleBlackKey(key) {
  const white_key_width = this.getWhiteKeyWidth(this.getTotalWhiteKeys());
  const black_key_width = Math.floor(white_key_width / 2);

  key.el.style.backgroundColor = this.settings.blackKeyColour;
  key.el.style.border = '1px solid ' + this.settings.borderColour;
  key.el.style.position = 'absolute';
  key.el.style.left =
    Math.floor(
      (white_key_width + 1) * (key.noteNumber + 1) - black_key_width / 2
    ) + 'px';
  key.el.style.width = black_key_width + 'px';
  key.el.style.height = this.settings.height / 1.5 + 'px';
  key.el.style.borderRadius = '0 0 3px 3px';
  key.el.style.zIndex = '2';
  key.el.style.boxSizing = 'content-box';
}
export function miniKey(element, userSettings = {}) {
  baseSettings.width = element.offsetWidth;
  baseSettings.height = element.offsetHeight;
  settings = { ...baseSettings, ...userSettings };
  createKeyboard(element);
}
