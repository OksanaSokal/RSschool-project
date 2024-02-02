const body = document.querySelector('body');

class Block {
  constructor(tag, classname, parent) {
    this.tag = tag;
    this.classname = classname;
    this.parent = parent;
  }
  buildBlock() {
    const wrap = document.createElement(this.tag);
    wrap.classList.add(this.classname);
    this.parent.append(wrap);
    return wrap;
  }
  putContent(text, place = this.element) {
    place.textContent = text;
  }
}

// create container
let container = new Block('div', 'container', body);
container = container.buildBlock();

// create title
const title = new Block('h1', 'title', container);
const titleElement = title.buildBlock();
title.putContent('NONOGRAMS', titleElement);

// create buttons-wrapper
let buttonsBlock = new Block('div', 'buttons-box', container);
buttonsBlock = buttonsBlock.buildBlock();

// create light-mode button
let buttonTheme = new Block('button', 'button-theme', buttonsBlock);
buttonTheme = buttonTheme.buildBlock();
buttonTheme.textContent = 'Change theme';
buttonTheme.classList.add('button');
buttonTheme.addEventListener('click', () => {
  changeTheme();
  if (!soundOff) audioButton.play();
  updateMuteButtonImage();
});

// create random-game button;
let buttonRandomGame = new Block('button', 'button-random', buttonsBlock);
buttonRandomGame = buttonRandomGame.buildBlock();
buttonRandomGame.textContent = 'Random game';
buttonRandomGame.classList.add('button');
buttonRandomGame.addEventListener('click', () => {
  startRandomGame();
  if (!soundOff) audioButton.play();
});

// create save button;
let buttonSave = new Block('button', 'button-save', buttonsBlock);
buttonSave = buttonSave.buildBlock();
buttonSave.textContent = 'Save game';
buttonSave.classList.add('button');
buttonSave.addEventListener('click', () => {
  saveGame();
  if (!soundOff) audioButton.play();
});

// create continue button;
let buttonContinue = new Block('button', 'button-save', buttonsBlock);
buttonContinue = buttonContinue.buildBlock();
buttonContinue.textContent = 'Continue saved game';
buttonContinue.classList.add('button');
buttonContinue.addEventListener('click', () => {
  continueGame();
  if (!soundOff) audioButton.play();
});

let aboutGameBlock = new Block('div', 'about-game', container);
aboutGameBlock = aboutGameBlock.buildBlock();

// create solution button;
let buttonSolution = new Block('button', 'button-solution', aboutGameBlock);
buttonSolution = buttonSolution.buildBlock();
buttonSolution.textContent = 'Show solution';
buttonSolution.classList.add('button');
buttonSolution.addEventListener('click', () => {
  showSolution();
  if (!soundOff) audioButton.play();
});

// create reset button
let buttonReset = new Block('button', 'button-reset', aboutGameBlock);
buttonReset = buttonReset.buildBlock();
buttonReset.textContent = 'Reset game';
buttonReset.classList.add('button');
buttonReset.addEventListener('click', () => {
  resetGame();
  if (!soundOff) audioButton.play();
});

// create timer
let timer = new Block('div', 'timer', aboutGameBlock);
timer = timer.buildBlock();

let timerText = new Block('span', 'timer-text', timer);
const timerTextElement = timerText.buildBlock();
timerText.putContent('Time:', timerTextElement);

// timer

let minute = new Block('span', 'minutes', timer);
minute = minute.buildBlock();
minute.textContent = '00';

let colon = new Block('span', 'colon', timer);
const colonElem = colon.buildBlock();
colon.putContent(':', colonElem);

let second = new Block('span', 'seconds', timer);
second = second.buildBlock();
second.textContent = '00';

let finalMinute, finalSecond;
let seconds = 0;
let minutes = 0;

function setTimerGame() {
  seconds += 1;
  if (seconds < 10) {
    second.textContent = `0${seconds}`;
  }
  if (seconds >= 10 && seconds < 60) {
    second.textContent = `${seconds}`;
  }
  if (seconds == 60) {
    second.textContent = `00`;
    seconds = 0;
    minutes += 1;
  }
  if (minutes < 10) {
    minute.textContent = `0${minutes}`;
  }
  if (minutes >= 10 && minutes < 60) {
    minute.textContent = `${minutes}`;
  }
  finalMinute = minutes;
  finalSecond = seconds;
}

