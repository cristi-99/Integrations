import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IsNotEmpty, IsString } from 'class-validator';

@Injectable()
export class BambooConfig {
  constructor(private config: ConfigService) {
    this.BAMBOO_KEY = this.config.get('BAMBOOHR_APIKEY');
    this.baseUrl = 'https://api.bamboohr.com/api/gateway.php/cristi99/v1';
  }

  @IsString()
  @IsNotEmpty()
  BAMBOO_KEY: string;

  @IsString()
  @IsNotEmpty()
  baseUrl: string;
}
