// src/config/config.service.ts
import { MongooseModule } from '@nestjs/mongoose';
import { DynamicModule } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

require('dotenv').config();

abstract class ConfigService {
  constructor(protected env: { [k: string]: string | undefined }) {}

  protected getValue(key: string, throwOnMissing = true): string {
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

  public abstract getConfig(): DynamicModule;
}

class MongoConfig extends ConfigService {
  public getConfig(): DynamicModule {
    const mongoConnString = this.getValue('MONGO_CONN_STRING');
    const mongoDB = this.getValue('MONGO_DATABASE');

    return MongooseModule.forRoot(mongoConnString, {
      dbName: mongoDB,
    });
  }
}

export const configDataBase = new MongoConfig(process.env).ensureValues([
  'MONGO_CONN_STRING',
  'MONGO_DATABASE',
]);

class QueueRedisConfig extends ConfigService {
  public getConfig(): DynamicModule {
    const redisHost = this.getValue('REDIS_HOST');
    const redisPort = this.getValue('REDIS_PORT');

    return BullModule.forRoot({
      redis: {
        host: redisHost,
        port: +redisPort,
      },
    });
  }
}

export const configQueue = new QueueRedisConfig(process.env).ensureValues([
  'REDIS_HOST',
  'REDIS_PORT',
]);
