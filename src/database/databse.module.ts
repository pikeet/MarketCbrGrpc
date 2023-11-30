/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dirname } from 'path';

@Module({
    imports: [
    ConfigModule.forRoot({
        isGlobal: true
    }),

     TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (ConfigService: ConfigService) => ({  
            type: "mysql",
            host: ConfigService.get<string>('DB_HOST'),
            port: ConfigService.get<number>('DB_PORT'),
            username: ConfigService.get<string>('DB_USER'),
            password: ConfigService.get<string>('DB_PASSWORD'),
            database: ConfigService.get<string>('DB_NAME'),
            entities: [dirname(__filename) + '/models/*{.js, .ts}'],
            autoLoadEntities: true,
            synchronize: true,
        }),
        inject: [ConfigService]
    })
  ]
})
export class DatabaseModule {}
