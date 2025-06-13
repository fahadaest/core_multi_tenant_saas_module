import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './slices/authSlice';
import authReducer from './slices/userSlice';
import { appApi } from './slices/appApis';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [appApi.reducerPath]: appApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware).concat(appApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;