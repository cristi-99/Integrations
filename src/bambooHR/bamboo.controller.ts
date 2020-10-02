import { Controller, Get, Param } from '@nestjs/common';
import { BambooService } from './bamboo.service';

@Controller('bamboo')
export class BambooController {
  constructor(private bambooService: BambooService) {}
  @Get('employees')
  getEmployee() {
    return this.bambooService.getEmployees();
  }

  @Get('files/:id')
  getEmployeesFiles(@Param() params) {
    return this.bambooService.getEmployeesFiles(params.id);
  }
}
