import { e as e$2, L, x as x$1, j as b$1, _ as _decorate, k as _toConsumableArray, s as s$2, i as i$2, a as _taggedTemplateLiteral, y as y$1, b as e$3, c as _inherits, d as _createSuper, f as _createClass, g as _classCallCheck, h as _assertThisInitialized } from './query-assigned-elements-2251961b.js';

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function t$2(t){return e$2({...t,state:!0})}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e$1=t=>(...e)=>({_$litDirective$:t,values:e});let i$1 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const {I:l$1}=L,e=o=>void 0===o.strings,c$2=()=>document.createComment(""),r$2=(o,t,i)=>{var n;const d=o._$AA.parentNode,v=void 0===t?o._$AB:t._$AA;if(void 0===i){const t=d.insertBefore(c$2(),v),n=d.insertBefore(c$2(),v);i=new l$1(t,n,o,o.options);}else {const l=i._$AB.nextSibling,t=i._$AM,e=t!==o;if(e){let l;null===(n=i._$AQ)||void 0===n||n.call(i,o),i._$AM=o,void 0!==i._$AP&&(l=o._$AU)!==t._$AU&&i._$AP(l);}if(l!==v||e){let o=i._$AA;for(;o!==l;){const l=o.nextSibling;d.insertBefore(o,v),o=l;}}}return i},u$1=(o,l,t=o)=>(o._$AI(l,t),o),f$1={},s$1=(o,l=f$1)=>o._$AH=l,m=o=>o._$AH,p=o=>{var l;null===(l=o._$AP)||void 0===l||l.call(o,!1,!0);let t=o._$AA;const i=o._$AB.nextSibling;for(;t!==i;){const o=t.nextSibling;t.remove(),t=o;}};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u=(e,s,t)=>{const r=new Map;for(let l=s;l<=t;l++)r.set(e[l],l);return r},c$1=e$1(class extends i$1{constructor(e){if(super(e),e.type!==t$1.CHILD)throw Error("repeat() can only be used in text expressions")}ht(e,s,t){let r;void 0===t?t=s:void 0!==s&&(r=s);const l=[],o=[];let i=0;for(const s of e)l[i]=r?r(s,i):i,o[i]=t(s,i),i++;return {values:o,keys:l}}render(e,s,t){return this.ht(e,s,t).values}update(s,[t,r,c]){var d;const a=m(s),{values:p$1,keys:v}=this.ht(t,r,c);if(!Array.isArray(a))return this.ut=v,p$1;const h=null!==(d=this.ut)&&void 0!==d?d:this.ut=[],m$1=[];let y,x,j=0,k=a.length-1,w=0,A=p$1.length-1;for(;j<=k&&w<=A;)if(null===a[j])j++;else if(null===a[k])k--;else if(h[j]===v[w])m$1[w]=u$1(a[j],p$1[w]),j++,w++;else if(h[k]===v[A])m$1[A]=u$1(a[k],p$1[A]),k--,A--;else if(h[j]===v[A])m$1[A]=u$1(a[j],p$1[A]),r$2(s,m$1[A+1],a[j]),j++,A--;else if(h[k]===v[w])m$1[w]=u$1(a[k],p$1[w]),r$2(s,a[j],a[k]),k--,w++;else if(void 0===y&&(y=u(v,w,A),x=u(h,j,k)),y.has(h[j]))if(y.has(h[k])){const e=x.get(v[w]),t=void 0!==e?a[e]:null;if(null===t){const e=r$2(s,a[j]);u$1(e,p$1[w]),m$1[w]=e;}else m$1[w]=u$1(t,p$1[w]),r$2(s,a[j],t),a[e]=null;w++;}else p(a[k]),k--;else p(a[j]),j++;for(;w<=A;){const e=r$2(s,m$1[A+1]);u$1(e,p$1[w]),m$1[w++]=e;}for(;j<=k;){const e=a[j++];null!==e&&p(e);}return this.ut=v,s$1(s,m$1),x$1}});

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=(i,t)=>{var e,o;const r=i._$AN;if(void 0===r)return !1;for(const i of r)null===(o=(e=i)._$AO)||void 0===o||o.call(e,t,!1),s(i,t);return !0},o=i=>{let t,e;do{if(void 0===(t=i._$AM))break;e=t._$AN,e.delete(i),i=t;}while(0===(null==e?void 0:e.size))},r$1=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(void 0===e)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),l(t);}};function n$1(i){void 0!==this._$AN?(o(this),this._$AM=i,r$1(this)):this._$AM=i;}function h$1(i,t=!1,e=0){const r=this._$AH,n=this._$AN;if(void 0!==n&&0!==n.size)if(t)if(Array.isArray(r))for(let i=e;i<r.length;i++)s(r[i],!1),o(r[i]);else null!=r&&(s(r,!1),o(r));else s(this,i);}const l=i=>{var t,s,o,r;i.type==t$1.CHILD&&(null!==(t=(o=i)._$AP)&&void 0!==t||(o._$AP=h$1),null!==(s=(r=i)._$AQ)&&void 0!==s||(r._$AQ=n$1));};class c extends i$1{constructor(){super(...arguments),this._$AN=void 0;}_$AT(i,t,e){super._$AT(i,t,e),r$1(this),this.isConnected=i._$AU;}_$AO(i,t=!0){var e,r;i!==this.isConnected&&(this.isConnected=i,i?null===(e=this.reconnected)||void 0===e||e.call(this):null===(r=this.disconnected)||void 0===r||r.call(this)),t&&(s(this,i),o(this));}setValue(t){if(e(this._$Ct))this._$Ct._$AI(t,this);else {const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0);}}disconnected(){}reconnected(){}}

