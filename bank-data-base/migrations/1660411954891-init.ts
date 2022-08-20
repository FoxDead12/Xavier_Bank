import { MigrationInterface, QueryRunner } from "typeorm";

export class init1660411954891 implements MigrationInterface {
    name = 'init1660411954891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`Email\` varchar(255) NOT NULL, \`Hash\` varchar(255) NOT NULL, \`Name\` varchar(255) NOT NULL, \`BirthDate\` date NOT NULL, \`Nacionalidade\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`UsersBankAccount\` (\`id\` int NOT NULL AUTO_INCREMENT, \`UserId\` int NULL, \`BankAccountId\` int NULL, UNIQUE INDEX \`REL_3995647b257cd7d361a6717d0c\` (\`UserId\`), UNIQUE INDEX \`REL_31a7ac71c226c85ac61b87418f\` (\`BankAccountId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`BankAccounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`AccountName\` varchar(255) NOT NULL, \`Balance\` float NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`UsersBankAccount\` ADD CONSTRAINT \`FK_3995647b257cd7d361a6717d0c5\` FOREIGN KEY (\`UserId\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`UsersBankAccount\` ADD CONSTRAINT \`FK_31a7ac71c226c85ac61b87418fa\` FOREIGN KEY (\`BankAccountId\`) REFERENCES \`BankAccounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`UsersBankAccount\` DROP FOREIGN KEY \`FK_31a7ac71c226c85ac61b87418fa\``);
        await queryRunner.query(`ALTER TABLE \`UsersBankAccount\` DROP FOREIGN KEY \`FK_3995647b257cd7d361a6717d0c5\``);
        await queryRunner.query(`DROP TABLE \`BankAccounts\``);
        await queryRunner.query(`DROP INDEX \`REL_31a7ac71c226c85ac61b87418f\` ON \`UsersBankAccount\``);
        await queryRunner.query(`DROP INDEX \`REL_3995647b257cd7d361a6717d0c\` ON \`UsersBankAccount\``);
        await queryRunner.query(`DROP TABLE \`UsersBankAccount\``);
        await queryRunner.query(`DROP TABLE \`Users\``);
    }

}
