import { configureStore, combineReducers} from '@reduxjs/toolkit'
import authReducer from './authSlice'
import startLocationReducer from "./startLocationSlice"
import endLocationReducer from "./endLocationSlice"
import requestReducer from "./requestSlice"
import mapReducer from './mapSlice'
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
    pickup: startLocationReducer, 
    dropoff: endLocationReducer,
    request: requestReducer,
    tripInfo: mapReducer,
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

