import { Controller, Get } from '@nestjs/common';
import { ZenefitsService } from './zenefits.service';

@Controller('zenefits')
export class ZenefitsController {
  constructor(private zenefitsService: ZenefitsService) {}
  @Get()
  getAllPeople() {
    return this.zenefitsService.getAllPeople();
  }
}
