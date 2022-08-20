export interface IHelper {

    GenerateHashUser(password: string): Promise<string>;
    MatchHashUser(hash: string, password: string): Promise<boolean>;
    GenerateAccountNumber(idUser: number, nacionalidade: string): string;
}