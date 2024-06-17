// Affichage des datas du photographe
function displayPhotographerData(photographerData) {
    // Header
    const photographHeader = document.querySelector('.photograph-header');
    const textContent = document.createElement('div');
    textContent.classList.add('text-content');

    const name = document.createElement('h1');
    name.textContent = photographerData.name;
    name.classList.add('photograph-name');
    name.setAttribute('aria-label', 'Nom du photographe');

    const localisation = document.createElement('p');
    localisation.textContent = `${photographerData.city}, ${photographerData.country}`;
    localisation.classList.add('photograph-localisation');
    localisation.setAttribute('aria-label', 'Localisation du photographe');

    const tagline = document.createElement('p')
    tagline.textContent = photographerData.tagline;
    tagline.classList.add('photograph-tagline');
    tagline.setAttribute('aria-label', 'Slogan du photographe');

    const portraitContainer = document.createElement('div');
    portraitContainer.classList.add('portrait-container');

    const portrait = document.createElement('img');
    portrait.src = `assets/photographers/${photographerData.portrait}`;
    portrait.setAttribute('alt', `Photo de ${photographerData.name}`);

    photographHeader.appendChild(textContent);
    textContent.appendChild(name);
    textContent.appendChild(localisation);
    textContent.appendChild(tagline);
    photographHeader.appendChild(portraitContainer);
    portraitContainer.appendChild(portrait);

    // Insère les informations du photographe avant le bouton de contact
    const button = document.querySelector('.contact-btn');
    button.parentNode.insertBefore(textContent, button);

    // Form
    const photographerName = document.querySelector('.photographer-name');
    photographerName.textContent = photographerData.name;

    // Main
    const main = document.querySelector('main');
    const photographInsert = document.createElement('div');
    photographInsert.classList.add('photograph-insert');
    const price = document.createElement('p');
    price.textContent = `${photographerData.price}€/jour`;
    price.classList.add('photograph-price');
    price.setAttribute('aria-label', 'Tarif du photographe');

    main.appendChild(photographInsert);
    photographInsert.appendChild(price);
}


// Créer une nouvelle instance d'un objet Image ou Video. 
function MediaFactory(media, index) {
    function Image(media, index) {
        const image = document.createElement('img');
        image.src = `assets/photos/${media.image}`;
        image.alt = media.title;
        image.setAttribute('data-index', index);
        image.setAttribute('aria-label', 'Cliquez pour agrandir');
        image.classList.add('medias');
        return image;
    }
    function Video(media, index) {
        const video = document.createElement('video');
        video.src = `assets/photos/${media.video}`;
        video.setAttribute('aria-label', media.title);
        video.setAttribute('data-index', index);
        video.setAttribute('aria-label', 'Cliquez pour agrandir');
        video.classList.add('medias');
        return video;
    }
    if (media.image) {
        return new Image(media, index)
    } else {
        return new Video(media, index)
    }
}

// Création de la carte pour chaque média
function cardDom(media, index) {
    const mediaElement = new MediaFactory(media, index);
    const card =
        `<div class='card'>
    ${mediaElement.outerHTML}
    <div class='card-content'>
    <h2>${media.title}</h2>
    <div class='button-container'>
        <p aria-label='Nombre de likes' class='like-card-content' data-id='${media.id}'>${media.likes}</p>
        <button aria-label='Like' class='like-btn' data-id='${media.id}'>
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-heart'><path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'/></svg>
        </button>
        </div>
        </div>
        </div>`
    return card;
}


// Calcul du total des likes
function getTotalLikes(photographerMedia) {
    let totalLikes = 0;
    for (let media of photographerMedia) {
        totalLikes += media.likes;
    }
    return totalLikes;
}

// Fonction d'ajout des likes au clic
function addLikeEventListeners(photographerMedia) {
    photographerMedia.forEach((media) => {
        const likeButton = document.querySelector(`.like-btn[data-id='${media.id}']`);
        const likeButtonSvg = likeButton.querySelector('svg');
        likeButton.dataset.liked = 'false';
        likeButton.addEventListener('click', () => {
            media.liked = media.liked || false;
            // Vérifie si le like est true ou false
            const isLiked = media.liked;
            media.liked = !isLiked;
            media.likes += isLiked ? -1 : 1;
            if (media.liked) {
                likeButtonSvg.classList.add('liked');
            } else {
                likeButtonSvg.classList.remove('liked');
            }

            // Mis à jour des likes de la card
            const likeDisplay = document.querySelector(`.like-card-content[data-id='${media.id}']`);
            likeDisplay.textContent = media.likes;

            // Mis à jour du total des likes
            let totalLikes = getTotalLikes(photographerMedia);
            const likesElement = document.querySelector('.likes-element');
            likesElement.textContent = totalLikes;
        });
        // Mettez à jour l'état initial du bouton en fonction de l'état 'liked' de l'objet 'media'
        if (media.liked) {
            likeButtonSvg.classList.add('liked');
        } else {
            likeButtonSvg.classList.remove('liked');
        }
    });
}

// Affichage des médias du photographe
function displayPhotographerMedia(photographerMedia) {

    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';

    photographerMedia.forEach((media, index) => {
        const cardElement = cardDom(media, index);
        gallery.insertAdjacentHTML('beforeend', cardElement);
    });

    const allMedias = document.querySelectorAll('.medias');
    allMedias.forEach(media => {
        media.addEventListener('click', (event) => {
            openLightbox(event, media.getAttribute('data-index'));
        });
    }
    )

    // Ajout du total des likes
    let totalLikes = getTotalLikes(photographerMedia);
    const photographInsert = document.querySelector('.photograph-insert')

    // Vérifie si likesContent existe déjà pour éviter les dupplications à chaque tri
    let likesContent = photographInsert.querySelector('.likes-content');
    if (!likesContent) {
        likesContent = document.createElement('div');
        likesContent.classList.add('likes-content');
        photographInsert.appendChild(likesContent);
    } else {
        likesContent.innerHTML = '';
    }

    // Ajout du total des likes et du svg en html
    const likesElement = document.createElement('p');
    likesElement.classList.add('likes-element');
    likesElement.setAttribute('aria-label', 'Nombre total de likes');
    const svgElement = document.createElement('svg');
    svgElement.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-heart'><path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'/></svg>`
    likesElement.textContent = `${totalLikes}`;

    likesContent.appendChild(likesElement);
    likesContent.appendChild(svgElement);
}
