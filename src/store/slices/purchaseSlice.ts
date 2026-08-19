import {
  ApiErrorResponse,
  Purchase,
  PurchasesState,
} from "@/types/purchaseProps";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addToast } from "@heroui/react";
import { confirmPurchaseAPI, declinePurchaseAPI } from "../services/purchaseService";

const initialState: PurchasesState = {
  purchasesList: [],
  loading: false,
  error: null,
};

function extractErrorMessage(err: unknown): string {
  if (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    (err as { response?: { data?: ApiErrorResponse } }).response?.data?.detail
  ) {
    return (err as { response: { data: ApiErrorResponse } }).response.data.detail!
      .map((d) => d.msg)
      .join(",");
  }
  if (err instanceof Error) return err.message;
  return "Error desconocido";
}

// El payload es solo el id: la API deriva "quién confirma/rechaza" del JWT.
export const confirmPurchase = createAsyncThunk<
  Purchase,
  string,
  { rejectValue: string }
>("purchases/confirmPurchase", async (purchaseId, { rejectWithValue }) => {
  try {
    const result = await confirmPurchaseAPI(purchaseId);
    addToast({ title: "Compra aprobada ✅", timeout: 3000, color: "success" });
    return result;
  } catch (err: unknown) {
    console.error("Error en redux toolkit:", err);
    const message = extractErrorMessage(err);
    addToast({ title: "Error al aprobar ❌", description: message, timeout: 5000, color: "danger" });
    return rejectWithValue(message);
  }
});

export const declinePurchase = createAsyncThunk<
  Purchase,
  string,
  { rejectValue: string }
>("purchases/declinePurchase", async (purchaseId, { rejectWithValue }) => {
  try {
    const result = await declinePurchaseAPI(purchaseId);
    addToast({ title: "Compra rechazada", timeout: 3000, color: "warning" });
    return result;
  } catch (err: unknown) {
    console.error("Error en redux toolkit:", err);
    const message = extractErrorMessage(err);
    addToast({ title: "Error al rechazar ❌", description: message, timeout: 5000, color: "danger" });
    return rejectWithValue(message);
  }
});

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
  extraReducers: (builder) => {
    builder
      .addCase(confirmPurchase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        confirmPurchase.fulfilled,
        (state, action: PayloadAction<Purchase>) => {
          state.loading = false;
          state.error = null;
          state.purchasesList = state.purchasesList.map((p) =>
            p.id === action.payload.id
              ? { ...p, ...action.payload, image_url: p.image_url || action.payload.image_url }
              : p
          );
        }
      )
      .addCase(confirmPurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error desconocido";
      })
      .addCase(declinePurchase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        declinePurchase.fulfilled,
        (state, action: PayloadAction<Purchase>) => {
          state.loading = false;
          state.error = null;
          state.purchasesList = state.purchasesList.map((p) =>
            p.id === action.payload.id
              ? { ...p, ...action.payload, image_url: p.image_url || action.payload.image_url }
              : p
          );
        }
      )
      .addCase(declinePurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error desconocido";
      });
  },
});

export const {
  fetchPurchasesStart,
  setPurchasesList,
  fetchPurchasesError,
  resetPurchases,
} = purchasesSlice.actions;

export default purchasesSlice.reducer;
