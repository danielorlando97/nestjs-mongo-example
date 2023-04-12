import { Module } from '@nestjs/common';
import { ModulesModule } from './modules/modeles.module';
import { configService } from './db.config';
@Module({
  imports: [ModulesModule, configService.getDBConfig()],
})
export class AppModule {}
