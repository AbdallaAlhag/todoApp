import './style.css';
import { loadPage } from './page.js'
import arrayModule from "./todo";
import { dialogListener } from './listenerModule.js';

arrayModule.addToArray('Complete Project', 'Finish the Odin Project task', '2024-06-15', 'Medium');
// let array = arrayModule.getArray();
// console.log(array);
// console.log('Hello World');
dialogListener();
loadPage();