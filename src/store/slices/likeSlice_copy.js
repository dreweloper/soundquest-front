import { createSlice } from '@reduxjs/toolkit';

export const likeSlice = createSlice({

    name: 'like',
    initialState: {
        isLiked: false,
        isLikeSnackBarOpen: false,
        likesCounter: 0,
        likeError: false
    },
    reducers: {
        setLike: (state) => {
            state.isLiked = true;
            state.isLikeSnackBarOpen = true;
        },
        updateLikesCounter: (state, { payload }) => {
            state.likesCounter = payload;
        },
        setLikeError: (state) => {
            state.likeError = true;
            state.isLikeSnackBarOpen = true;
        },
        setDislike: (state) => {
            state.isLiked = false;
            // En caso de que el usuario haya cerrado antes el SnackBar directamente desde el botón 'x'.
            state.isLikeSnackBarOpen = state.isLikeSnackBarOpen && false;
        },
        closeLikeSnackBar: (state) => {
            // En caso de que el usuario haya cerrado antes el SnackBar desde el botón 'dislike'.
            state.isLikeSnackBarOpen = state.isLikeSnackBarOpen && false;
        },
        clearLikeError: (state) => {
            state.likeError = false; //! pendiente saber dónde se va a utilizar
        }
    }

});

export const {
    setLike,
    setLikeError,
    updateLikesCounter,
    setDislike,
    closeLikeSnackBar,
    clearLikeError
} = likeSlice.actions;