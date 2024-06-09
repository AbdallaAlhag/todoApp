import './style.css';
import arrayModule from "./createTodo.js";
import noteModule from './createNotes.js';
import { createHome } from './home.js';
import { createToday } from './today.js';
import { createWeek } from './week.js';
import { createNote } from './notes.js';
import { createProject } from './createProject.js';



arrayModule.addToArray('Complete Project', 'Finish the Project task', '2024-06-06', 'Low');
arrayModule.addToArray('Grocery Shopping', 'Buy groceries for the week', '2024-06-08', 'Medium');
arrayModule.addToArray('Doctor Appointment', 'Visit Dr. Smith for a check-up', '2024-06-10', 'High');
arrayModule.addToArray('Read Book', 'Finish reading "Atomic Habits"', '2024-06-12', 'Low');
arrayModule.addToArray('Workout', 'Go to the gym for a workout session', '2024-06-07', 'High');

noteModule.addToArray('Meeting Notes', 'Discuss project milestones and deadlines');
noteModule.addToArray('Vacation Plan', 'Plan itinerary for the upcoming vacation');
noteModule.addToArray('Recipe', 'Ingredients and steps for making a chocolate cake');
noteModule.addToArray('Birthday Gift Ideas', "List of potential gifts for John's birthday");
noteModule.addToArray('Weekly Goals', 'Set and review goals for the upcoming week');


loadLocalStorage();




createProject('Gym');



createHome();
const buttons = document.querySelectorAll('.side-bar-button');
const homeBtn = document.querySelector('#home');
const todayBtn = document.querySelector('#today');
const weekBtn = document.querySelector('#week');
const noteBtn = document.querySelector('#notes-button');

homeBtn.classList.add('active');

homeBtn.addEventListener('click', function () {
    buttons.forEach(btn => btn.classList.remove('active'));
    createHome();
    homeBtn.classList.add('active');
});

todayBtn.addEventListener('click', function () {
    buttons.forEach(btn => btn.classList.remove('active'));
    createToday();
    todayBtn.classList.add('active');
});

weekBtn.addEventListener('click', function () {
    buttons.forEach(btn => btn.classList.remove('active'));
    createWeek();
    weekBtn.classList.add('active');
});

noteBtn.addEventListener('click', function () {
    buttons.forEach(btn => btn.classList.remove('active'));
    createNote();
    noteBtn.classList.add('active');
});

function loadLocalStorage() {
    // intialize json

    // Grab local storage for the todos
    let todoArray = localStorage.getItem('todo') ?
    JSON.parse(localStorage.getItem('todo')) : [];
    console.log(todoArray)

    arrayModule.clearAll();
    console.log('Cleared Array: ',arrayModule.getArray())
    // turn locoal storage into todo class
    todoArray.forEach(todo => {
        const title = todo._title;
        const description = todo._description;
        const dueDate = todo._dueDate;
        const priority = todo._priority;
        const project = todo._project;

        arrayModule.addToArray(title, description, dueDate, priority, project);
    });

    // 
    // const intialTodoArray = arrayModule.getArray();
    // console.log('our array', intialTodoArray);

    localStorage.setItem('todo', JSON.stringify(arrayModule.getArray()));
    console.log(localStorage);


    // NOTES SECTION
    let noteArray = localStorage.getItem('note') ?
    JSON.parse(localStorage.getItem('note')) : [];
    console.log(todoArray)

    noteModule.clearAll();
    // turn locoal storage into todo class
    noteArray.forEach(note => {
        const title = note._title;
        const description = note._description;

        noteModule.addToArray(title, description);
    });

    // 
    // const intialTodoArray = arrayModule.getArray();
    // console.log('our array', intialTodoArray);

    localStorage.setItem('note', JSON.stringify(noteModule.getArray()));
    console.log(localStorage);

}

// export function addLocalStorage(option) {
//     if (option === 'todo') {
//         const intialTodoArray = arrayModule.getArray();
//         localStorage.setItem('todo', JSON.stringify(intialTodoArray));
//     } else {
//         const intialNoteArray = arrayModule.getArray();
//         localStorage.setItem('note', JSON.stringify(intialNoteArray));
//     }
// }