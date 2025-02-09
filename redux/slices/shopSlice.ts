import { IShop } from "@/interfaces/general";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    shop: IShop | null;
}

const initialState: InitialState = {
    shop: null,
};

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        setShop: (state, action) => {
            state.shop = action.payload;
        },
    },
});

// Exports all actions
export const { setShop } = shopSlice.actions;

export default shopSlice.reducer;
