import { editFormListener } from './todoListenerModule'
// Create the parent container div with class 'dialog-content'

// arr = [todo class, todo class, ...etc]
// so lets pass in that object class
export function createDialog(todoObject) {
    // Create the dialog element
    const formDialog = document.createElement("dialog");
    formDialog.setAttribute("id", "edit-dialog");

    // Create the dialog content container div with class 'dialog-content'
    const dialogContent = document.createElement("div");
    dialogContent.classList.add("dialog-content");

    // Create the form element
    const formElement = document.createElement("form");
    formElement.setAttribute("method", "dialog");

    // Create the title input element
    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title");
    const titleInput = document.createElement("input");
    titleInput.value = `${todoObject.title}`;
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "title");
    titleInput.setAttribute("name", "title");
    titleInput.setAttribute("placeholder", "Title: Pay bills");
    titleInput.setAttribute("required", "true");

    // Create the description textarea element
    const descLabel = document.createElement("label");
    descLabel.setAttribute("for", "desc");
    //   descLabel.textContent = "Details:";
    const descTextarea = document.createElement("textarea");
    descTextarea.textContent = `${todoObject.description}`;
    descTextarea.setAttribute("id", "desc");
    descTextarea.setAttribute("name", "desc");
    descTextarea.setAttribute(
        "placeholder",
        "Details: e.g. internet, phone, rent."
    );
    descTextarea.setAttribute("required", "true");

    // Create the due date input element
    const dateLabel = document.createElement("label");
    dateLabel.setAttribute("for", "date");
    dateLabel.textContent = "Due Date: ";
    const dateInput = document.createElement("input");
    dateInput.value = todoObject.dueDate;
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("id", "date");
    dateInput.setAttribute("name", "date");
    dateInput.setAttribute("required", "true");

    // Create the priority radio buttons
    const priorityLabel = document.createElement("div");
    priorityLabel.textContent = "Priority:";
    priorityLabel.id = 'form-priority';
    priorityLabel.name = 'priority';
    const lowRadio = createRadioButton("Low", "Low", "Low", todoObject.priority);
    const mediumRadio = createRadioButton("Medium", "Medium", "Medium", todoObject.priority);
    const highRadio = createRadioButton("High", "High", "High", todoObject.priority);
    priorityLabel.appendChild(lowRadio);
    priorityLabel.appendChild(mediumRadio);
    priorityLabel.appendChild(highRadio);


    function createRadioButton(id, value, labelText, currentPriority) {
        const div = document.createElement('div');
        const label = document.createElement("label");
        label.classList.add('radio-label');
        label.setAttribute("id", id);

        const radio = document.createElement("input");
        radio.setAttribute("type", "radio");
        radio.setAttribute("id", id);
        radio.setAttribute("name", "priority");
        radio.setAttribute("value", value);
        if (currentPriority === value) {
            radio.checked = true;
        }

        const labelTextNode = document.createTextNode(labelText);
        div.appendChild(label);
        div.appendChild(radio);
        label.appendChild(labelTextNode);

        return div;
    }

    // Create the submit button
    const submitButton = document.createElement("button");
    // submitButton.setAttribute("type", "submit");
    submitButton.classList.add("submit-button");
    submitButton.id = "edit-submit-button"
    submitButton.textContent = "Update To-Do";

    // // Create the cancel button
    // const cancelButton = document.createElement("button");
    // cancelButton.setAttribute("type", "reset");
    // cancelButton.setAttribute("id", "cancel-button");
    // cancelButton.textContent = "Cancel";

    // Append all elements to the form element
    formElement.appendChild(titleLabel);
    formElement.appendChild(titleInput);
    formElement.appendChild(descLabel);
    formElement.appendChild(descTextarea);
    formElement.appendChild(dateLabel);
    formElement.appendChild(dateInput);
    const bottomLine = document.createElement("div");
    bottomLine.id = 'bottom-line'
    bottomLine.appendChild(priorityLabel);
    bottomLine.appendChild(submitButton);
    // bottomLine.appendChild(cancelButton);
    formElement.appendChild(bottomLine);

    //   formElement.appendChild(lowRadio);
    //   formElement.appendChild(mediumRadio);
    //   formElement.appendChild(highRadio);

    // formElement.appendChild(priorityLabel);
    // formElement.appendChild(submitButton);
    // formElement.appendChild(cancelButton);

    // Append the form element to the dialog content container div dialogContent
    formElement.appendChild(dialogContent);

    // Append the dialog content container div to the dialog element
    formDialog.appendChild(formElement);

    // Append the dialog element to the document body
    document.body.appendChild(formDialog);

    formDialog.showModal();

    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        editFormListener(todoObject);
        formDialog.remove();
        formDialog.close();
    });

}

export function createNotesDialog(noteObj) {
    console.log('todo');
}