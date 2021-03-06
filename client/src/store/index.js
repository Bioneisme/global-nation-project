import {configureStore} from "@reduxjs/toolkit"
import {combineReducers} from "redux"
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { persistReducer } from 'redux-persist'
import {userSlice} from "./slices/userSlice"

const reducers = combineReducers({
    user: userSlice.reducer
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export default store