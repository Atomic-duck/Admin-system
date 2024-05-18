import { Body, Controller, Delete, Get, HttpStatus, Post, NotFoundException, Param, Res, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorations/public';
import { AccountsService } from './accounts/accounts.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly accountsService: AccountsService
  ) { }

  // ******** road-status *************
  @Get('accounts')
  async getAccounts(@Res() res) {
    try {
      const accounts = await this.accountsService.getAllAccounts();
      res.status(HttpStatus.OK).json(accounts);
    } catch (error) {
      console.error('Error getting accounts:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error getting accounts' });
    }
  }

  @Delete('accounts/:id')
  async deleteAccount(@Param('id') id: string, @Res() res) {
    try {
      await this.accountsService.deleteAccountById(id);
      res.status(HttpStatus.OK).json({ message: 'Delete successfully' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      } else {
        console.error('Error deleting account', error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while deleting account' });
      }
    }
  }

  // ******** road-status *************
  @Get('road-status')
  async getAllRoadStatus(@Res() res) {
    try {
      const roadStatus = await this.appService.getAllRoadStatus();
      res.status(HttpStatus.OK).json(roadStatus);
    } catch (error) {
      console.error('Error retrieving road status:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while fetching road status.' });
    }
  }

  @Get('road-status/count')
  async getRoadStatusCount(@Query('preDay') preDay: number, @Res() res) {
    try {
      if (!preDay) {
        const counts = await this.appService.getRoadStatusCount();
        res.status(HttpStatus.OK).json(counts);
      }
      else {
        const counts = await this.appService.getRoadStatusCountByday(preDay);
        res.status(HttpStatus.OK).json(counts);
      }

    } catch (error) {
      console.error('Error retrieving road status:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while fetching road status count.' });
    }
  }

  @Delete('road-status/:id')
  async deleteRoadStatusById(@Param('id') id: string, @Res() res): Promise<void> {
    try {
      await this.appService.deleteRoadStatusById(id);
      res.status(HttpStatus.OK).json({ message: 'Delete successfully' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      } else {
        console.error('Error deleting road status:', error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while deleting road status.' });
      }
    }
  }

  @Delete('road-status')
  async deleteAllRoadStatus(@Res() res): Promise<void> {
    try {
      await this.appService.deleteAllRoadStatus();
      res.status(HttpStatus.OK).json({ message: 'Delete successfully' });
    } catch (error) {
      console.error('Error deleting collection:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while deleting all road status.' });
    }
  }

  // ******** users *************
  @Get('users')
  async getAllUsers(@Res() res) {
    try {
      const users = await this.appService.getAllUsers();
      res.status(HttpStatus.OK).json(users);
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while fetching users.' });
    }
  }

  @Get('users/:email')
  async getUserDetail(@Param('email') email: string, @Res() res) {
    try {
      const data = await this.appService.getUserDetail(email);
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while fetching user detail.' });
    }
  }

  @Get('users-count')
  async getUsersCount(@Res() res) {
    try {
      const count = await this.appService.getUsersCount();
      res.status(HttpStatus.OK).json({ count });
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while fetching users count.' });
    }
  }

  // ******** subscriptions *************
  @Get('subscriptions')
  async getAllSubscriptions(@Res() res) {
    try {
      const subscriptions = await this.appService.getAllSubscriptions();
      res.status(HttpStatus.OK).json(subscriptions);
    } catch (error) {
      console.error('Error retrieving subscriptions:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while fetching subscriptions.' });
    }
  }

  @Delete('/subscriptions/:id')
  async deleteSubscriptionById(@Param('id') id: string, @Res() res): Promise<void> {
    try {
      await this.appService.deleteSubscriptionById(id);
      res.status(HttpStatus.OK).json({ message: 'Delete successfully' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      } else {
        console.error('Error deleting subscription:', error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while deleting subscription.' });
      }
    }
  }

  @Delete('subscriptions')
  async deleteAllSubscriptions(@Res() res): Promise<void> {
    try {
      await this.appService.deleteAllSubscriptions();
      res.status(HttpStatus.OK).json({ message: 'Delete successfully' });
    } catch (error) {
      console.error('Error deleting collection:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while deleting all road status.' });
    }
  }

  // ******** cameras *************
  @Get('cameras')
  async getAllCameras(@Res() res) {
    try {
      const cameras = await this.appService.getAllCameras();
      res.status(HttpStatus.OK).json(cameras);
    } catch (error) {
      console.error('Error retrieving cameras:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while fetching cameras.' });
    }
  }

  @Post('cameras')
  async addCameras(@Body() cameras: Record<string, any>, @Res() res): Promise<void> {
    try {
      await this.appService.addCameras(cameras);
      res.status(HttpStatus.CREATED).json({ message: 'Cameras added successfully.' });
    } catch (error) {
      // Handle errors appropriately
      console.error('Error adding cameras:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while adding cameras.' });
    }
  }
}
