import Component, { html, css } from '../class/Component.js';
import locator from '../script/locator.js';
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

// <app-button secondary wide id="vk_auth">Login via Facebook</app-button>

export default class PageProfile extends Component {
  static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
        <img class="myAvatar" src="../images/Steve_Jobs.jpg">
        <div id="name" class="nameProfile">UserName</div>
        <div id="status" class="statusProfile">Status</div>
        <div class="donationsProfile">
          <p>Donated:</p>
          <p id="donated" >0</p>
        </div>
        <div class="stickersProfile">
          <p>Stickers count:</p>
          <p id="count">0</p>
        </div>
        <app-button primary wide id="buttonLogout">Logout</app-button>
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

    const setPersonValues = (info) => {
      const name = node.getElementById("name");
      const status = node.getElementById("status");
      const donated = node.getElementById("donated");
      const count = node.getElementById("count");

      name.innerHTML = `${info.firstName} ${info.lastName}`;
      status.innerHTML = `${info.status}`;
      donated.innerHTML = `${info.donated} $`;
      count.innerHTML = `${info.count}`;
    }

    const setInfo = async () => {
      const person = locator.storage.get("personInfo");

      if (!person) return;

      setPersonValues(person);
    }
    const facebookLogoutBtn = $('#buttonLogout', node);
    facebookLogoutBtn.addEventListener('click', () => {
      FB.getLoginStatus((loginResponse) => {
        if (loginResponse.status === 'connected') {
          FB.logout((logoutResponse) => {
            if (logoutResponse.status === 'unknown' || logoutResponse.status === 'not_authorized') {
              // Выход из учетки фейсбука
              locator.go('login');
              return;
            }
          });
        }
      });

      document.cookie = "";
    });

    // @ts-ignore
    // if (window.VK) {
    //   const vk_auth = $('#vk_auth', node);
    //   VK.init({ apiId: 1914120 });
    //   // @ts-ignore
    //   // VK.Widgets.Auth(vk_auth, {
    //   //   onAuth: function(data) {
    //   //     alert('user '+data['uid']+' authorized');
    //   //   }
    //   // });
    //   vk_auth.addEventListener('click', () => VK.Auth.login(function (response) {
    //     if (response.session) {
    //       /* Пользователь успешно авторизовался */
    //       console.log(response);
    //       alert('user ' + response.session['uid'] + ' authorized');
    //       if (response.settings) {
    //         /* Выбранные настройки доступа пользователя, если они были запрошены */
    //       }
    //     } else {
    //       /* Пользователь нажал кнопку Отмена в окне авторизации */
    //     }
    //   }));
    // }

    setInfo();
    return this;
  }


}

Component.init(PageProfile, 'page-profile', { attributes, properties });
