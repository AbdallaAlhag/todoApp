// main.js
import arrayModule from "./createTodo.js";
import { loadPage } from './createPage.js'
import noteModule from "./createNotes.js";
import lines from './img/vertical-lines.png';
import { createProject } from "./createProject.js";
import { loadNotePage } from "./createNotePage.js";

// Listens to the add botton 
export function dialogListener() {
  createDialog();
  document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.getElementById('form-dialog');
    const openDialogButton = document.getElementById('add-button');
    const submitButton = document.querySelector('#submit-button');

    openDialogButton.addEventListener('click', () => {
      if (!dialog.open) {
        dialog.showModal();
      }
    });

    const sideBar = document.querySelector('.side-bar')

    const home = document.querySelector('#home')
    const icon = document.createElement('img');
    icon.classList.add('icon-img');
    icon.src = lines;
    icon.alt = 'Vertical lines'
    home.appendChild(icon);

    // OKAY IM JUST GOING TO PLACE THE SIDE BAR BUTTONS LISTENER HERE LOL
    sideBar.querySelectorAll('button').forEach(button => {

      if (button.id !== 'add-button') {
        button.addEventListener('click', function () {

          sideBar.querySelectorAll('button').forEach(btn => {
            if (btn.id !== 'add-button') {
              btn.classList.remove('clicked');
              const icon = btn.querySelector('img');
              if (icon) {
                icon.remove();
              }
            }

          });

          this.classList.toggle('clicked');
          if (!this.querySelector('img')) {
            const icon = document.createElement('img');
            icon.classList.add('icon-img');
            icon.src = lines;
            icon.alt = 'Vertical lines'
            this.appendChild(icon);
          }
        });
      }

    });


  });
};


export function formListener() {
  const dialog = document.querySelector('dialog');
  const form = document.querySelector('form');

  let priority = null;
  if (dialog.querySelector('#form-priority')) {
    const priorityForm = dialog.querySelector('#form-priority');
    const selectedPriority = priorityForm.querySelector('input[name="priority"]:checked');
    if (selectedPriority){
      priority = selectedPriority.id
    }
  }

  const projectContainer = document.querySelector('.project-container');
  const activeBtn = projectContainer.querySelector('.clicked');

  const formData = new FormData(form);
  const title = formData.get('title');
  const description = formData.get('desc')
  const date = formData.get('date');

  if (!date && !priority && title && description) {
    noteModule.addToArray(title, description);
    localStorage.setItem('note', JSON.stringify(noteModule.getArray()));
  }
  if (date && priority && title && description) {
    if (activeBtn) {
      arrayModule.addToArray(title, description, date, priority, activeBtn.id);
      localStorage.setItem('todo', JSON.stringify(arrayModule.getArray()));
    } else {
      arrayModule.addToArray(title, description, date, priority);
      localStorage.setItem('todo', JSON.stringify(arrayModule.getArray()));
    }
  }
  if (!date && !priority && !description && title) {
    createProject(title);
  }
}

function createDialog() {
  if (document.getElementById('form-dialog')) {
    return
  }
  // Create dialog
  const dialog = document.createElement('dialog');
  dialog.setAttribute('id', 'form-dialog');

  // Create form
  const form = document.createElement('form');
  form.setAttribute('method', 'dialog');

  // Create dialog-container
  const dialogContainer = document.createElement('div');
  dialogContainer.classList.add('dialog-container');

  // Create dialog-header
  const dialogHeader = document.createElement('div');
  dialogHeader.classList.add('dialog-header');

  const h1 = document.createElement('h1');
  h1.textContent = 'Create a new...';
  dialogHeader.appendChild(h1);

  const removeButton = document.createElement('button');
  removeButton.setAttribute('id', 'exit-button');
  removeButton.textContent = 'X';

  removeButton.addEventListener('click', function () {
    // detelete Note`
    if (dialog.open) {
      dialog.close();
    }
  });
  dialogHeader.appendChild(removeButton);

  // Create dialog-side-bar
  const dialogSideBar = document.createElement('div');
  dialogSideBar.classList.add('dialog-side-bar');

  const todoButton = document.createElement('button');
  todoButton.textContent = 'ToDo';
  todoButton.classList.add('clicked');
  dialogSideBar.appendChild(todoButton);

  const projectButton = document.createElement('button');
  projectButton.textContent = 'Project';
  dialogSideBar.appendChild(projectButton);

  const noteButton = document.createElement('button');
  noteButton.textContent = 'Note';
  dialogSideBar.appendChild(noteButton);

  dialogSideBar.querySelectorAll('button').forEach(button => {

    button.addEventListener('click', function () {

      dialogSideBar.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('clicked');
        const icon = btn.querySelector('img');
        if (icon) {
          icon.remove();
        }
      });


      this.classList.toggle('clicked');
      if (!this.querySelector('img')) {
        const icon = document.createElement('img');
        icon.classList.add('icon-img');
        icon.src = lines;
        icon.alt = 'Vertical lines'
        this.appendChild(icon);
      }
    });

  });


  // Create dialog-content
  const dialogContent = document.createElement('div');
  dialogContent.classList.add('dialog-content');

  function createDefaultDialogContent() {
    dialogContent.replaceChildren();
    createTodoDialogContent(dialog, form, dialogContainer, dialogContent, dialogHeader, dialogSideBar);
  }

  // Load default dialog content
  createDefaultDialogContent();

  todoButton.addEventListener('click', () => {
    while (form.firstChild) {
      form.removeChild(form.firstChild);
    }
    createTodoDialogContent(dialog, form, dialogContainer, dialogContent, dialogHeader, dialogSideBar);
  });

  noteButton.addEventListener('click', () => {
    while (form.firstChild) {
      form.removeChild(form.firstChild);
    }
    createNoteDialogContent(dialog, form, dialogContainer, dialogContent, dialogHeader, dialogSideBar);
  });

  projectButton.addEventListener('click', () => {
    while (form.firstChild) {
      form.removeChild(form.firstChild);
    }
    createProjectDialogContent(dialog, form, dialogContainer, dialogContent, dialogHeader, dialogSideBar);
  })
}

