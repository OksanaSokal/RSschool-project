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
    // this.setCallback(params.callback);
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

  public setCallback() {
    this.inputElement.addEventListener('blur', () => {
      const { value } = this.inputElement;
      const regex = /^[A-Z][-a-zA-Z]+$/;
      const { min } = this.inputElement;
      if (!regex.test(value)) {
        this.errorBox.textContent = 'Value must contain only Latin letters and hyphens';
      }
      if (value.charAt(0) !== value.charAt(0).toUpperCase()) {
        this.errorBox.textContent = 'Value must start with an uppercase letter';
      }
      if (value.length < +min) {
        this.errorBox.textContent = `Value must be at least ${min} characters long.`;
      }
      if (value.length < +min) {
        this.errorBox.textContent = `Value must be at least ${min} characters long`;
      }
    });
  }

  public addLength(value: string) {
    this.inputElement.setAttribute('minlength', value);
  }

  public checkLength() {
    return this.inputElement.min;
  }

  public checkValue() {
    const { value } = this.inputElement;
    const regex = /^[A-Z][-a-zA-Z]+$/;
    if (!regex) {
      const errorBox = document.createElement('div');
      errorBox.classList.add('input-error');
      this.element.classList.add('error-box');
      const { min } = this.inputElement;
      if (!regex.test(value)) {
        errorBox.textContent = 'Value must start with a capital letter';
        this.element.append(errorBox);
      } else if (value.length < +min) {
        errorBox.textContent = `Value must be at least ${min} characters long.`;
        this.element.classList.add('error-box');
        this.element.append(errorBox);
      }
    }
  }
}
