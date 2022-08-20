import { ITokenJwt } from "../token";

export interface ITokenService {

    GenerateToken(userId: number): string;
    DecryptToken(token: string): ITokenJwt;
}