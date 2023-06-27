import { createSlice } from "@reduxjs/toolkit";

interface RegisterModalState {
    isOpen: boolean;
}

const initialState: RegisterModalState = {
    isOpen: true
}

export const registerModalSlice = createSlice({
    name: "registerModal",
    initialState,
    reducers: {
        onOpen(state) {
            state.isOpen = true;
        },
        onClose(state) {
            state.isOpen = false;
        }
    }
});

export const registerModalSliceActions = registerModalSlice.actions;