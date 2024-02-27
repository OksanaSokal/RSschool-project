import App from './components/app/app';
import './global.css';

import img from './components/img/rs.png';
const image: HTMLImageElement | null = document.createElement('img');
if (image) image.src = img;

const footer: HTMLElement | null = document.querySelector('.logo');
if (footer) footer.appendChild(image);

const app = new App();
app.start();
