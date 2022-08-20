import { ListDtos } from "@bancary-account/bancary-models";

export const OrmConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'teste',
    password: '1234',
    database: 'Bank', //Nome da BASE DE DADOS
    entities: ListDtos, //Vou passar os DTO´S
    synchronize: false,
}