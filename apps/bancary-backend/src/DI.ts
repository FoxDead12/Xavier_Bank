import { IFactoryService } from "@bancary-account/bancary-interfaces";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { FactoryService } from "./@core/app/factories/FactoryService";

Injectable()
export class DI {

    public _factoryService: IFactoryService;

    Build(dataSource: DataSource) {

        this._factoryService = new FactoryService(dataSource);
    }
}