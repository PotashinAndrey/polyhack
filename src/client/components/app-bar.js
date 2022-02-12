import Component, { html, css } from '../class/Component.js';
import Api from '../class/Api.js';
import $ from '../class/DOM.js';
import locator from '../script/locator.js';

const attributes = {};
const properties = {};

const style = css`
  .a__icon {
    filter: invert(58%) sepia(62%) saturate(7480%) hue-rotate(330deg) brightness(102%) contrast(87%);
    width: 48px;
    height: 48px;
  }
  .active .a__icon {
    filter: invert(100%) sepia(0%) saturate(1%) hue-rotate(122deg) brightness(106%) contrast(101%);
  }
  a svg {
    display: block;
  }
  .active {
    --gradient: var(--main-btn-gradient);
    background: linear-gradient(var(--gradient)) !important;
    color: white !important;
  }
  .menuItem {
    background: white;
    text-decoration: none;
    border-top: 1px solid var(--ligth-gray);
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding: 5px;
    font-size: 12px;
  }
  .menuItem:visited {
    color: black;
  }
  .menuItem:link {
    color: black;
  }
  .menuItem:focus {
    --gradient: var(--main-btn-gradient);
    background: linear-gradient(var(--gradient));
    color: white;
  }
  .menuItem:active {
    --gradient: var(--main-btn-gradient);
    background: linear-gradient(var(--gradient));
    color: white;
  }
  :host {
    display: flex;
    justify-content: space-around;
    /* background-color: whitesmoke; */
    font-family: var(--font);
  }`;

/** Разводное меню {AppBar} @class @ui @component <app-bar />
  * description
  */
