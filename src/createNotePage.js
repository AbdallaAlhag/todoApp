import noteModule from "./createNotes";

function createNotePage() {
    const content_container = document.createElement("div");
    content_container.classList.add("note-container");
    const array = noteModule.getArray();
    array.forEach((element, index) => {
        // if condition to load base on what page we want
        const grid = document.createElement("div");
        grid.classList.add("note-grid");
        grid.setAttribute('id', `note-grid-${index}`)
        grid.setAttribute('index', index);
        createNote(grid, element,index);
        content_container.appendChild(grid)

    });
    return content_container;
}

// Parent = grid, elment = notes object (which is the class we created) inside the array which we are looping through
function createNote(parent, element,index) {

    const removeButton = document.createElement('button');
    removeButton.setAttribute('id', 'exit-button');
    removeButton.textContent = 'X';

    removeButton.addEventListener('click', function () {
        // detelete Noote
    });
    parent.appendChild(removeButton);

    for (const key in element) {
        // check if current propery belongs to our element instead of properties inherited from prototype chain
        const textarea = document.createElement('textarea');

        textarea.setAttribute('id', `textarea-${key}-${index}`);
        textarea.classList.add('textarea-class');
        textarea.value = element[key];
        

        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';

            const pa = this.parentElement;
            console.log(pa)
            // pa.style.height = 'auto';
            pa.style.height = this.style.height + 'px';
        });

        parent.appendChild(textarea);
        
    }


}


export function loadNotePage() {
    const content = document.getElementById("content");
    content.textContent = "";
    content.appendChild(createNotePage());
}

