import Component, { html, css } from '../class/Component.js';
import $, { slottedValue } from '../class/DOM.js';
import locator from '../script/locator.js';
import AppSticker from './app-sticker.js';
import StickerCard from './sticker-card.js';

const attributes = {};
const properties = {};

const stickersName = {
  "s1": "Kitty eyes",
  "s2": "Kitty drink",
  "s3": "Kitty lick",
  "s4": "Kitty mrrr",
  "s5": "Kitty dance",
  "s6": "Kitty"
}

const style = css`
  :host {
    display: inline-block;
    box-shadow: 0 2px 5px 1px rgb(0 0 0 / 20%);
    border-radius: 15px;
    width: 100%;
  }
  .stickerBody {
    width: 100%;
  }
  slot {
    display: none;
  }`;

/** StickerItem {StickerListItem} @class @ui @component <sticker-list-item />
  * description
  */
export default class StickerListItem extends Component {
  static template = html`
      <template>
        <style>${style}</style>
        <div id="stickerBody">

        </div>
        <slot></slot>
      </template>`;

  /** Создание компонента {StickerListItem} @constructor
    * @param {type} store param-description
    */
  constructor(sticker) {
    super();
    if (!sticker) return;
    this.store({ sticker });
    this.innerText = sticker.id;
  }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {StickerListItem} #this текущий компонент
    */
  mount(node) {
    super.mount(node, attributes, properties);

    const { sticker } = this.store();
    const text = sticker.id;

    const stickerComponent = new AppSticker(sticker);

    $('#stickerBody', node).addEventListener("click", (e) => {
      console.log("item", e);
      locator.channel.send('drawer-open', {
        page: new StickerCard(sticker),
        params: {
          title: stickersName[text]
        }
      });
    });

    $("#stickerBody", node).append(stickerComponent);
    return this;
  }


}

Component.init(StickerListItem, 'sticker-list-item', { attributes, properties });
