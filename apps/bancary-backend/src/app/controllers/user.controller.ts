import { EmailInvalidExceptionFilter, WrongPasswordExceptionFilter } from "@bancary-account/bancary-models";
import { Body, Controller, Post, UseFilters } from "@nestjs/common";
import { DI } from "../../DI";
import { ENDPOINT } from "../../end-points";
import { Token } from "../guards/token.guard";

@Controller(ENDPOINT.USER.BASE)
export class UserController {

    constructor(private readonly DI: DI){}

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
}