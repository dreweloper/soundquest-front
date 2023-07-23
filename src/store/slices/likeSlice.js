import { createSlice } from '@reduxjs/toolkit';

export const likeSlice = createSlice({

    name: 'like',
    initialState: {
        like: false
    },
    reducers: {
        setLike: (state) => {
            state.like = true;
        },
        setDislike: (state) => {
            state.like = false;
        }
    }

});

export const { setLike, setDislike } = likeSlice.actions;