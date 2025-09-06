import { AppDispatch } from "@/store";
import {
  fetchPurchasesStart,
  setPurchasesList,
  fetchPurchasesError,
} from "@/store/slices/purchaseSlice";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/purchase/confirm_Purchases";

export const fetchPurchases = () => async (dispatch: AppDispatch) => {
  dispatch(fetchPurchasesStart());
  try {
    const res = await fetch(API_URL, {
      headers: { accept: "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    dispatch(setPurchasesList(data));
  } catch (error: unknown) {
    dispatch(
      fetchPurchasesError(
        (error as Error).message || "Error desconocido al cargar las compras (contacta al programador)."
      )
    );
  }
};
