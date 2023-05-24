// import { books, categories } from '../data';
import {Args, Context, Owner,} from '../types';
import OwnerModel from "../models/ownerModel";
import PetModel from "../models/petModel";
import BlogpostModel from "../models/blogpostModel";
import CommentModel from "../models/commentModel";
export default {

    pets: (_parent: never, _args: Args, {pets}: Context) => pets,
    owners: (_parent: never, _args: Args, {owners}: Context) => owners,
    blogposts: (_parent: never, _args: Args, {blogposts}: Context) => blogposts,
    comments: (_parent: never, _args: Args, {comments}: Context) => comments,
    owner: (_parent: never, {id}: Args, {owners}: Context) => owners.find((owner) => owner.id === id),
    blogpost: (_parent: never, {id}: Args, {blogposts}: Context) => blogposts.find((blogpost) => blogpost.id === id),

};
