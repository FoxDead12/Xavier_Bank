import { IBankAccountRepository, IUserBankAccountRepository } from "../repositories";
import { IUserRepository } from "../repositories/IUserRepository";

export interface IFactoryRepositorys extends BaseFactoryRepository {

    IUserRepository: IUserRepository;
    IBankAccountRepository: IBankAccountRepository;
    IUserBankAccountRepository: IUserBankAccountRepository;
}

interface BaseFactoryRepository {

    BeginChanges(transactionId: string): Promise<void>;
    SaveChanges(transactionId: string): Promise<void>;
    RollbackChanges(transactionId: string): Promise<void>;
    ClearTransaction(transactionId: string): Promise<void>;
}