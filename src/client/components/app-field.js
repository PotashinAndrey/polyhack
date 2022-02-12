import Component, { html, css } from '../class/Component.js';
import {updateChildrenText} from '../class/DOM.js';

const attributes = {
  /** / caption */
    caption(root, value, previous) {
      updateChildrenText(root, 'label', value);
    }
};
const properties = {};

const style = css`
  :host {
    display: block;
  }
  label {
    display: block;
    margin-bottom: 4px;
    color: #444;
    font-family: var(--font);
  }
  slot {
    display: block;
  }`;

/** Поле {AppField} @class @ui @component <app-field />
  * description
  */
  export default class AppField extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div>
          <label></label>
          <slot></slot>
        </div>
      </template>`;

  // /** Создание компонента {AppField} @constructor
  //   * @param {type} store param-description
  //   */
  //   constructor(store) {
  //     super();
  //     this.store({ store });
  //   }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {AppField} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      return this;
    }


  }

Component.init(AppField, 'app-field', { attributes, properties });
