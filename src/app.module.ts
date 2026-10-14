import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './lib/auth.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow('MONG0DB_CONNECTION_STRING')
      }),
    }),
    AuthModule.forRoot({auth})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