const i=new WeakMap;class t{constructor(t,s){this.startPaused=!1,this.disabled=!1,this.clients=new Set,this.pendingComplete=!1,this.host=t,this.defaultOptions=s.defaultOptions||{},this.startPaused=!!s.startPaused,this.disabled=!!s.disabled,this.onComplete=s.onComplete,i.set(this.host,this);}async add(i){var t,s;this.clients.add(i),this.startPaused&&(null===(t=i.webAnimation)||void 0===t||t.pause()),this.pendingComplete=!0,await i.finished,this.pendingComplete&&!this.isAnimating&&(this.pendingComplete=!1,null===(s=this.onComplete)||void 0===s||s.call(this));}remove(i){this.clients.delete(i);}pause(){this.clients.forEach((i=>{var t;return null===(t=i.webAnimation)||void 0===t?void 0:t.pause()}));}play(){this.clients.forEach((i=>{var t;return null===(t=i.webAnimation)||void 0===t?void 0:t.play()}));}cancel(){this.clients.forEach((i=>{var t;return null===(t=i.webAnimation)||void 0===t?void 0:t.cancel()})),this.clients.clear();}finish(){this.clients.forEach((i=>{var t;return null===(t=i.webAnimation)||void 0===t?void 0:t.finish()})),this.clients.clear();}togglePlay(){this.isPlaying?this.pause():this.play();}get isAnimating(){return this.clients.size>0}get isPlaying(){return Array.from(this.clients).some((i=>{var t;return "running"===(null===(t=i.webAnimation)||void 0===t?void 0:t.playState)}))}async finished(){await Promise.all(Array.from(this.clients).map((i=>i.finished)));}}

