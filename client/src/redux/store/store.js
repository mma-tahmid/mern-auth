import { configureStore } from "@reduxjs/toolkit";
//import userSlice from "../slice/userSlice";
import userReducer from "../slice/userSlice";

export const store = configureStore({

    reducer: {

        user: userReducer // user comes from name (userSlice.js) 

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})