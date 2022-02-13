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
  "s6": {
    stickerPath: '/stickers/s6.json',
    name: "кошкодевочка"
  },
  "s5": {
    stickerPath: '/stickers/s5.json',
    name: "кошкодевочка 2"
  },
  "s4": {
    stickerPath: '/stickers/s4.json',
    name: "кошкодевочка 3"
  },
  "s1": {
    stickerPath: '/stickers/s1.json',
    name: "кошкодевочка 4"
  },
  "s2": {
    stickerPath: '/stickers/s2.json',
    name: "кошкодевочка 5"
  },
  "s3": {
    stickerPath: '/stickers/s3.json',
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
