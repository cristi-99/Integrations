import { Controller, Get } from '@nestjs/common';
import { SalesforceService } from './salesforce.service';

@Controller('salesforce')
export class SalesforceController {
  constructor(private salesforceService: SalesforceService) {}
  @Get()
  get() {
    return this.salesforceService.get();
  }
}
