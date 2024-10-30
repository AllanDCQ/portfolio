

// Sélection du conteneur principal: app
const app = document.getElementById('app');



// Fonction pour créer une navbar
function createNavbar() {

    // Sélection de l'élément parent dans lequel la navbar sera ajoutée
    const app = document.getElementById('app');

    // Création de la structure de la navbar
    const navbar = document.createElement('nav');
        navbar.className = 'navbar'; // Ajout de la class barre de navigation Bootstrap
        navbar.classList.add('navbar-expand-xl'); // Récursivité et taille du navbar
        navbar.classList.add('navbar-dark'); // Theme dark
        navbar.classList.add('bg-dark'); // Couleur de fond dark
        navbar.classList.add('sticky-top'); // Navbar collante en haut de la page

    // Création du logo à gauche :
    createLogo(navbar);


    // Bouton pour le menu mobile
    const toggleButton = document.createElement('button');
        toggleButton.className = 'navbar-toggler'; // Ajout de la class navbar-toggler Bootstrap : https://getbootstrap.com/docs/5.3/components/navbar/#external-content
        toggleButton.setAttribute('type', 'button');
        toggleButton.setAttribute('data-toggle', 'collapse');
        toggleButton.setAttribute('data-target', '#navbarNav');
        toggleButton.setAttribute('aria-controls', 'navbarNav');
        toggleButton.setAttribute('aria-expanded', 'false');
        toggleButton.setAttribute('aria-label', 'Toggle navigation');
        toggleButton.innerHTML = '<span class="navbar-toggler-icon"></span>';

    // Ajouter le bouton à la navbar
    navbar.appendChild(toggleButton);

    // Conteneur des liens de navigation
    const navLinksContainer = document.createElement('div');
    navLinksContainer.className = 'collapse navbar-collapse';
    navLinksContainer.id = 'navbarNav';

    const navList = document.createElement('ul');
    navList.className = 'navbar-nav ml-auto';

    // Liens de navigation
    const links = [
        {text: 'Home', href: '#home'},
        {text: 'About', href: '#about'},
        {text: 'Projects', href: '#projects'},
        {text: 'Contact', href: '#contact'}
    ];

    links.forEach(link => {
        const navItem = document.createElement('li');
        navItem.className = 'nav-item';

        const navLink = document.createElement('a');
        navLink.className = 'nav-link';
        navLink.href = link.href;
        navLink.textContent = link.text;

        navItem.appendChild(navLink);
        navList.appendChild(navItem);
    });

    // Ajouter les éléments à la structure de la navbar
    navLinksContainer.appendChild(navList);
    navbar.appendChild(navLinksContainer);
    app.appendChild(navbar);
}




/**
* \[createLogo\] Crée et ajoute un logo à gauche de la barre de navigation.
*
* Cette fonction crée un conteneur pour le logo comprenant une image et deux paragraphes (nom et profession). Elle
* utilise des éléments HTML et les styles Bootstrap pour structurer l'affichage dans la barre de navigation fournie.
*
* @param {HTMLElement} navbar - L'élément <nav> où le logo sera ajouté. Cet élément doit être un élément valide
*                                  du DOM de type <nav>.
*
* @example
* // Sélectionne l'élément de la barre de navigation dans le DOM
* navbar = document.createElement('nav');
*
* // Appelle la fonction pour créer et ajouter le logo à la navbar
* createLogo(navbar);
*/
function createLogo(navbar) {
    // -------------------------------------------------- Création des éléments du logo --------------------------------------------------

    // Création d'un conteneur pour le logo avec alignement flex
    const logoContainer = document.createElement('div');
        logoContainer.className = 'flex-container align-items-center'; // Utilisation de flexbox pour aligner les éléments horizontalement

    // Création de l'élément de lien pour le logo
    const logo = document.createElement('a');
        logo.className = 'navbar-brand'; // Application de la classe Bootstrap pour le style du logo
        logo.href = '#home'; // Définition de l'URL de destination du lien

    // Création de l'élément image pour le logo
    const logoImage = document.createElement('img');
        logoImage.src = 'assets/img/face.jpeg'; // Chemin d'accès à l'image du logo
        logoImage.alt = 'Logo'; // Texte alternatif pour l'image du logo
        logoImage.classList.add('style_logo_image'); // Ajout d'une classe CSS personnalisée pour le style
        logoImage.style.margin = '0 5px 0 1rem'; // Application de marges pour espacer l'image des paragraphes adjacents

    // Création d'un conteneur pour les paragraphes (nom et profession)
    const paragraphContainer = document.createElement('div');

    // Création du paragraphe pour afficher le nom et prénom
    const name = document.createElement('p');
        name.className = 'mb-0 fs-4 text-white fw-bold'; // Classes Bootstrap pour styliser le texte
        name.textContent = 'De Clercq Allan'; // Définition du contenu du paragraphe

    // Création du paragraphe pour afficher la profession
    const job = document.createElement('p');
        job.className = 'mb-0 fs-7 text-white-80'; // Classes Bootstrap pour styliser le texte // Classes Bootstrap pour styliser le texte
        job.textContent = 'Health Data Scientist'; // Définition du contenu du paragraphe



    // -------------------------------------- Construction de la structure de la barre de navigation --------------------------------------

    logo.appendChild(logoImage); // Ajout de l'image du logo dans l'élément de lien
    paragraphContainer.append(name, job); // Ajout des paragraphes (nom et profession) au conteneur de paragraphes
    logoContainer.append(logo, paragraphContainer); // Ajout de l'élément de lien et du conteneur de paragraphes au conteneur principal
    navbar.appendChild(logoContainer); // Insertion du conteneur principal dans la barre de navigation
}


// Appel des fonctions pour générer le contenu
createNavbar();


