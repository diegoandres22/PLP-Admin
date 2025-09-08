// store/services/banksService.ts
import { AppDispatch } from "@/store";
import { fetchBanksStart, setBanksList, fetchBanksError } from "../slices/banksAcountsSlice";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/bank-accounts/";


export const fetchBanks = () => async (dispatch: AppDispatch) => {
    dispatch(fetchBanksStart()); 
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        dispatch(setBanksList(data));
    } catch (error: string | unknown) {
        dispatch(fetchBanksError((error as Error).message || "Error desconocido al cargar bancos"));
    }
};

export const toggleBankAccount = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await fetch(`${API_URL}${id}/toggle`, {
      method: "PATCH",
      headers: { "accept": "application/json" }
    });
    dispatch(fetchBanks());
  } catch (error: string | unknown) {
    console.error("Error al modificar la cta. de banco:", error);
  }
};
