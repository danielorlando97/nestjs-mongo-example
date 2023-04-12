// src/config/config.service.ts
import { MongooseModule } from '@nestjs/mongoose';
import { DynamicModule } from '@nestjs/common';

require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getDBConfig(): DynamicModule {
    const mongoConnString = this.getValue('MONGO_CONN_STRING');
    const mongoDB = this.getValue('MONGO_DATABASE');

    return MongooseModule.forRoot(mongoConnString, {
      dbName: mongoDB,
    });
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'MONGO_CONN_STRING',
  'MONGO_DATABASE',
]);

export { configService };
