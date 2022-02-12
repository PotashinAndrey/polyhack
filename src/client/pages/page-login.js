import Component, { html, css } from '../class/Component.js';
import $, { updateChildrenText } from '../class/DOM.js';
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

          <app-button primary id="button-login">Procede</app-button>
          <app-logo></app-logo>
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

    const submitButton = $('#button-login', node);
    submitButton.addEventListener('click', async () => {
      try {
        const banner = $('app-banner', node);
        if (banner) banner.remove();

        const username = $('input[name="login"]', node).value;
        const password = $('input[name="password"]', node).value;
        // const auth = await Api.post('/authorization/oauth/token', { username, password, grant_type: 'password' }, false);
        // console.log(auth);
        locator.go('main');
      } catch(e) {
        node.appendChild(AppBanner.error(e.message || e.error_description));
      }
    });

    const gotoRegistrationButton = $('#gotoRegister', node);
    gotoRegistrationButton.addEventListener('click', async () => {
      locator.go('register');
    });

    return this;
  }
}

Component.init(PageLogin, 'page-login', { attributes, properties });
