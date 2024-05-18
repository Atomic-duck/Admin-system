import { Mongoose } from 'mongoose';
import UserSchema from './schemas/user.schema';
import SubscribeSchema from './schemas/subscribe.schema';
import CameraSchema from './schemas/camera.schema';
import RoadStatusSchema from './schemas/roadstatus.schema';

export const appProviders = [
   {
      provide: 'USER_MODEL',
      useFactory: (mongoose: Mongoose) => mongoose.model('User', UserSchema, "users"),
      inject: ['DATABASE_CONNECTION'],
   },
   {
      provide: 'SUBSCRIBE_MODEL',
      useFactory: (mongoose: Mongoose) => mongoose.model('Subscribe', SubscribeSchema, "subscribe-routes"),
      inject: ['DATABASE_CONNECTION'],
   },
   {
      provide: 'CAMERA_MODEL',
      useFactory: (mongoose: Mongoose) => mongoose.model('Camera', CameraSchema, "hcm-cameras"),
      inject: ['DATABASE_CONNECTION'],
   },
   {
      provide: 'ROAD_STATUS_MODEL',
      useFactory: (mongoose: Mongoose) => mongoose.model('RoadStatus', RoadStatusSchema, "road-status"),
      inject: ['DATABASE_CONNECTION'],
   },
];