import { model, Schema, Document, ObjectId } from "mongoose";

export interface IProduct extends Document {
  description?: string;
  imageUrl?: string;
  name?: string;
  price?: number;
  rates?: number[];
  ratesAverage?: number;
  ratesCounter?: number;
  typeOfFood?: string;
  uid?: ObjectId;
}

const productSchema: Schema = new Schema(
  {
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "ImageUrl is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    rates: {
      type: [Number],
      required: true,
      default: [],
    },
    ratesAverage: {
      type: Number,
      required: true,
      default: 0,
    },
    ratesCounter: {
      type: Number,
      required: true,
      default: 0,
    },
    typeOfFood: {
      type: String,
      required: [true, "Type of food is required"],
    },
  },
  {
    toJSON: {
      transform: (document: IProduct, returnedJSON: IProduct) => {
        returnedJSON.uid = document._id;
        delete returnedJSON.rates;
        delete returnedJSON.ratesCounter;
        delete returnedJSON._id;
        delete returnedJSON.__v;
      },
    },
  }
);

export const Product = model<IProduct>("Product", productSchema);
