import {Args, Context} from '../types';
import Pet from '../models/petModel';
import Owner from '../models/ownerModel';
import Blogpost from '../models/blogpostModel';
import Comment from '../models/commentModel';

export default {

    owner: async (parent: any, {id}: Args) => {
        try {
            return await Owner.findById(id)
                .populate('pets')
                .populate('comments')
                .populate({
                path: 'blogposts',
                populate: {
                    path: 'comments',
                    model: 'Comment',
                }})
                .populate({
                    path: 'blogposts',
                    populate: {
                        path: 'owner',
                        model: 'Owner'
                    }})

        } catch (error) {
            console.error('Error fetching owner:', error);
            throw new Error('Failed to fetch owner');
        }
    },

    owners: async (parent: any, args: any) => {
        try {
            return await Owner.find()
                .populate('pets')
                .populate('blogposts')
                .populate('comments');

        } catch (error) {
            console.error('Error fetching owners:', error);
            throw new Error('Failed to fetch owners');
        }

    },

    blogpost: async (parent: any, {id}: Args) => {
        try {
            return await Blogpost.findById(id)
                .populate('owner')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'owner',
                        model: 'Owner'
                    }
                });
        } catch (error) {
            console.error('Error fetching blogpost:', error);
            throw new Error('Failed to fetch blogpost');
        }
    },

    blogposts: async (parent: any, args: any) => {
        try {
            return await Blogpost.find()
                .populate('owner')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'owner',
                        model: 'Owner'
                    }
                });
        } catch (error) {
            console.error('Error fetching blogposts:', error);
            throw new Error('Failed to fetch blogposts');
        }
    },

    comment: async (parent: any, {id}: Args) => {
        try {
            return await Comment.findById(id).populate('owner').populate('blogpost');

        } catch (error) {
            console.error('Error fetching comment:', error);
            throw new Error('Failed to fetch comment');
        }
    },

    comments: async (parent: any, args: any) => {
        try {
            return await Comment.find().populate('owner').populate('blogpost');

        } catch (error) {
            console.error('Error fetching comments:', error);
            throw new Error('Failed to fetch comments');
        }
    },

    pet: async (parent: any, {id}: Args) => {
        try {
            return await Pet.findById(id).populate('owner');

        } catch (error) {
            console.error('Error fetching pet:', error);
            throw new Error('Failed to fetch pet');
        }
    },




    //
    // pets: (_parent: never, _args: Args, {pets}: Context) => pets,
    // owners: (_parent: never, _args: Args, {owners}: Context) => owners,
    // blogposts: (_parent: never, _args: Args, {blogposts}: Context) => blogposts,
    // comments: (_parent: never, _args: Args, {comments}: Context) => comments,
    // owner: (_parent: never, {id}: Args, {owners}: Context) => owners.find((owner) => owner.id === id),
    // blogpost: (_parent: never, {id}: Args, {blogposts}: Context) => blogposts.find((blogpost) => blogpost.id === id),

};
