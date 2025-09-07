import {
  ApiErrorResponse,
  ConfirmPurchasePayload,
  DeclinePurchasePayload,
  Purchase,
  PurchasesState,
} from "@/types/purchaseProps";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { confirmPurchaseAPI, declinePurchaseAPI } from "../services/purchaseService";

const initialState: PurchasesState = {
  purchasesList: [],
  loading: false,
  error: null,
};

export const confirmPurchase = createAsyncThunk<
  Purchase,
  ConfirmPurchasePayload,
  { rejectValue: string }
>(
  "purchases/confirmPurchase",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await confirmPurchaseAPI(payload);
      return data;
    } catch (err: unknown) {
      console.error("Error en redux toolkit:", err);

      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        (err as { response?: { data?: ApiErrorResponse } }).response?.data?.detail
      ) {
        return rejectWithValue(
          (err as { response: { data: ApiErrorResponse } }).response.data.detail!
            .map((d) => d.msg)
            .join(",")
        );
      }

      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }

      return rejectWithValue("Error desconocido");
    }
  }
);

export const declinePurchase = createAsyncThunk<
  Purchase,
  DeclinePurchasePayload,
  { rejectValue: string }
>(
  "purchases/declinePurchase",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await declinePurchaseAPI(payload);
      return data;
    } catch (err: unknown) {
      console.error("Error en redux toolkit:", err);

      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        (err as { response?: { data?: ApiErrorResponse } }).response?.data?.detail
      ) {
        return rejectWithValue(
          (err as { response: { data: ApiErrorResponse } }).response.data.detail!
            .map((d) => d.msg)
            .join(",")
        );
      }

      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }

      return rejectWithValue("Error desconocido");
    }
  }
);

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
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(confirmPurchase.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(
  //       confirmPurchase.fulfilled,
  //       (state, action: PayloadAction<Purchase>) => {
  //         state.loading = false;
  //         state.error = null;
  //         state.purchasesList = state.purchasesList.map((p) =>
  //           p.id === action.payload.id ? action.payload : p
  //         );
  //       }
  //     )
  //     .addCase(confirmPurchase.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload || "Error desconocido";
  //     })
  //     .addCase(declinePurchase.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(
  //       declinePurchase.fulfilled,
  //       (state, action: PayloadAction<Purchase>) => {
  //         state.loading = false;
  //         state.error = null;
  //         state.purchasesList = state.purchasesList.map((p) =>
  //           p.id === action.payload.id ? action.payload : p
  //         );
  //       }
  //     )
  //     .addCase(declinePurchase.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload || "Error desconocido";
  //     });
  // },
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

// import { ConfirmPurchasePayload, DeclinePurchasePayload, Purchase, PurchasesState } from "@/types/purchaseProps";
// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { confirmPurchaseAPI, declinePurchaseAPI } from "../services/purchaseService";


// const initialState: PurchasesState = {
//   purchasesList: [],
//   loading: false,
//   error: null,
// };

// export const confirmPurchase = createAsyncThunk<
//   Purchase,
//   ConfirmPurchasePayload,
//   { rejectValue: string }
// >(
//   'purchases/confirmPurchase',
//   async (payload, { rejectWithValue }) => {
//     try {
//       const data = await confirmPurchaseAPI(payload);
//       return data;
//     } catch (error: any) {
//       console.error("Error en redux toolkit:", error);
//       if (error.response?.data?.detail) {
//         return rejectWithValue(error.response.data.detail.map((d: any) => d.msg).join(','));
//       }
//       return rejectWithValue(error.message);
//     }
//   }
// );
// export const declinePurchase = createAsyncThunk<
//   Purchase,
//   DeclinePurchasePayload,
//   { rejectValue: string }
// >(
//   'purchases/declinePurchase',
//   async (payload, { rejectWithValue }) => {
//     try {
//       const data = await declinePurchaseAPI(payload);
//       return data;
//     } catch (error: any) {
//       console.error("Error en redux toolkit:", error);
//       if (error.response?.data?.detail) {
//         return rejectWithValue(error.response.data.detail.map((d: any) => d.msg).join(','));
//       }
//       return rejectWithValue(error.message);
//     }
//   }
// );


// const purchasesSlice = createSlice({
//   name: "purchases",
//   initialState,
//   reducers: {
//     fetchPurchasesStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     setPurchasesList: (state, action: PayloadAction<Purchase[]>) => {
//       state.loading = false;
//       state.purchasesList = action.payload;
//     },
//     fetchPurchasesError: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     resetPurchases: (state) => {
//       state.purchasesList = [];
//       state.error = null;
//       state.loading = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(confirmPurchase.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(confirmPurchase.fulfilled, (state, action: PayloadAction<Purchase>) => {
//         state.loading = false;
//         state.error = null;
//         state.purchasesList = state.purchasesList.map((p) =>
//           p.id === action.payload.id ? action.payload : p
//         );
//       })
//       .addCase(confirmPurchase.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Error desconocido';
//       })
//       .addCase(declinePurchase.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(declinePurchase.fulfilled, (state, action: PayloadAction<Purchase>) => {
//         state.loading = false;
//         state.error = null;
//         state.purchasesList = state.purchasesList.map((p) =>
//           p.id === action.payload.id ? action.payload : p
//         );
//       })
//       .addCase(declinePurchase.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Error desconocido';
//       });
//   },
// });

// export const { fetchPurchasesStart, setPurchasesList, fetchPurchasesError, resetPurchases } =
//   purchasesSlice.actions;
// export default purchasesSlice.reducer;
