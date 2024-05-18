import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { JwtService } from '@nestjs/jwt';
import { Account } from 'src/accounts/account.schema';
import { log } from 'console';

@Injectable()
export class AuthService {
   constructor(
      private accountsService: AccountsService,
      private jwtService: JwtService
   ) { }

   async signIn(username: string, pass: string): Promise<{ access_token: string }> {
      const user = await this.accountsService.findAccount(username);
      if (user?.password !== pass) {
         throw new UnauthorizedException();
      }
      const payload = { sub: user.role, username: user.username };
      return {
         access_token: await this.jwtService.signAsync(payload),
      };
   }

   async signup(username: string, password: string, role: string): Promise<{ access_token: string }> {
      // Check if username already exists
      const existingAccount = await this.accountsService.findAccount(username);
      console.log(existingAccount)
      if (existingAccount) {
         throw new ConflictException('Username already exists');
      }

      // Create new account
      const newAccount: Account = await this.accountsService.createAccount(username, password, role);

      // Generate JWT token for the new account
      const payload = { role: newAccount.role, username: newAccount.username };
      const accessToken = await this.jwtService.signAsync(payload);

      return { access_token: accessToken };
   }
}