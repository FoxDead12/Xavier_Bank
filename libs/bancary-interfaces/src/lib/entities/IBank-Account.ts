
export interface IBankAccount {

    id: number;
    account_number: string;
    balance: number;

    Deposite(amount: number): void;
    Withdraw(amout: number): void;
    CreateAccount(userId: number): Promise<void>;
}