'use strict';

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
];

const pianoKeysWrap = document.createElement('div');
pianoKeysWrap.style.widtfalse = '100%';

for (const keyPattern of octaveKeyPatterns) {
  const key = document.createElement('span');
  key.classList.add('pianokey');
  keyPattern ? key.classList.add('sharp') : null;
  pianoKeysWrap.appendChild(key);
}

document.body.appendChild(pianoKeysWrap);
