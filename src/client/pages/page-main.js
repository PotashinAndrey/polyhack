import Component, { html, css } from '../class/Component.js';
import $ from '../class/DOM.js';
import locator from '../script/locator.js';

import AppBar from '../components/app-bar.js';
import AppDrawer from '../components/app-drawer.js';
import PageHeader from '../components/page-header.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    height: calc(100vh - 40px);
    display: block;
    position: relative;
  }
  #root {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 40px 1fr 96px;
    height: 100vh;
    font-family: var(--font);
  }
  slot {
    display: block;
    position: relative;

    overflow: auto;
    overscroll-behavior-y: contain;
    /* padding-bottom: 80px; */
  }
  app-bar {
    text-align: center;
  }`;

/** Раскладка {PageMain} @class @ui @component <page-main />
  * description
  */
export default class PageMain extends Component {
  static template = html`
    <template>
      <style>${style}</style>
      <div id="root">
        <page-header></page-header>
        <slot></slot>
        <app-bar></app-bar>
      </div>
    </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {PageMain} #this текущий компонент
    */
  mount(node) {
    super.mount(node, attributes, properties);
    // GET /notification/message/unread/count
    // this.addEventListener('component-routing', (e) => {
    // 	debugger;
    // 	console.log('main component-routing', e.detail);
    // })

    locator.channel.on('drawer-open', (cfg) => {
      const { page, params } = cfg;
      const drawer = new AppDrawer(params);
      if (page) drawer.appendChild(page);
      node.appendChild(drawer);
      // анимация появления
    });

    return this;
  }

  // route(node, route, options, router, depth = 0) {
  // 	console.log('main route', {node, route, options, router, depth})
  // 	return this;
  // }
}

Component.init(PageMain, 'page-main', { attributes, properties });
