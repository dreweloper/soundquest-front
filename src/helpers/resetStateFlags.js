/**
 * Reset multiple state flags by dispatching multiple actions.
 * 
 * @function resetStateFlags
 * @param {Function} dispatch - Redux dispatch function.
 * @param {Array<Function>} actions - Action creators to dispatch.
 * @returns {void}
 */
export const resetStateFlags = (dispatch, actions) => {

    actions.forEach(action => dispatch(action()));

};