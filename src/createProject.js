import { createProjectHome } from "./project";

export function createProject(name){
    const container = document.querySelector('.project-container');
    const buttons = document.querySelectorAll('.side-bar-button');
    
    const button = document.createElement('button');
    button.textContent = name;
    button.setAttribute('id', name);
    button.classList.add('project');
    container.appendChild(button);
    
    button.addEventListener('click', function() {
        buttons.forEach(btn => btn.classList.remove('active'));
        // createNote();
        createProjectHome(name);
        button.classList.add('active');
        });
}

