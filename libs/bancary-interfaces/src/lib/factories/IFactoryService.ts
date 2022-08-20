import { ITokenService } from "../services";
import { IBankAccountService } from "../services/IBankAccountService";
import { IUserService } from "../services/IUserService";

export interface IFactoryService {

    IUserService: IUserService;
    IBankAccountService: IBankAccountService;
    ITokenService: ITokenService;
}