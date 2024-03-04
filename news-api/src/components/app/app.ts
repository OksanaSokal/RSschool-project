import { Elem, NewsData } from '../../types/data';
import { SourceData } from '../../types/sources-type';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    public controller: AppController;
    public view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourceElem: Elem = document.querySelector('.sources');
        if (!sourceElem) return;
        sourceElem.addEventListener('click', (e: Event) => {
            this.controller.getNews(e, (data: NewsData) => this.view.drawNews(data));
        });
        this.controller.getSources((data: SourceData) => this.view.drawSources(data));
    }
}

export default App;
