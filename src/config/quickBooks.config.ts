import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IsNotEmpty, IsString, validate } from 'class-validator';

@Injectable()
export class QuickBooksConfig {
  constructor(config: ConfigService) {
    this.quickBooks_baseURL = 'https://sandbox-quickbooks.api.intuit.com';

    this.QUICKBOOKS_CLIENT_SECRET = config.get('QUICKBOOKS_CLIENT_SECRET');
    this.QUICKBOOKS_CLIENT_ID = config.get('QUICKBOOKS_CLIENT_ID');
    this.valid();
  }

  public async valid() {
    const errors = await validate(this);
    if (errors.length > 0)
      throw new HttpException(errors, HttpStatus.NOT_ACCEPTABLE);
  }

  @IsString()
  @IsNotEmpty()
  QUICKBOOKS_CLIENT_ID: string;

  @IsString()
  @IsNotEmpty()
  QUICKBOOKS_CLIENT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  quickBooks_baseURL: string;
}
