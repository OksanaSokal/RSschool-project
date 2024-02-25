export interface SourceItem {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface SourceData {
    status: 'ok' | 'error';
    sources: SourceItem[];
}