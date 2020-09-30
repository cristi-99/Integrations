import { HttpService, Injectable } from '@nestjs/common';
import { BambooConfig } from 'src/config/bamboo.config';
import * as btoa from 'btoa';

@Injectable()
export class BambooService {
  key: string;
  baseUrl: string;
  headers: HeadersInit;
  constructor(
    private bambooConfig: BambooConfig,
    private httpService: HttpService,
  ) {
    this.key = bambooConfig.BAMBOO_KEY;
    this.baseUrl = bambooConfig.baseUrl;
    this.headers = {
      Authorization: this.getAccesToken(),
      Accept: 'application/json',
    };
  }
  async getEmployee() {
    const url: string = this.baseUrl + '/employees/directory';
    let data: any;

    await this.httpService
      .get(url, { headers: this.headers })
      .toPromise()
      .then(res => {
        data = res.data.employees;
      });

    return data;
  }

  getAccesToken(): string {
    const toEncode: string = this.key + ':SomeString';
    const Encoded: string = btoa(toEncode);
    return 'Basic ' + Encoded;
  }
}
