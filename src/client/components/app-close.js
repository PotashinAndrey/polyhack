import Component, { html, css } from '../class/Component.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
    cursor: pointer;
  }
  svg {
    display: block;
  }`;

/** Иконка для закрытия {AppClose} @class @ui @component <app-close />
  * description
  */
  export default class AppClose extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <svg viewBox="0 0 24 24">
          <path
            d="M16.8767 15.7013C16.9556 15.7796 17 15.8861 17 15.9972C17 16.1084 16.9556 16.2149 16.8767 16.2932L16.2932 16.8767C16.2149 16.9556 16.1084 17 15.9972 17C15.8861 17 15.7796 16.9556 15.7013 16.8767L12 13.1754L8.2987 16.8767C8.22044 16.9556 8.1139 17 8.00276 17C7.89162 17 7.78509 16.9556 7.70683 16.8767L7.12329 16.2932C7.04438 16.2149 7 16.1084 7 15.9972C7 15.8861 7.04438 15.7796 7.12329 15.7013L10.8246 12L7.12329 8.2987C7.04438 8.22044 7 8.1139 7 8.00276C7 7.89162 7.04438 7.78509 7.12329 7.70683L7.70683 7.12329C7.78509 7.04438 7.89162 7 8.00276 7C8.1139 7 8.22044 7.04438 8.2987 7.12329L12 10.8246L15.7013 7.12329C15.7796 7.04438 15.8861 7 15.9972 7C16.1084 7 16.2149 7.04438 16.2932 7.12329L16.8767 7.70683C16.9556 7.78509 17 7.89162 17 8.00276C17 8.1139 16.9556 8.22044 16.8767 8.2987L13.1754 12L16.8767 15.7013Z"
          ></path>
        </svg>
      </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {AppClose} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      return this;
    }
  }

Component.init(AppClose, 'app-close', { attributes, properties });
