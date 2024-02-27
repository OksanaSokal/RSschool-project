export interface NewsItem {
    source: {
        id: boolean;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface NewsData {
    status: 'ok' | 'error';
    totalResults: number;
    articles: NewsItem[];
}

export type Elem = HTMLTemplateElement | null;
