import { Controller, Get, Header, Param, Res } from '@nestjs/common';

import { QuickBooksService } from './quickBooks.service';
import { Response } from 'express';

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

  //   @Get('invoicePDF/:id')
  //   @Header('Content-Type', 'application/pdf')
  //   async getInvoicePDF(@Param() params, @Res() res: Response) {
  //     return await this.quickbooksService.getInvoicePDF(params.id);
  //   }
}
