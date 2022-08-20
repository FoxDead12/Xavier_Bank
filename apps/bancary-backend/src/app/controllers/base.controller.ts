import { ITokenJwt } from "@bancary-account/bancary-interfaces";
import { DI } from "../../DI";


export abstract class BaseController {
    
    constructor(protected readonly DI: DI){}

    DecryptToken(token: string): ITokenJwt {

        return this.DI._factoryService.ITokenService.DecryptToken(token);
    }
}