// create wrapper-game
let wrapper = new Block('div', 'wrapper', container);
wrapper = wrapper.buildBlock();

let gameBox = new Block('div', 'game-box', wrapper);
gameBox = gameBox.buildBlock();

let rowClues = new Block('div', 'row-clues', gameBox);
rowClues = rowClues.buildBlock();

let columnClues = new Block('div', 'column-clues', gameBox);
columnClues = columnClues.buildBlock();

let field = new Block('div', 'field', gameBox);
field = field.buildBlock();

const templates = {
  easy: {
    camel: {
      picture: [
        0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0,
        0,
      ],
      rowHints: [[4], [3], [4], [1], [1]],
      columnHints: [[1], [3, 1], [4], [1, 1], [1, 1]],
      size: 5,
    },
    hourglass: {
      picture: [
        1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1,
        1,
      ],
      rowHints: [
        [1, 1],
        [2, 2],
        [3, 1],
        [2, 2],
        [1, 1],
      ],
      columnHints: [[5], [3], [1], [1, 1], [5]],
      size: 5,
    },
    heart: {
      picture: [
        0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0,
        0,
      ],
      rowHints: [[2], [1, 1], [1, 1], [1, 1], [2]],
      columnHints: [[1, 1], [1, 1, 1], [1, 1], [1, 1], [1]],
      size: 5,
    },
    stroller: {
      picture: [
        0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1,
        0,
      ],
      rowHints: [[2, 1], [4], [1, 2], [1, 1], [1]],
      columnHints: [[2], [2, 1], [4], [2], [1, 1]],
      size: 5,
    },
    tetris: {
      picture: [
        0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1,
        1,
      ],
      rowHints: [[3], [1, 1], [3], [2], [3]],
      columnHints: [[1], [2], [1, 1, 1], [1, 2], [2, 2]],
      size: 5,
    },
  },
  medium: {
    snowman: {
      picture: [
        1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0,
        0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0,
        0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1,
        0, 0, 1, 1,
      ],
      rowHints: [
        [1, 1, 6],
        [6, 1],
        [1, 1],
        [4],
        [1, 1],
        [1, 1, 1, 1],
        [2, 1],
        [1, 1, 1],
        [6, 1],
        [3, 6],
      ],
      columnHints: [
        [3, 3],
        [1, 1, 1, 2],
        [2, 5],
        [1, 1],
        [3, 3],
        [2, 4, 2],
        [1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1],
        [2, 1, 2],
      ],
      size: 10,
    },
    bell: {
      picture: [
        1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0,
        1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0,
        0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0,
        0, 0, 1, 1,
      ],
      rowHints: [
        [1, 8],
        [5, 1],
        [2, 1],
        [1, 3, 2],
        [1, 2],
        [1, 1, 1],
        [1, 2],
        [1, 2],
        [1, 4, 1, 1],
        [7, 1],
      ],
      columnHints: [
        [1, 1, 2],
        [2, 2, 1],
        [3, 3],
        [2, 1, 2],
        [2, 1, 2],
        [2, 1, 2],
        [2, 1, 1],
        [1, 2, 3],
        [1, 6],
        [2, 2],
      ],
      size: 10,
    },
    construction: {
      picture: [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0,
        0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1,
        0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0,
        0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 1,
      ],
      rowHints: [
        [3],
        [5, 1, 1],
        [5],
        [2, 2, 1, 1],
        [2, 2],
        [2, 7],
        [2, 6],
        [2, 5],
        [1, 1],
        [2, 7],
      ],
      columnHints: [
        [10],
        [8, 1],
        [3, 1],
        [7, 1],
        [7, 1],
        [3, 1],
        [1, 1, 3, 1],
        [3, 1],
        [1, 1, 2, 1],
        [1, 1],
      ],
      size: 10,
    },
    man: {
      picture: [
        0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1,
        1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0,
        1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0,
        0, 1, 1, 1,
      ],
      rowHints: [
        [3, 1],
        [2, 1],
        [1, 1, 3],
        [3, 1, 2],
        [7],
        [7],
        [3, 1, 2],
        [1, 1, 3],
        [2, 1],
        [3, 1],
      ],
      columnHints: [
        [4],
        [1, 6],
        [1, 4],
        [2, 2],
        [8],
        [2, 2],
        [4, 1],
        [2, 2, 1],
        [1, 1],
        [3, 3],
      ],
      size: 10,
    },
    palm: {
      picture: [
        0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1,
        1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1,
        1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
        0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        0, 0, 0, 0,
      ],
      rowHints: [[2, 3], [2, 3], [4], [4], [9], [9], [5], [6], [2, 4], [2, 3]],
      columnHints: [
        [3, 3],
        [10],
        [1, 6, 1],
        [8],
        [2, 6],
        [2, 2, 3],
        [1, 2, 2],
        [2, 1],
        [2],
        [2],
      ],
      size: 10,
    },
  },
  hard: {
    ribbon: {
      picture: [
        0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0,
        0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0,
        0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1,
        0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0,
        0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
        0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
        0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1,
      ],
      rowHints: [
        [8, 5],
        [2, 1, 2, 2],
        [2, 4, 2],
        [3, 1, 3],
        [3, 1, 3, 1],
        [8, 2],
        [1, 1, 4],
        [1, 8],
        [5, 4],
        [3, 1, 2, 2],
        [3, 1, 2, 1],
        [3, 3, 1],
        [2, 1, 1, 1],
        [2, 1, 1, 1, 1],
        [8, 5],
      ],
      columnHints: [
        [4, 4],
        [6, 6],
        [1, 3, 3, 1],
        [1, 5, 1],
        [1, 1, 1, 1],
        [1, 3, 3, 1],
        [1, 1, 1, 1],
        [1, 6, 1],
        [6, 1, 6],
        [3, 1, 2],
        [4, 1, 4],
        [3, 3, 1],
        [1, 3, 2],
        [3, 5, 1],
        [3, 11],
      ],
      size: 15,
    },
    Mickey: {
      picture: [
        0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1,
        1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0,
        1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
        0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0,
        0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1,
        1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 0, 0, 0, 0,
      ],
      rowHints: [
        [3],
        [4],
        [1, 1],
        [3, 4, 1],
        [5, 1, 1, 1],
        [6, 2, 1],
        [7, 1],
        [6, 2, 2],
        [6, 2],
        [3, 2, 1, 1, 1],
        [7, 2],
        [8, 2],
        [11],
        [7],
        [5],
      ],
      columnHints: [
        [5],
        [7],
        [7, 3],
        [7, 4],
        [5, 5],
        [10],
        [1, 1, 6],
        [1, 5],
        [1, 1, 1, 4],
        [2, 1, 1, 1, 3],
        [5, 2, 1],
        [2, 1],
        [1, 1, 2],
        [2, 2, 2],
        [7],
      ],
      size: 15,
    },
    whale: {
      picture: [
        1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0,
        0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1,
        0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 1, 0, 1, 1, 1, 1, 1,
      ],
      rowHints: [
        [5, 1, 5],
        [4, 2, 4],
        [3, 3, 3],
        [2, 4, 3],
        [1, 1, 5, 2],
        [2, 3, 2, 2],
        [3, 9, 1],
        [4, 9],
        [5, 6, 2],
        [6, 5],
        [5, 1, 5, 1],
        [4, 1, 4, 2],
        [4, 2, 4, 2],
        [5, 5, 3],
        [4, 3, 4],
      ],
      columnHints: [
        [3, 1, 9],
        [4, 10],
        [15],
        [2, 8],
        [1, 5, 3, 1],
        [7, 1, 2, 1],
        [9, 1, 3],
        [2, 4, 2],
        [10],
        [9],
        [1, 8],
        [2, 7, 1],
        [4, 2, 1, 2],
        [6, 2, 4],
        [7, 1, 5],
      ],
      size: 15,
    },
    flamingo: {
      picture: [
        0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
        0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0,
        1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
        0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 0, 0, 0, 0,
      ],
      rowHints: [
        [5],
        [2, 4],
        [1, 5],
        [2, 3, 1],
        [1, 1, 1],
        [4, 1, 1, 2],
        [2, 2, 1, 5],
        [2, 1, 1, 5],
        [1, 9],
        [1, 1, 5],
        [1, 1, 2, 5],
        [1, 2, 3],
        [2, 3, 3],
        [2, 3],
        [8],
      ],
      columnHints: [
        [6],
        [2, 2],
        [2, 2, 2],
        [1, 1, 2, 1],
        [2, 1, 1, 1],
        [5, 1, 1, 1],
        [3, 1, 1],
        [2, 1, 1],
        [1, 6, 2],
        [4, 1, 3],
        [14],
        [3, 7],
        [2, 6],
        [2, 6],
        [6],
      ],
      size: 15,
    },
    poodle: {
      picture: [
        0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0,
        0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1,
        1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0,
        0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0,
        0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0,
        0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1,
        1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0,
        1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0,
        1, 1, 1, 1, 1, 0, 1, 1, 0,
      ],
      rowHints: [
        [2, 1],
        [2, 4, 1],
        [1, 4, 2],
        [5, 1, 2, 1],
        [1, 2, 5],
        [2, 1, 1, 4],
        [4, 3, 1],
        [2, 3, 1],
        [6, 1],
        [1, 3, 1],
        [2, 3, 1],
        [1, 5],
        [3, 1, 4, 1],
        [1, 2, 5],
        [1, 2, 2],
      ],
      columnHints: [
        [3, 3],
        [1, 2, 2, 1, 1, 1],
        [2, 2, 1, 2, 1],
        [4, 1],
        [2, 3, 2],
        [1, 2, 2],
        [2, 1, 2],
        [1, 1, 4],
        [1, 1, 7],
        [2, 8],
        [7, 3],
        [3, 2],
        [2, 2],
        [1, 2],
        [2, 2, 5, 2],
      ],
      size: 15,
    },
  },
};
let myInterval;
function createField(obj, level, game) {
  for (let i = 0; i < obj[level][game].size; i++) {
    const clue = document.createElement('div');
    clue.classList.add('clue');

    for (let j = 0; j < obj[level][game].rowHints[i].length; j++) {
      const span = document.createElement('span');
      span.textContent = obj[level][game].rowHints[i][j];
      clue.append(span);

      if (obj[level][game].size === 10 || obj[level][game].size === 15) {
        if ((i + 1) % 5 === 0) {
          clue.classList.add('clue-border-line');
        }
      }
      //
      rowClues.append(clue);
    }
  }
  for (let i = 0; i < obj[level][game].size; i++) {
    const clue = document.createElement('div');
    clue.classList.add('clue');

    const span = document.createElement('span');
    span.textContent = obj[level][game].columnHints[i].join(' ');
    clue.appendChild(span);

    columnClues.appendChild(clue);

    if (obj[level][game].size === 10 || obj[level][game].size === 15) {
      if ((i + 1) % 5 === 0) {
        clue.classList.add('clue-border-line');
      }
    }

    for (let j = 0; j < obj[level][game].size; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', toggleCell);
      cell.addEventListener('click', () => {
        checkWin(obj[level][game].picture);
        if (!soundOff) audioClick.play();
      });
      cell.addEventListener('contextmenu', putCrossCell);
      field.appendChild(cell);

      if (obj[level][game].size === 10 || obj[level][game].size === 15) {
        if ((j + 1) % 5 === 0) {
          cell.classList.add('border-line-vertical');
        }
        if ((i + 1) % 5 === 0) {
          cell.classList.add('border-line-horizontal');
        }
      }
    }
  }

  minute.textContent = '00';
  second.textContent = '00';

  let timerFlag = false;

  field.addEventListener(
    'click',
    () => {
      if (!timerFlag) {
        clearInterval(myInterval);
        myInterval = setInterval(setTimerGame, 1000);
        timerFlag = true;
      }
    },
    { once: true }
  );
}

