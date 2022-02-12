import Component, { html, css } from '../class/Component.js';
import $, { updateChildrenAttribute, updateChildrenText } from '../class/DOM.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
    font-family: var(--font);
    --width: auto;
    --round-radius: 5px;
  }
  :host([primary]) {
    --color: var(--bell-red);
    --font-color: var(--bell-white);
    --color-hover: var(--bell-dark-red);
    --border-color: var(--bell-red);
    --gradient: var(--main-btn-gradient);
  }
  :host([secondary]) {
    --color: var(--bell-white);
    --font-color: var(--bell-white);
    --color-hover: var(--ligth-gray2);
    --border-color: var(--bell-gray);
    --gradient: var(--secondary-btn-gradient);
  }
  :host([icon]) {
    --color: var(--bell-white);
    --round-radius: 30px;
  }
  :host([wide]) {
    --width: 100%;
  }
  :host([disabled]) {
    cursor: default;
  }
  button:hover {
    background-color: var(--color-hover);
  }
  button {
    background-color: var(--color);
    color: var(--font-color);
    padding: 10px 20px;
    border-radius: var(--round-radius);
    font-size: 14px;
    border: none;
    background: linear-gradient(var(--gradient));
    width: var(--width);
  }`;

/** Дефолтная кнопка {Button} @class @ui @component <app-button />
  * description
  */
  export default class AppButton extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <button><slot></slot></button>
      </template>`;

    constructor(params) {
      super();
      this.store({ params });
    }
  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {AppButton} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const { params } = this.store();
      if (this.getAttribute('icon')) {
        const iconElement = document.createElement('img');
        iconElement.setAttribute('src', '../icons/add.svg');
        $('button', node).append(iconElement);
      }
      if (params?.title) {
        updateChildrenText(node, 'button', params.title);
      }
      return this;
    }
  }

Component.init(AppButton, 'app-button', { attributes, properties });
