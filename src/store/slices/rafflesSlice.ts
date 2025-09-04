import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Raffle, RafflesState } from "@/types";
import { getRaffles } from "../services/raffleService";

// thunk para obtener las rifas
export const fetchRaffles = createAsyncThunk<Raffle[]>(
  "raffles/fetchAll",
  async () => {
    return await getRaffles();
  }
);


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
        state.error = action.error.message || "Error al obtener rifas";
      });
  },
});

export default raffleSlice.reducer;

