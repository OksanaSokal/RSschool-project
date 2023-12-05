const burger = document.querySelector('.header__burger'),
  headerLinks = document.querySelector('.header__nav'),
  headerLogo = document.querySelector('.header__menu'),
  headerLinsAll = document.querySelectorAll('li');

export function openBurger() {
  burger.classList.toggle('open');
  headerLinks.classList.toggle('open_menu');
  headerLogo.classList.toggle('open_logo');
  document.querySelector('body').classList.toggle('no_scroll');
}

export function closeBurger() {
  burger.classList.remove('open');
  headerLinks.classList.remove('open_menu');
  headerLogo.classList.remove('open_logo');
  document.querySelector('body').classList.toggle('no_scroll');
}

burger.addEventListener('click', openBurger);

headerLinsAll.forEach((elem) => {
  elem.addEventListener('click', closeBurger);
});

//carousel
const prevBtn = document.querySelector('.enjoy__arrow-left'),
  nextBtn = document.querySelector('.enjoy__arrow-right'),
  sliderWrap = document.querySelector('.favorite__box'),
  slider = sliderWrap.querySelector('.slider'),
  slides = sliderWrap.querySelectorAll('.favorite__slide'),
  width = window.getComputedStyle(sliderWrap).width,
  loadIndicator = document.querySelectorAll('.favorite__load_item');

const widthNum = parseInt(width);

let offset = 0,
  index = 0;

slider.style.width = 100 * slides.length + '%';

slides.forEach((slide) => {
  slide.style.width = width;
});

function moveNext() {
  if (offset == (slides.length - 1) * widthNum) {
    offset = 0;
    index = 0;
  } else {
    offset += widthNum;
    index += 1;
  }
  slider.style.transform = `translateX(-${offset}px)`;
}

function movePrev() {
  if (offset == 0) {
    offset = (slides.length - 1) * widthNum;
  } else {
    offset -= widthNum;
  }
  slider.style.transform = `translateX(-${offset}px)`;
}

nextBtn.addEventListener('click', moveNext);

prevBtn.addEventListener('click', movePrev);

// const moveSlide = setInterval(moveNext, 6000);

// moveSlide();
