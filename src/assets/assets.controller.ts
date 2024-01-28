import { Controller, Get, HttpStatus, Param, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { AssetsService } from './assets.service';

@Controller('assets')
export class AssetsController {
  constructor(
    private readonly assetsSercive: AssetsService,
  ) {}

  @Get(':symbol')
  async price(@Param('symbol') symbol: string, @Res() res: Response) {
    try {
      const stockPrice = await this.assetsSercive.getPrice(symbol.toLocaleUpperCase());
      res.status(HttpStatus.OK).json(stockPrice);
    } catch (e) {
      res.sendStatus(HttpStatus.NOT_FOUND);
    }
  }
}
