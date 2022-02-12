import Component, { html, css } from '../class/Component.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
  }
  :host(:hover) {
  }
  slot {
    display: block;
  }`;

/** Элемент списка {AppListItem} @class @ui @component <app-list-item />
  * description
  */
  export default class AppListItem extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {AppListItem} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      return this;
    }


  }

Component.init(AppListItem, 'app-list-item', { attributes, properties });
