// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ZenefitsService } from './zenefits.service';

@Controller('zenefits')
export class ZenefitsController {
  constructor(private zenefitsService: ZenefitsService) {}
  @Get()
  getAllPeople() {
    return this.zenefitsService.getAllPeople();
  }
  //   @Post('webhook/people_change')
  //   receiveEvent(@Headers() header, @Body() body) {
  //     this.zenefitsService.peopleChangeWebhook(header, body);
  //   }
}
