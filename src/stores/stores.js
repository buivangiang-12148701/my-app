import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./reducers/root.reducer";
import {clientAuthentication} from "../apis/base.api";
import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";

const saveAuthToken = store => next => action => {
    // continue processing this action
    if (action.type === "token/login/fulfilled") {
        const {access_token} = action.payload;
        clientAuthentication.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    }
    return next(action);
}

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
        {
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        },
    ).concat([saveAuthToken]),
});

const persistor = persistStore(store, {}, () => {
    const state = store.getState();
    const {token: {accessToken}} = state;
    if(accessToken) {
        clientAuthentication.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }

});

export {
    store,
    persistor
}

