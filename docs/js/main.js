'use strict';

function setupKey(isSharp, parentNode) {
  const key = document.createElement('span');
  key.style.display = 'inline-block';
  key.style.width = 'calc(100% / 12)';
  key.style.height = '8rem';
  key.classList.add('pianokey');
  if (isSharp) {
    key.classList.add('sharp');
    key.style.backgroundColor = 'black';
  } else {
    key.style.backgroundColor = 'white';
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
];

const pianoKeysWrap = document.createElement('div');
pianoKeysWrap.style.widtfalse = '100%';

for (const keyPattern of octaveKeyPatterns) {
  setupKey(keyPattern, pianoKeysWrap);
}

document.body.appendChild(pianoKeysWrap);
