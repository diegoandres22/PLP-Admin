export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface Raffle {
  image: string;
  id: string;
  trophy: string;
  premium_ticket6: string;
  title: string;
  secondPrize: string;
  total_tickets: number;
  description: string;
  additionalPrize: string;
  tickets_sold_list: Array<string>;
  premium_ticket1: string;
  lottery_date: string;
  ticket_price: number;
  premium_ticket2: string;
  created_by: string;
  min_purchase: number;
  premium_ticket3: string;
  updated_by: string;
  raffle_status: number;
  premium_ticket4: string;
  created_at: string;
  state: boolean;
  premium_ticket5: string;
  updated_at: string;
}



export interface RafflesState {
  raffles: Raffle[];
  loading: boolean;
  error: string | null;
}