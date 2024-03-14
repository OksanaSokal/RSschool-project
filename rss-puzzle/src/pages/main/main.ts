import './main.css';
import { ElementParam } from './main-type';
import View from '../view';
import ElementCreator from '../elementCreator';
import InputView from './input/input';
import ButtonView from './button/button';

const CssClasses = {
  main: 'main',
  div: 'box',
  input: 'input',
  button: 'button',
};

const paramsLastName: ElementParam = {
  tag: 'input',
  className: [CssClasses.input],
  text: 'Last Name',
  callback: null,
};

const paramsButton: ElementParam = {
  tag: 'button',
  className: [CssClasses.button],
  text: 'Login',
  callback: null,
};

const paramsFirstName: ElementParam = {
  tag: 'input',
  className: [CssClasses.input],
  text: 'First Name',
  callback: null,
};

export default class MainView extends View {
  private firstNameInput: HTMLInputElement;

  private lastNameInput: HTMLInputElement;

  private button: ButtonView;

  constructor() {
    const params: ElementParam = {
      tag: 'main',
      className: [CssClasses.main],
      text: '',
      callback: null,
    };
    super(params);
    this.configureView();
  }

  public configureView(): void {
    const paramsForm: ElementParam = {
      tag: 'form',
      className: [CssClasses.div],
      text: '',
      callback: null,
    };
    const createForm: ElementCreator = new ElementCreator(paramsForm);
    this.elementCreator.addElement(createForm);

    const firstName: InputView = new InputView(paramsFirstName);
    this.firstNameInput = firstName.inputElement;
    firstName.addLength('3');
    firstName.addCallback();
    createForm.addElement(firstName);
    const lastName: InputView = new InputView(paramsLastName);
    this.lastNameInput = lastName.inputElement;
    lastName.addCallback();
    lastName.addLength('4');
    createForm.addElement(lastName);

    this.button = new ButtonView(paramsButton);
    this.button.buttonElement.addEventListener('click', () => {
      this.button.addLocalStorage(this.firstNameInput.value, this.lastNameInput.value);
    });
    createForm.addElement(this.button);

    firstName.inputElement.addEventListener('input', () => {
      this.updateButtonState();
    });

    lastName.inputElement.addEventListener('input', () => {
      this.updateButtonState();
    });
  }

  private updateButtonState(): void {
    this.button.buttonElement.disabled = !this.checkFields();
    if (this.checkFields()) {
      this.button.buttonElement.classList.add('button-open');
    } else {
      this.button.buttonElement.classList.remove('button-open');
    }
  }

  public checkFields(): boolean {
    const firstNameValue = this.firstNameInput.value.trim();
    const lastNameValue = this.lastNameInput.value.trim();

    if (firstNameValue && lastNameValue) {
      const firstNameRegex = /^[A-Z][-a-zA-Z]+$/;
      const lastNameRegex = /^[A-Z][-a-zA-Z]+$/;

      const firstNameValid = firstNameRegex.test(firstNameValue) && firstNameValue.length >= 3;
      const lastNameValid = lastNameRegex.test(lastNameValue) && lastNameValue.length >= 4;

      return firstNameValid && lastNameValid;
    }
  }
}
