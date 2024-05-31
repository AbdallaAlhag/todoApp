import './style.css';
import { loadPage } from './createPage.js'
import arrayModule from "./createTodo.js";
import { dialogListener } from './listenerModule.js';
import { todoListener } from './todoListenerModule.js';

arrayModule.addToArray('Complete Project', 'Finish the Odin Project task', '2024-06-15', 'Low');
arrayModule.addToArray('Work on css', 'Add Icon', '2024-06-15', 'Medium');
arrayModule.addToArray('Pay bills', 'Pay phone bill from At&t', '2024-06-15', 'High');
// let array = arrayModule.getArray();
// console.log(array);
// console.log('Hello World');
loadPage();
dialogListener();
// todoListener();


