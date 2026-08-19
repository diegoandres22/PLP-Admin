// store/services/banksService.ts
import { AppDispatch } from "@/store";
import { fetchBanksStart, setBanksList, fetchBanksError } from "../slices/banksAcountsSlice";
import { apiClient, API_BASE_URL } from "@/store/apiClient";

const API_URL = API_BASE_URL + "/bank-accounts/";

// Pública, sin token.
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

// Requiere admin autenticado.
export const toggleBankAccount = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await apiClient.patch(`${API_URL}${id}/toggle`);
    dispatch(fetchBanks());
  } catch (error) {
    console.error("Error al modificar la cta. de banco:", error);
    throw error;
  }
};

export const createBankAccount = (data: {
  pay_method: string;
  holder_name_cta?: string;
  // Identificadores, no cantidades: viajan como texto para no perder
  // ceros a la izquierda ni precisión en números largos.
  document_name?: string;
  number_cta_1?: string;
  number_cta_2?: string;
  email_cta?: string;
}) => async (dispatch: AppDispatch) => {
  try {
    const { data: createdBank } = await apiClient.post(API_URL, data);
    dispatch(fetchBanks()); // Actualizar lista automáticamente
    return createdBank;
  } catch (error) {
    console.error("Error al crear la cuenta:", error);
    throw error;
  }
};
