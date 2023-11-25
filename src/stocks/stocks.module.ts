import { Module } from '@nestjs/common';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [StocksController],
  providers: [StocksService],
  imports: [HttpModule],
})
export class StocksModule {}