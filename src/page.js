import arrayModule from "./todo";
const array = arrayModule.getArray();

function createPage(topic = true, date = true){
    const content_container = document.createElement('div');
    content_container.classList.add("todo-container");

    array.forEach(element => {
        // if condition to load base on what page we want
        const grid = document.createElement('div');
        grid.classList.add('todo');
        createTodo(grid,element);
        content_container.appendChild(grid);
    });
    return content_container;
}

function createTodo(parent, element){
    for (const key in element){
        // check if current propery belongs to our element instead of properties inherited from prototype chain
        if (Object.prototype.hasOwnProperty.call(element, key)) {
            const div = document.createElement('div');
            div.textContent = `${element[key]}`;
            parent.appendChild(div);
        }
    }   
};

export function loadPage(){
    const content = document.getElementById('content');
    content.textContent = "";
    content.appendChild(createPage(true,true));
}

