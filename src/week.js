import { loadPage } from './createPage.js'
import { dialogListener } from './listenerModule.js';

export function createWeek(){
    loadPage('week');
    dialogListener();
}
