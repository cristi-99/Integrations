import { Controller, Get } from '@nestjs/common';
import { BambooService } from './bamboo.service';

@Controller('bamboo')
export class BambooController {
  constructor(private bambooService: BambooService) {}
  @Get()
  getEmployee() {
    return this.bambooService.getEmployee();
  }
}
