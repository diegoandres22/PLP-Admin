import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    price: 200,
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
    
});
export const { setRateBcv } = rateBcvSlice.actions;
export default rateBcvSlice.reducer;