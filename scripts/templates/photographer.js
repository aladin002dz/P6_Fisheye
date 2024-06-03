// Intègre les données des photographes dans le DOM en créant une card
function photographerTemplate(data) {
    const { name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const link = document.createElement( 'a' );
        link.href = './photographer.html';
        link.setAttribute("aria-label", `Lien vers la page de ${name}`);

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Photo de ${name}`);

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.setAttribute("aria-label", "Nom du photographe");

        const pCountry = document.createElement ( 'p' );
        pCountry.textContent = `${city}, ${country}`;
        pCountry.setAttribute("aria-label", "Localisation du photographe");

        const pTagline = document.createElement ( 'p' );
        pTagline.textContent = tagline;
        pTagline.setAttribute("aria-label", "Slogan du photographe");

        const pPrice = document.createElement ( 'p' );
        pPrice.textContent = `${price}€/jour`;
        pPrice.setAttribute("aria-label", "Le prix");
        
        article.appendChild(link);
        link.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pCountry);
        article.appendChild(pTagline);
        article.appendChild(pPrice);
        return (article);
    }
    return { name, city, country, tagline, price, picture, getUserCardDOM }
}

