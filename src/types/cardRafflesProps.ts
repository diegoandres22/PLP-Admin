interface RaffleDetails {
    trophy: string;
    secondPrizeText: string;
    additionalPrizeText:string;
    additionalPrizeNum:number;
    ticketNumbers: string[];
}

export interface Raffle {
    countdownTime: string;
    id: number;
    ticketPrice: number;
    minPurchase: number;
    raffleStatus: number;
    title: string;
    image: string;
    description: string;
    progressPercentage:number
    ticketsAcountPremium:number
    raffleDetails: RaffleDetails;
}

export interface RafflesState {
    raffles: Raffle[];
}