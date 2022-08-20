import { IBankAccount, IFactoryDomain, IFactoryRepositorys, IHelper, IUser } from "@bancary-account/bancary-interfaces";
import { BankAccount } from "../entities/Bank-Account";
import { User } from "../entities/User";

interface ExternalDomainDependences {

    repositoryFactory: IFactoryRepositorys;
    helpers: IHelper;
}

export class FactoryDomain implements IFactoryDomain {
    
    private _externalDependences: ExternalDomainDependences;

    constructor(
        externalDependences: ExternalDomainDependences
    ){
        this._externalDependences = externalDependences;
    }
    
    CreateBankAccount(account_number: string, balance: number, id?: number): IBankAccount {
        
        return new BankAccount(this._externalDependences.repositoryFactory, this._externalDependences.helpers, balance, account_number, id)
    }
    
    CreateUser(email: string, password: string, name: string, dataNascimento: Date, nacionalidade: string, id?: number): IUser {
        
        return new User(this._externalDependences.repositoryFactory, this._externalDependences.helpers, email, password, name, dataNascimento, nacionalidade, id);
    }
    



    public async BeginChanges(): Promise<string> {
        const transactionId = `Transaction_${(new Date()).getTime()}`;
        await this._externalDependences.repositoryFactory.BeginChanges(transactionId);
        return transactionId;
    }

    public async SaveChanges(transactionId: string): Promise<void> {
        await this._externalDependences.repositoryFactory.SaveChanges(transactionId);
    }

    public async RollbackChanges(transactionId: string): Promise<void> {
        await this._externalDependences.repositoryFactory.RollbackChanges(transactionId);
    }

    public async ClearTransaction(transactionId: string): Promise<void> {
        await this._externalDependences.repositoryFactory.ClearTransaction(transactionId);
    }

}