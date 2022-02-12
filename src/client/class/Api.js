/** Работа с API {Api} @class
  */
  export default class Api {
  /** @type {string} */
    static #prefix = '/api';

    static async get(method, data = null) {
      const { path, body, headers } = Api.init(method, data, 'get');
      const options = { method: "get", headers }; // mode: "no-cors"
      const url = body ? path + "?" + body : path;
      return Api.wrap(url, options);
    }

    static async post(method, data = null, isJSON = true) {
      const { path, body, headers } = Api.init(method, data, 'post', isJSON);
      const options = { method: "post", body, headers }; // mode: "no-cors"
      return Api.wrap(path, options);
    }

    static async delete(method, data = null) {
      const { path, headers } = Api.init(method, data, 'delete');
      const options = { method: "delete", headers }; // mode: "no-cors"
      return Api.wrap(path, options);
    }

  /** @section COMMON */
    static path(method, prefix = Api.#prefix) {
      return prefix + method;
    }

    static init(method, data = null, protocol = 'get', isJSON = true) {
      const path = Api.path(method);
      const body = protocol.toLowerCase() === 'get' || !isJSON
        ? data && new URLSearchParams(data).toString() || ''
        : JSON.stringify(data || {});
      const headers = new Headers();
      const type = isJSON ? "application/json" : "application/x-www-form-urlencoded";
      headers.append('Content-Type', type);
      headers.append('Accept', "application/json");
      return { path, body, headers };
    }

    static async wrap(path, options, defaultValue = null) {
      try {
        const response = await fetch(path, options);
        const result = await response.json();
        return response.ok
          ? Promise.resolve(result)
          : Promise.reject(result)
      } catch (e) {
        try {
          const json = JSON.stringify(e.message);
          return Promise.reject(json);
        } catch (e) {
          const value = e.message
            ? { message: e.message }
            : defaultValue;
          return Promise.reject(value);
        }
      }
    }
  }
