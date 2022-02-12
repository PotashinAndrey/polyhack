import Component, { html, css } from '../class/Component.js';
import $ from '../class/DOM.js';
import Progress from '../components/progress-indicator.js';
import AppButton from '../components/app-button.js';

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

/** Profile {PageProfile} @class @ui @component <page-profile />
  * description
  */
export default class PageProfile extends Component {
  static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
        <img class="myAvatar" src="../images/Steve_Jobs.jpg">
        <div class="nameProfile">Стив Джобс</div>
        <app-button secondary wide id="vk_auth">Login via Facebook</app-button>
        <div class="statusProfile">Good guy</div>
        <div class="donationsProfile">
          <p>Donated:</p>
          <p>1630</p>
        </div>
        <div class="stickersProfile">
          <p>Stickers count:</p>
          <p>5</p>
        </div>
      </template>`;

  // /** Создание компонента {PageProfile} @constructor
  //   * @param {type} store param-description
  //   */
  // constructor(store) {
  //   super();
  //   this.store({ store });
  // }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {PageProfile} #this текущий компонент
    */
  mount(node) {
    super.mount(node, attributes, properties);

    const { store } = this.store();

    // @ts-ignore
    if (window.VK) {
      const vk_auth = $('#vk_auth', node);
      VK.init({ apiId: 1914120 });
      // @ts-ignore
      // VK.Widgets.Auth(vk_auth, {
      //   onAuth: function(data) {
      //     alert('user '+data['uid']+' authorized');
      //   }
      // });
      vk_auth.addEventListener('click', () => VK.Auth.login(function(response) {
        if (response.session) {
          /* Пользователь успешно авторизовался */
          console.log(response);
          alert('user '+response.session['uid']+' authorized');
          if (response.settings) {
            /* Выбранные настройки доступа пользователя, если они были запрошены */
          }
        } else {
          /* Пользователь нажал кнопку Отмена в окне авторизации */
        }
      }));
    }

    return this;
  }


}

Component.init(PageProfile, 'page-profile', { attributes, properties });
