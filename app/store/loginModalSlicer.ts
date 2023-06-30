import { createSlice } from "@reduxjs/toolkit";

interface LoginModalState {
    isOpen: boolean;
}

const initialState: LoginModalState = {
    isOpen: false
}

export const loginModalSlice = createSlice({
    name: "loginModal",
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

export const loginModalSliceActions = loginModalSlice.actions;