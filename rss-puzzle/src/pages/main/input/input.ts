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

  public errorBox: HTMLElement;

  createElement(params: ElementParam) {
    this.element = document.createElement('div');
    // this.setCallback();
    this.inputElement = document.createElement('input');
    this.inputElement.classList.add(CssClasses.input);
    this.inputElement.id = params.text;
    this.addRequired();
    this.labelElement = document.createElement('label');
    this.setTextContent(params.text);
    this.labelElement.classList.add(CssClasses.label);
    this.labelElement.htmlFor = this.inputElement.id;
    this.errorBox = document.createElement('div');
    this.errorBox.classList.add('input-error');
    this.element.append(this.labelElement, this.inputElement, this.errorBox);
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

  public addCallback() {
    let flag;
    this.inputElement.addEventListener('input', () => {
      flag = true;
      const { value } = this.inputElement;
      const regex = /^[A-Z][-a-zA-Z]+$/;
      const { min } = this.inputElement;
      if (!regex.test(value)) {
        this.errorBox.textContent = 'Value must contain only Latin letters and hyphens';
        flag = false;
      }
      if (value[0] !== value.charAt(0).toUpperCase()) {
        this.errorBox.textContent = 'Value must start with an uppercase letter';
        flag = false;
      }
      if (value.length < +min) {
        this.errorBox.textContent = `Value must be at least ${min} characters long.`;
        flag = false;
      }
      if (value.length < +min) {
        this.errorBox.textContent = `Value must be at least ${min} characters long`;
        flag = false;
      }
      if (flag) this.errorBox.textContent = '';
    });
    return flag;
  }

  public addLength(value: string) {
    return (this.inputElement.min = value);
  }
}
