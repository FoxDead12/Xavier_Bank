import { IBankAccount, IBankAccountRepository, IMapper } from "@bancary-account/bancary-interfaces";
import { DtoBankAccount } from "@bancary-account/bancary-models";
import { QueryRunner, Repository } from "typeorm";
import { IBankAccountToDtoBankAccount } from "../mappers";
import { BaseRepository } from "./BaseRepository";

export class BankAccountRepository extends BaseRepository<DtoBankAccount> implements IBankAccountRepository {
    
    private entityToDto: IMapper<IBankAccount, DtoBankAccount>;

    constructor(
        repository: Repository<DtoBankAccount>,
        runners: {[key: string]: QueryRunner},
        transactionId: string
    ){
        super(repository, runners, transactionId);
        this.entityToDto = new IBankAccountToDtoBankAccount();
    }

    GetById(id: number): Promise<IBankAccount> {
        throw new Error("Method not implemented.");
    }
    GetEntityBy(entity: Partial<IBankAccount>, source?: IBankAccount): Promise<IBankAccount> {
        throw new Error("Method not implemented.");
    }

    async AddEntity(entity: IBankAccount, source?: IBankAccount): Promise<number> {
        
        const runner = this._runners[this.transactionId];
        const dto = this.entityToDto.Map(entity);
        const result = await runner.manager.save(dto);

        return result.id;
    }
    
    Add(entity: IBankAccount, source?: IBankAccount): Promise<void> {
        
        throw new Error("Method not implemented.");
    }

    Delete(id: number): Promise<void>;
    Delete(entity: IBankAccount): Promise<void>;
    Delete(entity: unknown): Promise<void> {
        throw new Error("Method not implemented.");
    }


}