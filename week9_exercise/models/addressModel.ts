import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
});

module.exports = mongoose.model('Address', addressSchema);

