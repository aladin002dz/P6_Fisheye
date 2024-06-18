// Récupération des datas des photographes
async function getPhotographerData(photographerId) {
    const response = await fetch('./data/photographers.json');
    const data = await response.json();

    // Convertit l'ID du photographe en nombre
    const photographerIdNumber = Number(photographerId);

    // Recherche les données du photographe correspondant
    const photographerData = data.photographers.find(photographer => photographer.id === photographerIdNumber);

    // Recherche les médias du photographe correspondant
    const photographerMediaInitial = data.media.filter(media => media.photographerId === photographerIdNumber);

    return { photographerData, photographerMediaInitial };
}


// Fonction de tri des médias
let currentPhotographerMedia = null;

const selectSort = document.querySelector('#sort');
selectSort.addEventListener('change', (event) => {
    const value = event.target.value;

    if (value === 'popularity') {
        currentPhotographerMedia = currentPhotographerMedia.sort((a, b) => b.likes - a.likes);
    } else if (value === 'date') {
        currentPhotographerMedia = currentPhotographerMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (value === 'title') {
        currentPhotographerMedia = currentPhotographerMedia.sort((a, b) => a.title.localeCompare(b.title));
    }

    displayPhotographerMedia(currentPhotographerMedia);
    addLikeEventListeners(currentPhotographerMedia);
});

// Exécute l'intégration des datas dans le DOM
async function init() {
    const currentURL = window.location.href;
    const url = new URL(currentURL);
    const searchParams = url.searchParams;
    const photographerId = searchParams.get('id');

    const { photographerData, photographerMediaInitial } = await getPhotographerData(photographerId);
    displayPhotographerData(photographerData);
    currentPhotographerMedia = photographerMediaInitial.sort((a, b) => b.likes - a.likes);
    displayPhotographerMedia(photographerMediaInitial);
    addLikeEventListeners(photographerMediaInitial);
}

init();

