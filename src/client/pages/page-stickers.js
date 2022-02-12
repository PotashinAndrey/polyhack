import Component, { html, css } from '../class/Component.js';
import StickerListItem from '../components/sticker-list-item.js';
import $ from '../class/DOM.js';

const attributes = {};
const properties = {};

const stickersArray = ["s6", "s5", "s1", "s3"];

const style = css`
  :host {
    display: grid;
    grid-template-rows: 1fr 40px;
    padding: 10px !important;
  }
  #stickerList {
    margin-top: 15px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    gap: 10px;
  }
  .getMoreStickers {
    color: gray;
    text-align: center;
    margin-top: 20px;
  }
  slot {
    display: block;
  }`;

/** stickers {PageStickers} @class @ui @component <page-stickers />
  * description
  */
export default class PageStickers extends Component {
  static template = html`
      <template>
        <style>${style}</style>
        <div id="stickerList"></div>
        <div class="getMoreStickers">Get more stickers for charity</div>
      </template>`;

  // /** Создание компонента {PageStickers} @constructor
  //   * @param {type} store param-description
  //   */
  constructor(stickers) {
    super();
    this.store({ stickers });
  }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {PageStickers} #this текущий компонент
    */
  mount(node) {
    super.mount(node, attributes, properties);
    console.log(this.store())
    let stickers;
    if (this.store()?.stickers) {
      stickers = this.store()?.stickers;
    } else {
      // Это значит, что открываются свои стикеры
      stickers = stickersArray.map((id) => {
        return {
          id,
          paused: false
        }
      });
    }
    const list = $('#stickerList', node);
    for (let i = 0; i < stickers.length; i++) {
      const stickerCard = new StickerListItem(stickers[i]);
      list.append(stickerCard);
    }

    return this;
  }


}

Component.init(PageStickers, 'page-stickers', { attributes, properties });
