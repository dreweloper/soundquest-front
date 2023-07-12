/**
 * This function filters the array to get the playlist object and then maps it to get the Spotify URL of the playlist.
 * @function getPlaylistURL
 * @param {Array} arr It contains an object for each user's playlist.
 * @param {String} id The random playlist ID returned by the function 'randomPlaylist'.
 * @returns {String} The Spotify's playlist URL.
 */
export const getPlaylistURL = (arr, id) => {

    return arr.filter(item => item.id == id).map(item => item.external_urls.spotify).toString();

}; //!GETPLAYLISTURL