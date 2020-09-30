import { HttpModule, Module } from '@nestjs/common';
import { MyConfigModule } from 'src/config/config.module';
import { BambooController } from './bamboo.controller';
import { BambooService } from './bamboo.service';

@Module({
  imports: [HttpModule, MyConfigModule],
  providers: [BambooService],
  controllers: [BambooController],
})
export class BambooModule {}
