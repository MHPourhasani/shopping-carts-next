import { ICart } from "@/interfaces/general";
import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { useAppDispatch } from "../hooks";

interface initialState {
    carts: ICart[];
}

const initialState: initialState = {
    carts: [],
};

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const cartsSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        addToCarts: (state, action) => {
            state.carts.push(action.payload);
        },
        setCarts: (state, action) => {
            state.carts = action.payload;
        },
        removeAllCarts: (state) => {
            state.carts = [];
        },
    },
});

// Exports all actions
export const { addToCarts, setCarts, removeAllCarts } = cartsSlice.actions;

export default cartsSlice.reducer;
