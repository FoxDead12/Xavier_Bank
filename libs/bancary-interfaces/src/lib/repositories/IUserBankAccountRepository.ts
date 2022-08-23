/* eslint-disable @typescript-eslint/no-empty-interface */
import { IBankAccount, IUser } from "../entities";
import { IBaseRepositories } from "./IBaseRepositories";

export interface IUserBankAccountRepository extends IBaseRepositories<IUser, IBankAccount> {

}