import { IBankAccount, IMapper, IUser, IUserBankAccountRepository } from "@bancary-account/bancary-interfaces";
import { DtoBankAccount, DtoUser, DtoUserBankAccount } from "@bancary-account/bancary-models";
import { QueryRunner, Repository } from "typeorm";
import { BaseRepository } from "./BaseRepository";

export class UserBankAccountRepository extends BaseRepository<DtoUserBankAccount> implements IUserBankAccountRepository {
    

    constructor(
        repository: Repository<DtoUserBankAccount>,
        runners: {[key: string]: QueryRunner},
        transactionId: string
    ){
        super(repository, runners, transactionId);
    }


    GetById(id: number): Promise<IUser> {
        throw new Error("Method not implemented.");
    }

    GetEntityBy(entity: Partial<IUser>, source?: IBankAccount): Promise<IUser> {

        throw new Error("Method not implemented.");
    }


    async Add(entity: IUser, source?: IBankAccount): Promise<void> {

        const runner = this._runners[this.transactionId];
        await runner.manager.save(DtoUserBankAccount, {bank: {id: source.id} as DtoBankAccount, user: {id: entity.id} as DtoUser });
    }
    
    Delete(id: number): Promise<void>;
    Delete(entity: IUser): Promise<void>;
    Delete(entity: unknown): Promise<void> {
        throw new Error("Method not implemented.");
    }


}