import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { EmailInvalidException } from "../exceptions/EmailInvalidException";
import { Request, Response } from "express";
import { WrongPasswordException } from "../exceptions/WrongPasswordException";

@Catch(WrongPasswordException)
export class WrongPasswordExceptionFilter implements ExceptionFilter {
    catch(exception: WrongPasswordException, host: ArgumentsHost) {
        
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                message: exception.message
            });
    }
    
   
} 