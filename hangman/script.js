// create main blocks
const body = document.querySelector('body');
const container = document.createElement('div');
container.classList.add('container');
body.prepend(container);

// gallows block
const gallowsBlock = document.createElement('div');
gallowsBlock.classList.add('gallows');
container.prepend(gallowsBlock);

// gallows text
const gallowsText = document.createElement('h1');
gallowsText.innerHTML = 'HANGMAN GAME';
gallowsBlock.prepend(gallowsText);

// gallows image
const gallowsWrap = document.createElement('div');
gallowsWrap.classList.add('gallows-box');
gallowsBlock.append(gallowsWrap);
const gallowsImg = document.createElement('img');
gallowsImg.src = 'source/gallows.png';
gallowsImg.alt = 'gallows picture';
gallowsImg.classList.add('gallows-image');
gallowsBlock.append(gallowsImg);
gallowsWrap.prepend(gallowsImg);

// canvas
const canvasElem = document.createElement('canvas');
canvasElem.classList.add('canvas');
gallowsBlock.append(canvasElem);

// keyboard block
const keyboardBlock = document.createElement('div');
keyboardBlock.classList.add('keyboard');
container.append(keyboardBlock);

// block with question
const questions = [
  ['HALLOWEEN', 'What holiday has a symbol as the pumpkin?'],
  ['VOLCANO', 'What do we call a mountain which could erupt?'],
  ['TENNIS', 'Which sport is played at Wimbledon?'],
  ['VAMPIRE', 'His favorite drink is blood'],
  ['WIZARD', 'A man who practices magic'],
  ['GRYFFINDOR', 'Which faculty did Harry Potter study at?'],
  ['CANADA', 'What country is Justin Bieber from?'],
  ['OUTLOOK', 'Which email service is owned by Microsoft?'],
  ['MERCURY', 'What is the smallest planet in our solar system?'],
  ['MCDONALDS', "Which restaurant's symbol is a clown?"],
  ['EARTHQUAKE', 'What natural disaster is measured on the Richter scale?'],
  ['GREENLAND', 'What is the largest island in the world?'],
];

const letterBox = document.createElement('div');
letterBox.classList.add('letter-wrap');
keyboardBlock.append(letterBox);

function createWord(el) {
  const box = document.createElement('div');
  box.classList.add('letter-box');
  box.dataset.name = el;
  letterBox.append(box);
}

// create title - question
const questionBox = document.createElement('h2');
questionBox.classList.add('question-box');
keyboardBlock.prepend(questionBox);

let globalIndex;

function createSpaceForLetters() {
  const length = questions.length;
  const index = Math.floor(Math.random() * length);
  globalIndex = index;
  const wordArr = Array.from(questions[index][0]);

  questionBox.innerHTML = `${questions[index][1]}`;

  return wordArr.forEach((elem) => createWord(elem));
}
createSpaceForLetters();

// counter
const counterBox = document.createElement('div');
counterBox.classList.add('counter-box');
keyboardBlock.append(counterBox);

const counterPhrase = document.createElement('span');
counterPhrase.classList.add('counter-phrase');
counterPhrase.textContent = 'Incorrect guesses: ';
counterBox.append(counterPhrase);

const counterTry = document.createElement('span');
counterTry.textContent = '0';
counterTry.classList.add('counter-try');
counterBox.append(counterTry);

const counterTotal = document.createElement('span');
counterTotal.textContent = '/ 6';
counterTotal.classList.add('counter-total');
counterBox.append(counterTotal);

const counterPlace = document.querySelector('.counter-try');
let count = 0;

// keyboard
const keyboard = document.createElement('div');
keyboard.classList.add('keyboard-wrap');
keyboardBlock.append(keyboard);

class Key {
  constructor(letter) {
    this.letter = letter;
  }
  createKey() {
    const key = document.createElement('button');
    key.classList.add('key');
    const span = document.createElement('span');
    key.dataset.id = this.letter;
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

// compare letter
allLetters.forEach((elem) => {
  elem.addEventListener(
    'click',
    () => {
      checkLetter(elem);
    },
    { once: true }
  );
});

function checkLetter(elem) {
  const datasetKey = elem.dataset.id;
  const arrLetter = document.querySelectorAll('.letter-box');
  let checkFlag = false;

  arrLetter.forEach((el, ind) => {
    if (el.dataset.name === datasetKey) {
      arrLetter[ind].innerHTML = `${datasetKey}`;
      arrLetter[ind].classList.add('guessed-letter');
      checkFlag = true;
    }
  });

  if (!checkFlag) {
    count++;
    counterPlace.innerHTML = `${count}`;
    drawMan();
  }
  elem.classList.add('disabled-key');
  elem.disabled = true;
}

document.addEventListener('keydown', function (event) {
  let key = event.code;
  key = key[key.length - 1];
  let checkFlag = false;

  let button;

  allLetters.forEach((el) => {
    if (el.dataset.id === key) {
      el.classList.add('disabled-key');
      button = el;
    }
  });

  const arrLetter = document.querySelectorAll('.letter-box');
  arrLetter.forEach((el, ind) => {
    if (el.dataset.name == key) {
      arrLetter[ind].innerHTML = `${key}`;
      arrLetter[ind].classList.add('guessed-letter');
      checkFlag = true;
    }
  });

  if (!checkFlag && !button.disabled) {
    count++;
    counterPlace.innerHTML = `${count}`;
    drawMan();
  }
  button.disabled = true;
});

function checkKeyboard() {}

// draw man canvas
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

const gallowsPage = document.querySelector('.gallows');
let canvasWidth = Math.floor(gallowsPage.getBoundingClientRect().width);
let canvasHeight = Math.floor(gallowsPage.getBoundingClientRect().height);

canvas.width = canvasWidth;
canvas.height = canvasHeight;

function drawHead() {
  context.beginPath();
  context.arc(300, 200, 50, 0, Math.PI * 2, true);
  context.lineWidth = 5;
  context.stroke();
}

// drawHead();
function drawBody() {
  context.beginPath();
  context.moveTo(300, 250);
  context.lineTo(300, 400);
  context.lineWidth = 5;
  context.closePath();
  context.fillStyle = 'black';
  context.fill();
  context.stroke();
}

// drawBody();
function drawLeftArm() {
  context.beginPath();
  context.moveTo(300, 280);
  context.lineTo(370, 330);
  context.lineWidth = 5;
  context.closePath();
  context.fillStyle = 'black';
  context.fill();
  context.stroke();
}

// drawLeftArm();
function drawRightArm() {
  context.beginPath();
  context.moveTo(300, 280);
  context.lineTo(230, 330);
  context.lineWidth = 5;
  context.closePath();
  context.fillStyle = 'black';
  context.fill();
  context.stroke();
}

// drawRightArm();
function drawLeftLeg() {
  context.beginPath();
  context.moveTo(300, 400);
  context.lineTo(370, 450);
  context.lineWidth = 5;
  context.closePath();
  context.fillStyle = 'black';
  context.fill();
  context.stroke();
}

// drawLeftLeg();
function drawRightLeg() {
  context.beginPath();
  context.moveTo(300, 400);
  context.lineTo(230, 450);
  context.lineWidth = 5;
  context.closePath();
  context.fillStyle = 'black';
  context.fill();
  context.stroke();
}

// drawRightLeg();
function drawMan() {
  if (count === 1) drawHead();
  if (count === 2) drawBody();
  if (count === 3) drawLeftArm();
  if (count === 4) drawRightArm();
  if (count === 5) drawLeftLeg();
  if (count === 6) drawRightLeg();
}
