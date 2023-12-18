// store.js
import { configureStore } from '@reduxjs/toolkit';
import { auth } from './slices/auth';
import { setupListeners } from '@reduxjs/toolkit/query';
import { orderAPI } from './slices/orders';
import { supplier } from './slices/supplier';
import { fuelStation } from './slices/fuelStation';
import { admin } from './slices/admin';


export const store = configureStore({
    reducer: {
        [auth.reducerPath]: auth.reducer,
        [orderAPI.reducerPath]: orderAPI.reducer,
        [supplier.reducerPath]: supplier.reducer,
        [admin.reducerPath]: admin.reducer,
        [fuelStation.reducerPath]: fuelStation.reducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        auth.middleware,
        orderAPI.middleware,
        supplier.middleware,
        fuelStation.middleware,
        admin.middleware,
    ],
});

// Set up Redux Toolkit Query listeners
setupListeners(store.dispatch);