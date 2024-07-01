import { Schema, model, Document, Types } from 'mongoose';

interface IProperty extends Document {
  currentOwner: Types.ObjectId;
  address: string;
  state?: 'NSW' | 'VIC' | 'WA' | 'SA' | 'TAS';
  title: string;
  type?: 'apartment' | 'house' | 'duplex' | 'townhouse';
  desc: string;
  img: string;
  price: number;
  sqmeters: number;
  beds: number;
  featured?: boolean;
}

const PropertySchema = new Schema<IProperty>(
  {
    currentOwner: {
      type: Schema.Types.ObjectId as any, // Casting to any to avoid type errors
      ref: 'User',
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: ['NSW', 'VIC', 'WA', 'SA', 'TAS'],
    },
    title: {
      type: String,
      required: true,
      minlength: 8,
    },
    type: {
      type: String,
      enum: ['apartment', 'house', 'duplex', 'townhouse'],
    },
    desc: {
      type: String,
      required: true,
      minlength: 20,
    },
    img: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sqmeters: {
      type: Number,
      required: true,
    },
    beds: {
      type: Number,
      required: true,
      min: 1,
    },
    featured: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Property = model<IProperty>('Property', PropertySchema);
export default Property;
