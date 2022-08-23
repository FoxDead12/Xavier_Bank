import { IFactoryDomain, IFactoryRepositorys, IFactoryService, IHelper, IUser, IUserService } from "@bancary-account/bancary-interfaces";
import { EmailInvalidException, GetUserView, WrongPasswordException } from "@bancary-account/bancary-models";
import { DataSource } from "typeorm";
import { BaseService } from "./BaseService";

export class UserService extends BaseService implements IUserService {
    
    
    constructor(factoryService: IFactoryService, factoryDomain: IFactoryDomain, factoryRepository: IFactoryRepositorys , dataSource: DataSource, helper: IHelper){
        
        super(factoryService, factoryDomain, factoryRepository, dataSource, helper)
    }

    async CreateNewUser(email: string, password: string, name: string, dataNascimento: Date, nacionalidade: string): Promise<void> {
        
        await this.Transaction(async (transaction) => {
            
            const result = await this.factoryRepository.IUserRepository.GetEntityBy({email});
            if(result) throw new Error("User Already Exist!");
            
            const user = this.factoryDomain.CreateUser(email, password, name, dataNascimento, nacionalidade);
            await user.CreateThisUser();            
        })
    }
    
    async Login(email: string, password: string): Promise<string> {
        
        let queryResult: string;
        await this.Transaction(async (transaction) => {

            let user = await this.factoryRepository.IUserRepository.GetEntityBy({email});
            if(!user) throw new EmailInvalidException();

            user = this.factoryDomain.CreateUser(user.email, user.password, user.name, user.dataNascimento, user.nacionalidade, user.id);
            if(await user.ComparePassword(password) == false) throw new WrongPasswordException();
            
            //Gerar Token     
            queryResult = this.factoryService.ITokenService.GenerateToken(user.id);       
        })

        return queryResult;
    }

    async UserExist(userId: number): Promise<boolean> {
        
        let queryResult: boolean;
        await this.Transaction(async (transaction) => {

            const user = await this.factoryRepository.IUserRepository.GetById(userId);
            if(!user) throw new Error("User Does´t exist!");

            queryResult = true;

        })

        return queryResult;
    }

    async GetUser(userId: number): Promise<GetUserView> {

        let queryResult: GetUserView;

        await this.Transaction(async (transaction) => {

            const user = await this.factoryRepository.IUserRepository.GetById(userId);
            if(!user) throw new Error("User Doesn´t Exist!");

            const bank = await this.factoryRepository.IBankAccountUserRepository.GetEntityBy(null, {id: userId} as IUser);
            if(!bank) throw new Error("User Dont Have Bank Account!");
            
            queryResult = {

                bank: {
                    account_number: bank.account_number,
                    balance: bank.balance
                },
                email: user.email,
                name: user.name
            }
        })

        return queryResult;
    }
    
}