interface RaffleDetails {
    trophy: string;
    secondPrize: string;
    ticketNumbers: string[];
    additionalPrize: string;
}

export interface Raffle {
    id: number;
    ticketPrice: number;
    minPurchase: number;
    raffleStatus: number;
    title: string;
    image: string;
    description: string;
    raffleDetails: RaffleDetails;
}

export interface RafflesState {
    raffles: Raffle[];
}