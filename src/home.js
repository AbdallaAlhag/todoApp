import { loadPage } from './createPage.js'
import { dialogListener } from './listenerModule.js';

export function createHome(){
    loadPage(true);
    dialogListener();
}
