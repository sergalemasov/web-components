import * as styles from './popup-info.component.less';

export class PopupInfo extends HTMLElement {
    private _domNodes: Record<string, HTMLElement> = {};
    private _shadow: ShadowRoot;
    private _style: HTMLStyleElement;

    constructor() {
        super();

        this.createShadowRoot();

        this.createWrapper();
        this.createIcon();
        this.createInfo();

        this.createStyleSheet();

        this.setInfoTextContent();
        this.insertImageToIcon();

        this.attachNodes();
    }

    private createShadowRoot() {
        this._shadow = this.attachShadow({mode: 'open'});
    }

    private createWrapper() {
        const wrapper = document.createElement('span');

        wrapper.setAttribute('class', 'wrapper');

        Object.assign(this._domNodes, {wrapper});
    }

    private createIcon() {
        const icon = document.createElement('span');

        icon.setAttribute('class', 'icon');
        icon.setAttribute('tabindex', '0');

        Object.assign(this._domNodes, {icon});
    }

    private createInfo() {
        const info = document.createElement('span');

        info.setAttribute('class', 'info');

        Object.assign(this._domNodes, {info});
    }

    private setInfoTextContent() {
        const text = this.getAttribute('text');

        this._domNodes.info.textContent = text;
    }

    private insertImageToIcon() {
        let imgUrl: string;

        if (this.hasAttribute('img')) {
            imgUrl = this.getAttribute('img');
        } else {
            imgUrl = 'img/default.png';
        }

        const img = document.createElement('img');

        img.src = imgUrl;

        this._domNodes.icon.appendChild(img);
    }

    private createStyleSheet() {
        const style = document.createElement('style');

        style.textContent = styles;

        this._style = style;
    }

    private attachNodes() {
        this._shadow.appendChild(this._style);
        this._shadow.appendChild(this._domNodes.wrapper);
        this._domNodes.wrapper.appendChild(this._domNodes.icon);
        this._domNodes.wrapper.appendChild(this._domNodes.info);
    }
}
