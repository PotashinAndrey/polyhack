import Component, { html, css } from '../class/Component.js';
import AppSticker from './app-sticker.js';
import SameSticker from './friends-same-sticker.js';
import AppSocial from './app-social.js';
import AppButton from './app-button.js';
import Progress from './progress-indicator.js';
import locator from '../script/locator.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
  }
  .donationCount {
    text-align: center;
    margin-top: 5px;
  }
  .noSticker {
    text-align: center;
    margin: 10px 0;
  }
  .social {
    box-shadow: 0 2px 5px 1px rgb(0 0 0 / 20%);
    padding: 10px 0px;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-items: center;
    width: 80%;
    margin: auto;
    margin-top: 8px;
  }
  .counter {
    width: 80%;
    margin: auto;
    margin-top: 10px;
  }
  .donateInfo {
    font-size: 24px;
    text-align: center;
  }
  .submitBtn {
    text-align: center;
    margin-top: 15px;
  }
  .socialLabel {
    text-align: center;
    margin-bottom: 0px;
  }
  .sameStickerBlock {
    box-shadow: 0 2px 5px 1px rgb(0 0 0 / 20%);
    border-radius: 10px;
    width: 80%;
    margin: auto;
    padding: 10px;
    margin-top: 10px;
  }
  #price {
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
  }
  slot {
    display: block;
  }`;

/** StickerCard {StickerCard} @class @ui @component <sticker-card />
  * description
  */
  export default class StickerCard extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {StickerCard} @constructor
    * @param {type} store param-description
    */
    constructor(sticker) {
      super();
      this.store({ sticker });
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {StickerCard} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const { sticker } = this.store();

      if (sticker.paused) {
        const donateInfo = document.createElement('div');
        donateInfo.innerText = "Help reserve to maintain wild animals";
        donateInfo.classList.add('donateInfo');
        node.appendChild(donateInfo);
      }

      const stickerElem = new AppSticker(sticker);
      node.appendChild(stickerElem);

      if (!sticker.paused) {
        const info = document.createElement("div");
        info.innerText = "You donated 20$!";
        info.classList.add("donationCount");
        node.appendChild(info);

        const sameSticker = new SameSticker();
        sameSticker.classList.add("sameStickerBlock");
        node.appendChild(sameSticker);

        const progressIndicator = new Progress({
          amount: 1630,
          aim: 5000
        });
        progressIndicator.classList.add("counter");
        node.appendChild(progressIndicator);

        const buyStickerButton = new AppButton({
          title: 'Donate more'
        });

        buyStickerButton.setAttribute('secondary', true);
        buyStickerButton.classList.add('submitBtn');
        node.appendChild(buyStickerButton);

        const socialLabel = document.createElement("p");
        socialLabel.innerText = "Share in social media"
        socialLabel.classList.add("socialLabel");
        node.appendChild(socialLabel);

        const social = new AppSocial();
        social.classList.add("social");
        node.appendChild(social);

      } else {
        const price = document.createElement("p");
        price.id = "price";
        price.innerText = "199 р.";
        node.appendChild(price);

        const info = document.createElement("div");
        info.innerText = "You don't have this sticker yet";
        info.classList.add('noSticker');
        node.appendChild(info);

        const buyStickerButton = new AppButton({
          title: 'Get sticker!'
        });

        buyStickerButton.setAttribute('secondary', true);
        buyStickerButton.setAttribute('wide', true);
        buyStickerButton.classList.add('submitBtn');
        node.appendChild(buyStickerButton);
        buyStickerButton.addEventListener('click', (event) => {
          locator.go(`main/donate/${sticker.id}/${sticker.paused}`);
        });
      }

      return this;
    }
  }

Component.init(StickerCard, 'sticker-card', { attributes, properties });
