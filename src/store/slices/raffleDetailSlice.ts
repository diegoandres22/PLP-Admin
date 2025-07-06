import { Raffle } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const allRaffles: Raffle[] = [
    {
        "id": 11,
        "title": "Patea la Perola 1",
        "ticketPrice": 1,
        "minPurchase": 2,
        "raffleStatus": 1,
        "image": "https://lanchasvenezuela.com/wp-content/uploads/2023/09/MOTO-SEA-DOO-GTI-155-VENTA-DE-MOTO-SEA-DOO-GTI-155-MOTO-SEA-DOO-GTI-155-DE-HIGUEROTE-1.png",
        "description": "¡Participa en esta Gran Rifa de Patea la perola y gana!",
        "raffleDetails": {
            "trophy": "centinela 350cc acuatica",
            "secondPrize": "$4,000 en EFECTIVO",
            "ticketNumbers": ["1232", "5345", "4232", "6732"],
            "additionalPrize": "$1,500 en efectivo"
        }
    },
    {
        "id": 12,
        "title": "Patea la Perola 2",
        "ticketPrice": 1,
        "minPurchase": 3,
        "raffleStatus": 2,
        "image": "https://i.pinimg.com/originals/28/37/c3/2837c3003feb2dea72446c3554bae990.jpg",
        "description": "¡Participa en esta Gran Rifa de Patea la perola y gana!",
        "raffleDetails": {
            "trophy": "Machito 4 puertas 2020",
            "secondPrize": "$5,000 en EFECTIVO",
            "ticketNumbers": ["2345", "6789", "1123", "4456"],
            "additionalPrize": "$2,000 en efectivo"
        }
    },
    {
        "id": 13,
        "title": "Patea la Perola 3 ",
        "ticketPrice": 1,
        "minPurchase": 4,
        "raffleStatus": 3,
        "image": "https://cdn3.riastatic.com/photosnew/auto/photo/toyota_corolla__569815708f.jpg",
        "description": "¡Participa en esta Gran Rifa de Patea la perola y gana!",
        "raffleDetails": {
            "trophy": "Toyota corolla 2007",
            "secondPrize": "Bono de $3,000 para viajes",
            "ticketNumbers": ["5678", "9876", "4532", "7890"],
            "additionalPrize": "$1,000 en efectivo"
        }
    },
    {
        "id": 14,
        "title": "Patea la Perola 4",
        "ticketPrice": 1,
        "minPurchase": 5,
        "raffleStatus": 3,
        "image": "https://img.olx.com.br/images/53/538495577085359.jpg",
        "description": "¡Participa en esta Gran Rifa de Patea la perola y gana!",
        "raffleDetails": {
            "trophy": "Harley Davidson 2022",
            "secondPrize": "$2,500 en EFECTIVO",
            "ticketNumbers": ["3456", "7891", "6723", "2341"],
            "additionalPrize": "$1,500 en efectivo"
        }
    }
];
const initialState: Raffle = {
    id: 9,
    title: "ESTADO INICIAL",
    ticketPrice: 0,
    minPurchase: 0,
    raffleStatus: 0,
    image: "",
    description: "",
    raffleDetails: { trophy: "", secondPrize: "", ticketNumbers: [""], additionalPrize: "" }
};

const raffleDetailSlice = createSlice({
    name: "raffleDetail",
    initialState,
    reducers: {
        setRaffleById: (state, action: PayloadAction<number>) => {
            const raffle = allRaffles.find((raffle) => raffle.id === action.payload);

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