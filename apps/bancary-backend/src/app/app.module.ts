import { Module } from '@nestjs/common';
import { DI } from '../DI';
import { UserController } from './controllers/user.controller';
import { BankController } from './controllers/bank.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfig } from '../ormconfig';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forRoot(OrmConfig as TypeOrmModule), ConfigModule.forRoot()],
  controllers: [UserController, BankController],
  providers: [DI],
})

export class AppModule {

  constructor(private DI: DI, private dataSource: DataSource) {
    
    DI.Build(this.dataSource);
  }
}
