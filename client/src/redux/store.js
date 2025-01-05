import { combineReducers, configureStore } from '@reduxjs/toolkit'
import AuthSlice from './Slices/AuthSlice'
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["AuthSlice"],// Only persist specific slices
    keyPrefix: ''
};

const rootReducer = combineReducers({
    Auth: AuthSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Needed for redux-persist compatibility
        }),
})

const persistor = persistStore(store);


export { store, persistor }