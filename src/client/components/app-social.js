import Component, { html, css } from '../class/Component.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: flex;
    justify-content: space-evenly
  }`;

/** Соц Сети {AppSocial} @class @ui @component <app-social />
  * description
  */
  export default class AppSocial extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div>
          <a href="#" target="_blank">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#fff"></circle>
              <path
                d="M15.233 4H8.767A4.772 4.772 0 004 8.766v6.467A4.772 4.772 0 008.766 20h6.467A4.772 4.772 0 0020 15.233V8.767A4.772 4.772 0 0015.233 4zm3.157 11.233a3.157 3.157 0 01-3.157 3.157H8.767a3.157 3.157 0 01-3.156-3.157V8.767A3.157 3.157 0 018.766 5.61h6.467a3.157 3.157 0 013.157 3.156v6.467z"
                fill="url(#Instagram_svg__paint0_linear)"></path>
              <path
                d="M12 7.862A4.143 4.143 0 007.862 12 4.143 4.143 0 0012 16.138 4.143 4.143 0 0016.138 12 4.143 4.143 0 0012 7.862zm0 6.667a2.529 2.529 0 110-5.058 2.529 2.529 0 010 5.058z"
                fill="url(#Instagram_svg__paint1_linear)"></path>
              <path d="M16.146 8.884a.992.992 0 100-1.983.992.992 0 000 1.983z" fill="url(#Instagram_svg__paint2_linear)">
              </path>
              <defs>
                <linearGradient id="Instagram_svg__paint0_linear" x1="12" y1="19.953" x2="12" y2="4.124"
                  gradientUnits="userSpaceOnUse">
                  <stop stop-color="#E09B3D"></stop>
                  <stop offset="0.3" stop-color="#C74C4D"></stop>
                  <stop offset="0.6" stop-color="#C21975"></stop>
                  <stop offset="1" stop-color="#7024C4"></stop>
                </linearGradient>
                <linearGradient id="Instagram_svg__paint1_linear" x1="12" y1="19.953" x2="12" y2="4.124"
                  gradientUnits="userSpaceOnUse">
                  <stop stop-color="#E09B3D"></stop>
                  <stop offset="0.3" stop-color="#C74C4D"></stop>
                  <stop offset="0.6" stop-color="#C21975"></stop>
                  <stop offset="1" stop-color="#7024C4"></stop>
                </linearGradient>
                <linearGradient id="Instagram_svg__paint2_linear" x1="16.146" y1="19.953" x2="16.146" y2="4.124"
                  gradientUnits="userSpaceOnUse">
                  <stop stop-color="#E09B3D"></stop>
                  <stop offset="0.3" stop-color="#C74C4D"></stop>
                  <stop offset="0.6" stop-color="#C21975"></stop>
                  <stop offset="1" stop-color="#7024C4"></stop>
                </linearGradient>
              </defs>
            </svg></a>
        </div>
        <div>
            <a href="#" target="_blank">
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12c0-6.628-5.372-12-12-12S0 5.372 0 12c0 5.99 4.388 10.955 10.125 11.855v-8.386H7.078V12h3.047V9.356c0-3.007 1.79-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.926-1.955 1.875V12h3.328l-.532 3.469h-2.796v8.386C19.613 22.955 24 17.99 24 12z" fill="#1877F2"></path>
                    <path d="M16.671 15.469L17.203 12h-3.328V9.75c0-.95.464-1.875 1.955-1.875h1.514V4.922s-1.374-.234-2.686-.234c-2.742 0-4.533 1.661-4.533 4.668V12H7.078v3.469h3.047v8.386a12.071 12.071 0 003.75 0v-8.386h2.796z" fill="#fff"></path>
                </svg>
            </a>
        </div>
        <div>
            <a href="#" target="_blank">
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.316 0h7.368C22.408 0 24 1.592 24 8.316v7.368C24 22.408 22.408 24 15.684 24H8.316C1.592 24 0 22.408 0 15.684V8.316C0 1.592 1.592 0 8.316 0z" fill="#4680C2"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.616 7.66c.119-.372 0-.643-.525-.643h-1.745c-.44 0-.643.237-.762.491 0 0-.897 2.168-2.15 3.574-.407.406-.593.542-.814.542-.118 0-.27-.136-.27-.508V7.644c0-.44-.136-.644-.509-.644h-2.744c-.27 0-.44.203-.44.407 0 .423.627.525.694 1.71v2.575c0 .559-.101.66-.321.66-.593 0-2.033-2.185-2.897-4.675C6.964 7.188 6.795 7 6.354 7H4.593C4.085 7 4 7.237 4 7.491c0 .458.593 2.761 2.76 5.81 1.44 2.083 3.49 3.2 5.336 3.2 1.118 0 1.253-.253 1.253-.677V14.25c0-.508.102-.593.458-.593.254 0 .711.136 1.744 1.135 1.186 1.186 1.389 1.728 2.05 1.728h1.744c.508 0 .745-.254.61-.745-.153-.492-.728-1.203-1.474-2.05-.406-.474-1.016-1-1.202-1.253-.254-.339-.187-.475 0-.78-.017 0 2.117-3.014 2.337-4.03z" fill="#fff"></path>
                </svg>
            </a>
        </div>
        <div class="MuiGrid-root MuiGrid-item">
          <a href="#" target="_blank">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12z" fill="red"></path>
              <path d="M18.133 9.037A1.625 1.625 0 0017 7.875C16.003 7.6 12 7.6 12 7.6s-4.003 0-5 .275c-.552.15-.985.596-1.133 1.162C5.6 10.06 5.6 12.2 5.6 12.2s0 2.138.267 3.163c.148.566.581 1.011 1.132 1.162C7.997 16.8 12 16.8 12 16.8s4.003 0 5-.275c.552-.15.985-.596 1.133-1.162.267-1.025.267-3.163.267-3.163s0-2.138-.267-3.163" fill="#fff"></path>
              <path d="M10.8 14.4v-4l3.2 2-3.2 2z" fill="red"></path>
            </svg>
          </a>
        </div>
      </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {AppSocial} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      return this;
    }


  }

Component.init(AppSocial, 'app-social', { attributes, properties });
