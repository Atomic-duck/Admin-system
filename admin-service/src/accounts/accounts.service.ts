import { ConflictException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Account } from './account.schema';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class AccountsService {
   private readonly logger = new Logger(AccountsService.name);

   constructor(
      @Inject('ACCOUNT_MODEL')
      private accountModel: Model<Account>,
   ) { }

   async getAllAccounts(): Promise<Account[]> {
      return this.accountModel.find().exec();
   }

   async findAccount(username: string): Promise<Account | null> {
      return this.accountModel.findOne({ username }).exec();
   }

   async createAccount(username: string, password: string, role: string): Promise<Account> {
      const createdAccount = new this.accountModel({ username, password, role });
      return await createdAccount.save();
   }

   async deleteAccountById(id: string) {
      try {
         const deleted = await this.accountModel.findByIdAndDelete(id).exec();
         if (!deleted) {
            throw new NotFoundException(`Account with ID ${id} not found`);
         }
      } catch (error) {
         this.logger.error(`Failed to delete road status: ${error.message}`);
         throw error;
      }
   }
}
