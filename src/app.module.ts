import { Module } from '@nestjs/common';
import { ModulesModule } from './modules/modeles.module';
import { configDataBase, configQueue } from './db.config';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ModulesModule,
    configDataBase.getConfig(),
    configQueue.getConfig(),
    EventEmitterModule.forRoot(),
  ],
})
export class AppModule {}
