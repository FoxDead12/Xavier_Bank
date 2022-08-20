import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DtoBankAccount } from "./DtoBankAccount.entity";
import { DtoUserBankAccount } from "./DtoUserBankAccount.entitys";


@Entity("Users")
export class DtoUser {
    
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({type: "varchar", name: "Email"})
    email!: string;
    
    @Column({type: 'varchar', name: "Hash"})
    hash!: string;

    @Column({type: 'varchar', name: "Name"})
    name!: string;

    @Column({type: 'date', name: "BirthDate"})
    dataNascimento!: Date;

    @Column({type: 'varchar', name: "Nacionalidade"})
    nacionalidade!: string;

    @OneToOne(() => DtoUserBankAccount, (userBank) => userBank.user)
    bank!: DtoBankAccount
}