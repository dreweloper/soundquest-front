/**
 * Maps the array to obtain the IDs of each playlist and returns a random one.
 * 
 * @function randomPlaylist
 * @param {Array.<Object>} arr - An array containing objects for each user's playlist.
 * @returns {String} - A random ID of a user's playlist.
 */
export const randomPlaylist = (arr) => {

    /**
     * @type {Array.<String>} - An array containing every ID of user's playlists.
     */
    const playlists = arr.map(item => item.id);

    /**
     * @type {Number} - A random index between 0 (inclusive) and the length of playlists array (exclusive).
     */
    const index = Math.floor(Math.random() * playlists.length);

    return playlists[index];

}; //!RANDOMPLAYLIST

/**
 * Maps the array to obtain the IDs of each track and returns a random one.
 * 
 * @function randomTrack
 * @param {Array.<Object>} arr - An array containing objects for each playlist's track.
 * @returns {String} - A random ID of the playlist's track.
 */
export const randomTrack = (arr) => {

    /**
     * @type {Array.<String>} - An array containing the ID of every playlist's track.
     */
    const tracks = arr.map(item => item.track.id);

    /**
     * @type {Number} - A random index between 0 (inclusive) and the length of tracks array (exclusive).
     */
    const index = Math.floor(Math.random() * tracks.length);

    return tracks[index];

}; //!RANDOMTRACK