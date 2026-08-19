import { AppDispatch } from "@/store";
import {
  fetchPurchasesStart,
  setPurchasesList,
  fetchPurchasesError,
} from "@/store/slices/purchaseSlice";
import { Purchase } from "@/types/purchaseProps";
import { apiClient, API_BASE_URL } from "@/store/apiClient";

const API_URL = API_BASE_URL + "/purchase";

// Requiere admin autenticado (GET /purchase/confirm_Purchases).
export const fetchPurchases = () => async (dispatch: AppDispatch) => {
  dispatch(fetchPurchasesStart());
  try {
    const { data } = await apiClient.get<Purchase[]>(API_URL + "/confirm_Purchases");
    dispatch(setPurchasesList(data));
  } catch (error: unknown) {
    dispatch(
      fetchPurchasesError(
        (error as Error).message || "Error desconocido al cargar las compras (contacta al programador)."
      )
    );
  }
};

// El "quién" (confirmed_by/decline_by) ya no se envía desde el cliente:
// la API lo toma del JWT verificado.
export const confirmPurchaseAPI = async (purchaseId: string): Promise<Purchase> => {
  const response = await apiClient.put<Purchase>(`${API_URL}/confirm/${purchaseId}`);
  return response.data;
};

export const declinePurchaseAPI = async (purchaseId: string): Promise<Purchase> => {
  const response = await apiClient.put<Purchase>(`${API_URL}/decline/${purchaseId}`);
  return response.data;
};
