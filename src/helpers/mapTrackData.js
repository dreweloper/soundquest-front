/**
 * Map track data from different sources to a standardized format.
 * @function mapTrackData
 * @param {String} source - The source from which the data is received ('spotify' or 'mongodb').
 * @param {Object} data - The data object received from the respective source.
 * @returns {Object} The standardized track object with properties: album, artwork, artist, name, and track_url.
 * @throws {Error} If the source parameter is not 'spotify' or 'mongodb'.
 */
export const mapTrackData = (source, data) => {

    switch (source) {

        case 'spotify':
            /**
             * Map track data received from Spotify Web API to a standardized format.
             * @type {Object}
             */
            return {
                album: data.album.name,
                artwork: data.album.images[0].url,
                artist: data.artists[0].name,
                name: data.name,
                track_url: data.external_urls.spotify
            };

        case 'mongodb':
            /**
             * Map track data received from MongoDB to a standardized format.
             * @type {Object}
             */
            return {
                album: data.track.album,
                artwork: data.track.artwork,
                artist: data.track.artist,
                name: data.track.name,
                track_url: data.track.track_url
            };

        default:
            throw new Error("Invalid source. Use 'spotify' or 'mongodb' as the source parameter.");

    };

};