'use strict';

import { QwertyHancock } from './esmQwertyHancock.js';

const synth = document.createElement('div');
const keyboardDiv = document.createElement('div');
keyboardDiv.id = 'keyboard';

synth.classList.add('synth');
synth.appendChild(keyboardDiv);
document.body.appendChild(synth);

const keyboardWidth = document.querySelector('.synth').clientWidth;

const oct = 2;
const start = 'A';
const mySettings = {
  id: 'keyboard',
  width: `${keyboardWidth}`,
  // width: 200,
  height: 128,
  startNote: `${start}3`,
  margin: 'auto',
  whiteNotesColour: '#fff',
  blackNotesColour: '#000',
  borderColour: '#000',
  activeColour: 'maroon',
  octaves: oct,
  musicalTyping: false,
  //musicalTyping: true,
  //keyboardLayout: 'ja',
};

const miniSettings = {
  width: `${keyboardWidth}`,
  height: 176,
  startNote: start,
  keyOctave: oct,
};

let keyboard;
//keyboard = new window.QwertyHancock(mySettings);
keyboard = new QwertyHancock(mySettings);
//keyboard.keyOctaveUp()
// console.log(keyboardDiv.offsetWidth);

const miniKeyDiv = document.createElement('div');
document.body.append(miniKeyDiv);

// import { miniKey } from './miniKey.js';
import { MiniKey } from './miniKeyClass.js';

const miniKeyboard = new MiniKey(miniKeyDiv, miniSettings);

const callNotes = [];
miniKeyboard.keyDown = (noteName, frequency) => {
  const oscillator = context.createOscillator();
  oscillator.type = 'square';
  oscillator.frequency.value = frequency;
  oscillator.connect(masterGain);
  oscillator.start(0);
  
  callNotes.push({ noteName: noteName, osc: oscillator });
  
};

miniKeyboard.keyUp = (noteName) => {
  callNotes.forEach((note, index) => {
    if (note.noteName === noteName) {
      note.osc.stop(0);
      note.osc.disconnect();
      callNotes.splice(index);
    }
  });
};

const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();

const masterGain = context.createGain();

masterGain.gain.value = 0.5;

masterGain.connect(context.destination);

let nodes = [];
keyboard.keyDown = (note, frequency) => {
  const oscillator = context.createOscillator();
  //oscillator.type = 'sine';
  oscillator.type = 'square';
  //oscillator.type = 'sawtooth';
  //oscillator.type = 'triangle';
  oscillator.frequency.value = frequency;

  //oscillator.connect(analyzeNode);
  oscillator.connect(masterGain);
  oscillator.start(0);

  nodes.push(oscillator);
};

keyboard.keyUp = (note, frequency) => {
  const newNodes = [];

  for (const nd of nodes) {
    if (Math.round(nd.frequency.value) === Math.round(frequency)) {
      nd.stop(0);
      nd.disconnect();
    } else {
      newNodes.push(nd);
    }
  }
  nodes = newNodes;
};
