import { prop, DocumentType } from '@typegoose/typegoose';
import { Types } from 'mongoose';

import { UserRole } from '../types';

export class User {
  _id: Types.ObjectId;

  @prop({ type: String })
  name: string;

  @prop({
    type: String,
    enum: UserRole,
  })
  role: UserRole;

  @prop({ type: String, unique: true })
  email: string;

  @prop({ type: String })
  password: string;
}

export type UserDocument = DocumentType<User>;
