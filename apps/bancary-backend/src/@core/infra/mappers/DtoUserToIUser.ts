import { IMapper, IUser } from "@bancary-account/bancary-interfaces";
import { DtoUser } from "@bancary-account/bancary-models";
import { User } from "../../domain/entities/User";

export class DtoUserToIUser implements IMapper<DtoUser, IUser> {
    
    Map(inObject: DtoUser): IUser {
        
        const user = new User(null, null ,inObject.email, inObject.hash, inObject.name, inObject.dataNascimento, inObject.nacionalidade, inObject.id);
        return user;
    }

    MapMany(inObjects: DtoUser[]): IUser[] {
        throw new Error("Method not implemented.");
    }

}