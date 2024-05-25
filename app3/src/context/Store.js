import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig =  {
    key : 'root',
    storage,
};

const rootReducer = combineReducers({
    user : userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const Store = configureStore({
    reducer : persistedReducer,
})

const persistor = persistStore(Store);

export { Store , persistor };