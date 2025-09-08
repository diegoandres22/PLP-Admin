
import { configureStore } from "@reduxjs/toolkit";
import rateBcvSlice from "./slices/rateBcvSlice";
import raffleSlice from "./slices/rafflesSlice";
import banksAcounts from "./slices/banksAcountsSlice";
import purchaseSlice from "./slices/purchaseSlice";

export const store = configureStore({
  reducer: {
    RateBcv : rateBcvSlice,
    Raffles: raffleSlice,
    BanksAcounts: banksAcounts,
    Purchases: purchaseSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


