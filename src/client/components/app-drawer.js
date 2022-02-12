import Component, { html, css } from '../class/Component.js';
import $, { updateChildrenAttribute, updateChildrenProperty, updateChildrenText } from '../class/DOM.js';
import locator from '../script/locator.js';

import AppClose from './app-close.js';

const attributes = {};
const properties = {};

const TIMING = 160;

const style = css`
  :host {
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
    display: block;
    width: 100vw;
    height: 100%;
    z-index: 5;
  }
  #root {
    position: absolute;
    bottom: 0;
    background-color: whitesmoke;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    box-sizing: border-box;
    width: 100vw;
  }
  #header {
    position: relative;
    width: 100%;
    background-color: green;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    --gradient: var(--secondary-btn-gradient);
    background: linear-gradient(var(--gradient)) !important;
  }
  #title {
    font-size: 20px;
  }
  app-close {
    position: absolute;
    right: 0;
    width: 30px;
    padding: 0 5px;
  }
  slot {
    display: block;
    overflow: auto;
    max-height: 80vh;
    padding: 16px 8px;
    padding-bottom: 80px;
    box-sizing: border-box;
  }`;

/** BottomDrawer {AppDrawer} @class @ui @component <app-drawer />
  * description
  */
  export default class AppDrawer extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div id="root">
          <div id="header">
            <div id="title">Title</div>
            <app-close></app-close>
          </div>
          <slot></slot>
        </div>
      </template>`;
  /** Создание компонента {AppDrawer} @constructor
    * @param {type} store param-description
    */
    constructor(store) {
      super();
      this.store({ store });
    }
  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {AppDrawer} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const tumbling = [
        { transform: 'translateY(100%)' },
        { transform: 'translateY(0)' }
      ];

      const root = $('#root', node);
      root.animate(tumbling, TIMING);

      const closeDrawer = () => { // анимация закрытия
        const animation = root.animate(tumbling.reverse(), TIMING);
        animation.onfinish = () => this.remove();
      }

      $('app-close', node).addEventListener('click', closeDrawer);
      locator.channel.on('drawer-close', closeDrawer);
      const { store } = this.store();
      console.log(store);
      updateChildrenText(node, '#title', store.title);

      return this;
    }
  }

Component.init(AppDrawer, 'app-drawer', { attributes, properties });