function toggleCell(event) {
  const cell = event.target;
  cell.classList.toggle('black');
  if (cell.classList.contains('cross')) cell.classList.remove('cross');
}

createField(templates, 'easy', 'camel');

function checkWin(array) {
  let arr = document.querySelectorAll('.cell');
  const result = [];

  arr.forEach((elem) => {
    if (elem.classList.contains('black')) {
      result.push(1);
    } else result.push(0);
  });

  if (array.join('') === result.join('')) {
    modalBox.classList.add('open');
    clearInterval(myInterval);
    addTextTime('.modal-minute', '.modal-second');
    saveRecordResult();
    updateResultsTable();
    if (!soundOff) audioWin.play();
  }
}

function putCrossCell(event) {
  event.preventDefault();
  const cell = event.target;
  cell.classList.toggle('cross');
  if (!soundOff) audioClick.play();
}

let optionBlock = new Block('div', 'level-box', wrapper);
optionBlock = optionBlock.buildBlock();

let list = new Block('ul', 'list-levels', optionBlock);
list = list.buildBlock();

const levelData = [
  { text: 'Easy level', value: 'easy' },
  { text: 'Medium level', value: 'medium' },
  { text: 'Hard level', value: 'hard' },
];

const pictureEasyData = [
  { text: 'camel', value: 'camel', class: 'opt-game' },
  { text: 'hourglass', value: 'hourglass', class: 'opt-game' },
  { text: 'heart', value: 'heart', class: 'opt-game' },
  { text: 'stroller', value: 'stroller', class: 'opt-game' },
  { text: 'tetris', value: 'tetris', class: 'opt-game' },
];

