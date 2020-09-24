import { HttpModule, Module } from '@nestjs/common';
import { MyConfigModule } from 'src/config/config.module';
import { ZenefitsController } from './zenefits.controller';
import { ZenefitsService } from './zenefits.service';

@Module({
  imports: [MyConfigModule, HttpModule],
  controllers: [ZenefitsController],
  providers: [ZenefitsService],
})
export class ZenefitsModule {}
