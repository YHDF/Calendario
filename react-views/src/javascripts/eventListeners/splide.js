import Splide from '@splidejs/splide';

export default function splide() {
    var splide = new Splide( '#splide', {
        type   : 'loop',
        perPage: 3,
      } ).mount();
    splide.root.classList.add('awesome-slider');
}