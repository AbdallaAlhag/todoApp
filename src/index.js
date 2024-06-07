import './style.css';
import arrayModule from "./createTodo.js";
import noteModule from './createNotes.js';
import { createHome } from './home.js';
import { createToday } from './today.js';
import { createWeek } from './week.js';
import { createNote } from './notes.js';

arrayModule.addToArray('Complete Project', 'Finish the Odin Project task', '2024-06-06', 'Low');
arrayModule.addToArray('Work on css', 'Add Icon', '2024-06-06', 'Medium');
arrayModule.addToArray('Pay bills', 'Pay phone bill from At&t', '2024-06-12', 'High');
arrayModule.addToArray('Pay bills', 'Pay phone bill from At&t', '2024-06-12', 'High');

noteModule.addToArray('Finish Project', 'Finish loading pages');
noteModule.addToArray('Finish Project', 'Finish loading pages');
noteModule.addToArray('Finish Project', 'Finish loading pages');
noteModule.addToArray('Finish Project', 'Finish loading pages');
noteModule.addToArray('Finish Project', 'Finish loading pages');
noteModule.addToArray('Finish Project', 'Finish loading pages');
noteModule.addToArray('Finish Project', 'Finish loading pages');

// let array = arrayModule.getArray();
// console.log(array);
// console.log('Hello World');
// const today = new Date();
// today = Fri May 31 2024 10:41:39 GMT-0700 (Pacific Daylight Time)


createHome();
const buttons = document.querySelectorAll('.side-bar-button');
const homeBtn = document.querySelector('#home');
const todayBtn = document.querySelector('#today');
const weekBtn = document.querySelector('#week');
const noteBtn = document.querySelector('#notes-button');

homeBtn.classList.add('active');

homeBtn.addEventListener('click', function() {
    buttons.forEach(btn => btn.classList.remove('active'));
    createHome();
    homeBtn.classList.add('active');
});

todayBtn.addEventListener('click', function() {
    buttons.forEach(btn => btn.classList.remove('active'));
    createToday();
    todayBtn.classList.add('active');
});

weekBtn.addEventListener('click', function() {
    buttons.forEach(btn => btn.classList.remove('active'));
    createWeek();
    weekBtn.classList.add('active');
});

noteBtn.addEventListener('click', function() {
    buttons.forEach(btn => btn.classList.remove('active'));
    createNote();
    weekBtn.classList.add('active');
});