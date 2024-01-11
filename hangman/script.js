// create main blocks
const body = document.querySelector('body');
const container = document.createElement('div');
container.classList.add('container');
body.prepend(container);

// gallows block
const gallowsBlock = document.createElement('div');
gallowsBlock.classList.add('gallows');
container.append(gallowsBlock);

// gallows image
const gallowsWrap = document.createElement('div');
gallowsWrap.classList.add('gallows-image__wrap');
gallowsBlock.prepend(gallowsWrap);
const gallowsImg = document.createElement('img');
gallowsImg.src = 'source/gallows.png';
gallowsImg.alt = 'gallows picture';
gallowsImg.classList.add('gallows-image');
gallowsBlock.append(gallowsImg);
gallowsWrap.prepend(gallowsImg);

const gallowsImage = document.querySelector('.gallows-image');

// canvas
const canvasElem = document.createElement('canvas');
canvasElem.classList.add('canvas');
gallowsBlock.append(canvasElem);

const canvas = document.querySelector('.canvas');
canvas.width = 150;
canvas.height = 150;
const context = canvas.getContext('2d');
// const image = new Image();
// image.src = 'source/gallows.png';

// image.onload = function () {
//   context.drawImage(image, 0, 0);
// };

// gallows text
const gallowsText = document.createElement('h1');
gallowsText.innerHTML = 'HANGMAN GAME';
gallowsBlock.append(gallowsText);

// keyboard block
const keyboardBlock = document.createElement('div');
keyboardBlock.classList.add('keyboard');
container.append(keyboardBlock);

// block with question
const questions = [
  ['HALLOWEEN', 'What holiday has a symbol as the pumpkin?'],
  ['VOLCANO', 'What do we call a mountain which could erupt?'],
];

const letterBox = document.createElement('div');
letterBox.classList.add('letter-wrap');
keyboardBlock.append(letterBox);

function createWord() {
  const box = document.createElement('div');
  box.classList.add('letter-box');
  letterBox.append(box);
}

// create title - question
const questionBox = document.createElement('h2');
questionBox.classList.add('question-box');
keyboardBlock.prepend(questionBox);

function createSpaceForLetters() {
  const length = questions.length;
  const index = Math.floor(Math.random() * length);
  const wordArr = Array.from(questions[index][0]);

  questionBox.innerHTML = `${questions[index][1]}`;

  return wordArr.forEach(createWord);
}
createSpaceForLetters();
// keyboard
const keyboard = document.createElement('div');
keyboard.classList.add('keyboard-wrap');
keyboardBlock.append(keyboard);

class Key {
  constructor(letter) {
    this.letter = letter;
  }
  createKey() {
    const key = document.createElement('div');
    key.classList.add('key');
    const span = document.createElement('span');
    key.append(span);
    span.textContent = `${this.letter}`;
    keyboard.append(key);
  }
}

// prettier-ignore
const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

alphabet.forEach((elem) => {
  const key = new Key(elem);
  key.createKey();
});

const allLetters = document.querySelectorAll('.key');

allLetters.forEach((elem) => {
  elem.addEventListener('click', () => {
    // compare code
  });
});
