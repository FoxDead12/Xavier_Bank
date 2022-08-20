import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { DI } from "../../DI";
import { ENDPOINT } from "../../end-points";
import { Token, TokenGuard } from "../guards/token.guard";
import { BaseController } from "./base.controller";


@Controller(ENDPOINT.BANK.BASE)
export class BankController extends BaseController {

    constructor(DI: DI){
        super(DI);
    }

    @Post(ENDPOINT.BANK.CREATE)
    @UseGuards(TokenGuard)
    CreateBank(@Body() body, @Token() token) {

        const userId = this.DecryptToken(token).userId;
        const service = this.DI._factoryService.IBankAccountService;
        return service.CreateBankAccount(userId, body.balance)
    }

    
}