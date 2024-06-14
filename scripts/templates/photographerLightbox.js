// DOM Elements
const closeLightboxBtn = document.querySelector(".close-lightbox");
const lightbox = document.querySelector(".lightbox");
const imgLightbox = document.querySelector(".lightbox img");
const videoLightbox = document.querySelector(".lightbox video");


// Fonction de fermeture lightbox
closeLightboxBtn.addEventListener("click", closeLightbox);

function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "false");
    logo.setAttribute("aria-hidden", "false");
}


// Fonction ouverture lightbox
function openLightbox(event, index) {
    console.log(index)
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    closeLightboxBtn.focus();
    main.setAttribute("aria-hidden", "true");
    logo.setAttribute("aria-hidden", "true");

    currentMediaIndex = index;
    console.log("openLightbox", currentMediaIndex)

    const currentMedia = currentPhotographerMedia[currentMediaIndex];
    const mediaElement = new MediaFactory(currentMedia, index);
    const lightboxMedia = document.querySelector(".lightbox-media");
    lightboxMedia.innerHTML = 
    `${mediaElement.outerHTML}
    <p class="media-subtitle">${currentMedia.title}</p>`;
    
    // Fermeture de la lightbox au clique en dehors et avec échap
    window.addEventListener("click", (event) => {
        if (event.target.classList.contains("lightbox")) {
            closeLightbox();
        }
    })

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });
}


// Fonction de navigation entre les médias
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
let currentMediaIndex;

function navigateSlide(direction) {
    console.log("direction")
    console.log(currentMediaIndex)
    currentMediaIndex = direction + Number(currentMediaIndex);
    console.log("currentMediaIndex + direction", currentMediaIndex)

    if (currentMediaIndex < 0) currentMediaIndex = currentPhotographerMedia.length - 1;
    if (currentMediaIndex >= currentPhotographerMedia.length) currentMediaIndex = 0;

    const currentMedia = currentPhotographerMedia[currentMediaIndex];
    const mediaElement = new MediaFactory(currentMedia, currentMediaIndex);
    const lightboxMedia = document.querySelector(".lightbox-media");
    lightboxMedia.innerHTML = 
    `${mediaElement.outerHTML}
    <p class="media-subtitle">${currentMedia.title}</p>`;
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
prevButton.addEventListener("click", function () { navigateSlide(-1); });
nextButton.addEventListener("click", function () { navigateSlide(1); });






