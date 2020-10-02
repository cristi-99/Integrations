import { HttpException, HttpService, Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as fs from 'fs';
import * as btoa from 'btoa';
import { QuickBooksConfig } from 'src/config/quickBooks.config';
import { response } from 'express';
import { QuickBooksLogin } from './quickBooks.auth';
@Injectable()
export class QuickBooksService {
  token: string;
  baseUrl: string;
  realmId: string;
  headers: HeadersInit;
  quickBooks_clientId: string;
  quickBooks_clientSecret: string;
  constructor(
    private quickBooksLogin: QuickBooksLogin,
    private quickBooksConfig: QuickBooksConfig,
    private httpService: HttpService,
  ) {
    this.baseUrl = quickBooksConfig.quickBooks_baseURL;
    this.quickBooks_clientId = this.quickBooksConfig.QUICKBOOKS_CLIENT_ID;
    this.quickBooks_clientSecret = this.quickBooksConfig.QUICKBOOKS_CLIENT_SECRET;
  }
  async getCostumers() {
    if (this.token)
      if (!this.quickBooksLogin.checkToken()) {
        await this.quickBooksLogin.refreshToken();
        await this.setHeaders();
      }

    let url: string =
      this.baseUrl + '/v3/company/' + this.realmId + '/query?query=';
    const params = 'select GivenName, FamilyName, CompanyName from Customer';
    url += params;
    console.log(url);
    let data: any;
    await this.httpService
      .get(url, { headers: this.headers })
      .toPromise()
      .then(res => {
        data = res.data.QueryResponse.Customer;
      })
      .catch(err => {
        const status = err.message.split(' ');
        const code = status[status.length - 1];
        throw new HttpException(err.message, parseInt(code));
      });
    return data;
  }

  async getCompany() {
    if (this.token)
      if (!this.quickBooksLogin.checkToken()) {
        await this.quickBooksLogin.refreshToken();
        await this.setHeaders();
      }

    const url: string =
      this.baseUrl +
      '/v3/company/' +
      this.realmId +
      '/companyinfo/' +
      this.realmId;
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

  async getInvoice() {
    if (this.token)
      if (!this.quickBooksLogin.checkToken()) {
        await this.quickBooksLogin.refreshToken();
        await this.setHeaders();
      }

    let url: string =
      this.baseUrl + '/v3/company/' + this.realmId + '/query?query=';
    const params = 'select * from Invoice';
    url += params;

    let data: any;
    await this.httpService
      .get(url, { headers: this.headers })
      .toPromise()
      .then(res => {
        data = res.data.QueryResponse;
      })
      .catch(err => {
        const status = err.message.split(' ');
        const code = status[status.length - 1];
        throw new HttpException(err.message, parseInt(code));
      });
    return data;
  }

  setHeaders() {
    const access = this.quickBooksLogin.getToken();
    this.token = access.access_token;
    this.headers = {
      Authorization: 'Bearer ' + this.token,
      Accept: 'application/json',
    };
    this.realmId = access.realmId;
  }

  // async getInvoicePDF(id: number) {
  //   let url: string =
  //     this.baseUrl + '/company/' + this.realmId + '/invoice/' + id + '/pdf';
  //   console.log(url);
  //   const decoder = new StringDecoder('base64');
  //   let data;
  //   await this.httpService
  //     .get(url, { headers: this.headers })
  //     .toPromise()
  //     .then(res => {
  //       data = res.data;

  //       fs.writeFile('invoice.txt', res.data function(err) {
  //         if (err) console.log(err);
  //       });
  //     })
  //     .catch(err => {
  //       if (err) console.log(err.response);
  //       return err;
  //     });
  //   console.log(data);
  //   return 'Done';
  // }
}
