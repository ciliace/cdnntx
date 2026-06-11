import { LitElement, html, css, unsafeHTML } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

/**
 * NW Selector - Nintex Plugin
 * Generic visual option selector in grid | list | chips layouts.
 * Each option in optionsJSON may carry an `icon` SVG string;
 * when omitted the control renders a gradient orb sphere in the option colour.
 *
 * Option example:
 *   { "value": "low", "label": "Low", "description": "...", "color": "#22c55e", "icon": "<svg>…</svg>" }
 */
class NWSelector extends LitElement {

  static getMetaConfig() {
    return {
      controlName: 'Selector',
      fallbackDisableSubmit: false,
      description: 'Visual option selector with icon cards: grid, list, or chips layout',
      groupName: 'Visual',
      iconUrl: 'https://ciliace.github.io/cdnntx/images/icons/icon-nwselector.svg',
      version: '1.0',
      properties: {
        optionsJSON: {
          type: 'string',
          title: 'Options JSON',
          description: 'JSON array of options. Each item: {"value":"Low","label":"Low","description":"...","color":"#22c55e","icon":"<svg>...</svg>"}. Omit "icon" to use the default gradient orb.',
          defaultValue: '[{"value":"Low","label":"Low","color":"#22c55e"},{"value":"Medium","label":"Medium","color":"#eab308"},{"value":"High","label":"High","color":"#f97316"},{"value":"Critical","label":"Critical","description":"Immediate action","color":"#dc2626"}]',
          maxLength: 10000
        },
        layout: {
          type: 'string',
          title: 'Layout',
          enum: ['grid', 'list', 'chips'],
          description: 'grid: responsive equal cards | list: full-width rows | chips: pill buttons',
          defaultValue: 'grid'
        },
        cardMinWidth: {
          type: 'string',
          title: 'Minimum card width',
          description: 'Minimum card width for the grid layout, e.g. "140px" or "20%"',
          defaultValue: '140px'
        },
        value: {
          type: 'string',
          title: 'Value',
          isValueField: true
        }
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
        readOnly: true,
        required: true,
        defaultValue: true,
        visibility: true
      },
      events: ['ntx-value-change']
    };
  }

  static get properties() {
    return {
      value:        { type: String },
      defaultValue: { type: String },
      readOnly:     { type: Boolean },
      optionsJSON:  { type: String },
      layout:       { type: String },
      cardMinWidth: { type: String },
      _selected:    { state: true }
    };
  }

  constructor() {
    super();
    this.value        = '';
    this.defaultValue = '';
    this.optionsJSON  = '';
    this.layout       = 'grid';
    this.cardMinWidth = '140px';
    this._selected    = null;
  }

  updated(changed) {
    if (changed.has('value')) this._selected = null;
  }

  _norm(v) { return String(v ?? '').trim().toLowerCase(); }

  _getSelected() {
    if (this._selected !== null) return this._norm(this._selected);
    if (this.value)              return this._norm(this.value);
    if (this.defaultValue)       return this._norm(this.defaultValue);
    return '';
  }

  static get styles() {
    return css`
      :host { display: block; font-family: var(--ntx-form-theme-font-family, system-ui, sans-serif); }

      /* ── Grid ─────────────────────────────────────────────── */
      .layout-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        width: 100%;
      }
      .layout-grid .card {
        flex: 1 1 var(--min-w, 140px);
      }

      /* ── Card (grid) ───────────────────────────────────────── */
      .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        border: 2px solid #e5e7eb;
        border-radius: 12px;
        padding: 20px 12px 16px;
        background: #fff;
        cursor: pointer;
        text-align: center;
        font-family: inherit;
        -webkit-tap-highlight-color: transparent;
        transition: border-color .15s, box-shadow .15s, transform .1s, background .15s;
        appearance: none;
        -webkit-appearance: none;
      }
      .card:focus         { outline: none; }
      .card:focus-visible { outline: 2px solid var(--c, #6b7280); outline-offset: 2px; }
      .card:not([disabled]):hover {
        border-color: var(--c, #6b7280);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px color-mix(in srgb, var(--c, #6b7280) 18%, transparent);
      }
      .card.sel {
        border-color: var(--c, #6b7280);
        background: color-mix(in srgb, var(--c, #6b7280) 10%, #fff);
        box-shadow: 0 4px 14px color-mix(in srgb, var(--c, #6b7280) 18%, transparent);
      }
      .card.sel .lbl { color: var(--c, #374151); }
      .card.sel:not([disabled]):hover { transform: translateY(-2px); }
      .card[disabled] { cursor: default; opacity: 0.65; }

      /* ── Icon area ─────────────────────────────────────────── */
      .icon-wrap {
        width: 52px;
        height: 52px;
        margin-bottom: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        pointer-events: none;
      }
      .icon-wrap svg { width: 100%; height: 100%; display: block; }

      /* Default gradient orb — rendered when no icon svg is provided */
      .orb {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: radial-gradient(
          circle at 37% 28%,
          rgba(255,255,255,0.92) 0%,
          var(--c, #6b7280) 48%,
          color-mix(in srgb, var(--c, #6b7280) 72%, #000) 100%
        );
        flex-shrink: 0;
      }

      .lbl  { font-weight: 700; font-size: 14px; color: #374151; line-height: 1.3; pointer-events: none; transition: color .15s; }
      .desc { font-size: 12px; color: #9ca3af; line-height: 1.4; margin-top: 5px; pointer-events: none; }

      /* ── List ──────────────────────────────────────────────── */
      .layout-list { display: flex; flex-direction: column; gap: 8px; width: 100%; }
      .row {
        display: flex;
        align-items: center;
        gap: 14px;
        width: 100%;
        box-sizing: border-box;
        border: 1.5px solid #e5e7eb;
        border-radius: 10px;
        padding: 12px 18px;
        background: #fff;
        cursor: pointer;
        font-family: inherit;
        text-align: left;
        appearance: none;
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
        transition: border-color .15s, background .15s;
      }
      .row:focus         { outline: none; }
      .row:focus-visible { outline: 2px solid var(--c, #6b7280); outline-offset: 2px; }
      .row:not([disabled]):hover { border-color: var(--c, #6b7280); background: color-mix(in srgb, var(--c, #6b7280) 4%, #fff); }
      .row.sel { border-color: var(--c, #6b7280); border-width: 2px; background: color-mix(in srgb, var(--c, #6b7280) 8%, #fff); }
      .row.sel .lbl { color: var(--c, #374151); }
      .row[disabled] { cursor: default; opacity: 0.65; }
      .row .icon-wrap { width: 36px; height: 36px; margin-bottom: 0; }
      .row .orb { width: 32px; height: 32px; }
      .row .lbl { flex: 1; font-size: 14px; }
      .row .desc { font-size: 12px; }

      /* ── Chips ─────────────────────────────────────────────── */
      .layout-chips { display: flex; flex-wrap: wrap; gap: 8px; }
      .chip {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border: 2px solid #e5e7eb;
        border-radius: 999px;
        padding: 7px 16px;
        font-size: 13px;
        font-weight: 600;
        color: #555;
        background: #fff;
        cursor: pointer;
        font-family: inherit;
        appearance: none;
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
        transition: border-color .15s, background .15s, color .15s;
      }
      .chip:focus         { outline: none; }
      .chip:focus-visible { outline: 2px solid var(--c, #6b7280); outline-offset: 2px; }
      .chip:not([disabled]):hover { border-color: var(--c, #6b7280); color: var(--c, #6b7280); }
      .chip.sel { border-color: var(--c, #6b7280); background: color-mix(in srgb, var(--c, #6b7280) 10%, #fff); color: var(--c, #6b7280); }
      .chip[disabled] { cursor: default; opacity: 0.65; }
      .chip-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--c, #6b7280); flex-shrink: 0; }
    `;
  }

