
/**
 * \[createHeader\] Creates and adds a header with language logos.
 *
 * This function creates a container for the header, including a navigation bar and language logos. It
 * uses HTML elements and Bootstrap styles to structure the display in the provided header element.
 * @param {string} idHeader - The ID of the element where the header will be added.
 * @param {Array} langageArray - An array of objects representing the language logos. Each object should have a `text`, `href`, and `logo` property.
 *
 * @example
 * // Select the header element in the DOM
 * const header = document.getElementById('idHeader');
 *
 * // Define the language logos
 * const langage = [
 * {text: "Français", href : "index.html", logo: "/assets/img/france.png"},
 * {text: "English", href : "indexeng.html", logo: "/assets/img/united-kingdom.png"},
 * ]
 *
 * // Call the function to create and add the header
 * createHeader('idHeader', languages);
 */
function createHeaderLangage(idHeader = "idHeader", langageArray) {
    // Sélectionner le header
    const header = document.getElementById(idHeader);

    // Création de la balise nav
    const navbar = document.createElement('nav');
    navbar.className = 'navbar'; // Classe Bootstrap pour un navbar
    navbar.classList.add('navbar-expand-sm'); // Récursivité et taille du navbar
    navbar.classList.add('navbar-dark'); // Theme dark
    navbar.classList.add('bg-dark'); // Couleur de fond dark
    navbar.classList.add('sticky-top'); // Navbar collante en haut de la page

    const div = document.createElement('div');
    div.className = 'container-fluid d-flex me-auto';

    // Boucle pour créer un bouton par langue
    langageArray.forEach(langage => {
        const langageButton = document.createElement('button');
        langageButton.className = 'btn btn-sm btn-outline-secondary mx-2 border-0 d-flex align-items-center justify-content-center'; // Ajout de d-flex et align-items-center pour centrer verticalement

        // Ajouter un écouteur d'événement pour renvoyer le code de langue (fr, eng)
        langageButton.addEventListener('click', () => {
            selectedLanguage = langage.code;
            updateNavbarLanguage();

            let currentHash = window.location.hash;

            if (currentHash === '#resumeID') {

                setLinkPDF();
            } else {
                setLanguage();
            }



        });

        // Ajouter le logo dans le bouton
        const langageLogo = document.createElement('img');
        langageLogo.src = langage.logo;
        langageLogo.alt = langage.text;
        langageLogo.classList.add('style_logo_language', 'me-2'); // Ajouter un peu d'espace à droite du logo

        // Ajouter le logo en premier dans le bouton
        langageButton.prepend(langageLogo);

        // Ajouter le bouton dans le navbar
        navbar.appendChild(langageButton);
    });

    // Ajouter le navbar dans la div, puis dans le header
    div.appendChild(navbar);
    header.appendChild(div);
}


// Fonction pour changer la langue
async function setLanguage() {
    await fetchJSON();
    // Parcourir tous les éléments avec l'attribut data-i18n
    document.querySelectorAll("[data-text]").forEach((element) => {
        const key = element.getAttribute("data-text");
        element.textContent = sectionText[selectedLanguage][key];
    });
}

async function setLinkPDF() {
    console.log("setLinkPDF");
    await fetchJSON();
    // Parcourir tous les éléments avec l'attribut data-i18n
    document.querySelectorAll("[data-link]").forEach((element) => {
        const key = element.getAttribute("data-link");
        element.setAttribute('src', sectionText[selectedLanguage][key]);
    });
}