const pictureMediumData = [
  { text: 'snowman', value: 'snowman', class: 'opt-game' },
  { text: 'bell', value: 'bell', class: 'opt-game' },
  { text: 'construction', value: 'construction', class: 'opt-game' },
  { text: 'man', value: 'man', class: 'opt-game' },
  { text: 'palm', value: 'palm', class: 'opt-game' },
];

const pictureHardData = [
  { text: 'ribbon', value: 'ribbon', class: 'opt-game' },
  { text: 'Mickey', value: 'Mickey', class: 'opt-game' },
  { text: 'whale', value: 'whale', class: 'opt-game' },
  { text: 'flamingo', value: 'flamingo', class: 'opt-game' },
  { text: 'poodle', value: 'poodle', class: 'opt-game' },
];

levelData.forEach((elem) => {
  let li = new Block('li', 'level', list);
  let liElem = li.buildBlock();
  li.putContent(elem.text, liElem);
  liElem.dataset.value = elem.value;
  list.append(liElem);
});

let easyDiv = new Block('div', 'level-block-easy', optionBlock);
easyDiv = easyDiv.buildBlock();

pictureEasyData.forEach((elem) => {
  let input = new Block('input', 'level-input-easy', easyDiv);
  input = input.buildBlock();
  input.type = 'radio';
  input.name = 'easy';
  input.id = elem.value;
  input.classList.add('level-input');

  let label = new Block('label', 'level-label-easy', easyDiv);
  let labelElem = label.buildBlock();
  label.putContent(elem.text, labelElem);
  labelElem.htmlFor = elem.value;
  labelElem.dataset.level = 'easy';
  labelElem.classList.add('level-label');
});

