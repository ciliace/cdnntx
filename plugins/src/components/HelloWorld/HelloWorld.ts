import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {NintexPlugin} from '../../lib/nintex-plugin';

@customElement('ntx-helloworld')
export class HelloWorld extends LitElement {
  static styles = css`p { color: blue }`;

  @property()
  who = 'Somebody';

  static getMetaConfig(): Promise<NintexPlugin> | NintexPlugin {
    // plugin contract information
    return {
      controlName: 'Hello World',
      fallbackDisableSubmit: false,
      description: 'Hello World component',
      iconUrl: 'one-line-text',
      groupName: 'Controls ByC',
      version: '1.0',
      properties: {
        who: {
          type: 'string',
          title: 'Who',
          description:
            'Who for greetings',
          defaultValue: 'world',
        }
      }
    };
  }

  render() {
    return html`<p>Hello, ${this.who}!</p>`;
  }
}