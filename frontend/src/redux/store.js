import { configureStore, combineReducers} from '@reduxjs/toolkit'
import authReducer from './authSlice'

import requestReducer from "./requestSlice"
import mapReducer from './mapSlice'
import addressReducer from './locationSlice'
import rideReducer from './rideSlice';
import storage from "redux-persist/lib/storage";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

const persistConfig = {
    key: "root",
    version: 1,
    storage
};

const rootReducer = combineReducers({
    auth: authReducer,
    request: requestReducer,
    tripInfo: mapReducer,
    address: addressReducer,
    ride: rideReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
    serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

export let persistor = persistStore(store);

