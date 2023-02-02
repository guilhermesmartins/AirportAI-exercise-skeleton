import { Document } from 'mongoose';
import { Typegoose, prop } from 'typegoose';

export class Product extends Typegoose {
  @prop({ required: true })
  lostTime: Date;

  @prop({ required: true })
  type: string;

  @prop({ required: true })
  color: string;

  @prop({ required: true })
  title: string;

  @prop({ required: true })
  owner: string;

  @prop({ required: true })
  brand: string;
}

export type ProductDocument = Document<Product>;
