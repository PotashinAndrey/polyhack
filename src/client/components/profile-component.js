import Component, { html, css } from '../class/Component.js';

const attributes = {};
const properties = {};

const style = css`
:host {
  display: grid;
  justify-content: center;
  gap: 10px;
}
.myAvatar {
  margin-top: 25px;
  border-radius: 100%;
}
.nameProfile {
  justify-self: center;
  font-size: 28px;
}
.statusProfile {
  color: #00E009;
  justify-self: center;
}
.donationsProfile {
  display: flex;
  justify-content: space-between;
}
.stickersProfile {
  display: flex;
  justify-content: space-between;
}
  slot {
    display: block;
  }`;

/** Profile {ProfileComponent} @class @ui @component <profile-component />
  * description
  */
  export default class ProfileComponent extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
        <img class="myAvatar" src="../images/Steve_Jobs.jpg">
        <div class="nameProfile">Stieve Jobs</div>
        <div class="statusProfile">Indifferent</div>
        <div class="donationsProfile">
          <p>Donated:</p>
          <p>630</p>
        </div>
        <div class="stickersProfile">
          <p>Stickers count:</p>
          <p>3</p>
        </div>
      </template>`;

  /** Создание компонента {ProfileComponent} @constructor
    * @param {type} store param-description
    */
    constructor(store) {
      super();
      this.store({ store });
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {ProfileComponent} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const { store } = this.store();
      return this;
    }


  }

Component.init(ProfileComponent, 'profile-component', { attributes, properties });
