// main.js
import arrayModule from "./todo";
import { loadPage } from './page.js'

export function dialogListener(){
    document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.getElementById('form-dialog');
    const openDialogButton = document.getElementById('add-button');
    const cancelButton = document.getElementById('cancel-button');
    const submitButton = document.getElementById('submit-button');
  
    openDialogButton.addEventListener('click', () => {
      dialog.showModal();
    });
  
    cancelButton.addEventListener('click', () => {
      dialog.close();
    });
  
    submitButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the form from submitting in the traditional way
      console.log('subtmit button working')
      formListener();
  
      // Clear the form and close the dialog
      document.querySelector('form').reset();
      dialog.close();
      loadPage();
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


function formListener(){
  const dialog = document.querySelector('dialog');
  const form = document.querySelector('form');

  const formData = new FormData(form);
  const title = formData.get('title');
  const description = formData.get('desc')
  const date = formData.get('date');
  const priority = formData.get('priority');

  arrayModule.addToArray(title, description, date,priority);
  let array = arrayModule.getArray();
  console.log(array);
  console.log('checking if dialog works');
}