import { openBurger } from '../script.js';

const burger = document.querySelector('.header__burger'),
  headerLinks = document.querySelector('.header__nav'),
  headerLogo = document.querySelector('.header__menu'),
  headerLinsAll = document.querySelectorAll('li');

burger.addEventListener('click', openBurger);
