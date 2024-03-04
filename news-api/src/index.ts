import App from './components/app/app';
import './global.css';

import img from './components/img/rs.png';
const imgPath: string = img;
const image: HTMLImageElement | null = document.createElement('img');
if (image) image.src = imgPath;

const footer: HTMLElement | null = document.querySelector('.logo');
if (footer) footer.appendChild(image);

const app: App = new App();
app.start();
