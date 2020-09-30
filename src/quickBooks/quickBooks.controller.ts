// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get, Param } from '@nestjs/common';

import { QuickBooksService } from './quickBooks.service';

@Controller('quickbooks')
export class QuickBooksController {
  constructor(private quickbooksService: QuickBooksService) {}
  @Get('customers')
  getCostumers() {
    return this.quickbooksService.getCostumers();
  }

  @Get('company')
  getCompany() {
    return this.quickbooksService.getCompany();
  }

  @Get('invoice')
  getInvoice() {
    return this.quickbooksService.getInvoice();
  }

  // @Get('invoicePDF/:id')
  // getInvoicePDF(@Param() params) {
  //   return this.quickbooksService.getInvoicePDF(params.id);
  // }
}
