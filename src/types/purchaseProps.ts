export interface Purchase {
  id: string;
  raffle_id: string;
  raffle_title: string | null;
  buyer_email: string;
  ticket_numbers: number[];
  total_paid: number;
  payment_method: string;
  payment_reference: string;
  purchase_date: string;
  full_name: string;
  phone_number: string;
  holder_cta_bank: string;
  is_confirmed: boolean;
  image_url: string;
  confirmed_at: string | null;
  confirmed_by: string | null;
}
export interface PurchasesState {
  purchasesList: Purchase[];
  loading: boolean;
  error: string | null;
}