document.querySelector('.level').classList.add('level-checked');
document.querySelector('.level-input-easy').checked = 'checked';

let MediumDiv = new Block('div', 'level-block-medium', optionBlock);
MediumDiv = MediumDiv.buildBlock();

pictureMediumData.forEach((elem) => {
  let input = new Block('input', 'level-input-medium', MediumDiv);
  input = input.buildBlock();
  input.type = 'radio';
  input.name = 'medium';
  input.id = elem.value;
  input.classList.add('level-input');

  let label = new Block('label', 'level-label-medium', MediumDiv);
  let labelElem = label.buildBlock();
  label.putContent(elem.text, labelElem);
  labelElem.htmlFor = elem.value;
  labelElem.style.display = 'none';
  labelElem.dataset.level = 'medium';
  labelElem.classList.add('level-label');
});

let HardDiv = new Block('div', 'level-block-hard', optionBlock);
HardDiv = HardDiv.buildBlock();

pictureHardData.forEach((elem) => {
  let input = new Block('input', 'level-input-hard', HardDiv);
  input = input.buildBlock();
  input.type = 'radio';
  input.name = 'hard';
  input.id = elem.value;
  input.classList.add('level-input');

  let label = new Block('label', 'level-label-hard', HardDiv);
  let labelElem = label.buildBlock();
  label.putContent(elem.text, labelElem);
  labelElem.htmlFor = elem.value;
  labelElem.style.display = 'none';
  labelElem.dataset.level = 'hard';
  labelElem.classList.add('level-label');
});

