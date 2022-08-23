import { CanActivate, createParamDecorator, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { DI } from "../../DI";
import { Reflector } from "@nestjs/core";


@Injectable()
export class TokenGuard implements CanActivate  {
    
    constructor(private readonly DI: DI, private reflector: Reflector) {}


    async canActivate(context: ExecutionContext): Promise<boolean> {

        //Buscar o token
        //Verificar se o utilzador existe na base de dados
        const request = context.switchToHttp().getRequest();
        
        try {

            const token = request.cookies["token"];
            const jwtToken = this.DI._factoryService.ITokenService.DecryptToken(token);

            if(jwtToken) {

                return await this.DI._factoryService.IUserService.UserExist(jwtToken.userId);
            }

        }
        catch {
            throw new UnauthorizedException();
        }

        throw new UnauthorizedException();
    }


}


export const Token = createParamDecorator(
    (data: void, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest();
    
        return request.cookies["token"];
    }
)