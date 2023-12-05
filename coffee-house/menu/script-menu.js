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
      this.sizes = obj.sizes;
      // this.createModal();
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

      card.addEventListener('click', () => {
        modalWindow.classList.add('open');

        document.querySelector('body').classList.add('no_scroll');
        this.createModal();
      });
    }

    closeModal() {
      const modalWindow = document.querySelector('.modal');
      if (modalWindow.classList.contains('open')) {
        const modalBox = document.querySelector('.modal__box'),
          modalCloseBtn = document.querySelector('.modal__btn_close');

        modalBox.addEventListener('click', (event) => {
          event.isClickModal = true;
        });

        modalWindow.addEventListener('click', (event) => {
          if (event.isClickModal) return;
          modalWindow.classList.remove('open');
          document
            .querySelectorAll('.modal__box')
            .forEach((elem) => elem.remove());
        });

        modalCloseBtn.addEventListener('click', () => {
          modalWindow.classList.remove('open');
          document.querySelector('body').classList.remove('no_scroll');

          document
            .querySelectorAll('.modal__box')
            .forEach((elem) => elem.remove());
        });
      }
    }

    createModal() {
      const modalBox = document.createElement('div'),
        parentModal = document.querySelector('.modal');
      modalBox.classList.add('modal__box');

      modalBox.innerHTML = `<div class="modal__box">
      <div class="modal__photo">
        <img src="${this.scr}" alt="photo" />
      </div>
      <div class="modal__description">
        <p class="modal__title">${this.title}</p>
        <p class="modal__text">${this.text}</p>
        <p class="modal_subtitle">Size</p>
        <div class="modal__sizes">
          <input class="input__modal" type="radio" name="s" id="s" checked>
          <label for="s" class="modal__size_btn">
            <span class="size_name">S</span>
            <span>${this.sizes.s.size}</span>
          </label>
          <input class="input__modal" type="radio" name="m" id="m" />
          <label for="m" class="modal__size_btn">
            <span class="size_name">M</span>
            <span>${this.sizes.m.size}</span>
          </label>
          <input class="input__modal" type="radio" name="l" id="l" />
          <label for="l" class="modal__size_btn">
            <span class="size_name">L</span>
            <span>${this.sizes.l.size}</span>
          </label>
        </div>
        <p class="modal_subtitle">Additives</p>
        <div class="modal__additives">
          <input class="input__modal_add" type="radio" name="1" id="1" checked>
          <label for="1" class="modal__add_btn">
            <span class="add_name">1</span>
            <span>${this.additives[0].name}</span>
          </label>
          <input class="input__modal_add" type="radio" name="2" id="2" />
          <label for="2" class="modal__add_btn">
            <span class="add_name">2</span>
            <span>${this.additives[1].name}</span>
          </label>
          <input class="input__modal_add" type="radio" name="3" id="3" />
          <label for="3" class="modal__add_btn">
            <span class="add_name">L</span>
            <span>${this.additives[2].name}</span>
          </label>
        </div>
        <div class="modal__bill">
          <p class="modal__total">Total:</p>
          <p class="modal__price">$${this.price}</p>
        </div>
        <div class="modal__descrip">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none">
            <g clip-path="url(#clip0_268_12877)">
              <path
                d="M8 7.66663V11"
                stroke="#403F3D"
                stroke-linecap="round"
                stroke-linejoin="round" />
              <path
                d="M8 5.00667L8.00667 4.99926"
                stroke="#403F3D"
                stroke-linecap="round"
                stroke-linejoin="round" />
              <path
                d="M7.99967 14.6667C11.6816 14.6667 14.6663 11.6819 14.6663 8.00004C14.6663 4.31814 11.6816 1.33337 7.99967 1.33337C4.31778 1.33337 1.33301 4.31814 1.33301 8.00004C1.33301 11.6819 4.31778 14.6667 7.99967 14.6667Z"
                stroke="#403F3D"
                stroke-linecap="round"
                stroke-linejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_268_12877">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p>
            The cost is not final. Download our mobile app to see the
            final price and place your order. Earn loyalty points and
            enjoy your favorite coffee with up to 20% discount.
          </p>
        </div>
        <button class="modal__btn_close">Close</button>
      </div>
    </div>`;
      parentModal.append(modalBox);

      this.closeModal();
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

    coffee.forEach((elem) => new Card(elem).createCards());
  });

  teaBtn.addEventListener('click', () => {
    document.querySelectorAll('.menu__card').forEach((elem) => elem.remove());

    tea.forEach((elem) => new Card(elem).createCards());
  });

  dessertBtn.addEventListener('click', () => {
    document.querySelectorAll('.menu__card').forEach((elem) => elem.remove());

    dessert.forEach((elem) => new Card(elem).createCards());
  });

  // open modal

  const allModalCard = document.querySelectorAll('.menu__card'),
    modalWindow = document.querySelector('.modal'),
    modalBox = document.querySelector('.modal__box'),
    modalCloseBtn = document.querySelector('.modal__btn_close');

  function closeModal() {
    if (modalWindow.classList.contains('open')) {
      const modalBox = document.querySelector('.modal__box'),
        modalCloseBtn = document.querySelector('.modal__btn_close');

      modalBox.addEventListener('click', (event) => {
        event.isClickModal = true;
      });

      modalWindow.addEventListener('click', (event) => {
        if (event.isClickModal) return;
        modalWindow.classList.remove('open');
      });

      modalCloseBtn.addEventListener('click', () => {
        modalWindow.classList.remove('open');
        document.querySelector('body').classList.remove('no_scroll');
      });
    } else {
      console.log('no');
    }
  }
  closeModal();
});
