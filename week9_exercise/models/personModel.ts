import mongoose from 'mongoose';

const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: ObjectId, ref: 'Address'},
    imageUrl: { type: String, required: false },
});

module.exports = mongoose.model('Person', personSchema);

