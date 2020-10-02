// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { QuickBooksLogin } from './quickBooks.auth';

import { QuickBooksService } from './quickBooks.service';

@Controller('quickbooks')
export class QuickBooksController {
  constructor(
    private quickbooksService: QuickBooksService,
    private quickbookLogin: QuickBooksLogin,
  ) {}
  @Get('costumers')
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

  @Get('login')
  login(@Res() res) {
    res.redirect(this.quickbookLogin.authUri);
  }
  // @Get('invoicePDF/:id')
  // getInvoicePDF(@Param() params) {
  //   return this.quickbooksService.getInvoicePDF(params.id);
  // }

  @Get('listen')
  async redirectUri(@Req() req) {
    await this.quickbookLogin.signIn(req.url);
    this.quickbooksService.setHeaders();
    return HttpStatus.OK;
  }
}
