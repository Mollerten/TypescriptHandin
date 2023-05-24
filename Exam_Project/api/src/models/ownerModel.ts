import mongoose, { Schema, Document } from 'mongoose';

interface IOwner extends Document {
    id: string;
    name: string;
    age: number;
    email: string;
    password: string;
}

const ownerSchema: Schema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export default mongoose.model<IOwner>('Owner', ownerSchema);
