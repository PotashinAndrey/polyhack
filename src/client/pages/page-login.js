import Component, { html, css } from '../class/Component.js';
import Get, { updateChildrenText } from '../class/DOM.js';
import Api from '../class/Api.js';
import locator from '../script/locator.js';

import AppLogo from '../components/app-logo.js';
import AppBanner from '../components/app-banner.js';
import AppButton from '../components/app-button.js';

const attributes = {};
const properties = {};

const style = css`
  .login_form {
    padding: 40px;
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
  a {
    cursor: pointer;
    text-decoration: underline;
  }
  .inputPVP {
    border: 1px solid var(--ligth-gray);
    outline: none;
    padding: 10px 12px;
    border-radius: 5px;
    font-size: 18px;
    width: 90%;
  }
  .inputPVP:focus {
    border-color: var(--bell-red);
  }
  #button-login {
    margin-top: 18px;
  }
  :host {
    height: 100vh;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
  }`;

/** Login {PageLogin} @class @ui @component <page-login />
  * description
  */
export default class PageLogin extends Component {
  static template = html`
      <template>
        <style>${style}</style>
        <div class="login_form">
          <p>У вас еще нет аккаунта? <a id="gotoRegister">Sign up</a></p>
          <input class="inputPVP" name="login" value="potashin@ro.ru" placeholder="Введите Ваш email" />
          <input class="inputPVP" name="password" value="Qwerty12" placeholder="Введите Ваш пароль" />

          <app-button primary id="button-login">Login</app-button>
          <app-button primary id="button-login-facebook">Login via facebook</app-button>
        </div>
      </template>`;

  constructor() {
    super();
    this.counter = 0;
  }
  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {PageLogin} #this текущий компонент
    */
  mount(node) {
    super.mount(node, attributes, properties);

    $(node).ready(function() {
      $.ajaxSetup({ cache: true });
      $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
        FB.init({
          appId: '460541079084054',
          version: 'v2.7'
        });
        // FB.getLoginStatus((e) => {console.log(e);});
      });
    });

    const facebookLoginBtn = Get('#button-login-facebook', node);
    facebookLoginBtn.addEventListener('click', async () => {
      FB.getLoginStatus((statusResponse) => {
        if (statusResponse.status === 'connected') {
          locator.go('main');
          return;
        }
        FB.login((loginResponse) => {
          if (loginResponse.status === 'connected') {
            console.log(loginResponse, 'success');
            locator.storage.set('authData', loginResponse.authResponse);
            locator.go('main');
          } else {
            console.log(loginResponse, 'error');
          }
        }, {scope: 'public_profile,user_friends'});
      });
    });

    const gotoRegistrationButton = Get('#gotoRegister', node);
    gotoRegistrationButton.addEventListener('click', async () => {
      locator.go('register');
    });

    return this;
  }
}

Component.init(PageLogin, 'page-login', { attributes, properties });
