import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    // data: { account: JSON.parse(localStorage.getItem("account")) || null, balance: JSON.parse(localStorage.getItem("balance")) || null },
    // account: JSON.parse(localStorage.getItem("account")) || null,
    // balance: JSON.parse(localStorage.getItem("balance")) || null,
    account: null,
    balance: null,
    contract: null,
    isFetching: false,
    error: false,

}

export const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        getEther: (state, acction) => {
            state.contract = acction.payload
        },
        walletConnect: (state, acction) => {
            state.isFetching = true;
            state.account = acction.payload;
            localStorage.setItem('account', JSON.stringify(state.account))
        },

    }
})

export const { getEther, walletConnect } = walletSlice.actions;
export default walletSlice.reducer;