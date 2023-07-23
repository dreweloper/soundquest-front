import { createSlice } from '@reduxjs/toolkit';

export const likeSlice = createSlice({

    name: 'like',
    initialState: false,
    reducers: {
        setLike: (state) => {
            state = true;
        },
        setDislike: (state) => {
            state = false;
        }
    }

});

export const { setLike, setDislike } = likeSlice.actions;