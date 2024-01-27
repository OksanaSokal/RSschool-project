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
  putContent(text, place) {
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

// create wraper-game
let wrapper = new Block('div', 'wrapper', container);
wrapper = wrapper.buildBlock();

// crete checkbox
let optionBlock = new Block('div', 'level-block', wrapper);
optionBlock = optionBlock.buildBlock();

function createBoxOptions(addclass, titleText, optionsData) {
  let select = new Block('select', addclass, optionBlock);
  select = select.buildBlock();

  const title = document.createElement('h3');
  title.classList.add('title-level');
  title.textContent = titleText;
  optionBlock.append(title);
  optionBlock.append(select);

  for (let i = 0; i < optionsData.length; i++) {
    const option = createOptions(
      optionsData[i].class,
      select,
      optionsData[i].text,
      optionsData[i].value
    );
    select.append(option);
  }
  return select;
}

function createOptions(classname, parent, text, value) {
  let option = new Block('option', classname, parent);
  option = option.buildBlock();
  option.value = value;
  option.textContent = text;
  return option;
}

const levelData = [
  { text: 'easy level', value: 'easy', class: 'opt-level' },
  { text: 'medium level', value: 'medium', class: 'opt-level' },
  { text: 'hard level', value: 'hard', class: 'opt-level' },
];
createBoxOptions('level-select', 'Choose level', levelData, optionBlock);

const pictureData = [
  { text: 'camel', value: 'camel', class: 'opt-game' },
  { text: 'hourglass', value: 'hourglass', class: 'opt-game' },
  { text: 'heart', value: 'heart', class: 'opt-game' },
];

createBoxOptions('game-select', 'Choose game', pictureData, optionBlock);

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
  },
};

// const size = 5;

function createField(obj, level, game) {
  for (let i = 0; i < obj[level][game].size; i++) {
    //size
    const clue = document.createElement('div');
    clue.classList.add('clue');
    const span = document.createElement('span');
    span.textContent = obj[level][game].rowHints[i].join('\n'); //rowHints[i]
    clue.appendChild(span);
    rowClues.appendChild(clue);
  }
  for (let i = 0; i < obj[level][game].size; i++) {
    //size
    const clue = document.createElement('div');
    clue.classList.add('clue');

    const span = document.createElement('span');
    span.textContent = obj[level][game].columnHints[i].join('\n'); //columnHints[i]
    clue.appendChild(span);
    columnClues.appendChild(clue);

    for (let j = 0; j < obj[level][game].size; j++) {
      //size
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', toggleCell);
      cell.addEventListener('click', () => checkWin(obj[level][game].picture)); //camel =>game-name
      field.appendChild(cell);
    }
  }
}

function toggleCell(event) {
  const cell = event.target;
  cell.classList.toggle('black');
}
// createField();
createField(templates, 'easy', 'camel');

function checkWin(answArr) {
  let arr = document.querySelectorAll('.cell');
  const result = [];

  arr.forEach((elem) => {
    if (elem.classList.contains('black')) {
      result.push(1);
    } else result.push(0);
  });

  return answArr.join('') === result.join('')
    ? alert('Congratulations! You solved the nanogram!')
    : console.log('loss');
}

const levels = document.querySelectorAll('.opt-level');

const games = document.querySelectorAll('.opt-games');

const levelSelect = document.querySelector('.level-select');
const gameSelect = document.querySelector('.game-select');

levelSelect.addEventListener('change', () => {
  chooseTemplate();
  createNewOptions();
});
gameSelect.addEventListener('change', chooseTemplate);

function chooseTemplate() {
  while (field.firstChild) {
    field.removeChild(field.firstChild);
  }
  while (rowClues.firstChild) {
    rowClues.removeChild(rowClues.firstChild);
  }
  while (columnClues.firstChild) {
    columnClues.removeChild(columnClues.firstChild);
  }
  const levelSelect = document.querySelector('.level-select');
  const gameSelect = document.querySelector('.game-select');
  const valueLevel = levelSelect.value;
  const valueGame = gameSelect.value;

  return createField(templates, valueLevel, valueGame);
}

function createNewOptions() {
  while (levelSelect.firstChild) {
    levelSelect.remove(levelSelect.firstChild);
  }
  if (levelSelect.value === 'easy') {
    createBoxOptions('game-select', 'Choose game', pictureData);
  }

  if (levelSelect.value === 'medium') {
    createBoxOptions('game-select', 'Choose game', pictureMediumData);
  }

  if (levelSelect.value === 'hard') {
    createBoxOptions('game-select', 'Choose game', pictureMediumData);
  }
}

const pictureMediumData = [
  { text: 'snowman', value: 'snowman', class: 'opt-game' },
];
