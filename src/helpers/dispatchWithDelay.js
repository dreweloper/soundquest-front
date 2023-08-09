/**
 * Dispatches a Redux action with a specified delay using setTimeout.
 * @function dispatchWithDelay
 * @param {Function} dispatch - The Redux dispatch function used to dispatch actions.
 * @param {Function} action - The action creator function that returns the action to be dispatched.
 * @param {Number} [duration=1000] - The setTimeout function duration.
 * @returns {void}
 */
export const dispatchWithDelay = (dispatch, action, duration = 1000) => {

    setTimeout(() => {

        dispatch(action);

    }, duration);

};