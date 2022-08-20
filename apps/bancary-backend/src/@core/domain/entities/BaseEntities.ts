import { IFactoryRepositorys, IHelper } from "@bancary-account/bancary-interfaces";

export abstract class BaseEntities {

    constructor(
        protected _factoryRepositorys: IFactoryRepositorys,
        protected _helper: IHelper
    ){}
}