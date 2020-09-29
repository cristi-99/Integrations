import { HttpModule, Module } from '@nestjs/common';
import { MyConfigModule } from 'src/config/config.module';
import { SalesforceController } from './salesforce.controller';
import { SalesforceService } from './salesforce.service';

@Module({
  imports: [HttpModule, MyConfigModule],
  controllers: [SalesforceController],
  providers: [SalesforceService],
})
export class SalesforceModule {}
