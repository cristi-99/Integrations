import { HttpService, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { QuickBooksConfig } from 'src/config/quickBooks.config';
@Injectable()
export class QuickBooksService {
  quickBooks_token: string;
  baseUrl: string;
  realmId: string;
  headers: HeadersInit;
  constructor(
    private quickBooksConfig: QuickBooksConfig,
    private httpService: HttpService,
  ) {
    this.quickBooks_token = quickBooksConfig.QUICKBOOKS_TOKEN;
    this.baseUrl = quickBooksConfig.quickBooks_baseURL;
    this.realmId = quickBooksConfig.realmId;
    this.headers = {
      Authorization: this.quickBooksConfig.QUICKBOOKS_TOKEN,
    };
  }
  async getCostumers() {
    let url: string =
      this.baseUrl + '/company/' + this.realmId + '/query?query=';
    const params = 'select GivenName, FamilyName, CompanyName from Customer';
    url += params;

    let data: any;
    await this.httpService
      .get(url, { headers: this.headers })
      .toPromise()
      .then(res => {
        data = res.data.QueryResponse.Customer;
      });
    return data;
  }

  async getCompany() {
    const url: string =
      this.baseUrl +
      '/company/' +
      this.realmId +
      '/companyinfo/' +
      this.realmId;
    let data: any;
    await this.httpService
      .get(url, { headers: this.headers })
      .toPromise()
      .then(res => {
        data = res.data;
      });
    return data;
  }

  async getInvoice() {
    let url: string =
      this.baseUrl + '/company/' + this.realmId + '/query?query=';
    const params = 'select * from Invoice';
    url += params;

    let data: any;
    await this.httpService
      .get(url, { headers: this.headers })
      .toPromise()
      .then(res => {
        data = res.data.QueryResponse;
      });
    return data;
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