// PROJECT DIALOG
function createProjectDialogContent(dialog, form, dialogContainer, dialogContent, dialogHeader, dialogSideBar) {

  // Title input
  const titleDiv = document.createElement('div');
  const titleLabel = document.createElement('label');
  titleLabel.setAttribute('for', 'title');
  const titleInput = document.createElement('input');
  titleInput.setAttribute('type', 'text');
  titleInput.setAttribute('id', 'title');
  titleInput.setAttribute('placeholder', 'Title: Pay bills');
  titleInput.setAttribute('name', 'title');
  titleInput.required = true;
  titleDiv.appendChild(titleLabel);
  titleDiv.appendChild(titleInput);



  // Submit button
  const submitButton = document.createElement('button');
  submitButton.classList.add('submit-button');
  submitButton.setAttribute('id', 'submit-button');
  submitButton.setAttribute('name', 'note');
  submitButton.textContent = 'Create Project';

  // Append elements
  form.appendChild(titleDiv);
  form.appendChild(submitButton);
  dialogContent.appendChild(form)
  dialogContainer.appendChild(dialogHeader);
  dialogContainer.appendChild(dialogSideBar);
  dialogContainer.appendChild(dialogContent);
  // form.appendChild(dialogContainer);
  dialog.appendChild(dialogContainer);

  // Append dialog to body
  document.body.appendChild(dialog);
  dialogListenerHelper();
}

// Notes Dialog Content
function createNoteDialogContent(dialog, form, dialogContainer, dialogContent, dialogHeader, dialogSideBar) {

  // Title input
  const titleDiv = document.createElement('div');
  const titleLabel = document.createElement('label');
  titleLabel.setAttribute('for', 'title');
  const titleInput = document.createElement('input');
  titleInput.setAttribute('type', 'text');
  titleInput.setAttribute('id', 'title');
  titleInput.setAttribute('placeholder', 'Title: Pay bills');
  titleInput.setAttribute('name', 'title');
  titleInput.required = true;
  titleDiv.appendChild(titleLabel);
  titleDiv.appendChild(titleInput);

  // Description textarea
  const descDiv = document.createElement('div');
  const descLabel = document.createElement('label');
  descLabel.setAttribute('for', 'desc');
  const descTextarea = document.createElement('textarea');
  descTextarea.setAttribute('id', 'desc');
  descTextarea.setAttribute('name', 'desc');
  descTextarea.setAttribute('placeholder', 'Details: e.g. internet, phone, rent.');
  descTextarea.required = true;
  descDiv.appendChild(descLabel);
  descDiv.appendChild(descTextarea);


  // Submit button
  const submitButton = document.createElement('button');
  submitButton.classList.add('submit-button');
  submitButton.setAttribute('id', 'submit-button');
  submitButton.setAttribute('name', 'note');
  submitButton.textContent = 'Add Note';

  // Append elements
  form.appendChild(titleDiv);
  form.appendChild(descDiv);
  form.appendChild(submitButton);
  dialogContent.appendChild(form)
  dialogContainer.appendChild(dialogHeader);
  dialogContainer.appendChild(dialogSideBar);
  dialogContainer.appendChild(dialogContent);
  // form.appendChild(dialogContainer);
  dialog.appendChild(dialogContainer);

  // Append dialog to body
  document.body.appendChild(dialog);
  dialogListenerHelper();
}

