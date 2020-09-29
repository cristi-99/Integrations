import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IsNotEmpty, IsString, validate } from 'class-validator';

@Injectable()
export class QuickBooksConfig {
  constructor(config: ConfigService) {
    this.QUICKBOOKS_TOKEN = config.get('QUICKBOOKS_TOKEN');
    this.quickBooks_baseURL = 'https://sandbox-quickbooks.api.intuit.com/v3';
    'https://cristi99-dev-ed.my.salesforce.rest.marketingcloudapis.com';
    this.realmId = config.get('QUICKBOOKS_REALM_ID');

    this.valid();
  }

  public async valid() {
    const errors = await validate(this);
    if (errors.length > 0)
      throw new HttpException(errors, HttpStatus.NOT_ACCEPTABLE);
  }

  @IsString()
  @IsNotEmpty()
  QUICKBOOKS_TOKEN: string;

  @IsString()
  @IsNotEmpty()
  realmId: string;

  @IsString()
  @IsNotEmpty()
  quickBooks_baseURL: string;
}