export default class AppBar extends Component {
  static template = html`
  <template>
    <style>${style}</style>
    <a id="bar1" class="menuItem" href="#main/camera">
    <svg class="a__icon" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" fill-rule="evenodd" d="M15.7 2c.52 0 .99.06 1.43.2.45.15.87.37 1.24.67.36.28.67.64.96 1.08l.27.4.13.18c.1.13.16.2.24.26.08.07.17.12.28.15.13.04.26.06.57.06h.22c1.2.05 1.87.22 2.59.6.76.4 1.36 1 1.77 1.77.45.83.6 1.63.6 3.24v5.98c0 2.18-.2 3.23-.79 4.32a5.54 5.54 0 01-2.3 2.3c-1.09.59-2.14.79-4.32.79H9.41c-2.18 0-3.23-.2-4.32-.79a5.54 5.54 0 01-2.3-2.3c-.56-1.03-.77-2.03-.79-3.98v-6.6c.02-1.43.18-2.18.6-2.96A4.27 4.27 0 014.37 5.6c.7-.37 1.35-.53 2.45-.58L6.91 5h.27c.31 0 .44-.02.57-.06.11-.03.2-.08.28-.15.1-.09.2-.18.37-.45l.27-.4c.29-.43.6-.79.96-1.07.37-.3.79-.52 1.24-.67.44-.14.91-.2 1.43-.2h3.4zm0 2h-3.4c-.32 0-.6.04-.83.11-.22.07-.4.17-.58.31-.2.16-.38.36-.56.63l-.3.46c-.27.39-.47.61-.72.82-.3.24-.62.42-.98.53-.34.1-.65.14-1.19.14H7.1l-.27.02c-.75.04-1.11.13-1.5.34-.42.22-.74.54-.96.95-.27.5-.36 1-.36 2.3v5.98c0 1.88.14 2.62.55 3.38.34.64.84 1.14 1.48 1.48.68.36 1.34.52 2.82.55h10.3c1.48-.03 2.14-.19 2.82-.55a3.54 3.54 0 001.48-1.48c.36-.68.52-1.34.55-2.82V10.16c-.03-.98-.13-1.4-.36-1.85a2.27 2.27 0 00-.95-.95A3.5 3.5 0 0021 7h-.24c-.48-.01-.77-.05-1.09-.14-.36-.11-.69-.29-.98-.53a3.72 3.72 0 01-.72-.82l-.3-.46a2.78 2.78 0 00-.56-.63 1.74 1.74 0 00-.58-.31c-.23-.07-.5-.11-.83-.11zM14 8.5A5.25 5.25 0 1114 19a5.25 5.25 0 010-10.5zm0 2a3.25 3.25 0 100 6.5 3.25 3.25 0 000-6.5z"></path></svg>
    </a>
    <a id="bar2" class="menuItem" href="#main/stickers">
    <svg class="a__icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M6.84 16.44c.76.06 1.74.06 3.16.06 1.42 0 2.4 0 3.16-.06a3.75 3.75 0 001.43-.32 3.5 3.5 0 001.53-1.53c.15-.29.26-.69.32-1.43l.03-.63-1.3-1.3c-.3-.3-.5-.5-.67-.64a.86.86 0 00-.27-.18.75.75 0 00-.46 0 .86.86 0 00-.27.18c-.16.13-.36.33-.67.64l-2.3 2.3a.75.75 0 01-1.06 0l-.3-.3c-.3-.3-.5-.5-.67-.64a.86.86 0 00-.27-.18.75.75 0 00-.46 0 .86.86 0 00-.27.18c-.16.13-.36.33-.67.64L4.56 15.5c.25.24.53.45.85.6.29.16.69.27 1.43.33zm9.39-6.27l.27.27V10c0-1.42 0-2.4-.06-3.16a3.75 3.75 0 00-.32-1.43 3.5 3.5 0 00-1.53-1.53 3.75 3.75 0 00-1.43-.32A43.2 43.2 0 0010 3.5c-1.42 0-2.4 0-3.16.06-.74.06-1.14.17-1.43.32a3.5 3.5 0 00-1.53 1.53c-.15.29-.26.69-.32 1.43A43.2 43.2 0 003.5 10c0 1.42 0 2.4.06 3.16.04.47.1.8.17 1.05l2.04-2.04.02-.02c.28-.28.52-.52.74-.7.23-.2.47-.37.77-.47.46-.15.94-.15 1.4 0 .3.1.54.27.77.46.16.14.34.3.53.5l1.77-1.77.02-.02c.28-.28.52-.52.74-.7.23-.2.47-.37.77-.47.46-.15.94-.15 1.4 0 .3.1.54.27.77.46.22.19.46.43.74.7zM2.54 4.73C2 5.8 2 7.2 2 10c0 2.8 0 4.2.54 5.27a5 5 0 002.19 2.19C5.8 18 7.2 18 10 18c2.8 0 4.2 0 5.27-.54a5 5 0 002.19-2.19C18 14.2 18 12.8 18 10c0-2.8 0-4.2-.55-5.27a5 5 0 00-2.18-2.19C14.2 2 12.8 2 10 2c-2.8 0-4.2 0-5.27.54a5 5 0 00-2.19 2.19zM7.25 6a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" fill-rule="evenodd"></path></svg>
    </a>
    <a id="bar3" class="menuItem" href="#main/friends">
    <svg class="a__icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M6.25 3.5a3 3 0 100 6 3 3 0 000-6zm-1.5 3a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zM2.69 11.57c.96-.55 2.22-.82 3.56-.82s2.6.27 3.56.82c.98.56 1.69 1.47 1.69 2.68 0 .7-.28 1.3-.78 1.71-.48.39-1.1.54-1.72.54H3.5c-.61 0-1.24-.15-1.72-.54-.5-.4-.78-1-.78-1.71 0-1.21.71-2.12 1.69-2.68zm.75 1.3c-.65.37-.94.84-.94 1.38 0 .3.1.44.22.54.14.11.4.21.78.21H9c.39 0 .64-.1.78-.21.12-.1.22-.25.22-.54 0-.54-.29-1-.94-1.38-.66-.39-1.65-.62-2.81-.62s-2.15.23-2.81.62zM13.75 3.5a3 3 0 100 6 3 3 0 000-6zm-1.5 3a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0z" fill-rule="evenodd"></path><path d="M13.75 12.25c-.23 0-.45.01-.68.03a.75.75 0 11-.14-1.49c.27-.03.54-.04.82-.04 1.34 0 2.6.27 3.56.82.98.56 1.69 1.47 1.69 2.68 0 .7-.28 1.3-.78 1.71-.48.39-1.1.54-1.72.54h-3a.75.75 0 010-1.5h3c.39 0 .64-.1.78-.21.12-.1.22-.25.22-.54 0-.54-.29-1-.94-1.38a5.77 5.77 0 00-2.81-.62z" fill-rule="evenodd"></path></svg>
    </a>
    <a id="bar4" class="menuItem" href="#main/profile">
    <svg class="a__icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M5.84 15.63a6.97 6.97 0 008.32 0 8.2 8.2 0 00-8.32 0zM4.7 14.57a7 7 0 1110.6 0 9.7 9.7 0 00-10.6 0zM10 1.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17zm-1.5 7a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zm1.5-3a3 3 0 100 6 3 3 0 000-6z" fill-rule="evenodd"></path></svg>
    </a>
  </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {AppBar} #this текущий компонент
    */
  mount(node) {
    super.mount(node, attributes, properties);
    // this.main();

    locator.channel.on('app-routing', path => {
      const page = path[1] || 'camera';
      $(`a[href="#main/${page}"]`, node)?.classList?.add('active');
    });


    return this;
  }

  async main() {
    const menu = await Api.get('/menu/menu');
    console.log(menu);
  }
}

Component.init(AppBar, 'app-bar', { attributes, properties });
