// Intègre les données des photographes dans le DOM en créant une card
function photographerTemplate(data) {
        const article = document.createElement('article');

        const link = document.createElement('a');
        link.href = `./photographer.html?id=${data.id}`;
        link.setAttribute('aria-label', `Lien vers la page de ${data.name}`);

        const img = document.createElement('img');
        img.setAttribute('src', `assets/photographers/${data.portrait}`);
        img.setAttribute('alt', `Photo de ${data.name}`);

        const h2 = document.createElement('h2');
        h2.textContent = data.name;
        h2.setAttribute('aria-label', 'Nom du photographe');

        const country = document.createElement('p');
        country.textContent = `${data.city}, ${data.country}`;
        country.setAttribute('aria-label', 'Localisation du photographe');

        const tagline = document.createElement('p');
        tagline.textContent = data.tagline;
        tagline.setAttribute('aria-label', 'Slogan du photographe');

        const price = document.createElement('p');
        price.textContent = `${data.price}€/jour`;
        price.setAttribute('aria-label', 'Le prix');

        article.appendChild(link);
        link.appendChild(img);
        article.appendChild(h2);
        article.appendChild(country);
        article.appendChild(tagline);
        article.appendChild(price);

        return (article);
}

