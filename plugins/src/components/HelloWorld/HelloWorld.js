var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let HelloWorld = class HelloWorld extends LitElement {
    constructor() {
        super(...arguments);
        this.name = 'Somebody';
    }
    static getMetaConfig() {
        // plugin contract information
        return {
            controlName: 'IFrame-new',
            fallbackDisableSubmit: false,
            description: 'IFrame component which can render url view with the frame',
            iconUrl: 'one-line-text',
            groupName: 'Visual',
            version: '1.3',
            properties: {
                src: {
                    type: 'string',
                    title: 'Source URL',
                    description: 'URL of the iframe, please note many sites block been rendered in iframes',
                    defaultValue: 'https://www.wikipedia.org/',
                },
                height: {
                    type: 'string',
                    title: 'Height',
                    description: 'Height of the component',
                    defaultValue: 500,
                },
                frameTitle: {
                    type: 'string',
                    title: 'Frame Title',
                    description: 'IFrame Title',
                },
            },
            standardProperties: {
                readOnly: true,
                required: true,
                description: true,
            },
        };
    }
    render() {
        return html `<p>Hello, ${this.name}!</p>`;
    }
};
HelloWorld.styles = css `p { color: blue }`;
__decorate([
    property()
], HelloWorld.prototype, "name", void 0);
HelloWorld = __decorate([
    customElement('ntx-helloworld')
], HelloWorld);
export { HelloWorld };
