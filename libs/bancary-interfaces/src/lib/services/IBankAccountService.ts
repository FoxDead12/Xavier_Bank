export interface IBankAccountService {

    CreateBankAccount(idUser: number, balance: number): Promise<void>; //Retornar o Account Number
    DepositeInBankAccount(idUser: number, amount: number): Promise<void>;
    WithdrawOutBankAccount(idUser: number, amount: number): Promise<void>
}