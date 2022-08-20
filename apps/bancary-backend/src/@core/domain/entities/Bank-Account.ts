import { IBankAccount, IFactoryRepositorys, IHelper, IUser } from "@bancary-account/bancary-interfaces";
import { BaseEntities } from "./BaseEntities";

export class BankAccount extends BaseEntities implements IBankAccount {
    
    private _id: number;
    public account_number: string;
    public balance: number;

    constructor(
        _factoryRepositorys: IFactoryRepositorys,
        _helper: IHelper,
        balance: number,
        accountNumber: string,
        id?: number
    ){
        
        super(_factoryRepositorys, _helper)
        this.balance = balance;
        this.account_number = accountNumber;

        if(id) this._id = id;
    }

    async CreateAccount(userId: number): Promise<void> {
        const bankId = await this._factoryRepositorys.IBankAccountRepository.AddEntity(this);
        await this._factoryRepositorys.IUserBankAccountRepository.Add({id: userId} as IUser, {id: bankId} as IBankAccount);

    }

    Deposite(amount: number): void {
        
        this.balance += amount;
    }

    Withdraw(amout: number): void {
        
        this.balance -= amout;
    }



    //Setters and Getters
    get id(): number {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

}