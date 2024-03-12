import ElementCreator from '../../elementCreator';
import { ElementParam } from '../main-type';
import './input.css';

const CssClasses = {
  input: 'input',
  label: 'label',
  button: 'button',
};

export interface EventListener {
  (): void;
}

export default class InputView extends ElementCreator {
  public inputElement: HTMLInputElement;

  public labelElement: HTMLLabelElement;

  createElement(params: ElementParam) {
    this.element = document.createElement('div');
    this.setCallback(params.callback);
    this.inputElement = document.createElement('input');
    this.inputElement.classList.add(CssClasses.input);
    this.inputElement.id = params.text;
    this.addRequired();
    this.labelElement = document.createElement('label');
    this.setTextContent(params.text);
    this.labelElement.classList.add(CssClasses.label);
    this.labelElement.htmlFor = this.inputElement.id;
    this.element.append(this.labelElement, this.inputElement);
  }

  public setValue(value: string) {
    this.inputElement.value = value;
  }

  public setTextContent(text = '') {
    this.labelElement.textContent = text;
  }

  public addRequired() {
    this.inputElement.required = true;
    this.inputElement.title = 'This field is required';
  }

  public setCallback(callback: EventListener | null = null) {
    if (typeof callback === 'function') {
      this.element.addEventListener('change', () => callback());
    }
  }
}
