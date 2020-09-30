import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BambooConfig } from './bamboo.config';
import { QuickBooksConfig } from './quickBooks.config';
import { SalesforceConfig } from './salesforce.config';
import { ZenefitsConfig } from './zenefits.config';

@Module({
  imports: [ConfigModule],
  providers: [ZenefitsConfig, SalesforceConfig, QuickBooksConfig, BambooConfig],
  exports: [ZenefitsConfig, SalesforceConfig, QuickBooksConfig, BambooConfig],
})
export class MyConfigModule {}
