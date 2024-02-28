import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://rss-news-api.onrender.com/', {
            apiKey: 'bc23d04322764af79d655e1295388801',
        });
    }
}

export default AppLoader;
