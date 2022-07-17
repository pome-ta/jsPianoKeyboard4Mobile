export class QwertyHancock {
  version = '0.0.0';
  settings = {};
  mouse_is_down = false;
  keysDown = {};
  key_map = {
    65: 'Cl',
    87: 'C#l',
    83: 'Dl',
    69: 'D#l',
    68: 'El',
    70: 'Fl',
    84: 'F#l',
    71: 'Gl',
    89: 'G#l',
    90: 'G#l',
    72: 'Al',
    85: 'A#l',
    74: 'Bl',
    75: 'Cu',
    79: 'C#u',
    76: 'Du',
    80: 'D#u',
    59: 'Eu',
    186: 'Eu',
    222: 'Fu',
    221: 'F#u',
    220: 'Gu',
  };
  keyDownCallback;
  keyUpCallback;
  /**
   * Merge user settings with defaults.
   * @param  {object} user_settings
   */
  constructor(us = {}) {
    const user_settings = us;
    this.settings = {
      id: user_settings.id || 'keyboard',
      octaves: user_settings.octaves || 3,
      width: user_settings.width,
      height: user_settings.height,
      margin: user_settings.margin || 0,
      startNote: user_settings.startNote || 'A3',
      whiteKeyColour: user_settings.whiteKeyColour || '#fff',
      blackKeyColour: user_settings.blackKeyColour || '#000',
      activeColour: user_settings.activeColour || 'yellow',
      borderColour: user_settings.borderColour || '#000',
      keyboardLayout: user_settings.keyboardLayout || 'en',
      musicalTyping: user_settings.musicalTyping === false ? false : true,
    };
    const container = document.getElementById(this.settings.id);

    if (typeof this.settings.width === undefined) {
      this.settings.width = container.offsetWidth;
    }

    if (typeof this.settings.height === undefined) {
      this.settings.height = container.offsetHeight;
    }

    this.settings.startOctave = parseInt(this.settings.startNote.charAt(1), 10);
    this.settings.keyOctave =
      user_settings.keyOctave || this.settings.startOctave;

    // Add getters and setters
    // xxx: `get` `set` で書く
    this.setKeyOctave = function (octave) {
      this.settings.keyOctave = octave;
      return this.settings.keyOctave;
    };
    this.getKeyOctave = function () {
      return this.settings.keyOctave;
    };
    this.keyOctaveUp = function () {
      // xxx: インクリメントでそのまま返す？
      this.settings.keyOctave++;
      return this.settings.keyOctave;
    };
    this.keyOctaveDown = function () {
      // xxx: デクリメントでそのまま返す？
      this.settings.keyOctave--;
      return this.settings.keyOctave;
    };
    this.getKeyMap = function () {
      return this.key_map;
    };
    this.setKeyMap = function (newKeyMap) {
      this.key_map = newKeyMap;

      return this.key_map;
    };

    this.createKeyboard();
    // this.addListeners.call(this, container);
    this.addListeners(container);
  }
  /**
   * Calculate width of white key.
   * @return {number} Width of a single white key in pixels.
   */
  getWhiteKeyWidth(number_of_white_keys) {
    return Math.floor(
      (this.settings.width - number_of_white_keys) / number_of_white_keys
    );
  }

  /**
   * Get frequency of a given note.
   * @param  {string} note Musical note to convert into hertz.
   * @return {number} Frequency of note in hertz.
   */
  getFrequencyOfNote(note) {
    const notes = [
      'A',
      'A#',
      'B',
      'C',
      'C#',
      'D',
      'D#',
      'E',
      'F',
      'F#',
      'G',
      'G#',
    ];
    const octave = note.length === 3 ? note.charAt(2) : note.charAt(1);
    const noteIndex = notes.indexOf(note.slice(0, -1));
    const key_number =
      noteIndex < 3
        ? noteIndex + 12 + (octave - 1) * 12 + 1
        : noteIndex + (octave - 1) * 12 + 1;
    return 440 * Math.pow(2, (key_number - 49) / 12);
  }

  /**
   * Lighten up man. Change the colour of a key.
   * @param  {element} el DOM element to change colour of.
   */
  lightenUp(el) {
    if (el !== null || typeof el === undefined) {
      el.style.backgroundColor = this.settings.activeColour;
    }
  }

  /**
   * Revert key to original colour.
   * @param  {element} el DOM element to change colour of.
   */
  darkenDown(el) {
    if (el !== null) {
      el.style.backgroundColor =
        el.getAttribute('data-note-type') === 'white'
          ? this.settings.whiteKeyColour
          : this.settings.blackKeyColour;
    }
  }

  /**
   * Order notes into order defined by starting key in settings.
   * @param {array} notes_to_order Notes to be ordered.
   * @return {array{ ordered_notes Ordered notes.
   */
  orderNotes(notes_to_order) {
    let keyOffset = 0;
    let ordered_notes = [];

    const number_of_notes_to_order = notes_to_order.length;

    for (let i = 0; i < number_of_notes_to_order; i++) {
      if (this.settings.startNote.charAt(0) === notes_to_order[i]) {
        keyOffset = i;
        break;
      }
    }

    for (let i = 0; i < number_of_notes_to_order; i++) {
      if (i + keyOffset > number_of_notes_to_order - 1) {
        ordered_notes[i] =
          notes_to_order[i + keyOffset - number_of_notes_to_order];
      } else {
        ordered_notes[i] = notes_to_order[i + keyOffset];
      }
    }

    return ordered_notes;
  }

  /**
   * Add styling to individual white key.
   * @param  {element} el White key DOM element.
   */
  styleWhiteKey(key) {
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
  styleBlackKey(key) {
    let white_key_width = this.getWhiteKeyWidth(this.getTotalWhiteKeys());
    let black_key_width = Math.floor(white_key_width / 2);

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

  /**
   * Add styling to individual key on keyboard.
   * @param  {object} key Element of key.
   */
  styleKey(key) {
    key.el.style.display = 'inline-block';
    key.el.style['-webkit-user-select'] = 'none';

    key.colour === 'white' ? this.styleWhiteKey(key) : this.styleBlackKey(key);
  }

  /**
   * Reset styles on keyboard container and list element.
   * @param {element} keyboard Keyboard container DOM element.
   */
  styleKeyboard(keyboard) {
    const styleElement = (el) => {
      el.style.cursor = 'default';
      el.style.fontSize = '0px';
      el.style.height = this.settings.height + 'px';
      el.style.padding = 0;
      el.style.position = 'relative';
      el.style.listStyle = 'none';
      el.style.margin = this.settings.margin;
      el.style['-webkit-user-select'] = 'none';
      el.style.boxSizing = 'content-box';
    };

    styleElement(keyboard.container);
    styleElement(keyboard.el);
    keyboard.el.style.width =
      keyboard.totalWhiteKeys *
        (this.getWhiteKeyWidth(keyboard.totalWhiteKeys) + 1) +
      2 +
      'px';
  }

  /**
   * Call user's mouseDown event.
   */
  mouseDown(element, callback) {
    if (element.tagName.toLowerCase() == 'li') {
      this.mouse_is_down = true;
      this.lightenUp(element);
      callback(element.title, this.getFrequencyOfNote(element.title));
    }
  }

  /**
   * Call user's mouseUp event.
   */
  mouseUp(element, callback) {
    if (element.tagName.toLowerCase() == 'li') {
      this.mouse_is_down = false;
      this.darkenDown(element);
      callback(element.title, this.getFrequencyOfNote(element.title));
    }
  }

  /**
   * Call user's mouseDown if required.
   */
  mouseOver(element, callback) {
    if (this.mouse_is_down) {
      this.lightenUp(element);
      callback(element.title, this.getFrequencyOfNote(element.title));
    }
  }

  /**
   * Call user's mouseUp if required.
   */
  mouseOut(element, callback) {
    if (this.mouse_is_down) {
      this.darkenDown(element);
      callback(element.title, this.getFrequencyOfNote(element.title));
    }
  }

  /**
   * Create key DOM element.
   * @return {object} Key DOM element.
   */
  createKey(key) {
    key.el = document.createElement('li');
    key.el.id = key.id;
    key.el.title = key.id;
    key.el.setAttribute('data-note-type', key.colour);

    this.styleKey(key);

    return key;
  }

  getTotalWhiteKeys() {
    return this.settings.octaves * 7;
  }

  createKeys(keyboard) {
    let key;
    let keys = [];
    let note_counter = 0;
    let octave_counter = this.settings.startOctave;
    let total_white_keys = this.getTotalWhiteKeys();

    for (let i = 0; i < total_white_keys; i++) {
      if (i % keyboard.whiteNotes.length === 0) {
        note_counter = 0;
      }

      let bizarre_note_counter = keyboard.whiteNotes[note_counter];

      if (bizarre_note_counter === 'C' && i !== 0) {
        octave_counter++;
      }

      key = this.createKey({
        colour: 'white',
        octave: octave_counter,
        width: this.getWhiteKeyWidth(total_white_keys),
        id: keyboard.whiteNotes[note_counter] + octave_counter,
        noteNumber: i,
      });

      keys.push(key.el);
      if (i !== total_white_keys - 1) {
        for (const note of keyboard.notesWithSharps) {
          if (note === keyboard.whiteNotes[note_counter]) {
            key = this.createKey({
              colour: 'black',
              octave: octave_counter,
              width: this.getWhiteKeyWidth(total_white_keys) / 2,
              id: keyboard.whiteNotes[note_counter] + '#' + octave_counter,
              noteNumber: i,
            });
          }
          keys.push(key.el);
        }
      }
      note_counter++;
    }

    return {
      keys: keys,
      totalWhiteKeys: total_white_keys,
    };
  }

  addKeysToKeyboard(keyboard) {
    keyboard.keys.forEach(function (key) {
      keyboard.el.appendChild(key);
    });
  }

  setKeyPressOffset(sorted_white_notes) {
    this.settings.keyPressOffset = sorted_white_notes[0] === 'C' ? 0 : 1;
  }

  createKeyboard() {
    let keyboard = {
      container: document.getElementById(this.settings.id),
      el: document.createElement('ul'),
      whiteNotes: this.orderNotes(['C', 'D', 'E', 'F', 'G', 'A', 'B']),
      notesWithSharps: this.orderNotes(['C', 'D', 'F', 'G', 'A']),
    };

    let keysObj = this.createKeys(keyboard);

    keyboard.keys = keysObj.keys;
    keyboard.totalWhiteKeys = keysObj.totalWhiteKeys;

    this.setKeyPressOffset(keyboard.whiteNotes);
    this.styleKeyboard(keyboard);

    // Add keys to keyboard, and keyboard to container.
    this.addKeysToKeyboard(keyboard);

    if (keyboard.container.querySelector('ul')) {
      keyboard.container.replaceChild(
        keyboard.el,
        keyboard.container.querySelector('ul')
      );
    } else {
      keyboard.container.appendChild(keyboard.el);
    }

    // xxx: `return` 🤔
    return keyboard;
    //this.keyboard = keyboard;
  }

  getKeyPressed(keyCode) {
    return key_map[keyCode]
      .replace(
        'l',
        parseInt(this.settings.keyOctave, 10) + this.settings.keyPressOffset
      )
      .replace(
        'u',
        (
          parseInt(this.settings.keyOctave, 10) +
          this.settings.keyPressOffset +
          1
        ).toString()
      );
  }

  /**
   * Handle a keyboard key being pressed.
   * @param {object} key The keyboard event of the currently pressed key.
   * @param {callback} callback The user's noteDown function.
   * @return {boolean} true if it was a key (combo) used by qwerty-hancock
   */
  keyboardDown(key, callback) {
    let key_pressed;

    if (key.keyCode in this.keysDown) {
      return false;
    }

    this.keysDown[key.keyCode] = true;

    if (typeof this.key_map[key.keyCode] !== undefined) {
      key_pressed = this.getKeyPressed(key.keyCode);

      // Call user's noteDown function.
      callback(key_pressed, getFrequencyOfNote(key_pressed));
      lightenUp(document.getElementById(key_pressed));
      return true;
    }
    return false;
  }

  /**
   * Handle a keyboard key being released.
   * @param {element} key The DOM element of the key that was released.
   * @param {callback} callback The user's noteDown function.
   * @return {boolean} true if it was a key (combo) used by qwerty-hancock
   */
  keyboardUp(key, callback) {
    let key_pressed;

    delete keysDown[key.keyCode];

    if (typeof this.key_map[key.keyCode] !== undefined) {
      key_pressed = this.getKeyPressed(key.keyCode);
      // Call user's noteDown function.
      callback(key_pressed, getFrequencyOfNote(key_pressed));
      darkenDown(document.getElementById(key_pressed));
      return true;
    }
    return false;
  }

  /**
   * Determine whether pressed key is a modifier key or not.
   * @param {KeyboardEvent} The keydown event of a pressed key
   */
  isModifierKey(key) {
    return key.ctrlKey || key.metaKey || key.altKey;
  }

  /**
   * Add event listeners to keyboard.
   * @param {element} keyboard_element
   */
  addListeners(keyboard_element) {
    //let that = this;

    if (this.settings.musicalTyping) {
      // Key is pressed down on keyboard.
      window.addEventListener('keydown', (key) => {
        if (this.isModifierKey(key)) {
          return;
        }
        if (this.keyboardDown(key, this.keyDown)) {
          key.preventDefault();
        }
      });

      // Key is released on keyboard.
      window.addEventListener('keyup', (key) => {
        if (this.isModifierKey(key)) {
          return;
        }
        if (this.keyboardUp(key, this.keyUp)) {
          key.preventDefault();
        }
      });
    }
    // Mouse is clicked down on keyboard element.
    keyboard_element.addEventListener('mousedown', (event) => {
      this.mouseDown(event.target, this.keyDown);
    });

    // Mouse is released from keyboard element.
    keyboard_element.addEventListener('mouseup', (event) => {
      this.mouseUp(event.target, this.keyUp);
    });

    // Mouse is moved over keyboard element.
    keyboard_element.addEventListener('mouseover', (event) => {
      this.mouseOver(event.target, this.keyDown);
    });

    // Mouse is moved out of keyvoard element.
    keyboard_element.addEventListener('mouseout', (event) => {
      this.mouseOut(event.target, this.keyUp);
    });

    // Device supports touch events.
    if ('ontouchstart' in document.documentElement) {
      keyboard_element.addEventListener('touchstart', (event) => {
        this.mouseDown(event.target, this.keyDown);
      });

      keyboard_element.addEventListener('touchend', (event) => {
        this.mouseUp(event.target, this.keyUp);
      });

      keyboard_element.addEventListener('touchleave', (event) => {
        this.mouseOut(event.target, this.keyUp);
      });

      keyboard_element.addEventListener('touchcancel', (event) => {
        this.mouseOut(event.target, this.keyUp);
      });
    }
  }
}
