import { Module } from '@nestjs/common';
import { ModulesModule } from './modules/modeles.module';
import { configService } from './db.config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ModulesModule,
    configService.getDBConfig(),
    EventEmitterModule.forRoot(),

    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
})
export class AppModule {}
