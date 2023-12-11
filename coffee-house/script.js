const burger = document.querySelector('.header__burger'),
  headerLinks = document.querySelector('.header__nav'),
  headerLogo = document.querySelector('.header__menu'),
  headerLinksAll = document.querySelectorAll('li');

function openBurger() {
  burger.classList.toggle('open');
  headerLinks.classList.toggle('open_menu');
  headerLogo.classList.toggle('open_logo');
  document.querySelector('body').classList.toggle('no_scroll');
}

function closeBurger() {
  burger.classList.remove('open');
  headerLinks.classList.remove('open_menu');
  headerLogo.classList.remove('open_logo');
  document.querySelector('body').classList.toggle('no_scroll');
}

// window.addEventListener('resize', () => {
//   const windowWidth = window.innerWidth;
//   if (windowWidth <= 768) {
//     closeBurger();
//   }
// });

// export { openBurger, closeBurger };

burger.addEventListener('click', openBurger);

headerLinksAll.forEach((elem) => {
  elem.addEventListener('click', closeBurger);
});

//carousel
const prevBtn = document.querySelector('.enjoy__arrow-left'),
  nextBtn = document.querySelector('.enjoy__arrow-right'),
  sliderWrap = document.querySelector('.favorite__box'),
  slider = document.querySelector('.slider'),
  slides = document.querySelectorAll('.favorite__slide'),
  loadIndicator = document.querySelectorAll('.favorite__load_item');

const width = window.getComputedStyle(sliderWrap).width,
  widthNum = parseInt(width),
  loadOne = document.querySelector('.load_one'),
  loadTwo = document.querySelector('.load_two'),
  loadThree = document.querySelector('.load_three');

let offset = 0,
  index = 1;

slider.style.width = 100 * slides.length + '%';

// slides.forEach((slide) => {
//   slide.style.width = width;
// });

function moveNext() {
  if (offset == (slides.length - 1) * widthNum) {
    offset = 0;
  } else {
    offset += widthNum;
  }
  slider.style.transform = `translateX(-${offset}px)`;

  if (index == 3) {
    index = 1;
  } else {
    index++;
  }
  loadLine(index);
}

function movePrev() {
  if (offset == 0) {
    offset = (slides.length - 1) * widthNum;
  } else {
    offset -= widthNum;
  }
  slider.style.transform = `translateX(-${offset}px)`;

  if (index == 1) {
    index = 3;
  } else {
    index--;
  }
  loadLine(index);
}

nextBtn.addEventListener('click', moveNext);

prevBtn.addEventListener('click', movePrev);

function loadLine(ind) {
  if (ind == 1) {
    loadOne.classList.add('visible');
    loadTwo.classList.remove('visible');
    loadThree.classList.remove('visible');
  }
  if (ind == 2) {
    loadOne.classList.remove('visible');
    loadThree.classList.remove('visible');
    loadTwo.classList.add('visible');
  }
  if (ind == 3) {
    loadOne.classList.remove('visible');
    loadTwo.classList.remove('visible');
    loadThree.classList.add('visible');
  }
}

loadLine(index);

loadOne.addEventListener('animationend', moveNext);
loadTwo.addEventListener('animationend', moveNext);
loadThree.addEventListener('animationend', moveNext);

// touch

const favoriteWrap = document.querySelector('.favorite__wrap');

let xStart = null;
let xEnd = null;

favoriteWrap.addEventListener('touchstart', handleStart, false);
favoriteWrap.addEventListener('touchmove', handleEnd, false);

function handleStart(event) {
  event.preventDefault();
  xStart = event.touches[0].clientX;
}

function handleEnd(event) {
  event.preventDefault();
  xEnd = event.touches[0].clientX;
  if (!xStart || !xEnd) return;

  if (xStart - xEnd > 0) {
    moveNext();
  }
  if (xStart - xEnd < 0) {
    movePrev();
  }

  xStart = null;
  xEnd = null;
}
