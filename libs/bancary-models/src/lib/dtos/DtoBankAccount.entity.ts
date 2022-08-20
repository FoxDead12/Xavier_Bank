import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DtoUserBankAccount } from "./DtoUserBankAccount.entitys";

@Entity("BankAccounts")
export class DtoBankAccount {

    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({type: "varchar", name: "AccountName"})
    account_number!: string;
    
    @Column({type: 'float', name: "Balance"})
    balance!: number;

    @OneToOne(() => DtoUserBankAccount, (userBank) => userBank.bank)
    user!: DtoBankAccount

}