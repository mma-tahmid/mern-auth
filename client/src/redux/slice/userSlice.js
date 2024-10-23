import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    currentUser: null,
    loading: false,
    error: false
}

const userSlices = createSlice({

    name: "user",
    initialState,

    reducers: {

        signInStart: (state) => {
            state.loading = true;
        },

        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },

        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },

        // for Update user
        updateUserStart: (state) => {
            state.loading = true;
        },

        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },

        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


    }
})

export const { signInStart, signInSuccess, signInFailure, updateUserStart, updateUserSuccess, updateUserFailure } = userSlices.actions
export default userSlices.reducer 