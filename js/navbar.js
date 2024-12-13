/**
     * [createNavbar] Creates and adds a navigation bar to the specified element.
     *
     * This function creates a Bootstrap navigation bar with a logo, a mobile menu button, and navigation links.
     * It uses HTML elements and Bootstrap styles to structure the display.
     *
     * @param {string} idNavbar - The ID of the element where the navigation bar will be added.
     * @param {string} nameParameter - The name to be displayed in the logo section.
     * @param {Object} jobParameter - The job title to be displayed in the logo section.
     * @param {Array} linksParameter - The array of links to be displayed in the navigation bar.
     *
     * @example
     * // Call the function to create and add the navigation bar
     * const links = [
     *      {text: {fr: 'Accueil', eng: 'Home'}, href: '#home'},
     *      {text: {fr: 'À propos', eng: 'About'}, href: '#about'},
     *      {text: {fr: 'Projets', eng: 'Projects'}, href: '#projects'},
     *      {text: {fr: 'Contact', eng: 'Contact'}, href: '#contact'}
     * ];
     * createNavbar('idNavBar', 'Jean Paul', {text: {fr: 'Développeur', eng: 'Developer'}}, links);
 */
function createNavbar(idNavbar = "idNavBar", nameParameter, jobParameter, linksParameter) {

    // Sélection de l'élément parent dans lequel la navbar sera ajoutée
    const navbar = document.getElementById(idNavbar);
    navbar.className = 'navbar'; // Ajout de la class barre de navigation Bootstrap
    navbar.classList.add('navbar-expand-xl'); // Récursivité et taille du navbar
    navbar.classList.add('navbar-dark'); // Theme dark
    navbar.classList.add('bg-dark'); // Couleur de fond dark
    navbar.classList.add('sticky-top'); // Navbar collante en haut de la page

    // Création du logo à gauche :
    createLogo(navbar, nameParameter, jobParameter);


    // Bouton pour le menu mobile
    const toggleButton = document.createElement('button');
        toggleButton.className = 'navbar-toggler'; // Ajout de la class navbar-toggler Bootstrap : https://getbootstrap.com/docs/5.3/components/navbar/#supported-content
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
        navList.className = 'navbar-nav'; // navbar-nav Bootstrap class : https://getbootstrap.com/docs/5.3/components/navbar/#supported-content
        navList.classList.add('align-items-center'); // align items center
        navList.classList.add('mx-auto'); // Left/Right margin auto



    linksParameter.forEach(link => {
        const navItem = document.createElement('li');
        navItem.className = 'nav-item';
        navItem.classList.add('mx-3');

        const navLink = document.createElement('a');
        navLink.className = 'nav-link';
        navLink.href = link.href;
        navLink.textContent = link.text[selectedLanguage];

        // si la page est active text-secondary sinon text-white
        if (navLink.href.includes(activepage)) {
            navLink.classList.add('text-secondary');
        } else {
            navLink.classList.add('text-white');
        }


        navLink.addEventListener('click', (event) => {
            // Empêcher le comportement par défaut du lien
            //event.preventDefault();

            // Mettre à jour la variable activepage avec le href du lien cliqué
            activepage = navLink.getAttribute('href');

            // Mettre à jour la page active dans la navbar
            updateNavbarActivePage();
            manageSections();

            // Naviguer vers la section correspondante
            document.querySelector(activepage).scrollIntoView({ behavior: 'smooth' });
        });

        const logoLink = document.createElement('img');
        logoLink.src = link.logo
        logoLink.alt = 'Logo';
        logoLink.classList.add('style_logo_nav');

        navItem.appendChild(navLink);
        navLink.prepend(logoLink);
        navList.appendChild(navItem);

    });

    // Ajouter les éléments à la structure de la navbar

    navLinksContainer.appendChild(navList);
    navbar.appendChild(navLinksContainer);

}




/**
    * \[createLogo\] Creates and adds a logo to the left of the navigation bar.
    *
    * This function creates a container for the logo, including an image and two paragraphs (name and profession). It
    * uses HTML elements and Bootstrap styles to structure the display in the provided navigation bar.
    *
    * @param {HTMLElement} navbar - The <nav> element where the logo will be added. This element must be a valid
    *                               DOM element of type <nav>.
    * @param {string} nameParameter - The name to be displayed in the logo section.
    * @param {string} jobParameter - The job title to be displayed in the logo section.
    *
    * @example
    * // Select the navigation bar element in the DOM
    * navbar = document.createElement('nav');
    *
    * // Call the function to create and add the logo to the navbar
    * createLogo(navbar, 'Jean Paul', 'Developer');
    *
    * @see selectedLanguage
 */
