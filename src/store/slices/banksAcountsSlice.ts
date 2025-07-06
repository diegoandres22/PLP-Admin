import { BanksAcounts } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const BanksAcountsVariabel: BanksAcounts[] = [
    { id: 11, title: 'Banesco', Documento: 28305442, Telefono: 4127325491, Titular: 'Miguel banesco' },
    { id: 12, title: 'Mercantil', Documento: 28305443, Telefono: 4127325492, Titular: 'Juan mercantil' },
    { id: 13, title: 'Santander Rio', Documento: 28305442, Telefono: 4127325491, Titular: 'santander Villegas' },
    { id: 14, title: 'Mercantil', Documento: 28305443, Telefono: 4127325492, Titular: 'Binance Pérez' },
    { id: 15, title: 'Zelle', Documento: 28305442, Telefono: 4127325491, Titular: 'Miguel Zelle' },
    { id: 16, title: 'Santander Rio', Documento: 28305442, Telefono: 4127325491, Titular: 'Banesco Panama' },
    { id: 17, title: 'Bank of America', Documento: 28305443, Telefono: 4127325492, Titular: 'Bank of America' }
];

const initialState: BanksAcounts = { id: 0, title: '', Documento: 0, Telefono: 0, Titular: '' };

const banksAcountsSlice = createSlice({
    name: "banksAcounts",
    initialState,
    reducers: {
        selectAccount: (state, action: PayloadAction<number>) => {
            const selectedAccount = BanksAcountsVariabel.find(account => account.id === action.payload);
            return selectedAccount ? { ...state, ...selectedAccount } : state;
        }
    }
});

export const { selectAccount } = banksAcountsSlice.actions;
export default banksAcountsSlice.reducer;
