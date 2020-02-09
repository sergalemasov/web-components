import {BaseComponent} from 'core/base.component';

import * as styles from './popup-info.component.less';
import template from './popup-info.component.html';

export class PopupInfo extends BaseComponent {
    constructor() {
        super({styles, template});

        this.setInfoTextContent();
        this.insertImageToIcon();
    }

    private setInfoTextContent() {
        const text = this.getAttribute('text');

        const info = this.root.querySelector('.info');

        info.textContent = text;
    }

    private insertImageToIcon() {
        let imgUrl: string;

        if (this.hasAttribute('img')) {
            imgUrl = this.getAttribute('img');
        } else {
            imgUrl = 'img/default.png';
        }

        const img = this.root.querySelector<HTMLImageElement>('.icon>img');;

        img.src = imgUrl;
    }
}
