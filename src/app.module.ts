import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ENV_PRODUCTION } from './constants/environment.constants';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

const typeOrmConfig: TypeOrmModuleOptions =
    process.env.NODE_ENV === ENV_PRODUCTION
        ? {
              type: 'postgres',
              url: process.env.DATABASE_URL,
              autoLoadEntities: true,
              synchronize: true,
              // TODO use SSL
              ssl: {
                  rejectUnauthorized: false,
              },
          }
        : {
              type: 'postgres',
              host: process.env.POSTGRES_HOST || 'localhost',
              port: 5432,
              username: 'postgres',
              password: '   ',
              database: 'kitchen-assistant',
              autoLoadEntities: true,
              synchronize: true,
          };

@Module({
    imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
