import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RoadStatus } from './schemas/roadstatus.schema';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { Subscribe } from './schemas/subscribe.schema';
import { Camera } from './schemas/camera.schema';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @Inject('ROAD_STATUS_MODEL')
    private roadStatusModel: Model<RoadStatus>,
    @Inject('USER_MODEL')
    private userModel: Model<User>,
    @Inject('SUBSCRIBE_MODEL')
    private subscribeModel: Model<Subscribe>,
    @Inject('CAMERA_MODEL')
    private cameraModel: Model<Camera>,
  ) { }

  // ******** road-status *************
  async getAllRoadStatus(): Promise<RoadStatus[]> {
    try {
      return await this.roadStatusModel.find().sort({ timestamp: -1 }).exec();
    } catch (error) {
      this.logger.error(`Error retrieving road status: ${error.message}`);
      throw error;
    }
  }

  async getRoadStatusCount(): Promise<any[]> {
    try {
      return [{
        _id: 'all',
        count: await this.roadStatusModel.countDocuments().exec()
      }];
    } catch (error) {
      this.logger.error(`Error retrieving road status count: ${error.message}`);
      throw error;
    }
  }

  async getRoadStatusCountByday(preDay: number): Promise<any[]> {
    try {
      const preDayTimestamp = Date.now() - (preDay - 1) * 24 * 60 * 60 * 1000;
      console.log(preDayTimestamp);
      const result = await this.roadStatusModel.aggregate([
        {
          $match: { timestamp: { $gte: preDayTimestamp } } // Filter documents by timestamp
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$timestamp" } } // Convert timestamp to date
            },
            count: { $sum: 1 } // Count documents in each group
          }
        },
        {
          $sort: { _id: 1 } // Optionally sort the groups by date in ascending order
        }
      ]).exec();

      const countByDate = result.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {});

      console.log(countByDate);
      const dates = Array.from({ length: preDay }, (_, i) => {
        const date = new Date(preDayTimestamp);
        date.setDate(date.getDate() + i);
        return date.toISOString().slice(0, 10);
      });

      const countArray = dates.map(date => ({
        date,
        count: countByDate[date] || 0
      }));

      return countArray;
    } catch (error) {
      this.logger.error(`Error retrieving road status count: ${error.message}`);
      throw error;
    }
  }

  async deleteRoadStatusById(id: string) {
    try {
      const deleted = await this.roadStatusModel.findByIdAndDelete(id).exec();
      if (!deleted) {
        throw new NotFoundException(`Road status with ID ${id} not found`);
      }
    } catch (error) {
      this.logger.error(`Failed to delete road status: ${error.message}`);
      throw error;
    }
  }

  async deleteAllRoadStatus(): Promise<void> {
    try {
      await this.roadStatusModel.collection.drop();
      console.log('Collection deleted successfully.');
    } catch (error) {
      console.error('Error deleting collection:', error);
      throw error; // Optionally handle or throw the error
    }
  }

  // ******** users *************
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      this.logger.error(`Error retrieving users: ${error.message}`);
      throw error;
    }
  }

  async getUserDetail(email: string) {
    const subscribes = await this.subscribeModel.find({ email }).exec();
    const reports = await this.roadStatusModel.find({ email }).exec();
    return {
      subscribes,
      reports
    }
  }

  async getUsersCount(): Promise<number> {
    try {
      return await this.userModel.countDocuments().exec();
    } catch (error) {
      this.logger.error(`Error retrieving road status count: ${error.message}`);
      throw error;
    }
  }

  // ******** subscriptions *************
  async getAllSubscriptions(): Promise<Subscribe[]> {
    try {
      return await this.subscribeModel.find().exec();
    } catch (error) {
      this.logger.error(`Error retrieving subscriptions: ${error.message}`);
      throw error;
    }
  }

  async deleteSubscriptionById(subscriptionId: string): Promise<void> {
    try {
      const deletedSubscription = await this.subscribeModel.findByIdAndDelete(subscriptionId).exec();
      if (!deletedSubscription) {
        throw new Error(`Subscription with ID ${subscriptionId} not found`);
      }
    } catch (error) {
      this.logger.error(`Failed to delete subscription: ${error.message}`);
      throw error;
    }
  }

  async deleteAllSubscriptions(): Promise<void> {
    try {
      await this.subscribeModel.collection.drop();
      console.log('Collection deleted successfully.');
    } catch (error) {
      console.error('Error deleting collection:', error);
      throw error; // Optionally handle or throw the error
    }
  }

  // ******** cameras *************
  async getAllCameras(): Promise<Camera[]> {
    try {
      return await this.cameraModel.find().exec();
    } catch (error) {
      this.logger.error(`Error retrieving cameras: ${error.message}`);
      throw error;
    }
  }

  async addCameras(cameras: Record<string, any>): Promise<void> {
    try {
      const cameraEntries = Object.entries(cameras);

      for (const [camId, cameraData] of cameraEntries) {
        const { CamType, CamStatus, lon, lat, display_name } = cameraData;

        // Check if the camera with the same camId already exists in the database
        const existingCamera = await this.cameraModel.findOne({ camId });

        if (existingCamera) {
          this.logger.warn(`Camera with camId ${camId} already exists.`);
          continue; // Skip adding this camera
        }

        // Create a new Camera instance
        const newCamera = new this.cameraModel({
          camId: camId,
          type: CamType,
          status: CamStatus,
          lat: lat,
          lon: lon,
          display_name: display_name,
        });

        // Save the new camera to the database
        await newCamera.save();
        this.logger.log(`Camera with camId ${camId} added successfully.`);
      }
    } catch (error) {
      this.logger.error(`Error adding cameras: ${error.message}`);
      throw error;
    }
  }
}
