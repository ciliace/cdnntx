import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

class NWSla extends LitElement {

  static getMetaConfig() {
    return {
      controlName: 'SLA Tracker',
      fallbackDisableSubmit: false,
      description: 'SLA Tracker with visual urgency states and modes: Countdown, Split, Pill, Card',
      iconUrl: 'https://ciliace.github.io/cdnntx/images/icons/icon-nwslacountdown.svg',
      groupName: 'Visual',
      version: '1.0',
      properties: {
        deadline: {
          type: 'string',
          title: 'Deadline',
          description: 'SLA deadline in ISO 8601 format (e.g. 2026-06-14T15:00:00)',
          required: true,
          defaultValue: ''
        },
        warningThreshold: {
          type: 'number',
          title: 'Warning Threshold',
          description: 'Hours before deadline to enter warning state',
          defaultValue: 24,
          minimum: 1,
          maximum: 720
        },
        displayMode: {
          type: 'string',
          title: 'Display Mode',
          description: 'Visual layout: Countdown | Split | Pill | Card',
          enum: ['Countdown', 'Split', 'Pill', 'Card'],
          defaultValue: 'Countdown'
        },
        label: {
          type: 'string',
          title: 'Label',
          description: 'Optional title shown in the header. Leave empty to hide the header entirely.',
          defaultValue: '',
          maxLength: 80
        },
        timeFormat: {
          type: 'string',
          title: 'Time Format',
          description: 'TimeTokens: DD=days  HH=hours  MM=minutes  SS=seconds. Example: DD HH:MM:SS',
          defaultValue: 'DD HH:MM:SS',
          maxLength: 30
        },
        showDeadline: {
          type: 'boolean',
          title: 'Show Deadline',
          description: 'Display the due date and UTC line below the countdown',
          defaultValue: true
        },
        minWidth: {
          type: 'string',
          title: 'Min Width',
          description: 'Minimum width in px or % (e.g. "300px", "50%"). Stretches to 100% of parent by default.',
          defaultValue: '',
          maxLength: 20
        },
        locale: {
          type: 'string',
          title: 'Locale',
          description: 'Locale for date/time display (e.g. "en-US", "fr-FR", "ja-JP"). Defaults to browser locale.',
          defaultValue: '',
          maxLength: 20
        },
        timeZone: {
          type: 'string',
          title: 'Time Zone',
          description: 'Time zone for local time display (e.g. "Europe/London", "UTC"). Defaults to browser time zone.',
          defaultValue: '',
          maxLength: 50
        },
        borderMode: {
          type: 'string',
          title: 'Border',
          description: 'Border style: Standard (full border), Left (left accent only), Right (right accent only), None',
          enum: ['Standard', 'Left', 'Right', 'None'],
          defaultValue: 'Standard'
        },
        background: {
          type: 'string',
          title: 'Background Color',
          description: 'CSS color override for background (e.g. "#fff", "transparent"). Leave empty to use status default.',
          defaultValue: '',
          maxLength: 40
        },
        digitAlign: {
          type: 'string',
          title: 'Digit Alignment',
          description: 'Horizontal alignment of digit blocks: Left | Center | Right',
          enum: ['Left', 'Center', 'Right'],
          defaultValue: 'Left'
        },
        hideFieldLabel: {
          type: 'boolean',
          title: 'Hide Field Label',
          description: 'When enabled, attempts to hide the Nintex-rendered field label above this control.',
          defaultValue: false
        },
        slaValue: {
          type: 'object',
          title: 'SLA Status',
          description: 'Emitted output: status, remaining hours, completion %, isOverdue flag',
          isValueField: true,
          properties: {
            status:           { type: 'string',  title: 'Status' },
            remainingHours:   { type: 'number',  title: 'Remaining Hours' },
            percentRemaining: { type: 'number',  title: 'Percent Time Remaining' },
            isOverdue:        { type: 'boolean', title: 'Is Overdue' }
          }
        }
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
        readOnly: false,
        required: false,
        visibility: true
      }
    };
  }

