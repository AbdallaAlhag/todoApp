import arrayModule from "./createTodo";
import trash from "./img/trash.svg";
import edit from "./img/edit.svg";
import { todoListener } from "./todoListenerModule";
import { format, parseISO, differenceInDays, isValid } from "date-fns";
import { enUS } from 'date-fns/locale';
import addImage from './img/add.png';
import noteIcon from './img/notePad.svg'
import { countTodo } from "./counter";
import { loadNotePage } from "./createNotePage";


export function createPage(option = true, proj = 'home') {
  const content_container = document.createElement("div");
  content_container.classList.add("grid-container");
  
  const addBtn = document.querySelector('#add-button-img');
  addBtn.src = addImage;

  const notePad = document.querySelector('#notepad-icon');
  notePad.src = noteIcon;

  const array = arrayModule.getArray();
  array.forEach((element, index) => {
    // if condition to load base on what page we want
    const grid = document.createElement("div");
    grid.classList.add("grid");
    grid.setAttribute('index', index);
    createTodo(grid, element);


    // check proj here and create function for it
    if (proj === 'home' || proj ==='today' || proj === 'week') {
      if (checkDate(option, element.dueDate)) {
        content_container.appendChild(grid);
      }
    }
    else if (checkDate(option, element.dueDate) && proj === element.project) {
      content_container.appendChild(grid);
    }

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
    if (key === '_description' || key === '_priority' || key === '_project') {
      continue;
    }
    if (Object.prototype.hasOwnProperty.call(element, key)) {
      if (key == '_dueDate') {
        parent.appendChild(detailButton);
      }
      const div = document.createElement("div");
      div.setAttribute("id", `${key}`);

      // formated date
      // if (key == '_dueDate'){
      //   const date = parseISO(element[key])
      //   const formattedDate = format(date, "MMMM do", { locale: enUS });
      //   div.textContent = `${formattedDate}`;
      // } else {
      //   div.textContent = `${element[key]}`;
      // }
      if (key === '_dueDate') {
        try {
          const date = parseISO(element[key]);
          if (isValid(date)) {
            const formattedDate = format(date, "MMM do", { locale: enUS });
            div.textContent = `${formattedDate}`;
          } else {
            div.textContent = 'Invalid date';
          }
        } catch (error) {
          div.textContent = 'Error parsing date';
        }
      } else {
        div.textContent = `${element[key]}`;
      }

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

function checkDate(option, curDay) {
  if (option == true) {
    return true;
  }
  const currentDay = parseISO(curDay)
  const today = new Date();
  const diff = differenceInDays(currentDay, today)
  if (option === 'today') {
    if (diff == 0) {
      return true;
    }
  } else if (option === 'week') {
    if (diff <= 7 && diff > 0) {
      return true;
    }
  } else {
    return false;
  }

}

export function loadPage(option=true, proj = 'home') {
  const content = document.getElementById("content");
  content.textContent = "";
  content.appendChild(createPage(option, proj));
  todoListener();
  countTodo();
}

