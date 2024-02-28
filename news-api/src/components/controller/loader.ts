import { NewsData } from '../../types/data';
import { Callback, Options } from '../../types/loader-type';
import img from '../img/load.gif';

class Loader {
    constructor(
        public baseLink: string | undefined,
        public options: Options
    ) {}

    public getResp(
        { endpoint, options = {} }: { endpoint: string; options?: Options },
        callback: Callback<NewsData> = (): void => {
            console.error('No callback for GET response');
        }
    ) {
        const image: HTMLImageElement | null = document.createElement('img');
        if (image) image.src = img;

        const imageBlock: HTMLElement | null = document.querySelector('.loading__img');
        if (imageBlock) {
            while (imageBlock?.firstChild) imageBlock.removeChild(imageBlock.firstChild);
            imageBlock.append(image);
        }

        this.load('GET', endpoint, callback, options);
    }

    public load(method: string, endpoint: string, callback: Callback<NewsData>, options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }

    private errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Options, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }
}

export default Loader;
