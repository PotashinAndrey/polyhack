import locator from './locator.js';
import Channel from '../class/Browser.js';
import Router from '../class/Router.js';
import Storage from '../class/Storage.js';

import PageRegistration from "../pages/page-registation.js";
import PageLogin from "../pages/page-login.js";
import PageMain from "../pages/page-main.js";
import PageStickers from '../pages/page-stickers.js';
import PageCamera from '../pages/page-camera.js';
import PageFriends from '../pages/page-friends.js';
import PageProfile from '../pages/page-profile.js';
import PageDonate from '../pages/page-donate.js';
import PageSuccess from '../pages/page-success.js';

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/service-worker.js')
//     .then(reg => console.log('service worker registered'))
//     .catch(err => console.log('service worker not registered', err));
// }

main();

/** Инициализация приложения
  */
  async function main() {
    const standalone =
         window.navigator.standalone // on iOS Safari
      || window.matchMedia?.('(display-mode: standalone)')?.matches // on Android Chrome
      || false;

    // if (standalone) alert('PWA');

    const channel = new Channel();

    const router = routing();

    locator.services = {
      storage: new Storage(),
      channel,
      router,
      go: (path) => {
        if (!(path instanceof Array)) path = [path];
        // router.path(path);
        window.location.hash = path;
      }
      // storage
    };

    router.callback((e) => {
      // console.log("ROUTE CALLBACK", e);
      const path = window.location.hash.replace(/^#/, '').split('/');
      channel.send('app-routing', path);
    }).start();

    const getInfo = async () => {
      const id = 1;

      const response = await fetch(`/api/person?id=${id}`, {
        method: "GET",
        body: null,
        headers: {}
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) throw new Error(data.message || 'something went wrong in request');

      const person = data.data;

      if (locator.storage.get("personInfo") || !person) return;
      locator.storage.set("personInfo", person);
    }

    getInfo();
  }

// #region [Private]
/** routing */
  function routing() {
    const root = document.body;
    const router = Router.hash(root)
      .route({
        path: 'login',
        node: 'page-login',
        // default: true
        // callback: (element, options, route, router) => {
        //   if (options.location.length > 1) {
        //     const x = element.shadowRoot.querySelector('#' + options.location[1]).getBoundingClientRect().top;
        //     window.scrollTo({ top: x - 100 });
        //   }
        // }
      })
      // .route({
      //   path: 'register',
      //   node: 'page-registration'
      // })
      .route({
        name: 'main',
        node: 'page-main',
        default: true,
        nesting: new Router()
          .route({
            path: 'camera',
            node: 'page-camera',
            default: true
          })
          .route({
            path: 'donate',
            node: 'page-donate',
          })
          .route({
            path: 'success',
            node: 'page-success'
          })
          .route({
            path: 'stickers',
            node: 'page-stickers'
          })
          .route({
            path: 'friends',
            node: 'page-friends'
          })
          .route({
            path: 'profile',
            node: 'page-profile'
          })
      });

    return router;
  }
// #endregion

// PWA custom install
// window.addEventListener('beforeinstallprompt', e => {
//   e.preventDefault();
//   e.prompt();
// });
