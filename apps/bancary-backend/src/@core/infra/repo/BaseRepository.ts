/* eslint-disable @typescript-eslint/no-unused-vars */
import { DataSource, QueryRunner, Repository } from "typeorm";

export abstract class BaseRepository<T> {

    constructor(
        public _repository: Repository<T>,
        protected _runners: {[key: string]: QueryRunner},
        protected transactionId: string
    ) {}
}