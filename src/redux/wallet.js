import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    account: JSON.parse(localStorage.getItem("account")) || null,
    balance: JSON.parse(localStorage.getItem("balance")) || null,
    isLoading: false
}

export const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        walletConnect: (state, action) => {
            state.isLoading = true;
            state.account = action.payload;
            localStorage.setItem('account', JSON.stringify(state.account))
        },
        getBalance: (state, action) => {
            state.isLoading = true;
            state.balance = action.payload;
            localStorage.setItem('balance', JSON.stringify(state.balance))
        },
        remove: (state, action) => {
            state.account = null;
            state.balance = null;
            localStorage.setItem('account', JSON.stringify(state.account))
            localStorage.setItem('balance', JSON.stringify(state.balance))

        }

    }
})

export const { walletConnect, getBalance, remove } = walletSlice.actions;
export default walletSlice.reducer;