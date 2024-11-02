import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import shopReducer from "./slices/shopSlice";
import cartsReducer from "./slices/cartsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        shop: shopReducer,
        carts: cartsReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
