import { IFactoryDomain, IFactoryRepositorys, IFactoryService, IHelper } from "@bancary-account/bancary-interfaces";
import { DataSource } from "typeorm/data-source";
import { BaseDomain } from "../../domain/BaseDomain";

export abstract class BaseService extends BaseDomain {


    constructor(
        factoryService: IFactoryService, 
        factoryDomain: IFactoryDomain, 
        factoryRepository: IFactoryRepositorys,
        dataSource: DataSource,
        protected helper: IHelper
    ){
        
        super(factoryService, factoryDomain, factoryRepository, dataSource);
    }
}