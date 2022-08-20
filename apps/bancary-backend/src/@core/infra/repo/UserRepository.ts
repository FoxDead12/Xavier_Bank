import { IMapper, IUser, IUserRepository } from "@bancary-account/bancary-interfaces";
import { DtoUser } from "@bancary-account/bancary-models";
import { DataSource, QueryRunner, Repository } from "typeorm";
import { DtoUserToIUser, IUserToDtoUser } from "../mappers";
import { BaseRepository } from "./BaseRepository";

export class UserRepository extends BaseRepository<DtoUser> implements IUserRepository {
    
    private dtoToEntity: IMapper<DtoUser, IUser>;
    private entityToDto: IMapper<IUser, DtoUser>;

    constructor(
        repository: Repository<DtoUser>,
        runners: {[key: string]: QueryRunner},
        transactionId: string
    ){
        super(repository, runners, transactionId);
        this.dtoToEntity = new DtoUserToIUser();
        this.entityToDto = new IUserToDtoUser();

    }

    async GetById(id: number): Promise<IUser> {

        const runner = this._runners[this.transactionId];
        const result = await runner.manager.findOneById(DtoUser, id);

        if(result) {

            return this.dtoToEntity.Map(result);
        }
        
        return null;
    }
    
    async GetEntityBy(entity: Partial<IUser>, source?: IUser): Promise<IUser> {

        const runner = this._runners[this.transactionId];
        const result = await runner.manager.findOneBy(DtoUser, {email: entity.email});
        
        if(result) {

            return this.dtoToEntity.Map(result);
        }
        
        return null;
    }

    async Add(entity: IUser, source?: IUser): Promise<void> {

        const runner = this._runners[this.transactionId];
        const dto = this.entityToDto.Map(entity); //Criar Mapper para transformar a entidade em DTO
        await runner.manager.save(dto);

    }

    Delete(id: number): Promise<void>;
    Delete(entity: IUser): Promise<void>;
    Delete(entity: unknown): Promise<void> {
        throw new Error("Method not implemented.");
    }


}