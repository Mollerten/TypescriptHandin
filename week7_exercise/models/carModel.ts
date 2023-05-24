import mongoose, { Schema, Document } from 'mongoose';

// Define the car schema
const CarSchema: Schema = new Schema({
  model: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
    minlength: 5,
  },
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    enum: ['red', 'blue', 'green', 'black', 'white'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the car model interface
interface ICar extends Document {
  model: string;
  year: number;
  price: number;
  color: string;
  createdAt: Date;
}

// Create and export the car model
export default mongoose.model<ICar>('Car', CarSchema);
