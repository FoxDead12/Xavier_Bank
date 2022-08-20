import { HttpException, HttpStatus } from "@nestjs/common";

export class EmailInvalidException extends HttpException{
    
    constructor() {
        
        super("There is no user with this email!", HttpStatus.FORBIDDEN);
    }
} 