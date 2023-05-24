import mongoose, { Schema, Document } from 'mongoose';

interface IBlogpost extends Document {
    id: string;
    title: string;
    content: string;
    ownerId: string;
    imageurl: string;
}

const blogpostSchema: Schema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    ownerId: { type: String, required: true },
    imageurl: { type: String, required: true },
});

export default mongoose.model<IBlogpost>('Blogpost', blogpostSchema);
