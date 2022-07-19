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
  let key;
  let keys = [];
  let noteCounter = 0;
  //let octave_counter = this.settings.keyOctave;

  // 3
  // xxx: 関数`getTotalWhiteKeys` の`7` よりも、`keyboard.whiteNotes` の長さの方が自明的？
  // xxx: `totalWhiteKeys` を配列として、`.length` で長さを取るか
  const totalWhiteKeys = getTotalWhiteKeys();
  const keyWidth = getWhiteKeyWidth(totalWhiteKeys);
  const totalKays = [...new Array(settings.keyOctave)].map(() => [
    ...keyboard.whiteNotes,
    ...keyboard.notesWithSharps,
  ]);

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

function createKey() {
  // styleKey
  console.log(settings);
}

export function miniKey(element, userSettings = {}) {
  baseSettings.width = element.offsetWidth;
  baseSettings.height = element.offsetHeight;
  settings = { ...baseSettings, ...userSettings };
  createKey(element);
}
