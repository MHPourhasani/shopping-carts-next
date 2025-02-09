import { IUser } from "@/interfaces/general";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    user: IUser | null;
}

const initialState: InitialState = {
    user: null,
};

export const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

// Exports all actions
export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
