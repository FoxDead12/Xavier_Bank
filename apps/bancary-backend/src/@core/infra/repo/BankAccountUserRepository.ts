import { IBankAccount, IBankAccountUserRepository, IMapper, IUser } from "@bancary-account/bancary-interfaces";
import { DtoBankAccount, DtoUserBankAccount } from "@bancary-account/bancary-models";
import { QueryRunner, Repository } from "typeorm";
import { DtoBankAccountToIBankAccount } from "../mappers";
import { BaseRepository } from "./BaseRepository";

export class BankAccountUserRepository extends BaseRepository<DtoUserBankAccount> implements IBankAccountUserRepository {
    
    private dtoToEntity: IMapper<DtoBankAccount, IBankAccount>;


    constructor(
        repository: Repository<DtoUserBankAccount>,
        runners: {[key: string]: QueryRunner},
        transactionId: string
    ){
        super(repository, runners, transactionId);
        this.dtoToEntity = new DtoBankAccountToIBankAccount();
    }

    GetById(id: number): Promise<IBankAccount> {
        throw new Error("Method not implemented.");
    }

    async GetEntityBy(entity: Partial<IBankAccount>, source?: IUser): Promise<IBankAccount> {

        const runner = this._runners[this.transactionId];
        const result = await runner.manager.findOneBy(DtoUserBankAccount , {user: source});
        
        if(result) {

            return this.dtoToEntity.Map(result.bank);
        }
        
        return null;
    }
    Add(entity: IBankAccount, source?: IUser): Promise<void> {
        throw new Error("Method not implemented.");
    }
    Delete(id: number): Promise<void>;
    Delete(entity: IBankAccount): Promise<void>;
    Delete(entity: unknown): Promise<void> {
        throw new Error("Method not implemented.");
    }


}