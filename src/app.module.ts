import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuickBooksModule } from './quickBooks/quickBooks.module';
import { SalesforceModule } from './salesforce/salesforce.module';

import { ZenefitsModule } from './zenefits/zenefits.module';

@Module({
  imports: [
    ZenefitsModule,
    SalesforceModule,
    QuickBooksModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
