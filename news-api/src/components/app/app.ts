import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    public controller;
    public view;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sourceElem: HTMLElement | null = document.querySelector('.sources');
        if (!sourceElem) return;
        sourceElem.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
