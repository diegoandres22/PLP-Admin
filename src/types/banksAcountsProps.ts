export interface BanksAcounts {

    id: number;
    title: string;
    Documento: number,
    Telefono: number;
    Titular: string;

}

export interface BankAccount {
    id: string;
    pay_method: string;
    holder_name_cta: string;
    document_name: number | string;
    number_cta_1: number | string;
    number_cta_2: string;
    email_cta: string;
    is_active: boolean;
}

export interface BanksState {
    banksList: BankAccount[];
    selectedBank: BankAccount | null;
    loading: boolean;
    error: string | null;
}