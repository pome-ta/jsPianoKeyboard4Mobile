'use strict';

function setupKey(isSharp, parentNode) {
  const key = document.createElement('span');
  key.style.display = 'inline-block';
  key.classList.add('pianokey');
  if (isSharp) {
    key.classList.add('sharp');
    key.style.backgroundColor = 'black';
    key.style.height = '5rem';
    key.style.marginLeft = '-4%';
    key.style.position='absolute';
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
pianoKeysWrap.style.widtfalse = '100%';

for (const keyPattern of octaveKeyPatterns) {
  setupKey(keyPattern, pianoKeysWrap);
}

document.body.appendChild(pianoKeysWrap);
