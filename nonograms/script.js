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

// create timer
let timer = new Block('div', 'timer', container);
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

// let finalMinute, finalSecond;
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
  // finalMinute = minutes;
  // finalSecond = seconds;
}

// if (finalMinute < 10) {
//   finalMinute = `0${finalMinute}`;
// }

// if (finalMinute == 0) {
//   finalMinute = '00';
// }

// if (finalSecond < 10) {
//   finalSecond = `0${finalSecond}`;
// }

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

      if (j < obj[level][game].rowHints[i].length - 1) {
        const lineBreak = document.createElement('br');
        clue.append(lineBreak);
      }

      rowClues.append(clue);
    }
  }
  for (let i = 0; i < obj[level][game].size; i++) {
    const clue = document.createElement('div');
    clue.classList.add('clue');

    const span = document.createElement('span');
    span.textContent = obj[level][game].columnHints[i].join('\n');
    clue.appendChild(span);
    columnClues.appendChild(clue);

    for (let j = 0; j < obj[level][game].size; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', toggleCell);
      cell.addEventListener('click', () => {
        checkWin(obj[level][game].picture);
        audioClick.play();
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

  return array.join('') === result.join('')
    ? alert('Congratulations! You solved the nanogram!')
    : console.log('loss');
}

function putCrossCell(event) {
  event.preventDefault();
  const cell = event.target;
  cell.classList.toggle('cross');
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

  let label = new Block('label', 'level-label-easy', easyDiv);
  let labelElem = label.buildBlock();
  label.putContent(elem.text, labelElem);
  labelElem.htmlFor = elem.value;
  labelElem.dataset.level = 'easy';
});

document.querySelector('.level').classList.add('level-checked');

let MediumDiv = new Block('div', 'level-block-medium', optionBlock);
MediumDiv = MediumDiv.buildBlock();

pictureMediumData.forEach((elem) => {
  let input = new Block('input', 'level-input-medium', MediumDiv);
  input = input.buildBlock();
  input.type = 'radio';
  input.name = 'medium';
  input.id = elem.value;

  let label = new Block('label', 'level-label-medium', MediumDiv);
  let labelElem = label.buildBlock();
  label.putContent(elem.text, labelElem);
  labelElem.htmlFor = elem.value;
  labelElem.style.display = 'none';
  labelElem.dataset.level = 'medium';
});

let HardDiv = new Block('div', 'level-block-hard', optionBlock);
HardDiv = HardDiv.buildBlock();

pictureHardData.forEach((elem) => {
  let input = new Block('input', 'level-input-hard', HardDiv);
  input = input.buildBlock();
  input.type = 'radio';
  input.name = 'hard';
  input.id = elem.value;

  let label = new Block('label', 'level-label-hard', HardDiv);
  let labelElem = label.buildBlock();
  label.putContent(elem.text, labelElem);
  labelElem.htmlFor = elem.value;
  labelElem.style.display = 'none';
  labelElem.dataset.level = 'hard';
});

const tabs = document.querySelectorAll('.level');

tabs.forEach((elem) => {
  elem.addEventListener('click', () => {
    openTab(elem);
  });
});

function openTab(elem) {
  const easyArray = document.querySelectorAll('.level-label-easy');
  const mediumArray = document.querySelectorAll('.level-label-medium');
  const hardArray = document.querySelectorAll('.level-label-hard');

  tabs.forEach((elem) => {
    elem.classList.remove('level-checked');
  });

  elem.classList.add('level-checked');

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

const labels = document.querySelectorAll('label');

labels.forEach((elem) => {
  elem.addEventListener('click', () => {
    changeTemplate(elem);
    audioChangeTemplate.play();
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
    const gameBox = document.querySelector('.game-box');
    field.classList.add('field-easy');
    field.classList.remove('field-hard');
    field.classList.remove('field-medium');
  }
  if (item.dataset.level === 'medium') {
    const field = document.querySelector('.field');
    const gameBox = document.querySelector('.game-box');
    field.classList.remove('field-easy');
    field.classList.remove('field-hard');
    field.classList.add('field-medium');
  }

  if (item.dataset.level === 'hard') {
    const field = document.querySelector('.field');
    const gameBox = document.querySelector('.game-box');
    field.classList.remove('field-easy');
    field.classList.remove('field-medium');
    field.classList.add('field-hard');
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
