import { BankAccount, BanksState } from "@/types/banksAcountsProps";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState: BanksState = {
    banksList: [],
    selectedBank: null,
    loading: false,
    error: null,
};

const banksSlice = createSlice({
    name: "banks",
    initialState,
    reducers: {
        fetchBanksStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        setBanksList: (state, action: PayloadAction<BankAccount[]>) => {
            state.loading = false;
            state.banksList = action.payload.filter(bank => bank.is_active);
        },
        fetchBanksError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        selectBankById: (state, action: PayloadAction<string>) => {
            const bank = state.banksList.find(b => b.id === action.payload);
            state.selectedBank = bank || null;
        },
        resetSelectedBank: (state) => {
            state.selectedBank = null;
        }
    },
});

export const { fetchBanksStart, setBanksList, fetchBanksError, selectBankById, resetSelectedBank } = banksSlice.actions;
export default banksSlice.reducer;

