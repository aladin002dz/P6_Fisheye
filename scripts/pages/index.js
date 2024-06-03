    // Récupération des datas des photographes
    async function getPhotographers() {
        const response = await fetch('data/photographers.json');
        const data = await response.json();
        
        return (data.photographers)
    }

    // Créer une section et y intègre chaque card des photographes
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    // Exécute l'intégration des datas dans le DOM
    async function init() {
        const photographers = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
