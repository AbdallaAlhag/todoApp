import { loadPage } from './createPage.js'
import { dialogListener } from './listenerModule.js';

export function createToday(){
    loadPage('today');
    dialogListener();
}