const tabs = document.querySelectorAll('.level');

tabs.forEach((elem) => {
  elem.addEventListener('click', () => {
    openTab(elem);
  });
});

let currentLevel = 'easy';
let currentTemplate = 'camel';

function openTab(elem) {
  const easyArray = document.querySelectorAll('.level-label-easy');
  const mediumArray = document.querySelectorAll('.level-label-medium');
  const hardArray = document.querySelectorAll('.level-label-hard');

  tabs.forEach((elem) => {
    elem.classList.remove('level-checked');
  });

  elem.classList.add('level-checked');
  currentLevel = elem.dataset.value;

  if (elem.dataset.value === 'medium') {
    easyArray.forEach((elem) => {
      elem.style.display = 'none';
    });
    hardArray.forEach((elem) => {
      elem.style.display = 'none';
    });
    mediumArray.forEach((elem) => {
      elem.style.display = 'block';
    });
  }

  if (elem.dataset.value === 'easy') {
    mediumArray.forEach((elem) => {
      elem.style.display = 'none';
    });
    hardArray.forEach((elem) => {
      elem.style.display = 'none';
    });
    easyArray.forEach((elem) => {
      elem.style.display = 'block';
    });
  }

  if (elem.dataset.value === 'hard') {
    mediumArray.forEach((elem) => {
      elem.style.display = 'none';
    });
    easyArray.forEach((elem) => {
      elem.style.display = 'none';
    });
    hardArray.forEach((elem) => {
      elem.style.display = 'block';
    });
  }
}

const labels = document.querySelectorAll('.level-label');

labels.forEach((elem) => {
  elem.addEventListener('click', () => {
    changeTemplate(elem);
    if (!soundOff) audioChangeTemplate.play();

    currentTemplate = elem.htmlFor;
  });
});

function changeTemplate(elem) {
  while (field.firstChild) {
    field.removeChild(field.firstChild);
  }
  while (rowClues.firstChild) {
    rowClues.removeChild(rowClues.firstChild);
  }
  while (columnClues.firstChild) {
    columnClues.removeChild(columnClues.firstChild);
  }

  const game = elem.htmlFor;

  clearInterval(myInterval);
  seconds = 0;
  minutes = 0;
  minute.textContent = '00';
  second.textContent = '00';

  if (elem.dataset.level === 'easy') {
    createField(templates, 'easy', game);
    addClasses(elem);
  }
  if (elem.dataset.level === 'medium') {
    createField(templates, 'medium', game);
    addClasses(elem);
  }
  if (elem.dataset.level === 'hard') {
    createField(templates, 'hard', game);
    addClasses(elem);
  }
  return;
}

function addClasses(item) {
  if (item.dataset.level === 'easy') {
    const field = document.querySelector('.field');
    field.classList.add('field-easy');
    field.classList.remove('field-hard');
    field.classList.remove('field-medium');
  }
  if (item.dataset.level === 'medium') {
    const field = document.querySelector('.field');
    field.classList.remove('field-easy');
    field.classList.remove('field-hard');
    field.classList.add('field-medium');
  }

  if (item.dataset.level === 'hard') {
    const field = document.querySelector('.field');
    field.classList.remove('field-easy');
    field.classList.remove('field-medium');
    field.classList.add('field-hard');
  }
}

function showSolution() {
  const arr = templates[currentLevel][currentTemplate].picture;
  let cells = document.querySelectorAll('.cell');
  resetGame();

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 1) {
      cells[i].classList.add('black');
    }
  }
}

function resetGame() {
  let cells = document.querySelectorAll('.cell');
  cells.forEach((elem) => {
    if (elem.classList.contains('black')) {
      elem.classList.remove('black');
    }
    if (elem.classList.contains('cross')) {
      elem.classList.remove('cross');
    }
  });

  clearInterval(myInterval);
  seconds = 0;
  minutes = 0;
  minute.textContent = '00';
  second.textContent = '00';
}

