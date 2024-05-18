import {
   Body,
   ConflictException,
   Controller,
   Get,
   HttpCode,
   HttpException,
   HttpStatus,
   Post,
   Request,
   Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorations/public';
import { AccountsService } from 'src/accounts/accounts.service';

@Controller('auth')
export class AuthController {
   constructor(
      private authService: AuthService,
   ) { }

   @Public()
   @Post('login')
   async signIn(@Body() signInDto: Record<string, any>) {
      try {
         return await this.authService.signIn(signInDto.username, signInDto.password);
      } catch (error) {
         console.error('Error signing in:', error);
         throw new HttpException('Error signing in', HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }

   @Post('register')
   async signUp(@Request() req, @Body() signInDto: Record<string, any>, @Res() res) {
      try {
         await this.authService.signup(signInDto.username, signInDto.password, signInDto.role);
         res.status(HttpStatus.OK).json({ message: 'Signing up successfully' });
      } catch (error) {
         console.error('Error signing up:', error);
         if (error instanceof ConflictException) {
            res.status(HttpStatus.CONFLICT).json({ message: error.message });
         } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error signing up' });
         }
      }
   }
}