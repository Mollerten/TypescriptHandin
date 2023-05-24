import mongoose, { Schema, Document, Model } from 'mongoose';

const personSchema: Schema<IPerson> = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
});

interface IPerson extends Document {
    id: string;
    name: string;
    age: number;
    email: string;
    address: string;
    phone: string;
}

const Person: Model<IPerson> = mongoose.model<IPerson>('Person', personSchema);

export default Person;
