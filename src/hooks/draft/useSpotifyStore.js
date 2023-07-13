import { useDispatch, useSelector } from "react-redux";
import { setPlaylistID, setTokenB, setTrack, setTrackID, startLoading } from '../../store/slices';
import { fetchAPI } from "../../api";
import { getCookie, setCookie } from "../../helpers/cookies";
import { getPlaylistURL, randomPlaylist, randomTrack } from "../../helpers/randomElement";

const urlBase = 'https://api.spotify.com';


export const useSpotifyStore = () => {

    const { token_type, access_token } = useSelector(state => state.token);

    const { token } = useSelector(state => state.spotify);

    const { token_type, access_token } = token; // Destructuring of the properties "token_type" and "access_token" of state's object "token".

    const dispatch = useDispatch();


    const getToken = async () => {

        const url = 'https://accounts.spotify.com/api/token';

        dispatch(startLoading());


        try {

            const cookieToken = getCookie('token');

            if(cookieToken){ // Conditional: if "cookieToken" is not undefined.

                const { token_type, access_token } = cookieToken; // Destructuring of the properties "token_type" and "access_token" of "cookieToken" object.

                return dispatch(setTokenB({ token_type, access_token }));

            };

            const response = await fetchAPI(url, 'POST'); // If "cookieToken" is undefined (because cookieToken doesn't exist or is expired).
            
            if(response.ok){

                const { token_type, access_token } = response.data; // Destructuring of the properties "token_type" and "access_token" of "response.data" object.

                dispatch(setTokenB({ token_type, access_token }));

                setCookie('token', response.data);

            } else {

                throw response; 

            };

        } catch (error) {
            
            console.log(error);

        };

    }; //!GETTOKEN


    const getPlaylistID = async (id) => {

        const authorization = `${token_type} ${access_token}`;

        const url = `${urlBase}/v1/users/${id}/playlists?offset=0&limit=50`;


        try {
            
            const response = await fetchAPI(url, 'GET', authorization);

            if(response.ok){

                const { data } = response;

                const playlist_id = randomPlaylist(data.items);

                const playlist_url = getPlaylistURL(data.items, playlist_id);

                dispatch(setPlaylistID({ playlist_id, playlist_url }));

            } else {

                throw response;

            };

        } catch (error) {
            
            console.log(error);

        };

    }; //!GETPLAYLISTID


    const getTrackID = async (id) => {

        const authorization = `${token_type} ${access_token}`;

        const url = `${urlBase}/v1/playlists/${id}?offset=0&limit=50`;

        
        try {
            
            const response = await fetchAPI(url, 'GET', authorization);

            if(response.ok){

                const { tracks } = response.data;

                const track_id = randomTrack(tracks.items);

                dispatch(setTrackID({ track_id }));

            } else {

                throw response;

            };

        } catch (error) {

            console.log(error);
            
        };

    }; //!GETTRACKID


    const getTrack = async (id) => {

        const authorization = `${token_type} ${access_token}`;

        const url = `${urlBase}/v1/tracks/${id}`;


        try {
            
            const response = await fetchAPI(url, 'GET', authorization);

            if(response.ok){

                const { data } = response;

                const track = {
                    album: data.album.name,
                    artwork: data.album.images[0].url,
                    artist: data.artists[0].name,
                    name: data.name,
                    track_url: data.external_urls.spotify
                };

                const { album, artwork, artist, name, track_url } = track;

                dispatch(setTrack({ album, artwork, artist, name, track_url }));

            } else {

                throw response;

            };

        } catch (error) {
            
            console.log(error);

        };

    }; //!GETCHTRACK


    return {
        getToken,
        getPlaylistID,
        getTrackID,
        getTrack
    };

};