import { prop, DocumentType } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';

export class Product {
  @prop({ type: Date, required: true })
  lostTime: Date;

  @prop({ type: String, required: true, index: true })
  type: string;

  @prop({ type: String, required: true, index: true })
  color: string;

  @prop({ type: String, required: true, index: true })
  title: string;

  @prop({ type: String, required: true, ref: 'User' })
  userId: ObjectId;

  @prop({ type: String, required: true, index: true })
  brand: string;
}

export type ProductDocument = DocumentType<Product>;
