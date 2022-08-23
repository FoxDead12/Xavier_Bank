import { EmailInvalidExceptionFilter, WrongPasswordExceptionFilter } from "@bancary-account/bancary-models";
import { Body, Controller, Post, UseFilters, UseGuards } from "@nestjs/common";
import { DI } from "../../DI";
import { ENDPOINT } from "../../end-points";
import { Token, TokenGuard } from "../guards/token.guard";
import { BaseController } from "./base.controller";

@Controller(ENDPOINT.USER.BASE)
export class UserController extends BaseController{

    constructor(DI: DI){
        super(DI);
    }
    @Post(ENDPOINT.USER.CREATE)
    CreatNewUser(@Body() body) {

        const service = this.DI._factoryService.IUserService;
        return service.CreateNewUser(body.email, body.password, body.name, body.dataNascimento, body.nacionalidade);
    }

    @Post(ENDPOINT.USER.LOGIN)
    @UseFilters(EmailInvalidExceptionFilter, WrongPasswordExceptionFilter)
    LoginUser(@Body() body) {

        const service = this.DI._factoryService.IUserService;
        return service.Login(body.email, body.password);
    }

    @Post(ENDPOINT.USER.GETUSER)
    @UseGuards(TokenGuard)
    GetUser(@Token() token) {

        const userId = this.DecryptToken(token).userId;
        const service = this.DI._factoryService.IUserService;
        return service.GetUser(userId);
    }
}