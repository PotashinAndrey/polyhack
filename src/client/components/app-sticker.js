import Component, { html, css } from '../class/Component.js';
import $, { slottedValue } from '../class/DOM.js';

const attributes = {};
const properties = {
  /** / paused */
  paused(root, value, previous) { }
};

const style = css`
  :host {
    display: block;
  }
  slot {
    display: none;
  }
  :host([paused]) {
    opacity: 0.5;
    filter: grayscale(100%);
  }`;

const allStickers = {
  "3-58164": {
    stickerPath: '/stickers/3-58164.json',
    name: "кошкодевочка"
  },
  "3-58150": {
    stickerPath: '/stickers/3-58150.json',
    name: "кошкодевочка 2"
  },
  "3-58145": {
    stickerPath: '/stickers/3-58145.json',
    name: "кошкодевочка 3"
  },
  "3-58138": {
    stickerPath: '/stickers/3-58138.json',
    name: "кошкодевочка 4"
  },
  "3-58139": {
    stickerPath: '/stickers/3-58139.json',
    name: "кошкодевочка 5"
  },
  "3-58140": {
    stickerPath: '/stickers/3-58140.json',
    name: "кошкодевочка 6"
  }
};

/** Отображение стикеров {AppSticker} @class @ui @component <app-sticker />
  * description
  */
export default class AppSticker extends Component {
  static template = html`
      <template>
        <style>${style}</style>
        <div></div>
        <slot></slot>
      </template>`;

  /** Создание компонента {AppSticker} @constructor
    // * @param {type} store param-description
    */
    constructor(sticker) {
      super();
      this.store({ sticker });
      if (sticker?.id) this.innerText = sticker.id;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {AppSticker} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const { sticker } = this.store();
      const stickerId = sticker?.id ?? slottedValue($('slot', node));
      const path = allStickers[stickerId]?.stickerPath;
      if (!path) return;
      this.paused = sticker?.paused ?? false;

      // debugger;
      const element = $('div', node);
      // @ts-ignore
      window.lottie.loadAnimation({
        container: element, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: !this.paused,
        path // the path to the animation json
      });

      // const { store } = this.store();
      return this;
    }
  }

Component.init(AppSticker, 'app-sticker', { attributes, properties });
