import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ZenefitsConfig } from 'src/config/zenefits.config';
import * as fs from 'fs';
import { ZenefitsPeopleDto } from './zenefitsPeople.dto';
import { ZenefitsPeopleEnum } from './zenefitsPeople.enum';
import createHmac = require('create-hmac'); // create-hmac has no default exports and normal ts import will generate an error

@Injectable()
export class ZenefitsService {
  ZENEFITS_WEBHOOK_KEY: string;
  constructor(
    private zenefitsConfig: ZenefitsConfig,
    private httpService: HttpService,
  ) {
    this.ZENEFITS_WEBHOOK_KEY = zenefitsConfig.ZENEFITS_WEBHOOK_KEY;
  }

  async getAllPeople(): Promise<HttpStatus> {
    const apiKey: string = this.zenefitsConfig.ZENEFITS_API_KEY;
    const getPeople_url: string = this.zenefitsConfig.zenefits_getPeople_url;
    const headersRequest: HeadersInit = { Authorization: apiKey };
    let data: ZenefitsPeopleDto[];

    await this.httpService
      .get(getPeople_url, {
        headers: headersRequest,
      })
      .toPromise()
      .then(res => {
        data = res.data.data.data;
      });
    let str: string;
    str = '';
    for (const elem of data) {
      const employments = await this.getEmployments(
        elem.employments.url,
        headersRequest,
      );
      for (let i = 0; i < 8; i++) {
        const prop: string = ZenefitsPeopleEnum[i];
        str += `${prop}: ${elem[prop]}, `;
      }

      str += `Hire Date: ${employments}, `;
      str = str.slice(0, str.length - 2) + '\n';
    }

    fs.writeFile('people.txt', str, err => {
      if (err) throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    });

    return HttpStatus.OK;
  }

  async getEmployments(
    url: string,
    headersRequest: HeadersInit,
  ): Promise<string> {
    let data: string;
    await this.httpService
      .get(url, {
        headers: headersRequest,
      })
      .toPromise()
      .then(res => {
        data = res.data.data.data[0].hire_date;
      });
    return data;
  }

  //   peopleChangeWebhook(headers: Headers, body) {

  //     const data = headers.signature.split(',');
  //     const signature:string = data[0];
  //     console.log(signature);

  //     const hmac = createHmac('sha256', this.ZENEFITS_WEBHOOK_KEY)
  //       .update(JSON.stringify(body))
  //       .digest('hex');

  //     console.log(hmac);
  //   }
}
