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
    const res = await fetch(`${API_URL}${id}/toggle`, {
      method: "PATCH",
      headers: { "accept": "application/json" }
    });

    if (!res.ok) {
      throw new Error(`Error al actualizar cuenta: ${res.statusText}`);
    }

    dispatch(fetchBanks());
  } catch (error) {
    console.error("Error al modificar la cta. de banco:", error);
    throw error;
  }
};

export const createBankAccount = (data: {
  pay_method: string;
  holder_name_cta?: string;
  document_name?: number;
  number_cta_1?: number;
  number_cta_2?: string;
  email_cta?: string;
}) => async (dispatch: AppDispatch) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Error al crear la cuenta: ${res.statusText}`);
    }

    const createdBank = await res.json();
    dispatch(fetchBanks()); // Actualizar lista automáticamente
    return createdBank;
  } catch (error) {
    console.error("Error al crear la cuenta:", error);
    throw error;
  }
};





// export const toggleBankAccount = (id: string) => async (dispatch: AppDispatch) => {
//   try {
//     await fetch(`${API_URL}${id}/toggle`, {
//       method: "PATCH",
//       headers: { "accept": "application/json" }
//     });
//     dispatch(fetchBanks());
//   } catch (error: string | unknown) {
//     console.error("Error al modificar la cta. de banco:", error);
//   }
// };
