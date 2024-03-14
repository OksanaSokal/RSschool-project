import ElementCreator from '../../elementCreator';
import { ElementParam } from '../main-type';
import './button.css';

const buttonText: string = 'Login';

export default class ButtonView extends ElementCreator {
  public buttonElement: HTMLButtonElement;

  createElement(params: ElementParam) {
    this.element = document.createElement('div');
    this.setCallback(params.callback);
    this.buttonElement = document.createElement('button');
    this.buttonElement.classList.add('button');
    this.buttonElement.textContent = buttonText;
    this.buttonElement.disabled = true;
    this.element.append(this.buttonElement);
  }

  public setTextContent(): void {
    this.buttonElement.textContent = buttonText;
  }

  public addCallback(firstEl: boolean | null) {
    if (firstEl) {
      this.buttonElement.classList.add('button-open');
      this.buttonElement.disabled = false;
    }
  }

  public static addLocalStorage(firstname: string, lastname: string): void {
    const user = {
      name: firstname,
      surname: lastname,
    };
    localStorage.setItem('user', JSON.stringify(user));
  }
}
