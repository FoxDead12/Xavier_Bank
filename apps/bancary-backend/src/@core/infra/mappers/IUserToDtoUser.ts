import { IMapper, IUser } from "@bancary-account/bancary-interfaces";
import { DtoUser } from "@bancary-account/bancary-models";

export class IUserToDtoUser implements IMapper<IUser, DtoUser> {
    
    Map(inObject: IUser): DtoUser {
        
        const dtoUser = new DtoUser();
        dtoUser.email = inObject.email;
        dtoUser.hash = inObject.password;
        dtoUser.dataNascimento = inObject.dataNascimento;
        dtoUser.nacionalidade = inObject.nacionalidade;
        dtoUser.name = inObject.name;
        dtoUser.id = inObject.id;
        return dtoUser;
    }

    MapMany(inObjects: IUser[]): DtoUser[] {
        throw new Error("Method not implemented.");
    }


}