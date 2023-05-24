// import { books, categories } from '../data';
import {Args, Context, Owner, Pet, Blogpost, Comment} from '../types';
import CommentModel from "../models/commentModel";
export default {

    owner: (parent:Comment, _args:never, context:Context) =>
        context.owners.find((owner) => owner.id === parent.ownerId),
    blogpost: (parent:Comment, _args:never, context:Context) =>
        context.blogposts.find((blogpost) => blogpost.id === parent.blogpostId),

};
