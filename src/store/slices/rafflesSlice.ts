import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Raffle, RafflesState } from "@/types";
import { getRaffles, createRaffleService } from "../services/raffleService";
import { addToast } from "@heroui/react";

// thunk para obtener las rifas
export const fetchRaffles = createAsyncThunk<Raffle[]>(
  "raffles/fetchAll",
  async () => {
    return await getRaffles();
  }
);

// thunk para crear una rifa
export const createRaffle = createAsyncThunk<
  Raffle,
  FormData,
  { rejectValue: string }
>("raffles/create", async (formData, { rejectWithValue }) => {
  try {
    const response = await createRaffleService(formData);

    addToast({
      title: "Rifa creada 🎉",
      description: "La rifa se ha creado exitosamente",
      timeout: 3000,
      color:"success"
    });

    return response; 
  } catch (error) {
    let message = "Error al crear la rifa";

    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message === "string"
    ) {
      message = (error as { response: { data: { message: string } } }).response.data.message;
    }

    addToast({
      title: "Error ❌",
      description: message,
      timeout: 5000,
      color:"danger"
    });

    return rejectWithValue(message); // devuelve rejectValue
  }
});

const initialState: RafflesState = {
  raffles: [],
  loading: false,
  error: null,
};

const raffleSlice = createSlice({
  name: "raffles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchRaffles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRaffles.fulfilled, (state, action) => {
        state.loading = false;
        state.raffles = action.payload;
      })
      .addCase(fetchRaffles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // create
      .addCase(createRaffle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRaffle.fulfilled, (state, action) => {
        state.loading = false;
        state.raffles.push(action.payload);
      })
      .addCase(createRaffle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default raffleSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { Raffle, RafflesState } from "@/types";
// import { getRaffles } from "../services/raffleService";

// // thunk para obtener las rifas
// export const fetchRaffles = createAsyncThunk<Raffle[]>(
//   "raffles/fetchAll",
//   async () => {
//     return await getRaffles();
//   }
// );


// const initialState: RafflesState = {
//   raffles: [],
//   loading: false,
//   error: null,
// };

// const raffleSlice = createSlice({
//   name: "raffles",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchRaffles.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchRaffles.fulfilled, (state, action) => {
//         state.loading = false;
//         state.raffles = action.payload;
//       })
//       .addCase(fetchRaffles.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Error al obtener rifas";
//       });
//   },
// });

// export default raffleSlice.reducer;

