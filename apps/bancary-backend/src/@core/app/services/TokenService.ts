import { IFactoryDomain, IFactoryRepositorys, IFactoryService, IHelper, ITokenJwt, ITokenService } from "@bancary-account/bancary-interfaces";
import { DataSource } from "typeorm";
import { BaseService } from "./BaseService";
import * as jwt from 'jsonwebtoken'


export class TokenService extends BaseService implements  ITokenService {
    
    private hashSecret:  string;

    constructor(
        factoryService: IFactoryService, 
        factoryDomain: IFactoryDomain, 
        factoryRepository: IFactoryRepositorys , 
        dataSource: DataSource,
        helper: IHelper
    ){
        super(factoryService, factoryDomain, factoryRepository, dataSource, helper);

        this.hashSecret = process.env["HASCH_SCRETE"];
    }

    GenerateToken(userId: number): string {

        const date = new Date();
        return jwt.sign({
            userId: userId,
            dateGenerate: date
        } as ITokenJwt, this.hashSecret);
    }

    DecryptToken(token: string): ITokenJwt {

        const jwtObject = jwt.verify(token, this.hashSecret);
        return jwtObject as ITokenJwt;
    }


}