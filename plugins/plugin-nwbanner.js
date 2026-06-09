import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

class NWBanner extends LitElement {

  static getMetaConfig() {
    return {
      controlName: 'Banner',
      fallbackDisableSubmit: false,
      description: 'Generic banner with plain or rich text message, configurable border, and optional icon',
      iconUrl: 'https://ciliace.github.io/cdnntx/images/icons/icon-nwbanner.svg',
      groupName: 'Visual',
      version: '1.0',
      properties: {
        title: {
          type: 'string',
          title: 'Title',
          description: 'Banner heading text',
          defaultValue: 'Banner Title'
        },
        iconUrl: {
          type: 'string',
          title: 'Icon URL',
          description: 'URL of an image to display next to the title. Leave empty for no icon.'
        },
        message: {
          type: 'string',
          title: 'Message',
          description: 'Banner body content'
        },
        messageType: {
          type: 'string',
          title: 'Message type',
          enum: ['plain', 'rich text'],
          defaultValue: 'plain'
        },
        borderStyle: {
          type: 'string',
          title: 'Border style',
          enum: ['none', 'border', 'border-left', 'border-right'],
          defaultValue: 'border-left'
        },
        bgColor: {
          type: 'string',
          title: 'Background color'
        },
        borderColor: {
          type: 'string',
          title: 'Border color'
        },
        textColor: {
          type: 'string',
          title: 'Text color'
        }
      },
      standardProperties: {
        description: true,
        readOnly: true,
        visibility: true
      }
    };
  }

  static get properties() {
    return {
      title:       { type: String },
      iconUrl:     { type: String },
      message:     { type: String },
      messageType: { type: String },
      borderStyle: { type: String },
      bgColor:     { type: String },
      borderColor: { type: String },
      textColor:   { type: String }
    };
  }

  constructor() {
    super();
    this.title       = 'Banner Title';
    this.iconUrl     = '';
    this.message     = '';
    this.messageType = 'plain';
    this.borderStyle = 'border-left';
    this.bgColor     = '';
    this.borderColor = '';
    this.textColor   = '';
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: var(--ntx-form-theme-font-family, system-ui, sans-serif);
      }

      .banner {
        padding: 14px 18px;
        background: var(--b-bg, color-mix(in srgb, var(--ntx-form-theme-color-primary, #0057ff) 8%, #fff));
        box-sizing: border-box;
      }

      .banner.style-none {
        border: none;
        border-radius: 6px;
      }

      .banner.style-border {
        border: 1.5px solid var(--b-border, color-mix(in srgb, var(--ntx-form-theme-color-primary, #0057ff) 40%, transparent));
        border-radius: 6px;
      }

      .banner.style-border-left {
        border: none;
        border-left: 4px solid var(--b-border, var(--ntx-form-theme-color-primary, #0057ff));
        border-radius: 0 6px 6px 0;
      }

      .banner.style-border-right {
        border: none;
        border-right: 4px solid var(--b-border, var(--ntx-form-theme-color-primary, #0057ff));
        border-radius: 6px 0 0 6px;
      }

      .banner-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 6px;
      }

      .banner-icon {
        width: 20px;
        height: 20px;
        object-fit: contain;
        flex-shrink: 0;
      }

      .banner-title {
        font-size: 14px;
        font-weight: 700;
        line-height: 1.3;
        color: var(--b-title, var(--ntx-form-theme-color-primary, #0057ff));
        margin: 0;
      }

      .banner-message {
        font-size: 13px;
        line-height: 1.55;
        color: var(--b-text, #374151);
        margin: 0;
      }

      .banner-message.plain {
        white-space: pre-wrap;
      }
    `;
  }

  _styleClass() {
    const s = (this.borderStyle || 'border-left').toLowerCase();
    return `banner style-${s}`;
  }

  _cssVars() {
    const vars = [];
    if (this.bgColor)     vars.push(`--b-bg: ${this.bgColor}`);
    if (this.borderColor) vars.push(`--b-border: ${this.borderColor}`);
    if (this.textColor) {
      vars.push(`--b-title: ${this.textColor}`);
      vars.push(`--b-text: ${this.textColor}`);
    }
    return vars.join('; ');
  }

  _renderMessage() {
    const type = (this.messageType || 'plain').toLowerCase();
    if (type === 'rich text') {
      return html`<div class="banner-message" .innerHTML="${this.message || ''}"></div>`;
    }
    return html`<div class="banner-message plain">${this.message || ''}</div>`;
  }

  render() {
    const hasTitle = this.title && this.title.trim();
    const hasIcon  = this.iconUrl && this.iconUrl.trim();

    return html`
      <div class="${this._styleClass()}" style="${this._cssVars()}">
        ${hasTitle ? html`
          <div class="banner-header">
            ${hasIcon ? html`<img class="banner-icon" src="${this.iconUrl}" alt="" aria-hidden="true">` : ''}
            <span class="banner-title">${this.title}</span>
          </div>
        ` : ''}
        ${this._renderMessage()}
      </div>
    `;
  }
}

customElements.define('plugin-nwbanner', NWBanner);
