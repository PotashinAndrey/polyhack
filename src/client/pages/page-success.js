import Component, { html, css } from '../class/Component.js';
import AppSticker from '../components/app-sticker.js';
import AppSocial from '../components/app-social.js';
import AppButton from '../components/app-button.js';
import $, { updateChildrenText } from '../class/DOM.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
    padding: 10px !important;
  }
  app-social {
    margin: 10px 0;
  }
  .text {
    display: block;
    text-align: center;
    font-size: 30px;
    text-decoration: none;
  }
  .social {
    box-shadow: 0 2px 5px 1px rgb(0 0 0 / 20%);
    padding: 10px 0px;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    margin: auto;
    margin-top: 8px;
  }
  .allStickersBtn {
    margin: auto;
    margin-top: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 5px 1px rgb(0 0 0 / 20%);
  }
  .allStickersBtn .text {
    color: white;
  }
  .socialLabel {
    text-align: center;
    margin-bottom: 0px;
  }
  slot {
    display: block;
  }`;

/** Успешный донат {PageSuccess} @class @ui @component <page-success />
  * description
  */
  export default class PageSuccess extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div class="text">Congratulations! You did a good deed and got a sticker !</div>
        <div id="sticker"></div>
        <slot></slot>
        <div class="text">Share with your friends!</div>
        <app-button secondary wide class="allStickersBtn" id="camera-access">
          <a class="text" href="#main/stickers">
            My stickers collection
          </a>
        </app-button>
        <app-button primary wide class="allStickersBtn" id="camera-access">
          <a class="text" href="#">
            Donate more
          </a>
        </app-button>
        <p class="socialLabel">Share in social media</p>
        <app-social class="social"></app-social>
      </template>`;

  // /** Создание компонента {PageSuccess} @constructor
  //   // * @param {type} store param-description
  //   */
  //   constructor(store) {
  //     super();
  //     this.store({ store });
  //   }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {PageSuccess} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      // const { store } = this.store();
      this.addEventListener('component-routing', e => {
        const location = e?.detail?.options?.location || [];
        console.log('route', location);
        const sticker = new AppSticker({
          id: location[1],
          paused: false
        });
        $('#sticker', node).appendChild(sticker);
      });
      return this;
    }


  }

Component.init(PageSuccess, 'page-success', { attributes, properties });
