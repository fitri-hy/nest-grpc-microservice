import { Module } from '@nestjs/common';
import { ConfigService } from './common/config/config.service';
import { AppLogger } from './common/logger/logger.service';
import { DatabaseService } from './infrastructure/database.service';
import { AppController } from './app.controller';

import { UserModule } from './modules/user/user.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [UserModule, OrderModule],
  providers: [ConfigService, AppLogger, DatabaseService],
  controllers: [AppController],
  exports: [AppLogger],
})
export class AppModule {}
