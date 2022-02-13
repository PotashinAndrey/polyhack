import Component, { html, css } from '../class/Component.js';
import $, { updateChildrenText, updateChildrenAttribute } from '../class/DOM.js';
import PageStickers from '../pages/page-stickers.js';
import AppDrawer from './app-drawer.js';

const attributes = {};
const properties = {};

const stickersArray = ["s6", "s5", "s4", "s1", "s2", "s3"];

const badges = {
  'Good guy': '#E0CA00',
  'Sweetheart': '#FF6767',
  'Generous': '#FF0000',
  'Indifferent': '#00E009',
  'Spectator': '#AEAEAE'
}

const style = css`
  :host {
    box-shadow: 0 2px 5px 1px rgb(0 0 0 / 20%);
    border-radius: 15px;
    padding: 5px 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    margin-bottom: 10px;
  }
  #firstName {
    font-size: 18px;
    margin-right: 5px;
  }
  .nameWrapper {
    align-items: baseline;
  }
  #avatar {
    width: 60px;
    height: 60px;
    border-radius: 50px;
    margin-right: 10px;
  }
  #donateAmount, #count {
    margin-left: 5px;
  }
  .flexWrapper {
    display: flex;
  }
  .flexAlignCenter {
    align-items: center;
  }
  .flexAlignBaseline {
    align-items: baseline;
  }
  .flexJustifyBetween {
  }
  slot {
    display: block;
  }`;

/** name {AppFriendCard} @class @ui @component <app-friend-card />
  * description
  */
  export default class AppFriendCard extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div class="flexWrapper flexAlignCenter flexJustifyBetween" style="width: 100%;">
          <img id="avatar" />
          <div>
            <div class="flexWrapper flexAlignBaseline">
              <div id="firstName"></div>
              <div id="status"></div>
            </div>
            <div class="flexWrapper">
              <div>Donated: </div>&nbsp<div id="donated"></div>
            </div>
            <div class="flexWrapper">
            <div>Stickers:</div><div id="count"></div>
            </div>
          </div>
        </div>
      </template>`;

  /** Создание компонента {AppFriendCard} @constructor
    * @param {type} data param-description
    */
    constructor(data) {
      super();
      this.store({ data });
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {AppFriendCard} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const { data } = this.store();
      for (const [key, value] of Object.entries(data)) {
        if (key === 'avatar' ) {
          updateChildrenAttribute(node, `#${key}`, 'src', `../images/${value}`);
        } else if (key === 'donated') {
          updateChildrenText(node, `#${key}`, ` ${value}$`);
        } else {
          updateChildrenText(node, `#${key}`, value);
        }
      }
      $('#status', node).style.color = badges[data.status];
      node.addEventListener('click', (event) => {
        locator.channel.send('drawer-open', {
          page: new PageStickers(this.getFriendStickers()),
          params: {
            title: `Friend's stickers: ${data.firstName}`
          }
        });
      });
      return this;
    }

    getFriendStickers() {
      const myStickers = this.getMyStickers();
      const friendStickers = [];
      let { stickers } = this.store().data;
      for (let i = 0; i < stickers.length; i++) {
        const id = `s${stickers[i]}`;
        friendStickers.push({
          id,
          paused: !myStickers.includes(id)
        });
      }
      return friendStickers;
    }

    getMyStickers() {
      return locator.storage.get('personInfo').stickers.map((stickerId) => `s${stickerId}`);
    }

    getRandomInRange(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }

    declOfNum(number, words) {
      return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
    }
  }

Component.init(AppFriendCard, 'friend-card', { attributes, properties });
