import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: null })
  avatarUrl: string;

  @Prop({ default: null })
  hashedRefreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
