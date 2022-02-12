import Component, { html, css } from '../class/Component.js';
import $ from '../class/DOM.js';
import { friendList } from '../pages/page-friends.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: grid;
    margin-top: 15px;
    justify-content: center;
  }
  img {
    border-radius: 100%;
    width: 60px;
    height: 60px;
  }
  #imgListFriends {
    margin-top: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
  }
  slot {
    display: block;
  }`;

/** name {SameSticker} @class @ui @component <friends-same-sticker />
  * description
  */
  export default class SameSticker extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div>3 friends already have this sticker:</div>
        <div id="imgListFriends">

        </div>
      </template>`;

  /** Создание компонента {SameSticker} @constructor
    * @param {type} store param-description
    */
    constructor(store) {
      super();
      this.store({ store });
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {SameSticker} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const { store } = this.store();

      for (let i = 0; i < 3; i++) {
        const img = document.createElement("img")
        img.src = friendList[i].avatar;

      $("#imgListFriends", node).appendChild(img);


      }

      return this;
    }


  }

Component.init(SameSticker, 'friends-same-sticker', { attributes, properties });
