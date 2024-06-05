// Récupération des datas des photographes
async function getPhotographerData(photographerId) {
    const response = await fetch('data/photographers.json');
    const data = await response.json();
    
    // Convertit l'ID du photographe en nombre
    const photographerIdNumber = Number(photographerId);

    // Recherche les données du photographe correspondant
    const photographerData = data.photographers.find(photographer => photographer.id === photographerIdNumber);
    
    return photographerData;
}

// Affichage des datas du photographe
function displayPhotographerData(photographerData) {
    // Header
    const photographHeader = document.querySelector('.photograph-header');
    const textContent = document.createElement( 'div' );
    textContent.classList.add('text-content');

    const name = document.createElement( 'h1' );
    name.textContent = photographerData.name;
    name.classList.add('photograph-name');
    name.setAttribute('aria-label', 'Nom du photographe');

    const localisation = document.createElement( 'p' );
    localisation.textContent = `${photographerData.city}, ${photographerData.country}`;
    localisation.classList.add('photograph-localisation');
    localisation.setAttribute('aria-label', 'Localisation du photographe');

    const tagline = document.createElement( 'p' )
    tagline.textContent = photographerData.tagline;
    tagline.classList.add('photograph-tagline');
    tagline.setAttribute('aria-label', 'Slogan du photographe');

    const portraitContainer = document.createElement( 'div' );
    portraitContainer.classList.add('portrait-container');

    const portrait = document.createElement( 'img' );
    portrait.src = `assets/photographers/${photographerData.portrait}`;
    portrait.setAttribute("alt", `Photo de ${photographerData.name}`);

    photographHeader.appendChild(textContent);
    textContent.appendChild(name);
    textContent.appendChild(localisation);
    textContent.appendChild(tagline);
    photographHeader.appendChild(portraitContainer);
    portraitContainer.appendChild(portrait);

    // Insère textContent avant le bouton de contact
    const button = document.querySelector('.contact-btn');
    button.parentNode.insertBefore(textContent, button);

    // Form
    const photographerName = document.querySelector('.photographer-name');
    photographerName.textContent = photographerData.name;
    
    // Main
    const main = document.querySelector('main');
    const price = document.createElement( 'p' );
    price.textContent = `${photographerData.price}€/jour`;
    price.classList.add('photograph-price');

    main.appendChild(price);
}

// Exécute l'intégration des datas dans le DOM
async function init() {
    const currentURL = window.location.href;
    const url = new URL(currentURL);
    const searchParams = url.searchParams;
    const photographerId = searchParams.get('id');

    const photographerData = await getPhotographerData(photographerId);
    displayPhotographerData(photographerData);
}

init();