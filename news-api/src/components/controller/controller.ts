import { NewsData } from '../../types/data';
import { Callback } from '../../types/loader-type';
import { SourceData } from '../../types/sources-type';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    public getSources(callback: Callback<SourceData>): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: Event, callback: Callback<NewsData>): void {
        let target: EventTarget | null = e.target;
        const newsContainer: EventTarget | null = e.currentTarget;
        console.log(target);
        console.log(newsContainer);

        while (target !== newsContainer) {
            if ((<Element>target)!.classList.contains('source__item')) {
                const sourceId = (<Element>target!).getAttribute('data-source-id') as string;
                if ((<Element>newsContainer)!.getAttribute('data-source') !== sourceId) {
                    (<Element>newsContainer)!.setAttribute('data-source', sourceId as string);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId as string,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = (<Element>target).parentNode;
        }
    }
}

export default AppController;
