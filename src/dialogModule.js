// main.js
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
  
      const title = document.getElementById('title').value;
      const description = document.getElementById('desc').value;
      const date = document.getElementById('due').value;
    //   const priority = document.getElementById('item-priority').value;
  
      // Handle the form data here (e.g., add it to an array, display it on the page, etc.)
      console.log('Form Data:', { name, description, date, priority });
  
      // Clear the form and close the dialog
      document.querySelector('form').reset();
      dialog.close();
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
  
}
