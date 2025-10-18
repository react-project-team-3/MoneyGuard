import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/auth/authSlice';

// PERSIST CONFIG
const authPersistConfig = {
  key: 'auth',              
  storage,                  
  whitelist: ['token'],     
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// STORE
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    // transactions: transactionsReducer
    // statistics: statisticsReducer
    // global: globalReducer
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);