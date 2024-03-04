import { NewsData, NewsItem } from '../../types/data';
import { SourceData, SourceItem } from '../../types/sources-type';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    public news: News;
    public sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: NewsData): void {
        const values: NewsItem[] = data?.articles ? data?.articles : [];
        this.news.draw(values);

        const imageBlock: HTMLElement | null = document.querySelector('.loading__img');
        if (imageBlock) imageBlock.style.display = 'none';
    }

    public drawSources(data: SourceData): void {
        const values: SourceItem[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