  _defaultOptions() {
    return [
      { value: 'low',      label: 'Low',      color: '#22c55e' },
      { value: 'medium',   label: 'Medium',   color: '#eab308' },
      { value: 'high',     label: 'High',     color: '#f97316' },
      { value: 'critical', label: 'Critical', description: 'Immediate action', color: '#dc2626' }
    ];
  }

  _getOptions() {
    if (!this.optionsJSON) return this._defaultOptions();
    try {
      const parsed = JSON.parse(this.optionsJSON);
      return Array.isArray(parsed) ? parsed : this._defaultOptions();
    } catch {
      return this._defaultOptions();
    }
  }

  _onChange(val) {
    if (this.readOnly) return;
    if (val === undefined || val === null) return;
    this._selected = val;
    this.dispatchEvent(new CustomEvent('ntx-value-change', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: val
    }));
  }

  /* Renders the icon area: custom SVG from opt.icon, or default gradient orb */
  _renderIcon(opt) {
    if (opt.icon) {
      return html`<div class="icon-wrap">${unsafeHTML(opt.icon)}</div>`;
    }
    return html`<div class="icon-wrap"><div class="orb"></div></div>`;
  }

  render() {
    const options  = this._getOptions();
    const layout   = this.layout || 'grid';
    const disabled = this.readOnly === true || this.readOnly === 'true';
    const minW     = this.cardMinWidth || '140px';
    const sel      = this._getSelected();
    const isSel    = (v) => sel === this._norm(v);

    if (layout === 'grid') {
      return html`
        <div class="layout-grid" style="--min-w:${minW}" role="radiogroup">
          ${options.map(opt => html`
            <button
              class="card ${isSel(opt.value) ? 'sel' : ''}"
              style="--c:${opt.color || '#6b7280'}"
              type="button"
              role="radio"
              aria-checked="${isSel(opt.value)}"
              ?disabled="${disabled}"
              @click="${() => this._onChange(opt.value)}">
              ${this._renderIcon(opt)}
              <div class="lbl">${opt.label}</div>
              ${opt.description ? html`<div class="desc">${opt.description}</div>` : ''}
            </button>
          `)}
        </div>`;
    }

    if (layout === 'list') {
      return html`
        <div class="layout-list" role="radiogroup">
          ${options.map(opt => html`
            <button
              class="row ${isSel(opt.value) ? 'sel' : ''}"
              style="--c:${opt.color || '#6b7280'}"
              type="button"
              role="radio"
              aria-checked="${isSel(opt.value)}"
              ?disabled="${disabled}"
              @click="${() => this._onChange(opt.value)}">
              ${this._renderIcon(opt)}
              <div class="lbl">${opt.label}</div>
              ${opt.description ? html`<div class="desc">${opt.description}</div>` : ''}
            </button>
          `)}
        </div>`;
    }

    return html`
      <div class="layout-chips" role="radiogroup">
        ${options.map(opt => html`
          <button
            class="chip ${isSel(opt.value) ? 'sel' : ''}"
            style="--c:${opt.color || '#6b7280'}"
            type="button"
            role="radio"
            aria-checked="${isSel(opt.value)}"
            ?disabled="${disabled}"
            @click="${() => this._onChange(opt.value)}">
            <span class="chip-dot"></span>
            ${opt.label}
          </button>
        `)}
      </div>`;
  }
}

customElements.define('plugin-nwselector', NWSelector);
