import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(
    private readonly stocksSercive: StocksService,
  ) {}

  @Get(':code')
  async price(@Param('code') code: string, @Res() res: Response) {
    const stockPrice = await this.stocksSercive.retricePrice(code);
    res.status(HttpStatus.OK).json(stockPrice);
  }
}
