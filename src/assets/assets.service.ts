import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Asset } from './asset.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

type AssetDTO = {
  symbol: string;
  name: string;
  currency: string;
  price: number;
}

@Injectable()
export class AssetsService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    private readonly configService: ConfigService,
  ) {}

  getPrice = async (symbol: string): Promise<Asset> => {
    const stock = await this.findBySymbol(symbol);
    if (stock) return stock;

    const { data } = await firstValueFrom(
      this.httpService.get(`https://brapi.dev/api/quote/${symbol}`, {
        headers: {
          Authorization: `Bearer ${this.configService.get('BR_API_TOKEN')}`,
        }
      }),
    );

    return this.saveStock({
      symbol: data.results[0].symbol,
      name: data.results[0].longName,
      currency: data.results[0].currency,
      price: data.results[0].regularMarketPrice,
    });
  }

  saveStock = async (stock: AssetDTO): Promise<Asset> => {
    return this.assetRepository.save(stock);
  }

  findBySymbol = async (symbol: string): Promise<Asset|undefined> => {
    return this.assetRepository.findOneBy({ symbol });
  }
}
