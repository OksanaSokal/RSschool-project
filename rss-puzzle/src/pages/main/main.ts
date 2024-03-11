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

export default class MainView extends View {
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

    const paramsFirstName: ElementParam = {
      tag: 'input',
      className: [CssClasses.input],
      text: 'First Name',
      callback: null,
    };
    const firstName: InputView = new InputView(paramsFirstName);

    createForm.addElement(firstName);

    const paramsLastName: ElementParam = {
      tag: 'input',
      className: [CssClasses.input],
      text: 'Last Name',
      callback: null,
    };
    const lastName: InputView = new InputView(paramsLastName);
    createForm.addElement(lastName);

    const paramsButton: ElementParam = {
      tag: 'button',
      className: [CssClasses.button],
      text: 'Login',
      callback: null,
    };
    const button: ButtonView = new ButtonView(paramsButton);
    button.setCallback();
    createForm.addElement(button);
  }
}
