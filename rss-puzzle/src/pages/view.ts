import ElementCreator from './elementCreator';
import { ElementParam } from './main/main-type';

export default class View {
  public params: ElementParam;

  public elementCreator: ElementCreator;

  constructor(params: ElementParam) {
    this.elementCreator = this.createView(params);
  }

  public getHTMLElement(): HTMLElement | HTMLInputElement {
    return this.elementCreator.getElement();
  }

  public createView(params: ElementParam): ElementCreator {
    const elementParams: ElementParam = {
      tag: params.tag,
      className: params.className,
      text: params.text,
      callback: params.callback,
    };

    const elementCreator = new ElementCreator(elementParams);

    return elementCreator;
  }
}
