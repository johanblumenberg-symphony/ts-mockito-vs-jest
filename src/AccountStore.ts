export interface Account {
    id: string;
    balance: number;
}

export interface AccountStore {
    getAccountById(id: string): Account;
}
