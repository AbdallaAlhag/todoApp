import arrayModule from "./createTodo";
import trash from "./img/trash.svg";
import edit from "./img/edit.svg";
import { todoListener } from "./todoListenerModule";



function createPage(topic = true, date = true) {
  const content_container = document.createElement("div");
  content_container.classList.add("grid-container");
  
  const array = arrayModule.getArray();
  array.forEach((element,index) => {
    // if condition to load base on what page we want
    const grid = document.createElement("div");
    grid.classList.add("grid");
    grid.setAttribute('index', index);
    createTodo(grid, element);
    grid.style;
    content_container.appendChild(grid);
  });
  return content_container;
}

// Parent = grid, elment = todo object (which is the class we created) inside the array which we are looping through
function createTodo(parent, element) {
  const { checkbox, label, detailButton, editButton, removeButton } = createHelper();

  parent.appendChild(label);
  parent.appendChild(checkbox);

  for (const key in element) {
    // check if current propery belongs to our element instead of properties inherited from prototype chain
    if (key == '_description' || key == '_priority') {
      continue;
    }
    if (Object.prototype.hasOwnProperty.call(element, key)) {
      if (key == '_dueDate'){
        parent.appendChild(detailButton);
      }
      const div = document.createElement("div");
      div.setAttribute("id", `${key}`);
      div.textContent = `${element[key]}`;
      parent.appendChild(div);
    }
  }

  parent.style.borderLeftColor =
    element.priority == "High"
      ? "red"
      : element.priority == "Medium"
      ? "orange"
      : "green";

  // const trashImg = document.createElement("img");
  // trashImg.src = `${trash}`;
  // trashImg.alt = "trashcan";

  // const editImg = document.createElement("img");
  // editImg.src = `${edit}`;
  // editImg.alt = "edit image";
  parent.appendChild(editButton);
  parent.appendChild(removeButton);
}

function createHelper() {

  const detailButton = document.createElement('button');
  detailButton.textContent = 'Detail';
  detailButton.className = 'detail';

  const editButton = document.createElement('button');
  editButton.className = 'edit';
  const editImg = document.createElement("img");
  editImg.src = `${edit}`;
  editImg.alt = "edit";
  editButton.appendChild(editImg)

  const removeButton = document.createElement('button');
  removeButton.className = 'remove';
  const trashImg = document.createElement("img");
  trashImg.src = `${trash}`;
  trashImg.alt = "trashcan";
  removeButton.appendChild(trashImg)

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "myCheckbox"; // Optionally set an ID
  checkbox.name = "myCheckbox"; // Optionally set a name
  checkbox.value = "isChecked"; // Optionally set a value

  const label = document.createElement("label");
  label.htmlFor = "myCheckbox"; // Set the 'for' attribute to match the checkbox's ID

  return { checkbox, label, detailButton, editButton, removeButton };
}

export function loadPage() {
  const content = document.getElementById("content");
  content.textContent = "";
  content.appendChild(createPage(true, true));
  todoListener();
}
