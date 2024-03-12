import './header.css';
import { ElementParam } from '../main/main-type';
import View from '../view';

const CssClasses = {
  header: 'header',
};

export default class HeaderView extends View {
  constructor() {
    const params: ElementParam = {
      tag: 'header',
      className: [CssClasses.header],
      text: '',
      callback: null,
    };
    super(params);
  }
}
