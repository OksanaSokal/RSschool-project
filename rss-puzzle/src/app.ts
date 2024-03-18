import MainView from './pages/main/main';
import HeaderView from './pages/header/header';
import WrapperView from './pages/wrapper/wrapper';

export default class App {
  constructor() {
    App.checkLocalStorage();
  }

  static createView() {
    const wrapperElement = new WrapperView();
    const mainElement = new MainView();
    const headerElement = new HeaderView();

    document.body.append(wrapperElement.getHTMLElement());
    wrapperElement.getHTMLElement().append(headerElement.getHTMLElement(), mainElement.getHTMLElement());
  }

  static checkLocalStorage() {
    const data = localStorage.getItem('user');
    if (data) {
      App.showWelcomePage();
    } else {
      App.createView();
    }
  }

  static showWelcomePage() {
    const wrapperElement = new WrapperView();
    const headerElement = new HeaderView();

    const btnLogout = document.createElement('button');
    btnLogout.textContent = 'Logout';
    btnLogout.classList.add('logout');
    btnLogout.addEventListener('click', () => {
      localStorage.clear();
      document.body.innerHTML = '';
      App.createView();
    });
    headerElement.getHTMLElement().append(btnLogout);

    const createMain = document.createElement('main');
    createMain.classList.add('welcome');
    const welcomeBlock = document.createElement('div');
    const data = JSON.parse(localStorage.getItem('user'));
    welcomeBlock.textContent = `Welcome, ${data.name} ${data.surname}`;

    const button = document.createElement('button');
    button.classList.add('button', 'button-open');
    button.textContent = 'START';
    createMain.append(welcomeBlock, button);
    createMain.classList.add('main');
    document.body.append(wrapperElement.getHTMLElement());
    wrapperElement.getHTMLElement().append(headerElement.getHTMLElement(), createMain);
  }
}
