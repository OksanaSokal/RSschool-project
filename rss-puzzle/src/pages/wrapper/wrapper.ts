import './wrapper.css';
import ElementCreator from '../elementCreator';
import { ElementParam } from '../main/main-type';
import View from '../view';
import img from '../../assets/img/background.png';

const CssClasses = {
  wrapper: 'wrapper',
};

export default class WrapperView extends View {
  public elementCreator: ElementCreator;

  constructor() {
    const params: ElementParam = {
      tag: 'div',
      className: [CssClasses.wrapper],
      text: '',
      callback: null,
    };
    super(params);
    this.addImage();
  }

  public addImage() {
    const image = document.createElement('img');
    image.src = img;
    document.body.append(image);
    image.classList.add('image');
  }
}
