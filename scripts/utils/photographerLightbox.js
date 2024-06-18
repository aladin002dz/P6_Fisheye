// DOM Elements
const closeLightboxBtn = document.querySelector('.close-lightbox');
const lightbox = document.querySelector('.lightbox');
const imgLightbox = document.querySelector('.lightbox img');
const videoLightbox = document.querySelector('.lightbox video');
const photographHeader = document.querySelector('.photograph-header');
const sortBy = document.querySelector('.sort-by');
const gallery = document.querySelector('.gallery');

function closeLightbox() {
    lightbox.classList.remove('active');
    // Accesibilité
    lightbox.setAttribute('aria-hidden', 'true');
    photographHeader.setAttribute('aria-hidden', 'false');
    header.setAttribute('aria-hidden', 'false');
    sortBy.setAttribute('aria-hidden', 'false');
    gallery.setAttribute('aria-hidden', 'false');
}


// Fonction ouverture lightbox
function openLightbox(event, index) {
    lightbox.classList.add('active');
    // Accesibilité
    lightbox.setAttribute('aria-hidden', 'false');
    main.setAttribute('aria-hidden', 'true');
    header.setAttribute('aria-hidden', 'true');
    photographHeader.setAttribute('aria-hidden', 'true');
    sortBy.setAttribute('aria-hidden', 'true');
    gallery.setAttribute('aria-hidden', 'true');
    closeLightboxBtn.focus();

    currentMediaIndex = index;

    const currentMedia = currentPhotographerMedia[currentMediaIndex];
    const mediaElement = new MediaFactory(currentMedia, index);
    const lightboxMedia = document.querySelector('.lightbox-media');
    if (mediaElement.tagName.toLowerCase() === 'video') {
        mediaElement.setAttribute('controls', '');
        mediaElement.setAttribute('autoplay', '')
    }
    lightboxMedia.innerHTML =
        `${mediaElement.outerHTML}
    <p class='media-subtitle'>${currentMedia.title}</p>`;

    // Fermeture de la lightbox au clique en dehors et avec échap
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('lightbox')) {
            closeLightbox();
        }
    })

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeLightbox();
        }
    });
}


// Fonction de navigation entre les médias
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
let currentMediaIndex;

function navigateSlide(direction) {
    currentMediaIndex = direction + Number(currentMediaIndex);

    // Permet de naviguer de manière circulaire
    if (currentMediaIndex < 0) currentMediaIndex = currentPhotographerMedia.length - 1;
    if (currentMediaIndex >= currentPhotographerMedia.length) currentMediaIndex = 0;

    const currentMedia = currentPhotographerMedia[currentMediaIndex];
    const mediaElement = new MediaFactory(currentMedia, currentMediaIndex);
    const lightboxMedia = document.querySelector('.lightbox-media');
    if (mediaElement.tagName.toLowerCase() === 'video') {
        mediaElement.setAttribute('controls', '');
        mediaElement.setAttribute('autoplay', '')
    }
    lightboxMedia.innerHTML =
        `${mediaElement.outerHTML}
    <p class='media-subtitle'>${currentMedia.title}</p>`;
}

// Navigation avec les flèches du clavier
document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowLeft':
            navigateSlide(-1);
            break;
        case 'ArrowRight':
            navigateSlide(1);
            break;
    }
});

// Navigation avec les boutons
prevButton.addEventListener('click', function () { navigateSlide(-1); });
nextButton.addEventListener('click', function () { navigateSlide(1); });






