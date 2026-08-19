
import { configureStore } from "@reduxjs/toolkit";
import raffleSlice from "./slices/rafflesSlice";
import banksAcounts from "./slices/banksAcountsSlice";
import purchaseSlice from "./slices/purchaseSlice";

// rateBcvSlice se retiró junto con el widget "Tasa BCV" (ver miniBar.tsx):
// el valor era fijo y su reducer nunca mutaba el estado. El archivo quedó
// movido a _to_delete/ por si se quiere recuperar al conectarlo a una API real.
export const store = configureStore({
  reducer: {
    Raffles: raffleSlice,
    BanksAcounts: banksAcounts,
    Purchases: purchaseSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


