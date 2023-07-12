/**
 * This function maps the array to obtain the IDs of each playlist and returns a random one.
 * @function randomPlaylist
 * @param {Array} arr It contains an object for each user's playlist.
 * @returns {String} A random ID of a user's playlist.
 */
export const randomPlaylist = (arr) => {

    /**
     * @type {Array} Every ID of user's playlists.
     */
    const playlists = arr.map(item => item.id);

    /**
     * @type {Number} A random number between 0 and the length of playlists array.
     */
    const index = Math.floor(Math.random() * playlists.length);

    return playlists[index];

}; //!RANDOMPLAYLIST

/**
 * This function maps the array to obtain the IDs of each track and returns a random one.
 * @function randomTrack
 * @param {Array} arr It contains an object for each playlist's track.
 * @returns {String} A random ID of the playlist's track.
 */
export const randomTrack = (arr) => {

    /**
     * @type {Array} ID of every playlist's track.
     */
    const tracks = arr.map(item => item.track.id);

    /**
     * @type {Number} A random number between 0 and the length of tracks array.
     */
    const index = Math.floor(Math.random() * tracks.length);

    return tracks[index];

}; //!RANDOMTRACK

