import mongoose, { Types } from 'mongoose';

const { ObjectId } = Types;

const blogpostSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        owner: { type: ObjectId, ref: 'Owner', required: true },
        comments: [{ type: ObjectId, ref: 'Comment' }],
        imageurl: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model('Blogpost', blogpostSchema);
