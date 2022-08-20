import { IFactoryDomain, IFactoryRepositorys, IFactoryService } from "@bancary-account/bancary-interfaces";
import { DataSource } from "typeorm";

export abstract class BaseDomain {

    constructor(
        public factoryService: IFactoryService,
        public factoryDomain: IFactoryDomain,
        public factoryRepository: IFactoryRepositorys,
        public dataSource: DataSource
    ){}
    
    public async Transaction(logickBlock: (transaction: string) => Promise<void>):Promise<void> {
        
        let catchedError: any = undefined;
        let transaction: string = null;
        
        try {
            transaction = await this.factoryDomain.BeginChanges();

            await logickBlock(transaction);

            await this.factoryDomain.SaveChanges(transaction)
            
        } catch (err: any) {
            catchedError = err;
            // since we have errors lets rollback the changes we made
            if(transaction){
                await this.factoryDomain.RollbackChanges(transaction);
            }
            
        } finally {
            // you need to release a queryRunner which was manually instantiated
            await this.factoryDomain.ClearTransaction(transaction);
        }

        if(catchedError){
            throw catchedError;
        }
    }
}