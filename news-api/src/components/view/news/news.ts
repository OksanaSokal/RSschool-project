import { NewsItem } from '../../../types/data';
import './news.css';

class News {
    draw(data: NewsItem[]) {
        const news: NewsItem[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        if (!newsItemTemp) return;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true);

            if (!(newsClone instanceof DocumentFragment)) return;

            if (idx % 2) {
                const newsItem = newsClone.querySelector('.news__item');
                if (newsItem) newsItem.classList.add('alt');
            }

            const newsPhoto: HTMLTemplateElement | null = newsClone.querySelector('.news__meta-photo');
            if (newsPhoto) newsPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            const newsAuthor: HTMLTemplateElement | null = newsClone.querySelector('.news__meta-author');
            if (newsAuthor) newsAuthor.textContent = item.author || item.source.name;

            const newsDate: HTMLTemplateElement | null = newsClone.querySelector('.news__meta-date');
            if (newsDate) newsDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            const newsTitle: HTMLTemplateElement | null = newsClone.querySelector('.news__description-title');
            if (newsTitle) newsTitle.textContent = item.title;
            const newsSource: HTMLTemplateElement | null = newsClone.querySelector('.news__description-source');
            if (newsSource) newsSource.textContent = item.source.name;
            const newsContent: HTMLTemplateElement | null = newsClone.querySelector('.news__description-content');
            if (newsContent) newsContent.textContent = item.description;
            const newsReadMore: HTMLTemplateElement | null = newsClone.querySelector('.news__read-more a');
            if (newsReadMore) newsReadMore.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsElem: HTMLTemplateElement | null = document.querySelector('.news');
        if (newsElem) {
            newsElem.innerHTML = '';
            newsElem.appendChild(fragment);
        }
    }
}

export default News;