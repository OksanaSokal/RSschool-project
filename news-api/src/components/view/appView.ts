import { NewsData, NewsItem } from '../../types/data';
import { SourceData, SourceItem } from '../../types/sources-type';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    public news;
    public sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: NewsData) {
        const values: NewsItem[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: SourceData) {
        const values: SourceItem[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
