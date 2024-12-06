/**
 * [manageSections] Manages the display/hiding of sections based on the anchor in the URL.
 *
 * This function hides all sections by default and displays the section corresponding to the anchor in the URL, if present.
 *
 * @example
 * // Call the function to manage the display of sections based on the URL anchor
 * manageSections();
 */
function manageSections() {
    // Récupérer toutes les sections de la page
    const sections = document.querySelectorAll('section');

    // Masquer toutes les sections par défaut
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Récupérer le hash actuel ou définir un hash par défaut
    let currentHash = window.location.hash;
    if (!currentHash) {
        currentHash = '#homeID';
        history.replaceState(null, null, currentHash); // Met à jour l'URL sans scroll
    }

    // Afficher la section correspondant au hash
    const currentSection = document.querySelector(currentHash);
    if (currentSection) {
        currentSection.style.display = 'block';
    }

    fetchJSON();
}


function fetchJSON() {
    const currentHash = window.location.hash;
    const sectionName = currentHash.replace('#', '').replace('ID', '');
    const jsonUrl = `js/${sectionName}.json`;

    fetch(jsonUrl)
        .then((response) => response.json())  // Convertir la réponse en JSON
        .then((data) => {
            sectionText = data;
            console.log(sectionText);
        })
        .catch((error) => {
            console.error("Erreur lors du chargement du fichier JSON : ", error);
        });
}