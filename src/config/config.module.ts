import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ZenefitsConfig } from './zenefits.config';

@Module({
  imports: [ConfigModule],
  providers: [ZenefitsConfig],
  exports: [ZenefitsConfig],
})
export class MyConfigModule {}
