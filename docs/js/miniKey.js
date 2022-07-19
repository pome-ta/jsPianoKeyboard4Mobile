let container;
let settings = {};
const baseSettings = {
  width: 480,
  height: 160,
  margin: 0,
  
  startNote: 'A',

  whiteKeyColor: '#fff',
  blackKeyColor: '#000',
  activeColor: 'maroon',
};

function createKeyboard() {
  const keyboard = {
    container: container,
    el: document.createElement('ul'),
    whiteNotes: orderNotes(['C', 'D', 'E', 'F', 'G', 'A', 'B']),
    notesWithSharps: orderNotes(['C', 'D', 'F', 'G', 'A']),
  };
}

/**
 * Order notes into order defined by starting key in settings.
 * @param {array} notesToOrder Notes to be ordered.
 * @return {array} orderedNotes Ordered notes.
 */
function orderNotes(notesToOrder) {
  let orderedNotes = [];

  const orderLength = notesToOrder.length;

  const keyOffset = notesToOrder.indexOf(settings.startNote);

  // todo: `settings.startNote` を起点に並び替え
  notesToOrder.map((_, index, array) => array[])
  /*
  6,6,6,6,6,6,6
  5,5,5,5,5,5,5
  
  0,1,2,3,4,5,6
  6,5,4,3,2,1,0
  
 [5,6,0,1,2,3,4]
 */
  
  
  for (let i = 0; i < number_of_notes_to_order; i++) {
    if (i + keyOffset > number_of_notes_to_order - 1) {
      orderedNotes[i] =
        notesToOrder[i + keyOffset - number_of_notes_to_order];
    } else {
      orderedNotes[i] = notesToOrder[i + keyOffset];
    }
  }

  return orderedNotes;
}

function createKey() {
  // styleKey
  console.log(settings);
}

export function miniKey(element, userSettings = {}) {
  container = element;
  baseSettings.width = container.offsetWidth;
  baseSettings.height = container.offsetHeight;
  settings = { ...baseSettings, ...userSettings };
  createKey();
}
