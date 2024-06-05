// main.js
import arrayModule from "./createTodo.js";
import { loadPage } from './createPage.js'
import noteModule from "./createNotes.js";

// Listens to the add botton 
export function dialogListener() {
  createDialog();
  document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.getElementById('form-dialog');
    const openDialogButton = document.getElementById('add-button');
    let submitButton = document.querySelectorAll('#submit-button');
    console.log(submitButton.name)

    openDialogButton.addEventListener('click', () => {
      dialog.showModal();
    });


    submitButton.forEach((btn)=> {
      btn.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the form from submitting in the traditional way
        formListener();

        // Clear the form and close the dialog
        document.querySelector('form').reset();
        dialog.close();
        loadPage(true);
      });
    });




    // Optional: Close the dialog when clicking outside of it
    dialog.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = event.clientX >= rect.left && event.clientX <= rect.right &&
        event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!isInDialog) {
        dialog.close();
      }
    });
  });
};


export function formListener(option) {
  const dialog = document.querySelector('dialog');
  const form = document.querySelector('form');

  const formData = new FormData(form);
  const title = formData.get('title');
  const description = formData.get('desc')
  const date = formData.get('date');
  const priority = formData.get('priority');

  if (!date && !priority) {
    noteModule.addToArray(title, description);
  } else {
    arrayModule.addToArray(title, description, date, priority);
  }
}

function createDialog() {
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

  // Create dialog-side-bar
  const dialogSideBar = document.createElement('div');
  dialogSideBar.classList.add('dialog-side-bar');

  const todoButton = document.createElement('button');
  todoButton.textContent = 'To Do';
  dialogSideBar.appendChild(todoButton);

  const noteButton = document.createElement('button');
  noteButton.textContent = 'Note';
  dialogSideBar.appendChild(noteButton);


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
    const label = document.createElement('label');
    label.classList.add('radio-label');
    label.setAttribute('id', priority.id);
    label.textContent = priority.text;

    const input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('id', priority.id);
    input.setAttribute('name', 'priority');
    input.setAttribute('value', priority.value);
    if (priority.id === 'Low') input.required = true;

    label.appendChild(input);
    priorityForm.appendChild(label);
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
}
