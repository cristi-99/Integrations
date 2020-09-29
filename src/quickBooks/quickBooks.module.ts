import { HttpModule, Module } from '@nestjs/common';
import { MyConfigModule } from '../config/config.module';
import { QuickBooksController } from './quickBooks.controller';
import { QuickBooksService } from './quickBooks.service';

@Module({
  imports: [MyConfigModule, MyConfigModule, HttpModule],
  controllers: [QuickBooksController],
  providers: [QuickBooksService],
})
export class QuickBooksModule {}
