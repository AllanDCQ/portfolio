
let projectsData = {"projects":[]}


function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-technologies', project.technologies.join(','));
    card.setAttribute('role', 'listitem');

    card.innerHTML = `
    <h2 class="project-title">
      ${project.title}
      <span class="project-subtitle">// ${project.subtitle}</span>
    </h2>
    <img src="${project.image}" alt="${project.title} project preview" class="project-image" />
    <div class="project-content">
      <p class="project-description">${project.description}</p>
      <button
        class="view-project"
        onclick="viewProject(${project.id})"
        aria-label="View details for ${project.title}"
      >
        View Project
      </button>
    </div>
  `;

    return card;
}

async function renderProjects(filteredProjects = null) {

    try {
        const response = await fetch('js/projects.json');
        const data = await response.json();

        projectsData = data[selectedLanguage];


    } catch (error) {
        console.error('Error fetching projects data:', error);
    }



    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = '';

    const projectsToRender = filteredProjects || projectsData.projects;

    if (projectsToRender.length === 0) {
        const noResults = document.createElement('p');
        noResults.textContent = 'No projects match the selected filters';
        noResults.style.color = '#607b96';
        noResults.style.gridColumn = '1 / -1';
        noResults.style.textAlign = 'center';
        noResults.setAttribute('role', 'alert');
        projectsGrid.appendChild(noResults);
        return;
    }

    projectsToRender.forEach(project => {
        const card = createProjectCard(project);
        projectsGrid.appendChild(card);
    });

    const count = projectsToRender.length;
    projectsGrid.setAttribute('aria-label', `Showing ${count} project${count !== 1 ? 's' : ''}`);
}

function viewProject(projectId) {
    const project = projectsData.projects.find(p => p.id === projectId);
    if (project) {
        window.open(`${project.link}`, '_blank');
    }
}

function filterProjects() {
    const checkedTechnologies = Array.from(document.querySelectorAll('.tech-item input:checked'))
    .map(input => input.dataset.tech);

    console.log(checkedTechnologies);

    if (checkedTechnologies.length === 0) {
        renderProjects();
        return;
    }

    const filteredProjects = projectsData.projects.filter(project =>
    project.technologies.some(tech => checkedTechnologies.includes(tech))
    );

    renderProjects(filteredProjects);
}

function initializeCheckboxHandlers() {
    document.querySelectorAll('.tech-item input').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const label = e.target.closest('.tech-item');
            const checkboxSpan = label.querySelector('.tech-checkbox');
            const techLabel = label.querySelector('.tech-label');

            let techIcon = null;
            let currentSrc = null;

            try {
                techIcon = label.querySelector('.tech-icon');
                currentSrc = techIcon.src;
            }
            catch  {

            }

            if (e.target.checked) {
                techLabel.classList.add('active');
                checkboxSpan.style.backgroundColor = '#607b96';
                if(techIcon != null){
                    techIcon.src = currentSrc.replace('_passive', '_active');
                }
            } else {
                techLabel.classList.remove('active');

                checkboxSpan.style.backgroundColor = '#011627';
                if(techIcon != null) {
                    techIcon.src = currentSrc.replace('_active', '_passive');
                }
            }

            filterProjects();
        });


        checkbox.addEventListener('click', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                checkbox.checked = !checkbox.checked;
                checkbox.dispatchEvent(new Event('change'));
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    document.querySelectorAll('.tech-item input:checked').forEach(checkbox => {
        checkbox.checked = false;
    });
    initializeCheckboxHandlers();
});

