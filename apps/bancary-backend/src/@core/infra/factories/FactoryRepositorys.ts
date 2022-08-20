import { IBankAccountRepository, IFactoryRepositorys, IUserBankAccountRepository, IUserRepository } from "@bancary-account/bancary-interfaces";
import { DtoBankAccount, DtoUser, DtoUserBankAccount } from "@bancary-account/bancary-models";
import { DataSource, QueryRunner } from "typeorm";
import { BankAccountRepository } from "../repo/BankAccountRepository";
import { UserBankAccountRepository } from "../repo/UserBankAccountRepository";
import { UserRepository } from "../repo/UserRepository";

export class FactoryRepositorys implements IFactoryRepositorys {
    
    protected _transaction: string;

    constructor(
        private dataSource: DataSource,
    ){}

    protected _runners: {[key: string]: QueryRunner} = {};

    get IUserRepository(): IUserRepository {

        return new UserRepository(this.dataSource.getRepository(DtoUser), this._runners, this._transaction);
    }

    get IBankAccountRepository(): IBankAccountRepository {

        return new BankAccountRepository(this.dataSource.getRepository(DtoBankAccount), this._runners, this._transaction);
    }

    get IUserBankAccountRepository(): IUserBankAccountRepository {

        return new UserBankAccountRepository(this.dataSource.getRepository(DtoUserBankAccount), this._runners, this._transaction);
    }



    public async BeginChanges(transactionId: string): Promise<void> {
        this._transaction = transactionId;
        this._runners[transactionId] = this.dataSource.createQueryRunner();
        await this._runners[transactionId].connect();
        await this._runners[transactionId].startTransaction();
    }

    public async SaveChanges(transactionId: string): Promise<void> {
        await this._runners[transactionId].commitTransaction();
    }
    
    public async RollbackChanges(transactionId: string): Promise<void> {
        await this._runners[transactionId].rollbackTransaction();
    }

    public async ClearTransaction(transactionId: string): Promise<void> {
        await this._runners[transactionId].release();
    }
}