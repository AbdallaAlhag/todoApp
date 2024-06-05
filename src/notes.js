import { loadNotePage } from './createNotePage.js';
import { dialogListener } from './listenerModule.js';

export function createNote(){
    loadNotePage();
    dialogListener();
}
