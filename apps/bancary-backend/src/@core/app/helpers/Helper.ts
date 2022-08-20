import { IHelper } from "@bancary-account/bancary-interfaces";
import * as bcrypt from 'bcrypt';

export class Helper implements IHelper {
    
    protected saltOrRounds: number;
    protected hashScrete: string;

    constructor(){
        this.saltOrRounds = 10;
        this.hashScrete = process.env["HASCH_SCRETE"];
    }

    async GenerateHashUser(password: string): Promise<string> {

        const hash = await bcrypt.hash(password, this.saltOrRounds);
        return hash;
    }

    async MatchHashUser(hash: string, password: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    GenerateAccountNumber(idUser: number, nacionalidade: string): string {

        const accountNumber = nacionalidade + "0000" + idUser;
        return accountNumber;
    }

}