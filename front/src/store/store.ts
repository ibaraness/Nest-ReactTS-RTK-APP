import { configureStore } from '@reduxjs/toolkit';
import usersUIReducer from "../features/users/usersUISlice";
import { apiSlice } from "../features/api/apiSlice";
import newPostUIReducer from "../features/newPost/newPostUISlice";

export const store = configureStore({
    reducer: {
        usersUI: usersUIReducer,
        newPostUI: newPostUIReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {usersUI, newPostUI, api}
export type AppDispatch = typeof store.dispatch