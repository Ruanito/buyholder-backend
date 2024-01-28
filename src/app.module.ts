import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetsModule } from './assets/assets.module';
import { Asset } from './assets/asset.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WalletsModule } from './wallets/wallets.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { Wallet } from './wallets/wallets.entity';
import { User } from './users/user.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
    AssetsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [Asset, Wallet, User],
        synchronize: false,
        ssl: configService.get('ENV') == 'prod',
      }),
    }),
    WalletsModule,
    UsersModule
  ],
})
export class AppModule {}
