
async function fetchJSON() {
    const currentHash = window.location.hash;
    const sectionName = currentHash.replace('#', '').replace('ID', '');
    const jsonUrl = `js/${sectionName}.json`;

    try {
        const response = await fetch(jsonUrl);
        sectionText = await response.json();
    } catch (error) {
        console.error("Erreur lors du chargement du fichier JSON : ", error);
    }
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
