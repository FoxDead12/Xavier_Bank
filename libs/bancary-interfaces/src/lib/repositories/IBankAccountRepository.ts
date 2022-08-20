/* eslint-disable @typescript-eslint/no-empty-interface */
import { IBankAccount } from "../entities";
import { IBaseRepositories } from "./IBaseRepositories";

export interface IBankAccountRepository extends IBaseRepositories<IBankAccount> {

    AddEntity(entity: IBankAccount, source?: IBankAccount): Promise<number>;
}