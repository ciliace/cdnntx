import {LitElement, css, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import {
  animate,
  AnimateController,
  fadeInSlow,
  fadeOut,
} from '@lit-labs/motion';
import {Animate} from '@lit-labs/motion';

import {NintexPlugin} from '../../lib/nintex-plugin';

export const springy = [
    0, 0.0701, 0.2329, 0.4308, 0.6245, 0.7906, 0.9184, 1.0065, 1.059, 1.0833,
    1.0872, 1.0783, 1.0628, 1.0453, 1.0288, 1.015, 1.0048, 0.9979, 0.994, 0.9925,
    0.9925, 0.9935, 0.9949, 0.9964, 0.9978, 0.999, 0.9998,
  ];
  
export const onFrames = (animate: Animate) => {
    const {animatingProperties: props, frames} = animate;
    if (frames === undefined || props === undefined) {
      return frames;
    }
    return [
      frames[0],
      ...springy.map((v) => {
        const frame: Keyframe = {};
        const x = props.left
          ? `translateX(${(props.left as number) * (1 - v)}px)`
          : '';
        const y = props.top
          ? `translateY(${(props.top as number) * (1 - v)}px)`
          : '';
        const sx = props.width
          ? `scaleX(${
              (props.width as number) + (1 - (props.width as number)) * v
            })`
          : '';
        const sy = props.height
          ? `scaleY(${
              (props.height as number) + (1 - (props.height as number)) * v
            })`
          : '';
        frame.transform = `${x} ${y} ${sx} ${sy}`;
        return frame;
      }),
      frames[1],
    ];
};
export const data = [
    {id: 0, value: 'Cats', summary: 'Cats are the very best pets.'},
    {id: 1, value: 'Dogs', summary: 'Dogs have a lot of energy.'},
    {id: 2, value: 'Hippos', summary: 'Hippos are very fat and mean.'},
    {
      id: 3,
      value: 'Elephants',
      summary: 'Elephants are really huge.',
    },
    {
      id: 4,
      value: 'Mosquitoes',
      summary: 'Mosquitoes bite you.',
    },
    {id: 5, value: 'Snakes', summary: 'Snakes are pretty scary.'},
    {id: 6, value: 'Frogs', summary: 'Frogs are amphibious.'},
    {
      id: 7,
      value: 'Alligators',
      summary: 'Alligators sneak up on you.',
    },
    {id: 8, value: 'Cows', summary: 'Cows make good hamburgers.'},
  ];
  
export type DataItem = typeof data[number]; 

@customElement('ntx-herolist')
export class HeroList extends LitElement {

    @property({type: Array}) list = data;

    static getMetaConfig(): Promise<NintexPlugin> | NintexPlugin {
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
            defaultValue: '[]',
            }
        }
        };
    }

    static styles = css`
          :host {
            display: flex;
            color: #040424;
            height: 100%;
            overflow: hidden;
            justify-content: center;
            --card-color: #546e7a;
            --card-text-color: white;
            --detail-color: #819ca9;
            --detail-text-color: black;
            --accent-color: #29434e;
            --divider: 2px solid var(--accent-color);
            --border: 8px solid var(--accent-color);
            --border-radius: 8px;
          }
      
          * {
            box-sizing: border-box;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
          }
      
          .fit {
            //position: absolute;
            inset: 0;
          }
      
          .icon {
            font-family: 'Material Icons';
            font-style: normal;
            color: var(--accent-color);
          }
                
          .divider {
            will-change: opacity;
            border-bottom: var(--divider);
          }
      
          .divider-top {
            will-change: opacity;
            border-top: var(--divider);
          }
      
          .container {
            width: 800px;
            position: relative;
          }
      
          .cards {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-wrap: wrap;
          }
      
          li {
            will-change: transform;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            flex: 1;
            flex-basis: 30%;
            cursor: pointer;
            margin: 8px;
            padding: 16px;
            border-radius: var(--border-radius);
            background: var(--card-color);
            color: var(--card-text-color);
          }
      
          .card-background {
            will-change: opacity;
            border-radius: var(--border-radius);
            border: var(--border);
          }
      
          .card-icon {
            will-change: transform;
            font-size: 9em;
            text-align: center;
            margin: 8px 0;
          }
      
          .card-content {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }
      
          .card-header {
            padding-top: 8px;
            min-height: 40px;
          }
      
          .card-header-title {
            font-weight: 800;
          }
      
          .detail {
            will-change: transform;
            display: flex;
            flex-direction: column;
            flex: 1;
            color: var(--detail-text-color);
            margin: 8px;
            padding: 16px;
            border-radius: 8px;
            overflow: hidden;
            background: var(--detail-color);
            border-radius: var(--border-radius);
            border: var(--border);
          }
      
          .detail-header {
            display: flex;
            align-items: center;
          }
      
          .detail-header-title {
            font-weight: 800;
          }
      
          .hero-text {
            will-change: transform;
            display: inline-block;
            width: 218px;
          }
      
          .detail-header-text {
            margin-left: 8px;
          }
      
          .detail-header-icon {
            will-change: transform;
            font-size: 3em;
            min-width: 48px;
          }
      
          .detail-content {
            padding: 16px;
            font-size: 1.1em;
            line-height: 200%;
          }
    `;

    @state() detail!: DataItem;

    controller = new AnimateController(this, {
        defaultOptions: {
        keyframeOptions: {
            duration: 750,
            fill: 'both',
        },
        onFrames,
        },
    });

    render() {
        return html`
        <head>
        <link
            href="https://fonts.googleapis.com/css?family=Material+Icons&display=block"
            rel="stylesheet"
        />
        <style>
            body {
            margin: 0;
            height: 100vh;
            width: 100vw;
            font-family: sans-serif;
            }
        </style>
        </head>
        <div class="container">
        <ul class="cards fit">
            ${repeat(
            this.detail ? [] : this.list,
            (i) => i,
            (i, x) =>
                html`<li
                @click=${(e: Event) => this.clickHandler(e, i)}
                ${animate({
                    out: fadeOut,
                    id: `${i.id}:card`,
                    inId: `${i.id}:detail`,
                })}
                >
                <div
                    class="card-background fit"
                    ${animate({
                    in: fadeInSlow,
                    skipInitial: true,
                    })}
                ></div>
                <div class="card-content">
                    <div
                    class="icon card-icon"
                    ${animate({
                        id: `${i.id}:card-icon`,
                        inId: `${i.id}:detail-icon`,
                        skipInitial: true,
                    })}
                    >
                    pets
                    </div>
                </div>
                <div
                    class="divider"
                    ${animate({
                    in: fadeInSlow,
                    skipInitial: true,
                    })}
                ></div>
                <div class="card-header hero-text">
                    <div
                    ${animate({
                        id: `${i.id}:card-header`,
                        inId: `${i.id}:detail-header`,
                        skipInitial: true,
                    })}
                    >
                    <div class="card-header-title">${i.value}</div>
                    <div>${i.summary}</div>
                    </div>
                </div>
                </li>`
            )}
        </ul>
        ${this.detail
            ? html`<div
                class="detail fit"
                @click=${this.clickHandler}
                ${animate({
                id: `${this.detail.id}:detail`,
                inId: `${this.detail.id}:card`,
                })}
            >
                <div class="detail-header">
                <div
                    class="icon detail-header-icon"
                    ${animate({
                    id: `${this.detail.id}:detail-icon`,
                    inId: `${this.detail.id}:card-icon`,
                    })}
                >
                    pets
                </div>
                <div
                    class="detail-header-text hero-text"
                    ${animate({
                    id: `${this.detail.id}:detail-header`,
                    inId: `${this.detail.id}:card-header`,
                    })}
                >
                    <div class="detail-header-title">${this.detail.value}</div>
                    <div>${this.detail.summary}</div>
                </div>
                </div>
                <div
                class="detail-content divider-top"
                ${animate({
                    in: fadeInSlow,
                })}
                >
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae vitae
                dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
                eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
                est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
                velit, sed quia non numquam eius modi tempora incidunt ut labore
                et dolore magnam aliquam quaerat voluptatem.
                </div>
            </div>`
            : ''}
        </div>`;
    }

    clickHandler(e: Event, item: DataItem) {
        if (this.controller.isAnimating) {
        this.controller.togglePlay();
        } else {
        this.detail = item;
        }
    }
}


 
