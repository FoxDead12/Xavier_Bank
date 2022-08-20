import { IUser } from "../entities";

export interface IUserService {

    CreateNewUser(email: string, password: string, name: string, dataNascimento: Date, nacionalidade: string): Promise<void>;
    Login(email: string, password: string): Promise<string>;
    UserExist(userId: number): Promise<boolean>;
}