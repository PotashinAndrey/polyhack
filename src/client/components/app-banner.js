import Component, { html, css } from '../class/Component.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
    background: whitesmoke;
    color: black;
    box-shadow: 0 0 3px 3px #ccc;
    padding: 20px 40px;
    border-radius: 8px;
  }
  :host([error]) {
    background: snow;
    color: red;
  }
  slot {
    display: block;
  }`;

/** Баннеры для ошибок {AppBanner} @class @ui @component <app-banner />
  * description
  */
  export default class AppBanner extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {AppBanner} @constructor
    * @param {string} text param-description
    */
    constructor(text) {
      super();
      if (text) this.innerText = text;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {AppBanner} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      // const { store } = this.store();
      return this;
    }

    static error(text) {
      const banner = new AppBanner(text);
      banner.setAttribute('error', '');
      return banner;
    }
  }

Component.init(AppBanner, 'app-banner', { attributes, properties });
