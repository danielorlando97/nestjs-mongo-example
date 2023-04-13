import { Module } from '@nestjs/common';
import { ModulesModule } from './modules/modeles.module';
import { configService } from './db.config';
import { EventEmitterModule } from '@nestjs/event-emitter';
@Module({
  imports: [
    ModulesModule,
    configService.getDBConfig(),
    EventEmitterModule.forRoot(),
  ],
})
export class AppModule {}
