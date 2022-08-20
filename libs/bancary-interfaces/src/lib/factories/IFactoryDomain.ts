import { IBankAccount, IUser } from "../entities";

export interface IFactoryDomain extends BaseFactoryDomain {

    CreateBankAccount(account_number: string, balance: number, id?: number): IBankAccount;
    CreateUser(
        email: string,
        password: string,
        name: string,
        dataNascimento: Date,
        nacionalidade: string,
        id?: number
    ): IUser;
}


interface BaseFactoryDomain {

    BeginChanges(): Promise<string>;
    SaveChanges(transactionId: string): Promise<void>;
    RollbackChanges(transactionId: string): Promise<void>;
    ClearTransaction(transactionId: string): Promise<void>;
}