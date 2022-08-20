import { IBankAccountService, IFactoryDomain, IFactoryRepositorys, IFactoryService, IHelper, ITokenService, IUserService } from "@bancary-account/bancary-interfaces";
import { DataSource } from "typeorm";
import { FactoryDomain } from "../../domain/factories/FactoryDomain";
import { FactoryRepositorys } from "../../infra/factories/FactoryRepositorys";
import { Helper } from "../helpers/Helper";
import { BankAccountService } from "../services/BankAccountService";
import { TokenService } from "../services/TokenService";
import { UserService } from "../services/UserService";

export class FactoryService implements IFactoryService {
    
    private readonly _factoryDomain: IFactoryDomain;
    private readonly _factoryRepository: IFactoryRepositorys;
    private readonly _helper: IHelper;

    constructor(private dataSource: DataSource){

        this._helper = new Helper();

        this._factoryRepository = new FactoryRepositorys(this.dataSource);
        this._factoryDomain = new FactoryDomain({repositoryFactory: this._factoryRepository, helpers: this._helper});
    }
    
    get IUserService(): IUserService {
        
        return new UserService(this, this._factoryDomain, this._factoryRepository , this.dataSource, this._helper);
    }
    
    get IBankAccountService(): IBankAccountService {
        
        return new BankAccountService(this, this._factoryDomain, this._factoryRepository, this.dataSource, this._helper);
    }
    
    get ITokenService(): ITokenService {

        return new TokenService(this, this._factoryDomain, this._factoryRepository, this.dataSource, this._helper);
    }

}