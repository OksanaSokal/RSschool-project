import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://rss-news-api.onrender.com/', {
            apiKey: 'ef1d7367390045d89e20a852550f9711',
        });
    }
}

export default AppLoader;
