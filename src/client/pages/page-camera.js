import Component, { html, css } from '../class/Component.js';
import $ from '../class/DOM.js';
import locator from "../script/locator.js";

import AppCamera from '../components/app-camera.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
    height: 100%;
    background-image: url("images/cameraBackground.png");
    background-color: rgba(0,0,0,.3);
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover; /* Resize the background image to cover the entire container */
  }
  slot {
    display: block;
  }`;

/** Camera {PageCamera} @class @ui @component <page-camera />
  * description
  */
  export default class PageCamera extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
        <app-camera></app-camera>
      </template>`;

  // /** Создание компонента {PageCamera} @constructor
  //   * @param {type} store param-description
  //   */
  //   constructor(store) {
  //     super();
  //     this.store({ store });
  //   }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {PageCamera} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const camera = $('app-camera', node);
      const goDonation = e => {
        camera.removeEventListener('click', goDonation);
        setTimeout(() => locator.go(`main/donate/s6`), 1000);
        // setTimeout(() => locator.go(`main/donate/${this.getSticker()}`), 1000);
      }
      camera.addEventListener('qr-code', goDonation);

      // const { store } = this.store();
      return this;
    }

    getRandomInRange(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }

    getSticker() {
      const stickersArray = ["s6", "s5", "s4", "s1", "s3"];
      return stickersArray[this.getRandomInRange(0, stickersArray.length)];
    }

  }

Component.init(PageCamera, 'page-camera', { attributes, properties });
