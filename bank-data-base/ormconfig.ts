import { DataSource } from "typeorm";

export const connectionSource = new DataSource({
    name: 'default',
    migrationsTableName: 'migrations',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'teste',
    password: '1234',
    database: 'Bank',
    logging: false,
    synchronize: false,
    entities: ['libs/bancary-models/src/lib/dtos/*.ts'],
    migrations: ['bank-data-base/migrations/*.ts'],

});
