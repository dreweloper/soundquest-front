 import { Cookies } from 'react-cookie';

 /**
  * Instance of the 'Cookies' class imported from the 'react-cookie' package.
  * @type {Object}
  */
 const cookies = new Cookies;

/**
 * Set a cookie value.
 * 
 * @function setCookie
 * @param {String} name - Cookie name.
 * @param {(String|Object)} value - Cookie value. It can be a string or an object to be stringified.
 * @returns {void} - Saves the cookie with the specified name and value.
 */
 export const setCookie = (name, value) => {

   /**
    * Options for setting the cookie.
    * @type {Object}
    * @property {Number} maxAge - Relative max age of the cookie from when the client receives it in seconds.
    * @property {Boolean} secure - Determines if the cookie is only accessible through HTTPS.
    * @property {String} sameSite - Strict or Lax enforcement for the same-site cookie attribute.
    */
   const options = {
      maxAge: 3600,
      secure: true,
      sameSite: 'strict'
   };

    return cookies.set(name, value, options);

 }; //!SETCOOKIE

/**
 * Get a cookie value
 * 
 * @function getCookie
 * @param {String} name - Cookie name.
 * @returns {String|undefined} - The value of the cookie if found, otherwise undefined.
 */
 export const getCookie = (name) => {

    return cookies.get(name);

 }; //!GETCOOKIE