import Component, { html, css } from '../class/Component.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
  }
  .statisticWrapper {
    display: flex;
    justify-content: space-between;
  }
  .progressBody {
    border-radius: 10px;
    box-shadow: 0 2px 5px 1px rgb(0 0 0 / 20%);
    height: 20px;
    box-sizing: border-box;

  }
  #progress {
    background: #00C009;
    border-radius: 10px;
    height: 100%;
  }
  slot {
    display: block;
  }`;

/** Progress {Progress} @class @ui @component <progress-indicator />
  * description
  */
  export default class Progress extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
        <div class="statisticWrapper">
          <p id="gotDonations"></p>
          <p id="aimDonations"></p>
        </div>
        <div class="progressBody">
          <div id="progress"></div>
        </div>
      </template>`;

  /** Создание компонента {Progress} @constructor
    * @param {type} store param-description
    */
    constructor(store) {
      super();
      this.store({ store });
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Progress} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const { store } = this.store();

      const gotDonations = node.getElementById("gotDonations");
      gotDonations.innerText = `Donated: ${store.amount}`;

      const aimDonations = node.getElementById("aimDonations");
      aimDonations.innerText = `Target: ${store.aim}`;

      const progress = node.getElementById("progress");
      const procient = Math.ceil(store.amount / store.aim * 100);
      progress.style.width = `${procient}%`;

      return this;
    }


  }

Component.init(Progress, 'progress-indicator', { attributes, properties });