function createLogo(navbar, nameParameter, jobParameter) {
    // Création d'un conteneur pour le logo avec alignement flex
    const logoContainer = document.createElement('div');
    logoContainer.className = ' align-items-center'; // Utilisation de flexbox pour aligner les éléments horizontalement
    logoContainer.style.display = 'flex'; // Affichage en ligne des éléments du conteneur

    // Création de l'élément de lien pour le logo
    const logo = document.createElement('a');
    logo.className = 'navbar-brand'; // Application de la classe Bootstrap pour le style du logo
    logo.href = '#homeID'; // Définition de l'URL de destination du lien

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
    name.textContent = nameParameter; // Définition du contenu du paragraphe

    // Création du paragraphe pour afficher la profession
    const job = document.createElement('p');
    job.id = 'name-job'; // Attribution d'un identifiant pour le paragraphe de la profession
    job.className = 'mb-0 fs-7 text-white'; // Classes Bootstrap pour styliser le texte // Classes Bootstrap pour styliser le texte
    job.textContent = jobParameter.text[selectedLanguage]; // Définition du contenu du paragraphe
    job.style.color = "#56cfe1"; // Application d'une couleur personnalisée pour le texte



    // -------------------------------------- Construction de la structure de la barre de navigation --------------------------------------

    logo.appendChild(logoImage); // Ajout de l'image du logo dans l'élément de lien
    paragraphContainer.append(name, job); // Ajout des paragraphes (nom et profession) au conteneur de paragraphes
    logoContainer.append(logo, paragraphContainer); // Ajout de l'élément de lien et du conteneur de paragraphes au conteneur principal
    navbar.appendChild(logoContainer); // Insertion du conteneur principal dans la barre de navigation
}


/**
 * \[updateNavbarLanguage\] Updates the language of the navigation links.
 *
 * This function updates the text of the navigation links in the navbar based on the selected language.
 * It uses the `selectedLanguage` variable to determine the language to display.
 *
 * @example
 * // Call the function to update the language of the navigation links
 * updateNavbarLanguage();
 *
 * @see selectedLanguage
 */
function updateNavbarLanguage() {

    // Sélectionner la liste des liens de navigation dans la navbar avec l'ID 'navbarNav' et les éléments de navigation avec la classe 'nav-item'
    const navItems = document.querySelectorAll("#navbarNav .navbar-nav .nav-item");

    // Mettre à jour les textes des liens de navigation
    navItems.forEach((navItem, index) => {
        const navLink = navItem.querySelector('.nav-link')
        // Mettre à jour uniquement le texte du lien sans toucher aux logos
        navLink.childNodes[1].textContent = linksParameter[index].text[selectedLanguage];

    });

    // Mettre à jour le texte de la profession dans le logo
    const job = document.getElementById('name-job');
    job.textContent = jobParameter.text[selectedLanguage];
}


/**
 * \[updateNavbarActivePage\] Updates the active page in the navigation bar.
 *
 * This function updates the active page in the navigation bar by changing the text color of the active link.
 * It uses the `activepage` variable to determine the active page.
 *
 * @example
 * // Call the function to update the active page in the navigation bar
 * updateNavbarActivePage();
 *
 * @see activepage
 */
function updateNavbarActivePage() {
    // Sélectionner la liste des liens de navigation dans la navbar avec l'ID 'navbarNav' et les éléments de navigation avec la classe 'nav-item'
    const navItems = document.querySelectorAll("#navbarNav .navbar-nav .nav-item");


    // Mettre à jour les textes des liens de navigation
    navItems.forEach((navItem) => {
        const navLink = navItem.querySelector('.nav-link')

    // si la page est active text-secondary sinon text-white
    const isActive = navLink.href.includes(activepage);
    navLink.classList.toggle('text-secondary', isActive);
    navLink.classList.toggle('text-white', !isActive);

    });
}

