import { Raffle } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RaffleArrayData } from "./rafflesSlice";


const initialState: Raffle = {
    id: 9,
    title: "ESTADO INICIAL",
    ticketPrice: 0,
    minPurchase: 0,
    raffleStatus: 0,
    image: "",
    description: "",
    raffleDetails: {
        trophy: "", secondPrizeText: "", ticketNumbers: [""],
        additionalPrizeText: "",
        additionalPrizeNum: 0
    },
    countdownTime: "",
    progressPercentage: 0,
    ticketsAcountPremium: 0
};

const raffleDetailSlice = createSlice({
    name: "raffleDetail",
    initialState,
    reducers: {
        setRaffleById: (state, action: PayloadAction<number>) => {
            const raffle = RaffleArrayData.raffles.find((raffle) => raffle.id === action.payload);

            if (raffle) {
                state.id = raffle.id;
                state.title = raffle.title;
                state.ticketPrice = raffle.ticketPrice;
                state.minPurchase = raffle.minPurchase;
                state.raffleStatus = raffle.raffleStatus;
                state.image = raffle.image;
                state.description = raffle.description;
                state.raffleDetails = raffle.raffleDetails;
            }
        }
    }
});

export const { setRaffleById } = raffleDetailSlice.actions;
export default raffleDetailSlice.reducer;