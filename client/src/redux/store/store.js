import { combineReducers, configureStore } from "@reduxjs/toolkit";
//import userSlice from "../slice/userSlice";
import userReducer from "../slice/userSlice";

import { persistReducer, persistStore } from 'redux-persist'

import storage from "redux-persist/lib/storage";



const rootReducer = combineReducers({
    user: userReducer //// user comes from name (userSlice.js)
})

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)



export const store = configureStore({

    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})


export const persistor = persistStore(store)

// export const store = configureStore({

//     reducer: {

//         user: userReducer // user comes from name (userSlice.js)

//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//         serializableCheck: false,
//     })
// })