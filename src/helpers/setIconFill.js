/**
 * Changes the value of the CSS variable '--icon-fill-value' to update the icon fill.
 * 
 * @function setIconFill
 * @param {Number} value - The value of the icon fill, which can be either 1 or 0.
 * @returns {String} - The CSS variable with the new value.
 */
export const setIconFill = (value) => {

    const icon = document.querySelector('#like');

    return icon.style.setProperty('--icon-fill-value', value);

};