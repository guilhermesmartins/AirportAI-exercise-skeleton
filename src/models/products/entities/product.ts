import { Document } from 'mongoose';
import { Typegoose, prop } from 'typegoose';

export class Product extends Typegoose {
  @prop({ required: true })
  lostTime: Date;

  @prop({ required: true, index: true })
  type: string;

  @prop({ required: true, index: true })
  color: string;

  @prop({ required: true, index: true })
  title: string;

  @prop({ required: true, index: true })
  owner: string;

  @prop({ required: true, index: true })
  brand: string;
}

export type ProductDocument = Document<Product>;
