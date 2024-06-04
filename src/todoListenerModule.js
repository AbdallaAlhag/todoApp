import { createDialog } from "./createDialog";
import { loadPage } from "./createPage";
import arrayModule from "./createTodo";
import { parseISO, format } from 'date-fns';
import { enUS } from 'date-fns/locale';

// Listens to buttons on the todo, including detail, edit, remove
export function todoListener() {
    const attachListeners = () => {
        const detail = document.querySelectorAll(".detail");
        const edit = document.querySelectorAll(".edit");
        const remove = document.querySelectorAll(".remove");

        detail.forEach((detailbtn) => {
            detailbtn.addEventListener("click", (event) => {
                event.stopPropagation(); // Stop event propagation to prevent triggering other event listeners
                const grid = detailbtn.parentNode;
                createDetailDialog(grid);
            });
        });

        edit.forEach((editBtn) => {
            editBtn.addEventListener("click", (event) => {
                event.stopPropagation();
                const grid = editBtn.parentNode;
                createEdit(grid);
            });
        });

        remove.forEach((removeBtn) => {
            removeBtn.addEventListener("click", (event) => {
                event.stopPropagation();
                const grid = removeBtn.parentNode;
                removeGrid(grid);
            });
        });
    };
    // });


    attachListeners(); // Directly call attachListeners to attach listeners
    // document.addEventListener("DOMContentLoaded", attachListeners);


}

function createDetailDialog(grid) {
    // need grid.index value
    let array = arrayModule.getArray();
    let gridIndex = grid.getAttribute("index");

    // Formated date
    const date = parseISO(array[gridIndex].dueDate);
    const formattedDate = format(date, 'MMMM do, yyyy', { locale: enUS });


    const dialog = document.createElement("dialog");
    dialog.id = "detail-dialog";
    dialog.innerHTML = `
        <form method="dialog">
            <h1>${array[gridIndex].title}</h1>
            <h3>Priority: </h3><p>${array[gridIndex].priority}</p>
            <h3>Due Date:</h3><p>${formattedDate}</p>
            <h3>Details:</h3><p>${array[gridIndex].description}</p>
        </form>
    `;
    document.body.appendChild(dialog);

    // Optional: Close the dialog when clicking outside of it
    dialog.addEventListener("click", (event) => {
        const rect = dialog.getBoundingClientRect();
        const isInDialog =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;
        if (!isInDialog) {
            dialog.close();
            dialog.remove(); // Remove the dialog from the DOM when closed
        }
    });

    dialog.showModal();
}

function createEdit(grid) {
    // need grid.index value

    const array = arrayModule.getArray();
    const gridIndex = grid.getAttribute("index");
    //   console.log(array[grid.index].title);
    createDialog(array[gridIndex]);


    // Optional: Close the dialog when clicking outside of it
    const editDialog = document.querySelector("#edit-dialog");
    // editDialog.showModal();

    // const submitButton = document.getElementsByClassName('submit-button');
    const submitButton = document.querySelector('#edit-submit-button');

    // submitButton.addEventListener('click', (event) => {
    //     event.preventDefault(); // Prevent the form from submitting in the traditional way
    //     editFormListener(array[gridIndex])

    //     // Clear the form and close the dialog
    //     // document.querySelector('form').reset();
    //     editDialog.close();
    //     loadPage(true);
    // });

    editDialog.addEventListener("click", (event) => {
        const rect = editDialog.getBoundingClientRect();
        const isInDialog =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;
        if (!isInDialog) {
            editDialog.close();
            editDialog.remove(); // Remove the dialog from the DOM when closed
        }
    });
}

function removeGrid(grid) {
    const gridIndex = grid.getAttribute("index");
    arrayModule.remove(gridIndex);
    loadPage(true);
}

export function editFormListener(todoObject){
    const dialog = document.querySelector('#edit-dialog');
    const form = dialog.querySelector('form');
    const priorityForm = dialog.querySelector('#form-priority');
    const selectedPriority = priorityForm.querySelector('input[name="priority"]:checked');

    const formData = new FormData(form);
    todoObject.title = formData.get('title');
    todoObject.description = formData.get('desc');
    todoObject.dueDate = formData.get('date');
    todoObject.priority = selectedPriority.id;

    loadPage(true);
}