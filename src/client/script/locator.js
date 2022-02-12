import Locator from '../class/Locator.js';

/**
  * @typedef {import("../class/Channel.js").default} Channel
  * @typedef {import("../class/Router.js").default} Router
  */

/** {Locator} DI @class @export @default
  *
  */
  export class AppLocator extends Locator {
  /** channel
    * @return {Channel}
    */
    get channel() {
      return this.get('channel');
    }

  /** router
    * @return {Router}
    */
    get router() {
      return this.get('router');
    }

  /** go */
    get go() {
      return this.get('go');
    }
  }

/** @section @export */
  const locator = new AppLocator();
  export default locator;

  // @debug
  // @ts-ignore
  window.locator = locator;
