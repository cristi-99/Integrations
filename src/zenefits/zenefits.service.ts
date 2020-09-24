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

@Injectable()
export class ZenefitsService {
  constructor(
    private zenefitsConfig: ZenefitsConfig,
    private httpService: HttpService,
  ) {}

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
    data.forEach(elem => {
      for (let i = 0; i < 8; i++) {
        const prop: string = ZenefitsPeopleEnum[i];
        str += `${prop}: ${elem[prop]}, `;
      }
      str = str.slice(0, str.length - 2) + '\n';
    });

    fs.writeFile('people.txt', str, err => {
      if (err) throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    });

    return HttpStatus.OK;
  }
}
