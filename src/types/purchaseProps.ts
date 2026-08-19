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
  // La API devuelve null mientras la compra está pendiente de revisión
  // (ver aprobationsSection.tsx: true = confirmada, false = rechazada,
  // null/undefined = pendiente). El tipo anterior decía solo `boolean`.
  is_confirmed: boolean | null;
  image_url: string;
  confirmed_at: string | null;
  confirmed_by: string | null;
}
export interface PurchasesState {
  purchasesList: Purchase[];
  loading: boolean;
  error: string | null;
}
// El "quién" (confirmed_by/decline_by) lo determina la API a partir del
// JWT verificado del admin, no un campo enviado por el cliente.
export type ImageOnly = { image_url: string };

// Forma unificada que ahora devuelve TODA la API (ver
// PLP_API-FastApi/src/core/errors.py): antes `detail` era un arreglo de
// {msg} (formato default de FastAPI/Pydantic), ahora es un objeto único
// con code/message/context.
export interface ApiErrorDetail {
  code: string;
  message: string;
  context?: Record<string, unknown> | null;
}

export interface ApiErrorResponse {
  detail?: ApiErrorDetail;
}