function saveGame() {
  let cells = document.querySelectorAll('.cell');
  const userArr = [];

  cells.forEach((elem) => {
    if (elem.classList.contains('black')) {
      userArr.push(1);
    } else if (elem.classList.contains('cross')) {
      userArr.push(2);
    } else {
      userArr.push(0);
    }
  });

  const savedGameData = {
    level: currentLevel,
    game: currentTemplate,
    picture: userArr,
    minute: minutes,
    second: seconds,
  };
  localStorage.setItem('savedGameData', JSON.stringify(savedGameData));
}

function continueGame() {
  const savedUserData = JSON.parse(localStorage.getItem('savedGameData'));
  const userGame = savedUserData.picture;

  currentLevel = savedUserData.level;
  currentTemplate = savedUserData.game;

  labels.forEach((elem) => {
    if (elem.htmlFor === savedUserData.game) {
      changeTemplate(elem);
    }
  });

  const cells = document.querySelectorAll('.cell');

  for (let i = 0; i < userGame.length; i++) {
    if (userGame[i] === 1) {
      cells[i].classList.add('black');
    }
    if (userGame[i] === 2) {
      cells[i].classList.add('cross');
    }
    if (userGame[i] === 0) {
      cells[i].classList.remove('cross');
      cells[i].classList.remove('black');
    }
  }

  minute.textContent = `${savedUserData.minute}`;
  second.textContent = `${savedUserData.second}`;

  minutes = savedUserData.minute;
  seconds = savedUserData.second;

  tabs.forEach((elem) => {
    if (elem.dataset.value === savedUserData.level) {
      openTab(elem);
    }
  });
}

function changeTheme() {
  document.body.classList.toggle('dark-theme');
}

function addTextTime(classMinute, classSecond) {
  const MinutePlace = document.querySelector(classMinute);
  const SecondPlace = document.querySelector(classSecond);
  if (finalMinute < 10) {
    MinutePlace.textContent = `0${finalMinute}`;
  }

  if (finalMinute == 0) {
    MinutePlace.textContent = '00';
  }

  if (finalSecond < 10) {
    SecondPlace.textContent = `0${finalSecond}`;
  }
  if (finalSecond >= 10) {
    SecondPlace.textContent = `${finalSecond}`;
  }
}

let audioClick = new Block('audio', 'audio-click', container);
audioClick = audioClick.buildBlock();
audioClick.src = 'audio/click.wav';

let audioWin = new Block('audio', 'audio-win', container);
audioWin = audioWin.buildBlock();
audioWin.src = 'audio/win.mp3';

let audioChangeTemplate = new Block('audio', 'audio-change', container);
audioChangeTemplate = audioChangeTemplate.buildBlock();
audioChangeTemplate.src = 'audio/flip.mp3';

let audioButton = new Block('audio', 'audio-button', container);
audioButton = audioButton.buildBlock();
audioButton.src = 'audio/button.mp3';

// create modal
let modalBox = new Block('div', 'modal-box', container);
modalBox = modalBox.buildBlock();

let modal = new Block('div', 'modal', modalBox);
modal = modal.buildBlock();

let modalText = new Block('h2', 'modal-title', modal);
modalText = modalText.buildBlock();
modalText.innerHTML = `Great! You have solved the nonogram in <span class = 'modal-minute'></span>:<span class = 'modal-second'></span> min!`;

let modalButton = new Block('button', 'modal-button', modal);
modalButton = modalButton.buildBlock();
modalButton.textContent = 'Close modal';
modalButton.classList.add('button');

document
  .querySelector('.modal-box .modal')
  .addEventListener('click', (event) => {
    event._isClickOnModal = true;
  });

modalBox.addEventListener('click', (event) => {
  if (event._isClickOnModal) return;
  event.currentTarget.classList.remove('open');
  modalBox.classList.remove('open');
});

modalButton.addEventListener('click', () => {
  modalBox.classList.remove('open');
});

