import mongoose, { Types } from 'mongoose';

const { ObjectId } = Types;

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    blogpost: { type: ObjectId, ref: 'Blogpost' },
    owner: { type: ObjectId, ref: 'Owner'},
    },
    { timestamps: true }
);
export default mongoose.model('Comment', commentSchema);
