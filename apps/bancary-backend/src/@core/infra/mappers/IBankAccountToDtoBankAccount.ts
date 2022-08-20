import { IBankAccount, IMapper } from "@bancary-account/bancary-interfaces";
import { DtoBankAccount } from "@bancary-account/bancary-models";

export class IBankAccountToDtoBankAccount implements IMapper<IBankAccount, DtoBankAccount> {
    
    Map(inObject: IBankAccount): DtoBankAccount {

        const dto = new DtoBankAccount();
        dto.account_number = inObject.account_number;
        dto.balance = inObject.balance;
        
        return dto;
    }

    MapMany(inObjects: IBankAccount[]): DtoBankAccount[] {
        throw new Error("Method not implemented.");
    }


}