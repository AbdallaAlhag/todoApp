import { loadPage } from './createPage.js'
import { dialogListener } from './listenerModule.js';

export function createProjectHome(proj){
    loadPage(true, proj);
    dialogListener();
}
