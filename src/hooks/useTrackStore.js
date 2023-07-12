import { useDispatch, useSelector } from "react-redux";
import { fetchAPI } from "../api";
import { setTrackID } from "../store/slices";
import { randomTrack } from "../helpers";

export const useTrackStore = () => {

    const { token_type, access_token } = useSelector(state => state.token);

    const dispatch = useDispatch();


    const getTrackID = async (id) => {

        const authorization = `${token_type} ${access_token}`;

        const url = `https://api.spotify.com/v1/playlists/${id}?offset=0&limit=50`;

        
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

    };


    return { getTrackID };

};