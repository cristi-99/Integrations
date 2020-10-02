import { HttpModule, Module } from '@nestjs/common';
import { MyConfigModule } from '../config/config.module';
import { QuickBooksLogin } from './quickBooks.auth';
import { QuickBooksController } from './quickBooks.controller';
import { QuickBooksService } from './quickBooks.service';

@Module({
  imports: [MyConfigModule, MyConfigModule, HttpModule],
  controllers: [QuickBooksController],
  providers: [QuickBooksService, QuickBooksLogin],
  exports: [QuickBooksLogin],
})
export class QuickBooksModule {}
