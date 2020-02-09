import {BaseComponentOptions} from './interfaces';

const shadowSymbol = Symbol('shadow');
const styleSymbol = Symbol('style');
const contentSymbol = Symbol('content');
const optionsSymbol = Symbol('options');

export class BaseComponent extends HTMLElement {
    private [shadowSymbol]: ShadowRoot;
    private [styleSymbol]: HTMLStyleElement;
    private [contentSymbol]: DocumentFragment;
    private [optionsSymbol]: BaseComponentOptions;

    constructor(options?: BaseComponentOptions) {
        super();

        this.applyOptions(options);

        this.createShadowRoot();
        this.createStyleSheet();
        this.createTemplate();

        this.renderShadowRoot();
    }

    protected get root(): ShadowRoot {
        return this[shadowSymbol];
    }

    private applyOptions(options?: BaseComponentOptions) {
        const defaultOptions = {
            styles: null,
            template: null
        };

        this[optionsSymbol] = options
            ? Object.assign(defaultOptions, options)
            : defaultOptions;
    }

    private createShadowRoot() {
        this[shadowSymbol] = this.attachShadow({mode: 'open'});
    }

    private createStyleSheet() {
        if (!this[optionsSymbol].styles) {
            return;
        }

        const style = document.createElement('style');

        style.textContent = this[optionsSymbol].styles;

        this[styleSymbol] = style;
    }

    private createTemplate() {
        if (!this[optionsSymbol].template) {
            return;
        }

        const template = document.createElement('template');

        template.innerHTML = this[optionsSymbol].template;

        this[contentSymbol] = template.content;
    }

    private renderShadowRoot() {
        this[shadowSymbol].appendChild(this[styleSymbol]);
        this[shadowSymbol].appendChild(this[contentSymbol]);
    }
}