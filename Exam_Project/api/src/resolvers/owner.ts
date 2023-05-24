// import { books, categories } from '../data';
import {Args, Context, Owner, Pet, Comment, Blogpost} from '../types';
export default {

    pets: (parent:Owner, _args:never, {pets}:Context) =>
        pets.filter((pet) => pet.ownerId === parent.id),
    blogposts: (parent:Owner, _args:never, {blogposts}:Context) =>
        blogposts.filter((blogpost) => blogpost.ownerId === parent.id),
    comments: (parent:Owner, _args:never, {comments}:Context) =>
        comments.filter((comment) => comment.ownerId === parent.id),

}