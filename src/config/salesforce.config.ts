import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IsNotEmpty, IsString, validate } from 'class-validator';

@Injectable()
export class SalesforceConfig {
  constructor(config: ConfigService) {
    this.SALESFORCE_CONSUMER_SECRET = config.get('SALESFORCE_CONSUMER_SECRET');
    this.salesforce_getContacts_url =
      'https://cristi99-dev-ed.my.salesforce.rest.marketingcloudapis.com';

    this.valid();
  }

  public async valid() {
    const errors = await validate(this);
    if (errors.length > 0)
      throw new HttpException(errors, HttpStatus.NOT_ACCEPTABLE);
  }

  @IsString()
  @IsNotEmpty()
  SALESFORCE_CONSUMER_SECRET: string;

  @IsString()
  @IsNotEmpty()
  salesforce_getContacts_url: string;
}
