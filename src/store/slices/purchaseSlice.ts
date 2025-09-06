import { Purchase, PurchasesState } from "@/types/purchaseProps";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: PurchasesState = {
  purchasesList: [],
  loading: false,
  error: null,
};

const purchasesSlice = createSlice({
  name: "purchases",
  initialState,
  reducers: {
    fetchPurchasesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    setPurchasesList: (state, action: PayloadAction<Purchase[]>) => {
      state.loading = false;
      state.purchasesList = action.payload;
    },
    fetchPurchasesError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetPurchases: (state) => {
      state.purchasesList = [];
      state.error = null;
      state.loading = false;
    },
  },
});

export const { fetchPurchasesStart, setPurchasesList, fetchPurchasesError, resetPurchases } =
  purchasesSlice.actions;
export default purchasesSlice.reducer;
