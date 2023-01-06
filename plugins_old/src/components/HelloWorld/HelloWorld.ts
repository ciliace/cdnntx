import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {NintexPlugin} from '../../lib/nintex-plugin';

@customElement('ntx-helloworld')
export class HelloWorld extends LitElement {
  static styles = css`p { color: blue }`;

  @property()
  name = 'Somebody';

  static getMetaConfig(): Promise<NintexPlugin> | NintexPlugin {
    // plugin contract information
    return {
      controlName: 'Hello World',
      fallbackDisableSubmit: false,
      description: 'Hello World component',
      iconUrl: 'one-line-text',
      groupName: 'ByC - Simple',
      version: '1.0',
      properties: {
        name: {
          type: 'string',
          title: 'Name',
          description:
            'Name for greetings',
          defaultValue: 'somebody',
        }
      },
      standardProperties: {
        readOnly: true,
        required: true,
        description: true,
      },
    };
  }

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}