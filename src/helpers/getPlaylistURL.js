/**
 * Filters the array to get the playlist object and then maps it to get the Spotify URL of the playlist.
 * 
 * @function getPlaylistURL
 * @param {Array.<Object>} arr - An array containing objects for each user's playlist.
 * @param {String} id - The random playlist ID returned by the function 'shuffleArray'.
 * @returns {String} - The Spotify URL of the playlist.
 */
export const getPlaylistURL = (arr, id) => {

    return arr.filter(item => item.id == id).map(item => item.external_urls.spotify).toString();

};