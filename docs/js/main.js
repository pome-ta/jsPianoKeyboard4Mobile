'use strict';

import { MiniKey } from './miniKeyClass.js';


let miniKeyboard;

const setupDOM = () => {

const miniKeyDiv = document.createElement('div');
document.body.append(miniKeyDiv);

const keyboardWidth = miniKeyDiv.clientWidth;
console.log(keyboardWidth);

const oct = 1;
const start = 'C3';
const miniSettings = {
  width: `${keyboardWidth}`,
  height: 176,
  start: start,
  keyOctave: oct,
};

miniKeyboard = new MiniKey(miniKeyDiv, miniSettings);
}
setupDOM();

miniKeyboard.keyDown = (key) => {
  const oscillator = context.createOscillator();
  oscillator.type = 'square';
  oscillator.frequency.value = key.frequency;
  oscillator.connect(masterGain);
  oscillator.start(0);
  key.osc = oscillator;
};

miniKeyboard.keyUp = (key) => {
  if (key.osc) {
    key.osc.stop(0);
    key.osc.disconnect();
    key.osc = null;
  }
};

const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();

const masterGain = context.createGain();

masterGain.gain.value = 0.5;

masterGain.connect(context.destination);
