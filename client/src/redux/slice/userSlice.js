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

        // for Delete User

        DeleteUserStart: (state) => {
            state.loading = true;
        },

        DeleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },

        DeleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        SignOut: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        }

    }
})

export const { signInStart, signInSuccess, signInFailure, updateUserStart, updateUserSuccess, updateUserFailure, DeleteUserStart, DeleteUserSuccess, DeleteUserFailure, SignOut } = userSlices.actions
export default userSlices.reducer 