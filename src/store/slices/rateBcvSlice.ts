import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRateBcvData } from "../services/rateBcvService";

interface ScrollState {

    change: number,
    color: string,
    image: string,
    last_update: string,
    percent: number,
    price: number,
    price_old: number,
    symbol: string,
    title: string

}
const initialState: ScrollState = {
    change: 0,
    color: "",
    image: "",
    last_update: "",
    percent: 0,
    price: 0,
    price_old: 0,
    symbol: "",
    title: ""
};
const rateBcvSlice = createSlice({
    name: "rateBcv",
    initialState,
    reducers: {
        setRateBcv: (state, action: PayloadAction<ScrollState>) => {
            state = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRateBcvData.fulfilled, (state, action) => {
            return { ...state, ...action.payload };
        });
        builder.addCase(fetchRateBcvData.rejected, (state, action) => {
            console.error("Error al obtener los datos:", action.payload);
        });
    },
});
export const { setRateBcv } = rateBcvSlice.actions;
export default rateBcvSlice.reducer;