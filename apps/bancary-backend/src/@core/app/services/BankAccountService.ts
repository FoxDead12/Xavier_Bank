import { IBankAccountService, IFactoryDomain, IFactoryRepositorys, IFactoryService, IHelper } from "@bancary-account/bancary-interfaces";
import { DataSource } from "typeorm";
import { BaseService } from "./BaseService";

export class BankAccountService extends BaseService implements IBankAccountService {
   
    constructor(factoryService: IFactoryService, factoryDomain: IFactoryDomain, factoryRepository: IFactoryRepositorys, dataSource: DataSource, helper: IHelper){
        
        super(factoryService, factoryDomain, factoryRepository ,dataSource, helper)
    }
    
    async CreateBankAccount(idUser: number, balance: number): Promise<void> {
        
        await this.Transaction(async (transaction) => {

            //Verificar se este utilizador já possui uma conta
            const result = await this.factoryRepository.IUserBankAccountRepository.GetEntityBy({id: idUser}); //Caso retorne um utilizador é poruqe este já possui uma conta
            if(result) throw new Error("This User ALready Have Account!");

            //Preciso de buscar informações do utilizador
            const user = await this.factoryRepository.IUserRepository.GetById(idUser);
            const accountNumber = this.helper.GenerateAccountNumber(user.id, user.nacionalidade);
            const bankAccount = this.factoryDomain.CreateBankAccount(accountNumber, balance);
            await bankAccount.CreateAccount(user.id);

        })
        
    }

    DepositeInBankAccount(idUser: number, amount: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    WithdrawOutBankAccount(idUser: number, amount: number): Promise<void> {
        throw new Error("Method not implemented.");
    }


}