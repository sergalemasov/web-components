import {PopupInfo} from './components/popup-info.component';

window.addEventListener('load', onWindowLoad);

function onWindowLoad() {
    customElements.define('popup-info', PopupInfo);
}
