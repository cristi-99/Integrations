import { HttpService, Injectable } from '@nestjs/common';
import { SalesforceConfig } from 'src/config/salesforce.config';

@Injectable()
export class SalesforceService {
  SALESFORCE_SECRET: string;
  getContacts_url;
  constructor(
    private httpService: HttpService,
    private salesforceConfig: SalesforceConfig,
  ) {
    this.SALESFORCE_SECRET =
      'Bearer ' + salesforceConfig.SALESFORCE_CONSUMER_SECRET;
    this.getContacts_url = salesforceConfig.salesforce_getContacts_url;
  }
  async get() {
    let data;
    const headersRequest: HeadersInit = {
      Authorization: this.SALESFORCE_SECRET,
    };

    await this.httpService
      .get(this.getContacts_url + '/contacts/v1/schema', {
        headers: headersRequest,
      })
      .toPromise()
      .then(res => {
        data = res.data.data.data;
      });
    return data;
  }
}
