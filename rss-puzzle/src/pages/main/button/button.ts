import ElementCreator from '../../elementCreator';
import { ElementParam } from '../main-type';
import './button.css';
import { EventListener } from '../input/input';

const CssClasses = {
  button: 'button',
};

const buttonText: string = 'Login';

export default class ButtonView extends ElementCreator {
  public buttonElement: HTMLButtonElement;

  createElement(params: ElementParam) {
    this.element = document.createElement('div');
    this.setCallback(params.callback);
    this.buttonElement = document.createElement('button');
    this.buttonElement.classList.add(CssClasses.button);
    this.buttonElement.textContent = buttonText;
    this.element.append(this.buttonElement);
  }

  public setTextContent(): void {
    this.buttonElement.textContent = buttonText;
  }

  public setCallback(callback: EventListener | null = null) {
    if (typeof callback === 'function') {
      this.buttonElement.addEventListener('click', () => {
        const inputs = document.querySelectorAll('input');
        let allInputsFilled = true;
        inputs.forEach((input) => {
          if (!input.value) {
            allInputsFilled = false;
          }
        });

        if (allInputsFilled) {
          this.element.addEventListener('submit', () => callback());
        }
      });
    }
  }
}
