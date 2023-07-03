 import { Cookies } from 'react-cookie';

 /**
  * @type {Object} Instance of the class 'Cookies' imported from 'react-cookie' package.
  */
 const cookies = new Cookies;

/**
 * Set a cookie value.
 * @function setCookie
 * @param {String} name Cookie name.
 * @param {(string|object)} value Cookie value.
 * @returns Save the value and stringify the object if needed.
 */
 export const setCookie = (name, value) => {

   /**
    * All the cookie options.
    * @typedef {Object} options
    * @property {Number} maxAge Relative max age of the cookie from when the client receives it in seconds.
    * @property {Boolean} secure Is only accessible through HTTPS?
    * @property {(boolean|none|lax|strict)} sameSite Strict or Lax enforcement.
    */
   const options = {
      maxAge: 30,
      secure: true,
      sameSite: 'strict'
   };

    return cookies.set(name, value, options);

 }; //!SETCOOKIE

/**
 * Get a cookie value
 * @function getCookie
 * @param {String} name Cookie name.
 * @returns The value of the cookie.
 */
 export const getCookie = (name) => {

    return cookies.get(name);

 }; //!GETCOOKIE