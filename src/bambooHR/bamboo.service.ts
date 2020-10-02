import { HttpException, HttpService, Injectable } from '@nestjs/common';
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
  async getEmployees() {
    const url: string = this.baseUrl + '/employees/directory';
    let data: any;

    await this.httpService
      .get(url, { headers: this.headers })
      .toPromise()
      .then(res => {
        data = res.data.employees;
      })
      .catch(err => {
        const status = err.message.split(' ');
        const code = status[status.length - 1];
        throw new HttpException(err.message, parseInt(code));
      });

    return data;
  }

  async getEmployeesFiles(id: number) {
    const url: string = this.baseUrl + `/employees/${id}/files/view/`;
    let data: any;
    await this.httpService
      .get(url, { headers: this.headers })

      .toPromise()
      .then(res => {
        data = res.data;
      })
      .catch(err => {
        const status = err.message.split(' ');
        const code = status[status.length - 1];
        throw new HttpException(err.message, parseInt(code));
      });

    return data;
  }

  getAccesToken(): string {
    const toEncode: string = this.key + ':SomeString';
    const Encoded: string = btoa(toEncode);
    return 'Basic ' + Encoded;
  }
}
