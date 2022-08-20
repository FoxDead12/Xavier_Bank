import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DtoBankAccount } from "./DtoBankAccount.entity";
import { DtoUser } from "./DtoUser.entity";

@Entity("UsersBankAccount")
export class DtoUserBankAccount {

    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => DtoUser, (user) => user.bank, {eager: true})
    @JoinColumn({name: "UserId"})
    user!: DtoUser;

    @OneToOne(() => DtoBankAccount, (user) => user.user, {eager: true})
    @JoinColumn({name: "BankAccountId"})
    bank!: DtoBankAccount;
}