import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallets.entity';
import { WalletsController } from './wallets.controller';

@Module({
  providers: [WalletsService],
  imports: [TypeOrmModule.forFeature([Wallet])],
  controllers: [WalletsController],
})
export class WalletsModule {}