// TO DO DIALOG CONTENT
function createTodoDialogContent(dialog, form, dialogContainer, dialogContent, dialogHeader, dialogSideBar) {
  // Title input
  const titleDiv = document.createElement('div');
  const titleLabel = document.createElement('label');
  titleLabel.setAttribute('for', 'title');
  const titleInput = document.createElement('input');
  titleInput.setAttribute('type', 'text');
  titleInput.setAttribute('id', 'title');
  titleInput.setAttribute('placeholder', 'Title: Pay bills');
  titleInput.setAttribute('name', 'title');
  titleInput.required = true;
  titleDiv.appendChild(titleLabel);
  titleDiv.appendChild(titleInput);

  // Description textarea
  const descDiv = document.createElement('div');
  const descLabel = document.createElement('label');
  descLabel.setAttribute('for', 'desc');
  const descTextarea = document.createElement('textarea');
  descTextarea.setAttribute('id', 'desc');
  descTextarea.setAttribute('name', 'desc');
  descTextarea.setAttribute('placeholder', 'Details: e.g. internet, phone, rent.');
  descTextarea.required = true;
  descDiv.appendChild(descLabel);
  descDiv.appendChild(descTextarea);

  // Date input
  const dateDiv = document.createElement('div');
  const dateLabel = document.createElement('label');
  dateLabel.setAttribute('for', 'date');
  dateLabel.textContent = 'Due Date:';
  const dateInput = document.createElement('input');
  dateInput.setAttribute('type', 'date');
  dateInput.setAttribute('id', 'date');
  dateInput.setAttribute('name', 'date');
  dateInput.required = true;
  dateDiv.appendChild(dateLabel);
  dateDiv.appendChild(dateInput);

  // Priority inputs
  const priorityDiv = document.createElement('div');
  priorityDiv.setAttribute('id', 'bottom-line');
  const priorityForm = document.createElement('div');
  priorityForm.setAttribute('id', 'form-priority');
  priorityForm.textContent = 'Priority: ';

  const priorities = [
    { id: 'Low', value: 'Low', text: 'Low' },
    { id: 'Medium', value: 'Medium', text: 'Medium' },
    { id: 'High', value: 'High', text: 'High' }
  ];

  priorities.forEach(priority => {
    const div = document.createElement('div');
    const label = document.createElement('label');
    label.classList.add('radio-label');
    label.setAttribute('id', priority.id);
    label.textContent = priority.text;

    const input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('id', priority.id);
    input.setAttribute('name', 'priority');
    input.setAttribute('value', priority.value);
    input.required = true; // Apply required attribute to each radio input


    div.appendChild(input);
    div.appendChild(label)
    priorityForm.appendChild(div);
  });


  // Submit button
  const submitButton = document.createElement('button');
  submitButton.classList.add('submit-button');
  submitButton.setAttribute('id', 'submit-button');
  submitButton.setAttribute('name', 'todo');
  submitButton.textContent = 'Add To Do';


  // Append elements
  priorityDiv.appendChild(priorityForm);
  priorityDiv.appendChild(submitButton);
  form.appendChild(titleDiv);
  form.appendChild(descDiv);
  form.appendChild(dateDiv);
  form.appendChild(priorityDiv);
  dialogContent.appendChild(form)
  dialogContainer.appendChild(dialogHeader);
  dialogContainer.appendChild(dialogSideBar);
  dialogContainer.appendChild(dialogContent);
  // form.appendChild(dialogContainer);
  dialog.appendChild(dialogContainer);

  // Append dialog to body
  document.body.appendChild(dialog);
  dialogListenerHelper();
}

function dialogListenerHelper() {

  const dialog = document.getElementById('form-dialog');
  const submitButton = document.querySelector('#submit-button');

  submitButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    formListener();

    // Clear the form and close the dialog
    document.querySelector('form').reset();
    dialog.close();

    const sideBar = document.querySelector('.side-bar');
    const currentPage = sideBar.querySelector('.clicked')
    if (currentPage) {
      if (currentPage.id === 'notes-button') {
        loadNotePage();
      } else {
        loadPage(undefined, currentPage.id);
      }
    } else {
      loadPage(undefined, undefined);
    }

    // loadPage(true);

     // OKAY IM JUST GOING TO PLACE THE SIDE BAR BUTTONS LISTENER HERE LOL
     sideBar.querySelectorAll('button').forEach(button => {

      if (button.id !== 'add-button') {
        button.addEventListener('click', function () {

          sideBar.querySelectorAll('button').forEach(btn => {
            if (btn.id !== 'add-button') {
              btn.classList.remove('clicked');
              const icon = btn.querySelector('img');
              if (icon) {
                icon.remove();
              }
            }

          });

          this.classList.toggle('clicked');
          if (!this.querySelector('img')) {
            const icon = document.createElement('img');
            icon.classList.add('icon-img');
            icon.src = lines;
            icon.alt = 'Vertical lines'
            this.appendChild(icon);
          }
        });
      }

    });
    
  });


  // Optional: Close the dialog when clicking outside of it
  // lol only works with default dialog
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog = event.clientX >= rect.left && event.clientX <= rect.right &&
      event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!isInDialog) {
      dialog.close();
    }
  });

};
