import { Module } from '@nestjs/common';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './asset.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AssetsController],
  providers: [AssetsService],
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Asset]),
    ConfigModule,
  ],
})
export class AssetsModule {}
