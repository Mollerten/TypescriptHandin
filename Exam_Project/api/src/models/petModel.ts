import mongoose, { Types } from 'mongoose';

const { ObjectId } = Types;

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    species: { type: String, required: true },
    age: { type: Number, required: true },
    owner: { type: ObjectId, ref: 'Owner' },
    imageUrl: { type: String, required: false },
});

export default mongoose.model('Pet', petSchema);
