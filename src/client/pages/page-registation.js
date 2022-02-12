import Component, { html, css } from '../class/Component.js';
import $ from '../class/DOM.js';
import Api from '../class/Api.js';
import locator from '../script/locator.js';

import AppLogo from '../components/app-logo.js';
import AppButton from '../components/app-button.js';
import AppBanner from '../components/app-banner.js';

const attributes = {};
const properties = {};

const style = css`
  .registration_form {
    padding: 40px;
    width: 600px;
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
  :host {
    display: flex;
    justify-content: center;
  }
  a {
    cursor: pointer;
    text-decoration: underline;
  }
  app-logo {
    margin-top: 40px;
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
  #registerBtn {
    margin-top: 18px;
  }
  slot {
    display: block;
  }`;

/** registration {PageRegistration} @class @ui @component <page-registration />
  * description
  */
export default class PageRegistration extends Component {
  static template = html`
      <template>
        <style>${style}</style>
        <div class="registration_form">
          <p>Have an account already? <a id="gotoLogin">Log in</a></p>
          <input class="inputPVP" type="text" name="lastName" placeholder="Surname">
          <input class="inputPVP" type="text" name="firstName" placeholder="Name">
          <input class="inputPVP" type="text" name="middleName" placeholder="MiddleName">
          <input class="inputPVP" type="email" name="email" placeholder="email (nickname)">
          <input class="inputPVP" type="password" name="password" placeholder="Password">
          <app-button primary id="registerBtn">Procede</app-button>
          <app-logo></app-logo>
        </div>
        <slot></slot>
      </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {PageRegistration} #this текущий компонент
    */
  mount(node) {
    super.mount(node, attributes, properties);

    const getFieldValueByName = (fieldName) => $(`input[name="${fieldName}"]`, node).value;

    const submitButton = $('#registerBtn', node);
    submitButton.addEventListener('click', async () => {
      const banner = $('app-banner', node);
      if (banner) banner.remove();

      const lastName = getFieldValueByName('lastName');
      const firstName = getFieldValueByName('firstName');
      const middleName = getFieldValueByName('middleName');
      const email = getFieldValueByName('email');
      const password = getFieldValueByName('password');
      try {
        const response = await Api.post('/authorization/user/registration', {
          firstName,
          lastName,
          middleName,
          email,
          password
        });
        console.log(response);
        const user = await Api.get('/menu/menu');
        locator.go('login');
      } catch(e) {
        // console.error(e);
        node.appendChild(AppBanner.error(e.message));
      }
    });

    const gotoLoginButton = $('#gotoLogin', node);
    gotoLoginButton.addEventListener('click', async () => {
      locator.go('login');
    });

    return this;
  }
}

Component.init(PageRegistration, 'page-registration', { attributes, properties });
