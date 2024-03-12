import { ElementParam } from './main/main-type';

export default class ElementCreator {
  public element: HTMLElement | HTMLInputElement | null;

  constructor(param: ElementParam) {
    this.element = null;
    this.createElement(param);
  }

  public createElement(param: ElementParam) {
    this.element = document.createElement(param.tag);
    this.setCssClasses(param.className);
    this.setTextContent(param.text);
    this.setCallback(param.callback);
  }

  public getElement(): HTMLElement | null {
    return this.element;
  }

  public setCssClasses(cssClasses: string[]) {
    cssClasses.forEach((className) => this.element.classList.add(className));
  }

  public setTextContent(text: string) {
    this.element.textContent = text;
  }

  public setCallback(callback?: () => void) {
    if (callback) {
      this.element.addEventListener('click', () => callback());
    }
  }

  public addElement(element: HTMLElement | ElementCreator) {
    if (element instanceof ElementCreator) {
      this.element.append(element.getElement());
    } else {
      this.element.append(element);
    }
  }
}
