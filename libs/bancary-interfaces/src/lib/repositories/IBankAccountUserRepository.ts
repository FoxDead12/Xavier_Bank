import { IBankAccount, IUser } from "../entities";
import { IBaseRepositories } from "./IBaseRepositories";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IBankAccountUserRepository extends IBaseRepositories<IBankAccount, IUser> {


}