  static get properties() {
    return {
      deadline:          { type: String },
      warningThreshold: { type: Number },
      displayMode:      { type: String },
      label:            { type: String },
      minWidth:         { type: String },
      locale:           { type: String },
      timeZone:         { type: String },
      timeFormat:       { type: String },
      showDeadline:     { type: Boolean },
      borderMode:       { type: String },
      background:       { type: String },
      digitAlign:       { type: String },
      hideFieldLabel:   { type: Boolean },
      slaValue:         { type: Object },
      _remaining:       { state: true },  // ms remaining (negative = overdue)
      _totalMs:         { state: true }   // ms remaining at first tick, for % calc
    };
  }

  constructor() {
    super();
    this.deadline          = '';
    this.warningThreshold = 24;
    this.displayMode      = 'Countdown';
    this.label            = '';
    this.timeFormat       = 'DD HH:MM:SS';
    this.showDeadline      = true;
    this.minWidth         = '';
    this.locale           = '';
    this.timeZone         = '';
    this.borderMode       = 'Standard';
    this.background       = '';
    this.digitAlign       = 'Left';
    this.hideFieldLabel   = false;
    this.slaValue         = null;
    this._remaining       = null;
    this._totalMs         = null;
    this._timer           = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._tick();
    this._timer = setInterval(() => this._tick(), 1000);
    requestAnimationFrame(() => this._syncFieldLabel());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._timer);
  }

  updated(changed) {
    if (changed.has('deadline')) {
      this._totalMs = null;
      this._tick();
    }
    if (changed.has('hideFieldLabel')) {
      this._syncFieldLabel();
    }
  }

  _tick() {
    if (!this.deadline) { this._remaining = null; return; }
    const due = new Date(this.deadline).getTime();
    if (isNaN(due)) { this._remaining = null; return; }
    const now = Date.now();
    if (this._totalMs === null) this._totalMs = due - now;
    this._remaining = due - now;
    this._emitStatus();
    this.requestUpdate();
  }

  /* Normalise a boolean property that Nintex may deliver as the string "false" */
  _bool(v, defaultVal = true) {
    if (v === undefined || v === null) return defaultVal;
    if (typeof v === 'boolean') return v;
    return v !== 'false' && v !== '0' && v !== '';
  }

  get _status() {
    if (this._remaining === null) return 'unknown';
    if (this._remaining <= 0) return 'overdue';
    const hoursLeft = this._remaining / 3600000;
    return hoursLeft <= (this.warningThreshold || 24) ? 'warning' : 'ok';
  }

  get _pct() {
    if (this._remaining === null || this._remaining <= 0) return 0;
    if (!this._totalMs || this._totalMs <= 0) return 0;
    return Math.max(0, Math.min(100, Math.round((this._remaining / this._totalMs) * 100)));
  }

  _format(ms) {
    if (ms === null) return null;
    const abs = Math.abs(Math.floor(ms / 1000));
    return {
      overdue: ms <= 0,
      d: Math.floor(abs / 86400),
      h: Math.floor((abs % 86400) / 3600),
      m: Math.floor((abs % 3600) / 60),
      s: abs % 60
    };
  }

  _pad(n) { return String(Math.abs(n)).padStart(2, '0'); }

  _formatDueDate() {
    if (!this.deadline) return '';
    const due = new Date(this.deadline);
    if (isNaN(due)) return this.deadline;
    const locale   = this.locale   || undefined;
    const timeZone = this.timeZone || undefined;
    try {
      return new Intl.DateTimeFormat(locale, {
        weekday: 'long', year: 'numeric', month: 'long',
        day: 'numeric', hour: '2-digit', minute: '2-digit',
        ...(timeZone ? { timeZone, timeZoneName: 'short' } : {})
      }).format(due);
    } catch (_) {
      return due.toLocaleString(locale);
    }
  }

  _formatDueDateUTC() {
    if (!this.deadline) return '';
    const due = new Date(this.deadline);
    if (isNaN(due)) return '';
    const locale = this.locale || undefined;
    try {
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
        timeZone: 'UTC', timeZoneName: 'short'
      }).format(due);
    } catch (_) {
      return due.toUTCString();
    }
  }

  _outerStyle() {
    const parts = [];
    if (this.minWidth)   parts.push(`min-width:${this.minWidth}`);
    if (this.background) parts.push(`--c-bg:${this.background}`);
    const alignMap = { left: 'flex-start', center: 'center', right: 'flex-end' };
    parts.push(`--dig-align:${alignMap[(this.digitAlign || 'left').toLowerCase()] || 'flex-start'}`);
    return parts.join(';');
  }

  _borderStyle() {
    const bm = (this.borderMode || 'standard').toLowerCase();
    if (bm === 'none')  return 'border:none';
    if (bm === 'left')  return 'border:none;border-left:3px solid var(--c-bd);border-radius:0 12px 12px 0';
    if (bm === 'right') return 'border:none;border-right:3px solid var(--c-bd);border-radius:12px 0 0 12px';
    return '';
  }

  _syncFieldLabel() {
    const hide = this._bool(this.hideFieldLabel, false);
    let el = this.parentElement;
    for (let i = 0; i < 4 && el; i++) {
      const labels = el.querySelectorAll(':scope > label, :scope > [class*="label" i], :scope > [class*="Label"]');
      if (labels.length) {
        labels.forEach(l => { l.style.display = hide ? 'none' : ''; });
        return;
      }
      el = el.parentElement;
    }
  }

  _emitStatus() {
    this.dispatchEvent(new CustomEvent('ntx-value-change', {
      bubbles: true, cancelable: false, composed: true,
      detail: {
        status:           this._status,
        remainingHours:   this._remaining === null ? 0 : Math.max(0, this._remaining / 3600000),
        percentRemaining: this._pct,
        isOverdue:        this._remaining !== null && this._remaining <= 0
      }
    }));
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
        font-family: var(--ntx-form-theme-font-family, system-ui, -apple-system, sans-serif);
        box-sizing: border-box;
      }
      *, *::before, *::after { box-sizing: inherit; }

      /* ── Status tokens ── */
      .ok {
        --c-bg:  color-mix(in srgb, var(--ntx-form-theme-color-primary, #3b82f6) 8%, white);
        --c-bd:  color-mix(in srgb, var(--ntx-form-theme-color-primary, #3b82f6) 35%, white);
        --c-txt: var(--ntx-form-theme-color-primary, #1d4ed8);
        --c-val: var(--ntx-form-theme-color-primary, #1e40af);
        --c-sub: var(--ntx-form-theme-color-primary, #2563eb);
        --c-bar: var(--ntx-form-theme-color-primary, #3b82f6);
        --c-dot: var(--ntx-form-theme-color-primary, #3b82f6);
        --c-glow: color-mix(in srgb, var(--ntx-form-theme-color-primary, #3b82f6) 30%, transparent);
      }
      .warning { --c-bg:#fffbeb; --c-bd:#fcd34d; --c-txt:#92400e; --c-val:#92400e; --c-sub:#d97706; --c-bar:#f59e0b; --c-dot:#f59e0b; --c-glow:rgba(245,158,11,.35); }
      .overdue { --c-bg:#fef2f2; --c-bd:#fca5a5; --c-txt:#b91c1c; --c-val:#b91c1c; --c-sub:#ef4444; --c-bar:#ef4444; --c-dot:#ef4444; --c-glow:rgba(239,68,68,.4); }
      .unknown {
        --c-bg:  var(--ntx-form-theme-color-background, #f9fafb);
        --c-bd:  var(--ntx-form-theme-color-field-border, #e5e7eb);
        --c-txt: var(--ntx-form-theme-color-label, #9ca3af);
        --c-val: var(--ntx-form-theme-color-label, #6b7280);
        --c-sub: var(--ntx-form-theme-color-label, #9ca3af);
        --c-bar: #d1d5db; --c-dot: #9ca3af; --c-glow: transparent;
      }

      /* ── Animations ── */
      @keyframes pulse-glow {
        0%,100% { box-shadow: 0 0 0 0 var(--c-glow); }
        50%      { box-shadow: 0 0 0 6px var(--c-glow); }
      }
      @keyframes blink {
        0%,100% { opacity: 1; }
        50%      { opacity: .3; }
      }

      /* ════════════════════════════════
         MODE: countdown
      ════════════════════════════════ */
      .cd-root {
        border-radius: 12px;
        padding: 18px 20px 14px;
        border: 1.5px solid var(--c-bd);
        background: var(--c-bg);
        transition: border-color .4s, background .4s;
        width: 100%;
      }
      .warning .cd-root,
      .overdue .cd-root { animation: pulse-glow 2.4s ease infinite; }

      .cd-header {
        display: flex; align-items: center;
        justify-content: space-between; margin-bottom: 14px;
      }
      .cd-label {
        font-size: 11px; font-weight: 700;
        letter-spacing: .08em; text-transform: uppercase;
        color: var(--c-txt);
      }
      .cd-badge {
        font-size: 10px; font-weight: 700; letter-spacing: .06em;
        text-transform: uppercase; padding: 2px 8px; border-radius: 999px;
        color: #fff; background: var(--c-val);
      }
      .cd-digits { display: flex; align-items: flex-end; gap: 4px; margin-bottom: 14px; flex-wrap: wrap; justify-content: var(--dig-align, flex-start); }
      .digit-block { display: flex; flex-direction: column; align-items: center; }
      .digit-val {
        font-size: clamp(26px, 5vw, 38px);
        font-weight: 800; line-height: 1;
        font-variant-numeric: tabular-nums; letter-spacing: -.02em;
        color: var(--c-val); min-width: 46px; text-align: center;
        transition: color .4s;
      }
      .digit-unit {
        font-size: 10px; color: #9ca3af;
        text-transform: uppercase; letter-spacing: .06em; margin-top: 3px;
      }
      .colon {
        font-size: 26px; font-weight: 700; color: #d1d5db;
        line-height: 1.15; padding-bottom: 14px;
      }
      .cd-empty-txt { font-size: 13px; color: var(--c-sub); margin-bottom: 10px; }
      .cd-footer    { display: flex; justify-content: space-between; font-size: 11px; color: var(--c-sub); margin-top: 10px; }
      .due-utc        { display: block; font-size: 10px; color: #9ca3af; margin-top: 2px; }

      /* ════════════════════════════════
         MODE: split
      ════════════════════════════════ */
      .split-root {
        display: flex; align-items: stretch;
        border-radius: 12px; overflow: hidden;
        border: 1.5px solid var(--c-bd); width: 100%;
        transition: border-color .4s;
      }
      .warning .split-root,
      .overdue .split-root { animation: pulse-glow 2.4s ease infinite; }
      .split-accent {
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        padding: 18px 20px; min-width: 76px; flex-shrink: 0;
        background: var(--c-bar); color: #fff;
        transition: background .4s;
      }
      .split-icon { font-size: 26px; line-height: 1; margin-bottom: 5px; }
      .split-status-lbl {
        font-size: 9px; font-weight: 700; letter-spacing: .1em;
        text-transform: uppercase; opacity: .9; text-align: center;
        white-space: nowrap;
      }
      .split-content {
        display: flex; flex-direction: column; justify-content: center;
        padding: 16px 20px; flex: 1; min-width: 0;
        background: var(--c-bg); transition: background .4s;
      }
      .split-digits {
        display: flex; align-items: flex-end; gap: 3px; flex-wrap: wrap;
        justify-content: var(--dig-align, flex-start); margin-bottom: 6px;
      }
      .split-dblock { display: flex; flex-direction: column; align-items: center; }
      .split-dval {
        font-size: clamp(18px, 3vw, 26px); font-weight: 800; line-height: 1;
        font-variant-numeric: tabular-nums; letter-spacing: -.02em;
        color: var(--c-val); min-width: 34px; text-align: center; transition: color .4s;
      }
      .split-dunit { font-size: 9px; color: #9ca3af; text-transform: uppercase; letter-spacing: .05em; margin-top: 3px; }
      .split-colon { font-size: 20px; font-weight: 700; color: #d1d5db; line-height: 1.15; padding-bottom: 11px; }
      .split-empty { font-size: 13px; color: var(--c-sub); }
      .split-due   { font-size: 12px; color: var(--c-sub); line-height: 1.5; }
      .split-due strong { display: block; font-size: 13px; font-weight: 600; color: var(--c-val); }

      /* ════════════════════════════════
         MODE: pill (countdown digits)
      ════════════════════════════════ */
      .pill-root { display: block; width: 100%; }
      .pill {
        display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
        border-radius: 12px; padding: 12px 18px;
        border: 1.5px solid var(--c-bd); background: var(--c-bg);
        transition: border-color .4s, background .4s;
      }
      .warning .pill,
      .overdue .pill { animation: pulse-glow 2.4s ease infinite; }
      .pill-lbl {
        font-size: 11px; font-weight: 700; letter-spacing: .07em;
        text-transform: uppercase; color: var(--c-txt); flex-shrink: 0;
      }
      .pill-sep { width: 1px; height: 22px; background: var(--c-bd); flex-shrink: 0; }
      .pill-cd { display: flex; align-items: flex-end; gap: 2px; flex: 1; justify-content: var(--dig-align, flex-start); }
      .pill-dblock { display: flex; flex-direction: column; align-items: center; }
      .pill-dval {
        font-size: 22px; font-weight: 800; line-height: 1;
        color: var(--c-val); font-variant-numeric: tabular-nums;
        min-width: 30px; text-align: center; transition: color .4s;
      }
      .pill-dunit { font-size: 8px; color: #9ca3af; text-transform: uppercase; letter-spacing: .04em; margin-top: 2px; }
      .pill-colon { font-size: 16px; font-weight: 700; color: #d1d5db; padding-bottom: 12px; }
      .pill-msg { font-size: 14px; font-weight: 700; color: var(--c-val); flex: 1; }
      .pill-due { font-size: 11px; color: var(--c-sub); width: 100%; margin-top: 2px; }

      /* ════════════════════════════════
         MODE: card
      ════════════════════════════════ */
      .card-root {
        border-radius: 14px; overflow: hidden;
        border: 1.5px solid var(--c-bd); background: var(--c-bg); width: 100%;
        transition: border-color .4s, background .4s;
      }
      .warning .card-root,
      .overdue .card-root { animation: pulse-glow 2.4s ease infinite; }
      .card-hd {
        padding: 12px 20px; border-bottom: 1px solid var(--c-bd);
        display: flex; align-items: center; justify-content: space-between;
      }
      .card-hd-label {
        font-size: 11px; font-weight: 700;
        letter-spacing: .08em; text-transform: uppercase; color: var(--c-txt);
      }
      .card-badge {
        font-size: 10px; font-weight: 700; letter-spacing: .06em;
        text-transform: uppercase; padding: 2px 10px; border-radius: 999px;
        color: #fff; background: var(--c-val);
      }
      .card-body { padding: 16px 20px 18px; }
      .card-due  { font-size: 12px; color: #6b7280; margin-bottom: 14px; line-height: 1.5; }
      .card-due strong { display: block; font-size: 13px; font-weight: 600; color: var(--c-val); margin-top: 2px; }
      .card-digits { display: flex; align-items: flex-end; gap: 4px; margin-bottom: 12px; flex-wrap: wrap; justify-content: var(--dig-align, flex-start); }
      .card-empty  { font-size: 13px; color: var(--c-sub); }
      .card-hint      { font-size: 11px; color: var(--c-sub); margin-top: 4px; }
    `;
  }

  /* ── Shared: format-driven digit blocks ──────────────────────── */
  _renderTimeBlocks(f, cls) {
    if (!f) return '';
    const c = { block: 'digit-block', val: 'digit-val', unit: 'digit-unit', sep: 'colon', ...cls };
    const fmt    = (this.timeFormat || 'DD HH:MM:SS').toUpperCase();
    const parts  = fmt.split(/(DD|HH|MM|SS)/);
    const values = { DD: f.d, HH: f.h, MM: f.m, SS: f.s };
    const labels = { DD: 'days', HH: 'hrs', MM: 'min', SS: 'sec' };
    const pad    = { DD: n => this._pad(n), HH: n => this._pad(n), MM: n => this._pad(n), SS: n => this._pad(n) };
    return parts.map(p => {
      if (p === 'DD' || p === 'HH' || p === 'MM' || p === 'SS') {
        return html`<div class="${c.block}"><span class="${c.val}">${pad[p](values[p])}</span><span class="${c.unit}">${labels[p]}</span></div>`;
      }
      return p ? html`<span class="${c.sep}">${p}</span>` : '';
    });
  }

  /* ── MODE: countdown ──────────────────────────────────────────── */
  _renderCountdown() {
    const s   = this._status;
    const f   = this._format(this._remaining);
    const showDl = this._bool(this.showDeadline);
    const due = showDl ? this._formatDueDate() : '';
    const utc = showDl ? this._formatDueDateUTC() : '';
    const lbl = this.label;

    return html`
      <div class="${s}" style="${this._outerStyle()}">
        <div class="cd-root" style="${this._borderStyle()}">
          ${lbl || s === 'warning' || s === 'overdue' ? html`
            <div class="cd-header">
              ${lbl ? html`<span class="cd-label">${f && f.overdue ? '⚠ ' + lbl : lbl}</span>` : ''}
              ${s === 'warning' ? html`<span class="cd-badge">WARNING</span>` : ''}
              ${s === 'overdue' ? html`<span class="cd-badge">OVERDUE</span>` : ''}
            </div>` : ''}
          ${f === null
            ? html`<div class="cd-empty-txt">No due date set</div>`
            : html`<div class="cd-digits">${this._renderTimeBlocks(f)}</div>`
          }
          ${f !== null && due ? html`
            <div class="cd-footer">
              <span>${due}${utc ? html`<span class="due-utc">${utc}</span>` : ''}</span>
            </div>` : ''}
        </div>
      </div>`;
  }

  /* ── MODE: split ─────────────────────────────────────────────── */
  _renderSplit() {
    const s   = this._status;
    const f   = this._format(this._remaining);
    const showDl = this._bool(this.showDeadline);
    const due = showDl ? this._formatDueDate() : '';
    const utc = showDl ? this._formatDueDateUTC() : '';
    const splitCls = { block: 'split-dblock', val: 'split-dval', unit: 'split-dunit', sep: 'split-colon' };

    const icon = s === 'ok' ? '✓' : s === 'warning' ? '⚠' : s === 'overdue' ? '✕' : '–';
    const accentLbl = s === 'ok' ? 'ON TRACK' : s === 'warning' ? 'WARNING' : s === 'overdue' ? 'OVERDUE' : this.label || 'SLA';

    return html`
      <div class="${s}" style="${this._outerStyle()}">
        <div class="split-root" style="${this._borderStyle()}">
          <div class="split-accent">
            <span class="split-icon">${icon}</span>
            <span class="split-status-lbl">${accentLbl}</span>
          </div>
          <div class="split-content">
            ${f === null
              ? html`<div class="split-empty">No due date set</div>`
              : html`<div class="split-digits">${this._renderTimeBlocks(f, splitCls)}</div>`
            }
            ${due ? html`
              <div class="split-due">
                Due: <strong>${due}</strong>
                ${utc ? html`<span class="due-utc">${utc}</span>` : ''}
              </div>` : ''}
          </div>
        </div>
      </div>`;
  }

  /* ── MODE: pill ───────────────────────────────────────────────── */
  _renderPill() {
    const s   = this._status;
    const f   = this._format(this._remaining);
    const lbl = this.label;
    const showDl = this._bool(this.showDeadline);
    const due = showDl ? this._formatDueDate() : '';
    const utc = showDl ? this._formatDueDateUTC() : '';
    const pillCls = { block: 'pill-dblock', val: 'pill-dval', unit: 'pill-dunit', sep: 'pill-colon' };

    return html`
      <div class="${s}" style="${this._outerStyle()}">
        <div class="pill-root">
          <div class="pill" style="${this._borderStyle()}">
            ${lbl ? html`<span class="pill-lbl">${lbl}</span><span class="pill-sep"></span>` : ''}
            ${f === null
              ? html`<span class="pill-msg">No due date</span>`
              : html`<div class="pill-cd">${this._renderTimeBlocks(f, pillCls)}</div>`
            }
            ${due ? html`<span class="pill-due">${due}${utc ? html` · <span style="color:#9ca3af">${utc}</span>` : ''}</span>` : ''}
          </div>
        </div>
      </div>`;
  }

  /* ── MODE: card ───────────────────────────────────────────────── */
  _renderCard() {
    const s    = this._status;
    const f    = this._format(this._remaining);
    const showDl = this._bool(this.showDeadline);
    const due  = showDl ? this._formatDueDate() : '';
    const utc  = showDl ? this._formatDueDateUTC() : '';
    const warnH = this.warningThreshold || 24;
    const lbl   = this.label;

    return html`
      <div class="${s}" style="${this._outerStyle()}">
        <div class="card-root" style="${this._borderStyle()}">
          ${lbl || s === 'warning' || s === 'overdue' ? html`
            <div class="card-hd">
              ${lbl ? html`<span class="card-hd-label">${f && f.overdue ? '⚠ ' + lbl : lbl}</span>` : ''}
              ${s === 'warning' ? html`<span class="card-badge">WARNING</span>` : ''}
              ${s === 'overdue' ? html`<span class="card-badge">OVERDUE</span>` : ''}
            </div>` : ''}
          <div class="card-body">
            ${due ? html`
              <div class="card-due">
                Due date
                <strong>${due}</strong>
                ${utc ? html`<span class="due-utc">${utc}</span>` : ''}
              </div>` : ''}
            ${f === null
              ? html`<div class="card-empty">No due date set</div>`
              : html`<div class="card-digits">${this._renderTimeBlocks(f)}</div>`
            }
            ${f && !f.overdue && s === 'warning'
              ? html`<div class="card-hint">Within ${warnH}h warning threshold</div>` : ''}
            ${f && !f.overdue && s === 'ok'
              ? html`<div class="card-hint">Warning at &lt;${warnH}h before deadline</div>` : ''}
          </div>
        </div>
      </div>`;
  }

  /* ── Main render ──────────────────────────────────────────────── */
  render() {
    const mode = (this.displayMode || 'countdown').toLowerCase();
    if (mode === 'split') return this._renderSplit();
    if (mode === 'pill') return this._renderPill();
    if (mode === 'card') return this._renderCard();
    return this._renderCountdown();
  }
}

customElements.define('plugin-nwsla', NWSla);