// create mute-button
let muteButton = new Block('div', 'mute-box', container);
muteButton = muteButton.buildBlock();

let unmuteImgWhite = new Block('img', 'mute-img', muteButton);
unmuteImgWhite = unmuteImgWhite.buildBlock();
unmuteImgWhite.src = 'image/unmute-white.svg';
unmuteImgWhite.alt = 'icon-sound';

let muteImgWhite = new Block('img', 'unmute-img', muteButton);
muteImgWhite = muteImgWhite.buildBlock();
muteImgWhite.src = 'image/mute-white.svg';
muteImgWhite.alt = 'icon-sound';
muteImgWhite.style.display = 'none';

let soundOff = false;

muteButton.addEventListener('click', () => {
  const audio = document.querySelectorAll('audio');
  if (!soundOff) {
    audio.forEach((elem) => {
      elem.setAttribute('muted', 'true');
    });
    soundOff = true;
    updateMuteButtonImage();
  } else {
    audio.forEach((elem) => {
      elem.removeAttribute('muted');
    });
    soundOff = false;
    updateMuteButtonImage();
  }
});

function updateMuteButtonImage() {
  unmuteImgWhite.style.display = soundOff ? 'none' : '';
  muteImgWhite.style.display = soundOff ? '' : 'none';
}

function startRandomGame() {
  const levels = ['easy', 'medium', 'hard'];
  const length = levels.length;
  const gameSum = 5;
  const randomLevel = Math.floor(Math.random() * length);
  const randomGame = Math.floor(Math.random() * gameSum);
  const chosenLevel = levels[randomLevel];

  const games = Object.keys(templates[chosenLevel]);
  const chosenGame = games[randomGame];

  labels.forEach((elem) => {
    if (elem.htmlFor === chosenGame) {
      changeTemplate(elem);
    }
  });
  currentLevel = chosenLevel;
  currentTemplate = chosenGame;
  console.log(currentLevel, currentTemplate);

  tabs.forEach((elem) => {
    if (elem.dataset.value === chosenLevel) {
      openTab(elem);
    }
  });

  const inputs = document.querySelectorAll('.level-input');
  inputs.forEach((elem) => {
    if (elem.id === chosenGame) {
      elem.checked = 'checked';
    }
  });
}

let table = new Block('div', 'table-box', container);
table = table.buildBlock();

function addResultInScore() {
  const savedResults = JSON.parse(localStorage.getItem('savedRecords'));
  // const cellsOfTable = do
  savedResults.forEach((elem) => {});
  console.log(savedResults);
}
// addResultInScore();

function saveRecordResult() {
  const savedResults = JSON.parse(localStorage.getItem('savedRecords')) || [];
  const currentTime = finalMinute * 60 + finalSecond;

  let finalMinutes = minutes;
  let finalSeconds = seconds;
  if (finalMinutes < 10) {
    finalMinutes = `0${minutes}`;
  }

  if (finalMinutes == 0) {
    finalMinutes = '00';
  }

  if (finalSeconds < 10) {
    finalSeconds = `0${seconds}`;
  }
  if (finalSeconds >= 10) {
    finalSeconds = `${seconds}`;
  }

  const savedRecords = {
    level: currentLevel,
    game: currentTemplate,
    minute: finalMinutes,
    second: finalSeconds,
    time: currentTime,
  };

  savedResults.push(savedRecords);
  savedResults.sort((a, b) => a.time - b.time);

  if (savedResults.length > 5) {
    savedResults.shift();
  }

  localStorage.setItem('savedRecords', JSON.stringify(savedResults));
}

function updateResultsTable() {
  const savedResults = JSON.parse(localStorage.getItem('savedRecords')) || [];

  const tableHTML = `
    <table class = 'table'>
      <thead>
        <tr>
          <th>Game</th>
          <th>Level</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        ${savedResults
          .map(
            (result) => `
          <tr>
            <td class = 'table-cell'>${result.minute}m ${result.second}s</td>
            <td class = 'table-cell'>${result.game}</td>
            <td class = 'table-cell'>${result.level}</td>
          </tr>`
          )
          .join('')}
      </tbody>
    </table>
  `;

  table.innerHTML = tableHTML;
}
updateResultsTable();
