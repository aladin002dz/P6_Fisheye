// Intègre les données des photographes dans le DOM en créant une card
function photographerTemplate(data) {
    const { name, city, country, tagline, price, portrait, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const link = document.createElement( 'a' );
        link.href = `./photographer.html?id=${id}`;
        link.setAttribute("aria-label", `Lien vers la page de ${name}`);

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Photo de ${name}`);

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.setAttribute("aria-label", "Nom du photographe");

        const country = document.createElement ( 'p' );
        country.textContent = `${city}, ${country}`;
        country.setAttribute("aria-label", "Localisation du photographe");

        const tagline = document.createElement ( 'p' );
        tagline.textContent = tagline;
        tagline.setAttribute("aria-label", "Slogan du photographe");

        const price = document.createElement ( 'p' );
        price.textContent = `${price}€/jour`;
        price.setAttribute("aria-label", "Le prix");

        article.appendChild(link);
        link.appendChild(img);
        article.appendChild(h2);
        article.appendChild(country);
        article.appendChild(tagline);
        article.appendChild(price);
        return (article);
    }
    return { name, city, country, tagline, price, picture, getUserCardDOM }
}

