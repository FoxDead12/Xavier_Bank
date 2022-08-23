import { IBankAccount, IMapper } from "@bancary-account/bancary-interfaces";
import { DtoBankAccount } from "@bancary-account/bancary-models";
import { BankAccount } from "../../domain/entities/Bank-Account";

export class DtoBankAccountToIBankAccount implements IMapper<DtoBankAccount, IBankAccount> {
    
    Map(inObject: DtoBankAccount): IBankAccount {
        
        const bank = new BankAccount(null, null, inObject.balance, inObject.account_number, inObject.id);
        return bank;
    }

    MapMany(inObjects: DtoBankAccount[]): IBankAccount[] {
        throw new Error("Method not implemented.");
    }

    
}