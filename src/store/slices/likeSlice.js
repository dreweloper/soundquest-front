import { createSlice } from '@reduxjs/toolkit';

export const likeSlice = createSlice({

    name: 'like',
    initialState: {
        isLiked: false,
        likesCounter: 0,
        likeError: false
    },
    reducers: {
        setLike: (state) => {
            state.isLiked = true;
        },
        setLikeError: (state) => {
            state.likeError = true;
        },
        setDislike: (state) => {
            state.isLiked = false;
        },
        clearLikeError: (state) => {
            state.likeError = false;
        }
    }

});

export const {
    setLike,
    setLikeError,
    setDislike,
    clearLikeError
} = likeSlice.actions;