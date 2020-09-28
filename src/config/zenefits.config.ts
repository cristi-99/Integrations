import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IsNotEmpty, IsString, validate } from 'class-validator';

@Injectable()
export class ZenefitsConfig {
  constructor(config: ConfigService) {
    this.ZENEFITS_API_KEY = config.get('ZENEFITS_API_KEY');
    this.zenefits_getPeople_url = 'http://api.zenefits.com/core/people';
    this.ZENEFITS_WEBHOOK_KEY = config.get('ZENEFITS_WEBHOOK_KEY');
    this.valid();
  }

  public async valid() {
    const errors = await validate(this);
    if (errors.length > 0)
      throw new HttpException(errors, HttpStatus.NOT_ACCEPTABLE);
  }

  @IsString()
  @IsNotEmpty()
  ZENEFITS_API_KEY: string;

  @IsString()
  @IsNotEmpty()
  ZENEFITS_WEBHOOK_KEY: string;

  @IsString()
  @IsNotEmpty()
  zenefits_getPeople_url: string;
}
