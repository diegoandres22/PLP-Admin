import { Raffle, RafflesState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export const RaffleArrayData: RafflesState = {
    raffles: [
        {
            "id": 11,
            "title": "Patea la Perola 1",
            "countdownTime": "12:23:23",
            "ticketPrice": 310,
            "minPurchase": 2,
            "raffleStatus": 1,
            "image": "https://lanchasvenezuela.com/wp-content/uploads/2023/09/MOTO-SEA-DOO-GTI-155-VENTA-DE-MOTO-SEA-DOO-GTI-155-MOTO-SEA-DOO-GTI-155-DE-HIGUEROTE-1.png",
            "description": "¡Participa en esta Gran Rifa de Patea la perola y gana!",
            "progressPercentage": 12,
            "ticketsAcountPremium": 2,
            "raffleDetails": {
                "trophy": "centinela 350cc acuatica",
                "secondPrizeText": "te llevas un premio de $1,000 en EFECTIVO",
                "additionalPrizeText": "$100 en efectivo",
                "additionalPrizeNum": 100,
                "ticketNumbers": ["1232", "5345", "4232", "6732"],
            }
        },
        {
            "id": 12,
            "title": "Patea la Perola 2",
            "countdownTime": "12:23:23",
            "ticketPrice": 210,
            "minPurchase": 3,
            "raffleStatus": 2,
            "image": "https://i.pinimg.com/originals/28/37/c3/2837c3003feb2dea72446c3554bae990.jpg",
            "description": "¡Participa en esta Gran Rifa de Patea la perola y gana!",
            "progressPercentage": 45,
            "ticketsAcountPremium": 5,
            "raffleDetails": {
                "trophy": "Machito 4 puertas 2020",
                "secondPrizeText": "$5,000 en EFECTIVO",
                "additionalPrizeText": "$3,500 en efectivo",
                "additionalPrizeNum": 3500,
                "ticketNumbers": ["2345", "6789", "1123", "4456"],
            }
        },
        {
            "id": 13,
            "title": "Patea la Perola 3 ",
            "countdownTime": "12:23:23",
            "ticketPrice": 190,
            "minPurchase": 4,
            "raffleStatus": 3,
            "image": "https://cdn3.riastatic.com/photosnew/auto/photo/toyota_corolla__569815708f.jpg",
            "description": "¡Participa en esta Gran Rifa de Patea la perola y gana!",
            "progressPercentage": 10,
            "ticketsAcountPremium": 4,
            "raffleDetails": {
                "trophy": "Toyota corolla 2007",
                "secondPrizeText": "Bono de $3,000 para viajes",
                "ticketNumbers": ["5678", "9876", "4532", "7890"],
                "additionalPrizeText": "$1,000 en efectivo",
                "additionalPrizeNum": 1000,
            }
        },
        {
            "id": 14,
            "title": "Patea la Perola 4",
            "ticketPrice": 110,
            "countdownTime": "12:23:23",
            "minPurchase": 5,
            "raffleStatus": 3,
            "image": "https://img.olx.com.br/images/53/538495577085359.jpg",
            "description": "¡Participa en esta Gran Rifa de Patea la perola y gana!",
            "progressPercentage": 89,
            "ticketsAcountPremium": 0,
            "raffleDetails": {
                "trophy": "Harley Davidson 2022",
                "secondPrizeText": "",
                "ticketNumbers": ["3456", "7891", "6723", "2341"],
                "additionalPrizeText": "$1,500 en efectivo",
                "additionalPrizeNum": 1500,
            }
        }
    ]
}

const raffleSlice = createSlice({
    name: "raffles",
    initialState: RaffleArrayData,
    reducers: {
        setRaffles: (state, action: PayloadAction<Raffle[]>) => {
            state.raffles = action.payload;
        }
    },
});

export default raffleSlice.reducer;
