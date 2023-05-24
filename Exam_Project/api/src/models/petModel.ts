import mongoose, { Schema, Document } from 'mongoose';

interface IPet extends Document {
    id: string;
    name: string;
    species: string;
    age: number;
    ownerId: string;
}

const petSchema: Schema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    species: { type: String, required: true },
    age: { type: Number, required: true },
    ownerId: { type: String, required: true },
});

export default mongoose.model<IPet>('Pet', petSchema);
