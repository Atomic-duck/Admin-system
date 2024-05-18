import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { appProviders } from './app.provider';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    AccountsModule,
    ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    ...appProviders,
  ],
})
export class AppModule { }
