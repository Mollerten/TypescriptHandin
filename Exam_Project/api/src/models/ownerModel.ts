import mongoose, { Types } from 'mongoose';

const { ObjectId } = Types;

const ownerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    blogposts: [{ type: ObjectId, ref: 'Blogpost' }],
    pets: [{ type: ObjectId, ref: 'Pet' }],
    comments: [{ type: ObjectId, ref: 'Comment' }],
    imageUrl: { type: String, required: false },
});

export default mongoose.model('Owner', ownerSchema);
