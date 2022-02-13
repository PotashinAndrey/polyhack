import Component, { html, css } from '../class/Component.js';
import locator from '../script/locator.js';
import Router from '../class/Router.js';

const attributes = {};
const properties = {};

const texts = {
  camera : "Camera",
  stickers : "Stickers",
  friends : "Friends",
  profile : "Profile"
};

const style = css`
  :host {
    --gradient: var(--main-btn-gradient);
    background: linear-gradient(var(--gradient));
    display: grid;
    height: 40px;
    justify-content: center;
    color: white;
  }
  slot {
    display: block;
  }`;

/** PageHeader {PageHeader} @class @ui @component <page-header />
  * description
  */
  export default class PageHeader extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
        <div id="header"></div>
      </template>`;

  /** Создание компонента {PageHeader} @constructor
    * @param {type} store param-description
    */
    constructor(store) {
      super();
      this.store({ store });
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {PageHeader} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const { store } = this.store();
      const location = document.location.hash.split("/").pop();

      node.getElementById("header").innerText = texts[location] ? texts[location].toUpperCase() : texts.camera.toUpperCase();
      return this;
    }
  }

Component.init(PageHeader, 'page-header', { attributes, properties });
