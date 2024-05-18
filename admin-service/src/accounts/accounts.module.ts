import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Mongoose } from 'mongoose';
import AccountSchema from './account.schema';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    AccountsService,
    {
      provide: 'ACCOUNT_MODEL',
      useFactory: (mongoose: Mongoose) => mongoose.model('Accounts', AccountSchema, "accounts"),
      inject: ['DATABASE_CONNECTION'],
    },
  ],
  exports: [AccountsService],
})
export class AccountsModule { }