let h=0;const r=new Map,n=new WeakSet,a=()=>new Promise((t=>requestAnimationFrame(t))),f=[{opacity:0}],y=[{opacity:0},{opacity:.25,offset:.75},{opacity:1}],g=(t,i)=>{const s=t-i;return 0===s?void 0:s},w=(t,i)=>{const s=t/i;return 1===s?void 0:s},A={left:(t,i)=>{const s=g(t,i);return {value:s,transform:s&&`translateX(${s}px)`}},top:(t,i)=>{const s=g(t,i);return {value:s,transform:s&&`translateY(${s}px)`}},width:(t,i)=>{const s=w(t,i);return {value:s,transform:s&&`scaleX(${s})`}},height:(t,i)=>{const s=w(t,i);return {value:s,transform:s&&`scaleY(${s})`}}},b={duration:333,easing:"ease-in-out"},j=["left","top","width","height","opacity","color","background"],x=new WeakMap;class S extends c{constructor(t){if(super(t),this.t=null,this.i=null,this.o=!0,this.shouldLog=!1,t.type===t$1.CHILD)throw Error("The `animate` directive must be used in attribute position.");this.createFinished();}createFinished(){var t;null===(t=this.resolveFinished)||void 0===t||t.call(this),this.finished=new Promise((t=>{this.h=t;}));}async resolveFinished(){var t;null===(t=this.h)||void 0===t||t.call(this),this.h=void 0;}render(i){return b$1}getController(){return i.get(this.l)}isDisabled(){var t;return this.options.disabled||(null===(t=this.getController())||void 0===t?void 0:t.disabled)}update(t,[i]){var s;const e=void 0===this.l;return e&&(this.l=null===(s=t.options)||void 0===s?void 0:s.host,this.l.addController(this),this.element=t.element,x.set(this.element,this)),this.optionsOrCallback=i,(e||"function"!=typeof i)&&this.u(i),this.render(i)}u(t){var i,s;t=null!=t?t:{};const e=this.getController();void 0!==e&&((t={...e.defaultOptions,...t}).keyframeOptions={...e.defaultOptions.keyframeOptions,...t.keyframeOptions}),null!==(i=(s=t).properties)&&void 0!==i||(s.properties=j),this.options=t;}v(){const t={},i=this.element.getBoundingClientRect(),s=getComputedStyle(this.element);return this.options.properties.forEach((e=>{var o;const h=null!==(o=i[e])&&void 0!==o?o:A[e]?void 0:s[e],r=Number(h);t[e]=isNaN(r)?h+"":r;})),t}p(){let t,i=!0;return this.options.guard&&(t=this.options.guard(),i=((t,i)=>{if(Array.isArray(t)){if(Array.isArray(i)&&i.length===t.length&&t.every(((t,s)=>t===i[s])))return !1}else if(i===t)return !1;return !0})(t,this.m)),this.o=this.l.hasUpdated&&!this.isDisabled()&&!this.isAnimating()&&i&&this.element.isConnected,this.o&&(this.m=Array.isArray(t)?Array.from(t):t),this.o}hostUpdate(){var t;"function"==typeof this.optionsOrCallback&&this.u(this.optionsOrCallback()),this.p()&&(this.g=this.v(),this.t=null!==(t=this.t)&&void 0!==t?t:this.element.parentNode,this.i=this.element.nextSibling);}async hostUpdated(){if(!this.o||!this.element.isConnected||this.options.skipInitial&&!this.isHostRendered)return;let t;this.prepare(),await a;const i=this._(),s=this.A(this.options.keyframeOptions,i),e=this.v();if(void 0!==this.g){const{from:s,to:o}=this.O(this.g,e,i);this.log("measured",[this.g,e,s,o]),t=this.calculateKeyframes(s,o);}else {const s=r.get(this.options.inId);if(s){r.delete(this.options.inId);const{from:o,to:n}=this.O(s,e,i);t=this.calculateKeyframes(o,n),t=this.options.in?[{...this.options.in[0],...t[0]},...this.options.in.slice(1),t[1]]:t,h++,t.forEach((t=>t.zIndex=h));}else this.options.in&&(t=[...this.options.in,{}]);}this.animate(t,s);}resetStyles(){var t;void 0!==this.P&&(this.element.setAttribute("style",null!==(t=this.P)&&void 0!==t?t:""),this.P=void 0);}commitStyles(){var t,i;this.P=this.element.getAttribute("style"),null===(t=this.webAnimation)||void 0===t||t.commitStyles(),null===(i=this.webAnimation)||void 0===i||i.cancel();}reconnected(){}async disconnected(){var t;if(!this.o)return;if(void 0!==this.options.id&&r.set(this.options.id,this.g),void 0===this.options.out)return;if(this.prepare(),await a(),null===(t=this.t)||void 0===t?void 0:t.isConnected){const t=this.i&&this.i.parentNode===this.t?this.i:null;if(this.t.insertBefore(this.element,t),this.options.stabilizeOut){const t=this.v();this.log("stabilizing out");const i=this.g.left-t.left,s=this.g.top-t.top;!("static"===getComputedStyle(this.element).position)||0===i&&0===s||(this.element.style.position="relative"),0!==i&&(this.element.style.left=i+"px"),0!==s&&(this.element.style.top=s+"px");}}const i=this.A(this.options.keyframeOptions);await this.animate(this.options.out,i),this.element.remove();}prepare(){this.createFinished();}start(){var t,i;null===(i=(t=this.options).onStart)||void 0===i||i.call(t,this);}didFinish(t){var i,s;t&&(null===(s=(i=this.options).onComplete)||void 0===s||s.call(i,this)),this.g=void 0,this.animatingProperties=void 0,this.frames=void 0,this.resolveFinished();}_(){const t=[];for(let i=this.element.parentNode;i;i=null==i?void 0:i.parentNode){const s=x.get(i);s&&!s.isDisabled()&&s&&t.push(s);}return t}get isHostRendered(){const t=n.has(this.l);return t||this.l.updateComplete.then((()=>{n.add(this.l);})),t}A(t,i=this._()){const s={...b};return i.forEach((t=>Object.assign(s,t.options.keyframeOptions))),Object.assign(s,t),s}O(t,i,s){t={...t},i={...i};const e=s.map((t=>t.animatingProperties)).filter((t=>void 0!==t));let o=1,h=1;return void 0!==e&&(e.forEach((t=>{t.width&&(o/=t.width),t.height&&(h/=t.height);})),void 0!==t.left&&void 0!==i.left&&(t.left=o*t.left,i.left=o*i.left),void 0!==t.top&&void 0!==i.top&&(t.top=h*t.top,i.top=h*i.top)),{from:t,to:i}}calculateKeyframes(t,i,s=!1){var e;const o={},h={};let r=!1;const n={};for(const s in i){const a=t[s],l=i[s];if(s in A){const t=A[s];if(void 0===a||void 0===l)continue;const i=t(a,l);void 0!==i.transform&&(n[s]=i.value,r=!0,o.transform=`${null!==(e=o.transform)&&void 0!==e?e:""} ${i.transform}`);}else a!==l&&void 0!==a&&void 0!==l&&(r=!0,o[s]=a,h[s]=l);}return o.transformOrigin=h.transformOrigin=s?"center center":"top left",this.animatingProperties=n,r?[o,h]:void 0}async animate(t,i=this.options.keyframeOptions){this.start(),this.frames=t;let s=!1;if(!this.isAnimating()&&!this.isDisabled()&&(this.options.onFrames&&(this.frames=t=this.options.onFrames(this),this.log("modified frames",t)),void 0!==t)){this.log("animate",[t,i]),s=!0,this.webAnimation=this.element.animate(t,i);const e=this.getController();null==e||e.add(this);try{await this.webAnimation.finished;}catch(t){}null==e||e.remove(this);}return this.didFinish(s),s}isAnimating(){var t,i;return "running"===(null===(t=this.webAnimation)||void 0===t?void 0:t.playState)||(null===(i=this.webAnimation)||void 0===i?void 0:i.pending)}log(t,i){this.shouldLog&&!this.isDisabled()&&console.log(t,this.options.id,i);}}const $=e$1(S);

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var springy = [0, 0.0701, 0.2329, 0.4308, 0.6245, 0.7906, 0.9184, 1.0065, 1.059, 1.0833, 1.0872, 1.0783, 1.0628, 1.0453, 1.0288, 1.015, 1.0048, 0.9979, 0.994, 0.9925, 0.9925, 0.9935, 0.9949, 0.9964, 0.9978, 0.999, 0.9998];
var onFrames = function onFrames(animate) {
  var props = animate.animatingProperties,
    frames = animate.frames;
  if (frames === undefined || props === undefined) {
    return frames;
  }
  return [frames[0]].concat(_toConsumableArray(springy.map(function (v) {
    var frame = {};
    var x = props.left ? "translateX(".concat(props.left * (1 - v), "px)") : '';
    var y = props.top ? "translateY(".concat(props.top * (1 - v), "px)") : '';
    var sx = props.width ? "scaleX(".concat(props.width + (1 - props.width) * v, ")") : '';
    var sy = props.height ? "scaleY(".concat(props.height + (1 - props.height) * v, ")") : '';
    frame.transform = "".concat(x, " ").concat(y, " ").concat(sx, " ").concat(sy);
    return frame;
  })), [frames[1]]);
};
var data = [{
  id: 0,
  value: 'Cats',
  summary: 'Cats are the very best pets.'
}, {
  id: 1,
  value: 'Dogs',
  summary: 'Dogs have a lot of energy.'
}, {
  id: 2,
  value: 'Hippos',
  summary: 'Hippos are very fat and mean.'
}, {
  id: 3,
  value: 'Elephants',
  summary: 'Elephants are really huge.'
}, {
  id: 4,
  value: 'Mosquitoes',
  summary: 'Mosquitoes bite you.'
}, {
  id: 5,
  value: 'Snakes',
  summary: 'Snakes are pretty scary.'
}, {
  id: 6,
  value: 'Frogs',
  summary: 'Frogs are amphibious.'
}, {
  id: 7,
  value: 'Alligators',
  summary: 'Alligators sneak up on you.'
}, {
  id: 8,
  value: 'Cows',
  summary: 'Cows make good hamburgers.'
}];
var HeroList = _decorate([e$3('ntx-herolist')], function (_initialize, _LitElement) {
  var HeroList = /*#__PURE__*/function (_LitElement2) {
    _inherits(HeroList, _LitElement2);
    var _super = _createSuper(HeroList);
    function HeroList() {
      var _this;
      _classCallCheck(this, HeroList);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _super.call.apply(_super, [this].concat(args));
      _initialize(_assertThisInitialized(_this));
      return _this;
    }
    return _createClass(HeroList);
  }(_LitElement);
  return {
    F: HeroList,
    d: [{
      kind: "field",
      decorators: [e$2({
        type: Array
      })],
      key: "list",
      value: function value() {
        return data;
      }
    }, {
      kind: "method",
      "static": true,
      key: "getMetaConfig",
      value: function getMetaConfig() {
        // plugin contract information
        return {
          controlName: 'Hero List',
          fallbackDisableSubmit: false,
          description: 'Hero List component',
          iconUrl: 'one-line-text',
          groupName: 'Controls ByC',
          version: '1.0',
          properties: {
            list: {
              type: 'string',
              title: 'List',
              description: 'Enter JSON string',
              defaultValue: '[]'
            }
          }
        };
      }
    }, {
      kind: "field",
      "static": true,
      key: "styles",
      value: function value() {
        return i$2(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n          :host {\n            display: flex;\n            color: #040424;\n            height: 100%;\n            overflow: hidden;\n            justify-content: center;\n            --card-color: #546e7a;\n            --card-text-color: white;\n            --detail-color: #819ca9;\n            --detail-text-color: black;\n            --accent-color: #29434e;\n            --divider: 2px solid var(--accent-color);\n            --border: 8px solid var(--accent-color);\n            --border-radius: 8px;\n          }\n      \n          * {\n            box-sizing: border-box;\n            -webkit-user-select: none;\n            -moz-user-select: none;\n            user-select: none;\n          }\n      \n          .fit {\n            //position: absolute;\n            inset: 0;\n          }\n      \n          .icon {\n            font-family: 'Material Icons';\n            font-style: normal;\n            color: var(--accent-color);\n          }\n                \n          .divider {\n            will-change: opacity;\n            border-bottom: var(--divider);\n          }\n      \n          .divider-top {\n            will-change: opacity;\n            border-top: var(--divider);\n          }\n      \n          .container {\n            width: 800px;\n            position: relative;\n          }\n      \n          .cards {\n            list-style: none;\n            padding: 0;\n            margin: 0;\n            display: flex;\n            flex-wrap: wrap;\n          }\n      \n          li {\n            will-change: transform;\n            position: relative;\n            overflow: hidden;\n            display: flex;\n            flex-direction: column;\n            flex: 1;\n            flex-basis: 30%;\n            cursor: pointer;\n            margin: 8px;\n            padding: 16px;\n            border-radius: var(--border-radius);\n            background: var(--card-color);\n            color: var(--card-text-color);\n          }\n      \n          .card-background {\n            will-change: opacity;\n            border-radius: var(--border-radius);\n            border: var(--border);\n          }\n      \n          .card-icon {\n            will-change: transform;\n            font-size: 9em;\n            text-align: center;\n            margin: 8px 0;\n          }\n      \n          .card-content {\n            flex: 1;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n          }\n      \n          .card-header {\n            padding-top: 8px;\n            min-height: 40px;\n          }\n      \n          .card-header-title {\n            font-weight: 800;\n          }\n      \n          .detail {\n            will-change: transform;\n            display: flex;\n            flex-direction: column;\n            flex: 1;\n            color: var(--detail-text-color);\n            margin: 8px;\n            padding: 16px;\n            border-radius: 8px;\n            overflow: hidden;\n            background: var(--detail-color);\n            border-radius: var(--border-radius);\n            border: var(--border);\n          }\n      \n          .detail-header {\n            display: flex;\n            align-items: center;\n          }\n      \n          .detail-header-title {\n            font-weight: 800;\n          }\n      \n          .hero-text {\n            will-change: transform;\n            display: inline-block;\n            width: 218px;\n          }\n      \n          .detail-header-text {\n            margin-left: 8px;\n          }\n      \n          .detail-header-icon {\n            will-change: transform;\n            font-size: 3em;\n            min-width: 48px;\n          }\n      \n          .detail-content {\n            padding: 16px;\n            font-size: 1.1em;\n            line-height: 200%;\n          }\n    "])));
      }
    }, {
      kind: "field",
      decorators: [t$2()],
      key: "detail",
      value: void 0
    }, {
      kind: "field",
      key: "controller",
      value: function value() {
        return new t(this, {
          defaultOptions: {
            keyframeOptions: {
              duration: 750,
              fill: 'both'
            },
            onFrames: onFrames
          }
        });
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        var _this2 = this;
        return y$1(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        <head>\n        <link\n            href=\"https://fonts.googleapis.com/css?family=Material+Icons&display=block\"\n            rel=\"stylesheet\"\n        />\n        <style>\n            body {\n            margin: 0;\n            height: 100vh;\n            width: 100vw;\n            font-family: sans-serif;\n            }\n        </style>\n        </head>\n        <div class=\"container\">\n        <ul class=\"cards fit\">\n            ", "\n        </ul>\n        ", "\n        </div>"])), c$1(this.detail ? [] : this.list, function (i) {
          return i;
        }, function (i, x) {
          return y$1(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["<li\n                @click=", "\n                ", "\n                >\n                <div\n                    class=\"card-background fit\"\n                    ", "\n                ></div>\n                <div class=\"card-content\">\n                    <div\n                    class=\"icon card-icon\"\n                    ", "\n                    >\n                    pets\n                    </div>\n                </div>\n                <div\n                    class=\"divider\"\n                    ", "\n                ></div>\n                <div class=\"card-header hero-text\">\n                    <div\n                    ", "\n                    >\n                    <div class=\"card-header-title\">", "</div>\n                    <div>", "</div>\n                    </div>\n                </div>\n                </li>"])), function (e) {
            return _this2.clickHandler(e, i);
          }, $({
            out: f,
            id: "".concat(i.id, ":card"),
            inId: "".concat(i.id, ":detail")
          }), $({
            "in": y,
            skipInitial: true
          }), $({
            id: "".concat(i.id, ":card-icon"),
            inId: "".concat(i.id, ":detail-icon"),
            skipInitial: true
          }), $({
            "in": y,
            skipInitial: true
          }), $({
            id: "".concat(i.id, ":card-header"),
            inId: "".concat(i.id, ":detail-header"),
            skipInitial: true
          }), i.value, i.summary);
        }), this.detail ? y$1(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["<div\n                class=\"detail fit\"\n                @click=", "\n                ", "\n            >\n                <div class=\"detail-header\">\n                <div\n                    class=\"icon detail-header-icon\"\n                    ", "\n                >\n                    pets\n                </div>\n                <div\n                    class=\"detail-header-text hero-text\"\n                    ", "\n                >\n                    <div class=\"detail-header-title\">", "</div>\n                    <div>", "</div>\n                </div>\n                </div>\n                <div\n                class=\"detail-content divider-top\"\n                ", "\n                >\n                Sed ut perspiciatis unde omnis iste natus error sit voluptatem\n                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa\n                quae ab illo inventore veritatis et quasi architecto beatae vitae\n                dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit\n                aspernatur aut odit aut fugit, sed quia consequuntur magni dolores\n                eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam\n                est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci\n                velit, sed quia non numquam eius modi tempora incidunt ut labore\n                et dolore magnam aliquam quaerat voluptatem.\n                </div>\n            </div>"])), this.clickHandler, $({
          id: "".concat(this.detail.id, ":detail"),
          inId: "".concat(this.detail.id, ":card")
        }), $({
          id: "".concat(this.detail.id, ":detail-icon"),
          inId: "".concat(this.detail.id, ":card-icon")
        }), $({
          id: "".concat(this.detail.id, ":detail-header"),
          inId: "".concat(this.detail.id, ":card-header")
        }), this.detail.value, this.detail.summary, $({
          "in": y
        })) : '');
      }
    }, {
      kind: "method",
      key: "clickHandler",
      value: function clickHandler(e, item) {
        if (this.controller.isAnimating) {
          this.controller.togglePlay();
        } else {
          this.detail = item;
        }
      }
    }]
  };
}, s$2);

export { HeroList, data, onFrames, springy };
