import { createDialog } from "./createDialog";
import { loadPage } from "./createPage";
import arrayModule from "./createTodo";

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

    const dialog = document.createElement("dialog");
    dialog.id = "detail-dialog";
    dialog.innerHTML = `
        <form method="dialog">
            <h1>${array[gridIndex].title}</h1>
            <p><h3>Priority: </h3>${array[gridIndex].priority}</p>
            <p><h3>Due Date:</h3>${array[gridIndex].dueDate}</p>
            <p><h3>Details:</h3>${array[gridIndex].description}</p>
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
    createDialog();

    // Optional: Close the dialog when clicking outside of it
    const editDialog = document.querySelector("#edit-dialog");
    editDialog.showModal();

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
    loadPage();
}
