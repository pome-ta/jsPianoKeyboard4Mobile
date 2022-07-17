'use strict';

import { QwertyHancock } from './esmQwertyHancock.js';

function setupKey(isSharp, parentNode) {
  const key = document.createElement('span');
  key.style.display = 'inline-block';
  key.classList.add('pianokey');
  if (isSharp) {
    key.classList.add('sharp');
    key.style.backgroundColor = 'black';
    key.style.height = '5rem';
    key.style.marginLeft = '-4%';
    key.style.position = 'absolute';
    key.style.width = '8%';
  } else {
    key.style.backgroundColor = 'white';
    key.style.width = 'calc(100% / 8)';
    key.style.height = '8rem';
  }
  parentNode.appendChild(key);
}

const octaveKeyPatterns = [
  false,
  true,
  false,
  true,
  false,
  false,
  true,
  false,
  true,
  false,
  true,
  false,
  false,
];

const pianoKeysWrap = document.createElement('div');
pianoKeysWrap.style.width = '100%';

for (const keyPattern of octaveKeyPatterns) {
  setupKey(keyPattern, pianoKeysWrap);
}

document.body.appendChild(pianoKeysWrap);

const synth = document.createElement('div');
const keyboardDiv = document.createElement('div');
keyboardDiv.id = 'keyboard';

synth.classList.add('synth');
synth.appendChild(keyboardDiv);
document.body.appendChild(synth);

const keyboardWidth = document.querySelector('.synth').clientWidth;

const mySettings = {
  id: 'keyboard',
  width: `${keyboardWidth}`,
  height: 128,
  startNote: 'A2',
  margin: 'auto',
  whiteNotesColour: '#fff',
  blackNotesColour: '#000',
  borderColour: '#000',
  activeColour: 'maroon',
  octaves: 2,
  musicalTyping: false,
};

let keyboard;
//keyboard = new window.QwertyHancock(mySettings);
keyboard = new QwertyHancock(mySettings);

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
