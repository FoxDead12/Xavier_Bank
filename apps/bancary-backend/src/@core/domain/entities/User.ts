import { IFactoryRepositorys, IHelper, IUser } from "@bancary-account/bancary-interfaces";
import { BaseEntities } from "./BaseEntities";

export class User extends BaseEntities implements IUser {
    
    private _id: number;

    constructor(
        _factoryRepositorys: IFactoryRepositorys,
        _helper: IHelper,
        public email: string,
        public password: string,
        public name: string,
        public dataNascimento: Date,
        public nacionalidade: string,
        id?: number
    ){
        super(_factoryRepositorys, _helper);
        
        if(id) this._id = id;
    }

    async CreateThisUser(): Promise<void> {
        
        const generatedHash = await this._helper.GenerateHashUser(this.password);
        await this._factoryRepositorys.IUserRepository.Add({...this, password: generatedHash});
    }

    async ComparePassword(inputPassword: string): Promise<boolean> {

        return await this._helper.MatchHashUser(this.password, inputPassword);
    }
    
    get id(): number {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }
}