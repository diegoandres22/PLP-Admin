export interface BankAccount {
    id: string;
    pay_method: string;
    holder_name_cta: string | null;
    // Texto, no número: son identificadores (cédula/RIF, número de cuenta).
    document_name: string | null;
    number_cta_1: string | null;
    number_cta_2: string | null;
    email_cta: string | null;
    is_active: boolean;
}

export interface BanksState {
    banksList: BankAccount[];
    selectedBank: BankAccount | null;
    loading: boolean;
    error: string | null;
}