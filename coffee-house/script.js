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

function closeBurger() {
  burger.classList.remove('open');
  headerLinks.classList.remove('open_menu');
  headerLogo.classList.remove('open_logo');
  document.querySelector('body').classList.toggle('no_scroll');
}

burger.addEventListener('click', openBurger);

headerLinsAll.forEach((elem) => {
  elem.addEventListener('click', closeBurger);
});
