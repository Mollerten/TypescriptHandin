import mongoose, { Schema, Document } from 'mongoose';

interface IComment extends Document {
    id: string;
    content: string;
    blogpostId: string;
    ownerId: string;
}

const commentSchema: Schema = new Schema({
    id: { type: String, required: true },
    content: { type: String, required: true },
    blogpostId: { type: String, required: true },
    ownerId: { type: String, required: true },
});

export default mongoose.model<IComment>('Comment', commentSchema);
