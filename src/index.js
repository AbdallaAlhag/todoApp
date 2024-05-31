import './style.css';
import arrayModule from "./createTodo.js";
import { createHome } from './home.js';
import { createToday } from './today.js';
import { createWeek } from './week.js';

arrayModule.addToArray('Complete Project', 'Finish the Odin Project task', '2024-05-31', 'Low');
arrayModule.addToArray('Work on css', 'Add Icon', '2024-05-27', 'Medium');
arrayModule.addToArray('Pay bills', 'Pay phone bill from At&t', '2024-05-24', 'High');
arrayModule.addToArray('Pay bills', 'Pay phone bill from At&t', '2024-05-18', 'High');
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
