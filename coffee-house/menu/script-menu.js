// import { openBurger, closeBurger } from '../script.js';
import products from '../menu/products.json' assert { type: 'json' };

window.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.header__burger'),
    headerLinks = document.querySelector('.header__nav'),
    headerLogo = document.querySelector('.header__menu'),
    headerLinsAll = document.querySelectorAll('li');

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

  burger.addEventListener('click', openBurger);

  headerLogo.addEventListener('click', closeBurger);

  // create cards

  const parent = document.querySelector('.menu__cards');

  class Card {
    constructor(obj) {
      this.scr = obj.src;
      this.title = obj.name;
      this.text = obj.description;
      this.price = obj.price;
      this.sizes = obj.sizes;
      this.additives = obj.additives;
    }

    createCards() {
      const card = document.createElement('div'),
        parent = document.querySelector('.menu__cards');
      card.classList.add('menu__card');
      card.innerHTML = `<div class="menu__card">
    <div class="menu__photo">
      <img src="${this.scr}" alt="photo" >
    </div>
    <div class="menu__text">
      <h3>${this.title}</h3>
      <p>${this.text}</p>
      <span>$${this.price}</span>
    </div>
  </div>`;
      parent.append(card);
    }
  }

  const coffee = products.filter((elem) => elem.category === 'coffee'),
    tea = products.filter((elem) => elem.category === 'tea'),
    dessert = products.filter((elem) => elem.category === 'dessert'),
    coffeeBtn = document.querySelector('.coffee'),
    teaBtn = document.querySelector('.tea'),
    dessertBtn = document.querySelector('.dessert');

  coffee.forEach((elem) => {
    new Card(elem).createCards();
  });

  coffeeBtn.addEventListener('click', () => {
    document.querySelectorAll('.menu__card').forEach((elem) => elem.remove());

    coffee.forEach((elem) => {
      new Card(elem).createCards();
    });
  });

  teaBtn.addEventListener('click', () => {
    document.querySelectorAll('.menu__card').forEach((elem) => elem.remove());

    tea.forEach((elem) => {
      new Card(elem).createCards();
    });
  });

  dessertBtn.addEventListener('click', () => {
    document.querySelectorAll('.menu__card').forEach((elem) => elem.remove());

    dessert.forEach((elem) => {
      new Card(elem).createCards();
    });
  });
});
