import axios from "axios";
import { AppDispatch } from "@/store";
import {
  fetchPurchasesStart,
  setPurchasesList,
  fetchPurchasesError,
} from "@/store/slices/purchaseSlice";
import { ConfirmPurchasePayload, DeclinePurchasePayload, Purchase } from "@/types/purchaseProps";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/purchase";

export const fetchPurchases = () => async (dispatch: AppDispatch) => {
  dispatch(fetchPurchasesStart());
  try {
    const res = await fetch(API_URL+ "/confirm_Purchases", {
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


export const confirmPurchaseAPI = async ({ purchase_id, confirmed_by }: ConfirmPurchasePayload): Promise<Purchase> => {
  const response = await axios.put<Purchase>(API_URL +`/confirm/${purchase_id}`, null, {
    params: { confirmed_by },
  });

  return response.data;
};

export const declinePurchaseAPI = async ({ purchase_id, decline_by }: DeclinePurchasePayload): Promise<Purchase> => {
  const response = await axios.put<Purchase>(API_URL +`/decline/${purchase_id}`, null, {
    params: { decline_by },
  });

  return response.data;
};
