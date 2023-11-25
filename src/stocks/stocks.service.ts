import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable()
export class StocksService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  retricePrice = async (code: string): Promise<{ code: string, price: number }> => {
    const { data } = await firstValueFrom(
      this.httpService.get(`https://www.google.com/finance/quote/${code}:BVMF`),
    );

    console.log(data);
    return new Promise((resolve) => resolve({ code, price: 10 }));
  }
}
