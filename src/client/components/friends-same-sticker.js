import Component, { html, css } from '../class/Component.js';
import $ from '../class/DOM.js';

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
    display: flex;
    justify-content: center;
    gap: 10px;
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
        <div id="notEmpty">
          <div id="counter"></div>
          <div id="imgListFriends"></div>
        </div>
        <div id="empty" style="display: none;">
          None of your friends has this sticker yet
        </div>
      </template>`;

  /** Создание компонента {SameSticker} @constructor
    * @param {type} store param-description
    */
    constructor(store) {
      super();
      this.store(store);
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {SameSticker} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      let { id } = this.store();

      fetch(`/api/sticker?sticker=${id}`, {
        method: "GET",
        body: null,
        headers: {}
      }).then(async (response) => {
        if (!response.ok) return;
        const friends = (await response.json()).data;
        const maxFriends = friends.length > 3 ? 3 : friends.length;
        for (let i = 0; i < maxFriends; i++) {
          const img = document.createElement("img");
          img.src = `images/${friends[i].avatar}`;
  
          $("#imgListFriends", node).appendChild(img);
        }
        if (!friends.length) {
          $('#notEmpty', node).style.display = 'none';
          $('#empty', node).style.display = 'block';
        } else {
          $('#counter', node).innerText = `${friends.length} friends already have this sticker:`;
        }
      });

      return this;
    }


  }

Component.init(SameSticker, 'friends-same-sticker', { attributes, properties });
