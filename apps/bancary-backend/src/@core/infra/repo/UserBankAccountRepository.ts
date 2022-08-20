import { IBankAccount, IMapper, IUser, IUserBankAccountRepository } from "@bancary-account/bancary-interfaces";
import { DtoBankAccount, DtoUser, DtoUserBankAccount } from "@bancary-account/bancary-models";
import { QueryRunner, Repository } from "typeorm";
import { DtoUserToIUser, IUserToDtoUser } from "../mappers";
import { BaseRepository } from "./BaseRepository";

export class UserBankAccountRepository extends BaseRepository<DtoUserBankAccount> implements IUserBankAccountRepository {
    
    private dtoToEntity: IMapper<DtoUser, IUser>;
    private entityToDto: IMapper<IUser, DtoUser>;

    constructor(
        repository: Repository<DtoUserBankAccount>,
        runners: {[key: string]: QueryRunner},
        transactionId: string
    ){
        super(repository, runners, transactionId);
        this.dtoToEntity = new DtoUserToIUser();
        this.entityToDto = new IUserToDtoUser();
    }


    GetById(id: number): Promise<IUser> {
        throw new Error("Method not implemented.");
    }

    async GetEntityBy(entity: Partial<IUser>, source?: IBankAccount): Promise<IUser> {

        const result = await this._repository.findOneBy({user: entity});
        if(result) {

            return this.dtoToEntity.Map(result.user);
        }

        return null;
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