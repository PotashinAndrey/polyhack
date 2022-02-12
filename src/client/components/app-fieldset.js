import Component, { html, css } from '../class/Component.js';
import {updateChildrenText} from '../class/DOM.js';

const attributes = {
  /** / caption */
    caption(root, value) {
      updateChildrenText(root, 'legend', value);
    }
};
const properties = {};

const style = css`
  :host {
    display: block;
  }
  fieldset {
    margin: 20px;
    padding: 20px;
    border-radius: 8px;
    font-family: var(--font);
  }
  ::slotted(app-field) {
    margin-bottom: 16px;
  }
  slot {
    display: block;
  }`;

/** Блок с полями формы {AppFieldset} @class @ui @component <app-fieldset />
  * description
  */
  export default class AppFieldset extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <fieldset>
          <legend></legend>
          <slot></slot>
        </fieldset>
      </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {AppFieldset} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      return this;
    }


  }

Component.init(AppFieldset, 'app-fieldset', { attributes, properties });
