import MainView from './pages/main/main'
import HeaderView from './pages/header/header';
import WrapperView from './pages/wrapper/wrapper';

export default class App {
  constructor() {
    this.createView();
  }

  public createView() {
    const wrapperElement = new WrapperView();
    const mainElement = new MainView();
    const headerElement = new HeaderView();

    document.body.append(wrapperElement.getHTMLElement());
    wrapperElement.getHTMLElement().append(headerElement.getHTMLElement(), mainElement.getHTMLElement());
  }
}
