import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, } from 'mongoose';

enum UserRole {
   ADMIN = 'ADMIN',
   OPERATOR = 'OPERATOR',
}

@Schema()
export class Account extends Document {
   @Prop()
   username: string;

   @Prop()
   password: string;

   @Prop({ type: String, enum: UserRole, default: UserRole.OPERATOR })
   role: UserRole; // Field to store Google ID for users registered with Google
}

const AccountSchema = SchemaFactory.createForClass(Account);

export default AccountSchema;
