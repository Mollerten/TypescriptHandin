
import { Context, Blogpost} from '../types';
import BlogpostModel from "../models/blogpostModel";
export default {

    owner: (parent: Blogpost, _args: never, context: Context) =>
        context.owners.find((owner) => owner.id === parent.ownerId),
    comments: (parent: Blogpost, _args: never, context: Context) =>
        context.comments.filter((comment) => comment.blogpostId === parent.id),


}