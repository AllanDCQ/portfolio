
async function fetchJSON() {

    let jsonUrl = 'js/home.json';

    const currentHash = window.location.hash;
 
    if (currentHash) {
        const sectionName = currentHash.replace('#', '').replace('ID', '');
        jsonUrl = `js/${sectionName}.json`;
        
    }

    const response = await fetch(jsonUrl);

    sectionText = await response.json();

}

/**
 * [manageSections] Manages the display/hiding of sections based on the anchor in the URL.
 *
 * This function hides all sections by default and displays the section corresponding to the anchor in the URL, if present.
 *
 * @example
 * // Call the function to manage the display of sections based on the URL anchor
 * manageSections();
 */
async function manageSections() {
    await fetchJSON(); // Attendre la fin de fetchJSON avant de continuer.

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    let currentHash = window.location.hash;
    if (!currentHash) {
        currentHash = '#homeID';
        history.replaceState(null, null, currentHash);
    }

    const currentSection = document.querySelector(currentHash);
    if (currentSection) {
        currentSection.style.display = 'block';
    }

    if (currentHash === '#resumeID') {
        setLinkPDF();
    } else {
        setLanguage();
    }
}
